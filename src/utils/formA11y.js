// Accessible form validation & dialog helpers aligned with modern-web-guidance

let announcerEl = null;
let announceTimer = null;
let announcedField = null;

function getAnnouncer() {
  if (typeof document === 'undefined') return null;
  if (!announcerEl || !document.body.contains(announcerEl)) {
    announcerEl = document.createElement('div');
    announcerEl.setAttribute('aria-live', 'polite');
    announcerEl.className = 'visually-hidden';
    document.body.append(announcerEl);
  }
  return announcerEl;
}

function spokenText(node) {
  if (!node) return '';
  const copy = node.cloneNode(true);
  copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
  copy.querySelectorAll('[role="img"][aria-label]').forEach((n) => {
    n.replaceWith(`${n.getAttribute('aria-label')}: `);
  });
  return (copy.textContent || '').replace(/\s+/g, ' ').trim();
}

function linkError(el, shown) {
  const errorId = el.dataset?.error;
  if (!errorId) return;
  const ids = (el.getAttribute('aria-describedby') || '')
    .split(/\s+/)
    .filter((id) => id && id !== errorId);
  if (shown) ids.push(errorId);
  if (ids.length) el.setAttribute('aria-describedby', ids.join(' '));
  else el.removeAttribute('aria-describedby');
}

function announceError(el) {
  const errorId = el.dataset?.error;
  if (!errorId) return;
  const error = document.getElementById(errorId);
  const announcer = getAnnouncer();
  if (!error || !announcer) return;

  const label = el.labels?.[0] ? `${spokenText(el.labels[0])}: ` : '';
  clearTimeout(announceTimer);
  announcer.textContent = '';
  announcedField = el;
  announceTimer = setTimeout(() => {
    announcer.textContent = label + spokenText(error);
  }, 500);
}

/**
 * Attaches :user-invalid ARIA synchronization and fallback behavior to a <form> element.
 */
export function attachFormValidation(formEl) {
  if (!formEl) return () => {};

  const supportsUserInvalid =
    typeof CSS !== 'undefined' &&
    typeof CSS.supports === 'function' &&
    CSS.supports('selector(:user-invalid)');

  const dirtyState = new WeakMap();
  const flagged = new WeakSet();
  const announced = new WeakSet();

  const syncAria = (el, announce = false, forceCheck = false) => {
    if (!el || !el.matches?.('input, select, textarea')) return;

    let isInvalid = false;
    if (supportsUserInvalid) {
      isInvalid = el.matches(':user-invalid');
    } else {
      const state = dirtyState.get(el);
      if (forceCheck || state?.hasBlurred) {
        isInvalid = !el.validity.valid;
        el.classList.toggle('user-invalid-fallback', isInvalid);
        el.classList.toggle('user-valid-fallback', !isInvalid);
      }
    }

    if (isInvalid) {
      if (announce && !announced.has(el)) {
        announceError(el);
        announced.add(el);
      }
      el.setAttribute('aria-invalid', 'true');
      linkError(el, true);
      flagged.add(el);
    } else if (flagged.has(el) || el.getAttribute('aria-invalid') !== 'true') {
      el.setAttribute('aria-invalid', 'false');
      linkError(el, false);
      flagged.delete(el);
      announced.delete(el);
      if (announcedField === el) {
        clearTimeout(announceTimer);
        const announcer = getAnnouncer();
        if (announcer) announcer.textContent = '';
      }
    }
  };

  formEl.querySelectorAll('input, select, textarea').forEach((el) => {
    if (!el.hasAttribute('aria-invalid')) {
      el.setAttribute('aria-invalid', 'false');
    }
  });

  const onBlur = (e) => {
    const el = e.target;
    if (!el.matches?.('input, select, textarea')) return;
    if (!supportsUserInvalid) {
      const state = dirtyState.get(el) || { hasInteracted: false, hasBlurred: false };
      state.hasBlurred = true;
      dirtyState.set(el, state);
      if (state.hasInteracted) syncAria(el, true, true);
    } else {
      syncAria(el, true);
    }
  };

  const onInput = (e) => {
    const el = e.target;
    if (!el.matches?.('input, select, textarea')) return;
    if (!supportsUserInvalid) {
      const state = dirtyState.get(el) || { hasInteracted: false, hasBlurred: false };
      state.hasInteracted = true;
      dirtyState.set(el, state);
      if (state.hasBlurred) syncAria(el, false, true);
    } else if (el.hasAttribute('aria-invalid')) {
      syncAria(el, false);
    }
  };

  const onChange = (e) => {
    const el = e.target;
    if (!el.matches?.('input, select, textarea')) return;
    if (!supportsUserInvalid) {
      const state = dirtyState.get(el) || { hasInteracted: false, hasBlurred: false };
      state.hasInteracted = true;
      state.hasBlurred = true;
      dirtyState.set(el, state);
      syncAria(el, true, true);
    } else {
      syncAria(el, true);
    }
  };

  const onInvalid = (e) => {
    const el = e.target;
    if (!el.matches?.('input, select, textarea')) return;
    if (!supportsUserInvalid) {
      dirtyState.set(el, { hasInteracted: true, hasBlurred: true });
    }
    announced.add(el);
    syncAria(el, false, true);
  };

  const onReset = () => {
    setTimeout(() => {
      formEl.querySelectorAll('input, select, textarea').forEach((el) => {
        dirtyState.delete(el);
        el.classList.remove('user-invalid-fallback', 'user-valid-fallback');
        el.setAttribute('aria-invalid', 'false');
        linkError(el, false);
      });
    });
  };

  formEl.addEventListener('blur', onBlur, true);
  formEl.addEventListener('input', onInput);
  formEl.addEventListener('change', onChange, true);
  formEl.addEventListener('invalid', onInvalid, true);
  formEl.addEventListener('reset', onReset, true);

  return () => {
    formEl.removeEventListener('blur', onBlur, true);
    formEl.removeEventListener('input', onInput);
    formEl.removeEventListener('change', onChange, true);
    formEl.removeEventListener('invalid', onInvalid, true);
    formEl.removeEventListener('reset', onReset, true);
  };
}

/**
 * Validates all controls in a form using native Constraint Validation API,
 * flags invalid fields, and moves focus to the first invalid control.
 */
export function validateAndFocusForm(formEl) {
  if (!formEl) return false;
  const controls = [...formEl.querySelectorAll('input, select, textarea')];
  let firstInvalid = null;

  for (const el of controls) {
    if (!el.checkValidity()) {
      el.dispatchEvent(new Event('invalid', { bubbles: false, cancelable: true }));
      if (!firstInvalid) firstInvalid = el;
    }
  }

  if (firstInvalid) {
    firstInvalid.focus();
    return false;
  }
  return true;
}

/**
 * Fallback light-dismiss for <dialog closedby="any"> in browsers without HTMLDialogElement.prototype.closedBy
 */
export function bindDialogLightDismiss(dialogEl, onClose) {
  if (!dialogEl) return () => {};
  const supportsClosedBy =
    typeof HTMLDialogElement !== 'undefined' && 'closedBy' in HTMLDialogElement.prototype;

  const handleClose = () => {
    if (typeof dialogEl.returnValue === 'string') {
      dialogEl.returnValue = '';
    }
    onClose?.();
  };

  dialogEl.addEventListener('close', handleClose);

  if (supportsClosedBy) {
    return () => {
      dialogEl.removeEventListener('close', handleClose);
    };
  }

  const handleClick = (event) => {
    if (event.target !== dialogEl) return;
    const rect = dialogEl.getBoundingClientRect();
    const inside =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (!inside) {
      dialogEl.close();
    }
  };

  dialogEl.addEventListener('click', handleClick);
  return () => {
    dialogEl.removeEventListener('close', handleClose);
    dialogEl.removeEventListener('click', handleClick);
  };
}
