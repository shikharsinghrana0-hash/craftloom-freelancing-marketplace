import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import {
  INITIAL_FREELANCERS,
  INITIAL_PROJECTS,
  INITIAL_PROPOSALS,
  INITIAL_USER_PROFILE,
} from './data/marketplaceData';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import ProjectsView from './components/ProjectsView';
import ProjectDetailsView from './components/ProjectDetailsView';
import FreelancersView from './components/FreelancersView';
import FreelancerModal from './components/FreelancerModal';
import PostProjectModal from './components/PostProjectModal';
import DashboardView from './components/DashboardView';
import Footer from './components/Footer';

const STORAGE_KEYS = {
  projects: 'craftloom_projects_inr_v1',
  proposals: 'craftloom_proposals_inr_v1',
  profile: 'craftloom_profile_inr_v1',
};

function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [projects, setProjects] = useState(() =>
    readStorage(STORAGE_KEYS.projects, INITIAL_PROJECTS)
  );
  const [proposals, setProposals] = useState(() =>
    readStorage(STORAGE_KEYS.proposals, INITIAL_PROPOSALS)
  );
  const [userProfile, setUserProfile] = useState(() =>
    readStorage(STORAGE_KEYS.profile, INITIAL_USER_PROFILE)
  );

  const [currentView, setCurrentView] = useState('home');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Project search & filter state
  const [projectSearch, setProjectSearch] = useState('');
  const [projectCategory, setProjectCategory] = useState('all');
  const [projectBudget, setProjectBudget] = useState('all');

  // Freelancer search & filter state
  const [freelancerSearch, setFreelancerSearch] = useState('');
  const [freelancerLevel, setFreelancerLevel] = useState('All Levels');

  // Toast feedback
  const [toast, setToast] = useState('');

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
    } catch {}
  }, [projects]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.proposals, JSON.stringify(proposals));
    } catch {}
  }, [proposals]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(userProfile));
    } catch {}
  }, [userProfile]);

  // Sync URL hash for back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (!hash || hash === 'home') {
        setCurrentView('home');
      } else if (hash.startsWith('project/')) {
        const id = hash.slice('project/'.length);
        setSelectedProjectId(id);
        setCurrentView('project-details');
      } else if (['projects', 'freelancers', 'dashboard'].includes(hash)) {
        setCurrentView(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(window.__craftloomToastTimer);
    window.__craftloomToastTimer = window.setTimeout(() => setToast(''), 4000);
  };

  const navigate = (view, projectId = null) => {
    setCurrentView(view);
    if (view === 'project-details' && projectId) {
      setSelectedProjectId(projectId);
      window.location.hash = `project/${projectId}`;
    } else {
      window.location.hash = view;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryId) => {
    setProjectCategory(categoryId);
    setProjectSearch('');
    setProjectBudget('all');
    navigate('projects');
  };

  const handleQuickSearch = (mode, query) => {
    if (mode === 'freelancers') {
      setFreelancerSearch(query);
      setFreelancerLevel('All Levels');
      navigate('freelancers');
    } else {
      setProjectSearch(query);
      setProjectCategory('all');
      setProjectBudget('all');
      navigate('projects');
    }
  };

  const handleCreateProject = (payload) => {
    const newProject = {
      id: `proj-${Date.now()}`,
      ...payload,
      deliverables: [
        'Kickoff alignment & milestone breakdown',
        'Iterative progress demos & source handoff',
        'Final QA review and documentation',
      ],
      postedAt: 'Just now',
      clientLocation: userProfile.location || 'Remote',
      clientVerified: true,
      clientProjectsPosted: projects.filter((p) => p.isOwner).length + 1,
      proposalsCount: 0,
      status: 'Open',
      featured: false,
      isOwner: true,
    };

    setProjects((prev) => [newProject, ...prev]);
    setIsPostModalOpen(false);
    showToast('Project published and added to your Dashboard!');
    navigate('project-details', newProject.id);
  };

  const handleSubmitProposal = (proposalInput) => {
    const newProposal = {
      id: `prop-${Date.now()}`,
      ...proposalInput,
      submittedAt: new Date().toISOString().slice(0, 10),
      status: 'Pending Review',
    };

    setProposals((prev) => [newProposal, ...prev]);
    setProjects((prev) =>
      prev.map((p) =>
        p.id === proposalInput.projectId
          ? { ...p, proposalsCount: (p.proposalsCount || 0) + 1 }
          : p
      )
    );
    showToast('Proposal submitted and saved to Dashboard!');
  };

  const handleUpdateProjectStatus = (projectId, nextStatus) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, status: nextStatus } : p))
    );
    showToast(`Project status updated to "${nextStatus}".`);
  };

  const handleDeleteProject = (projectId) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    showToast('Project removed from your posted briefs.');
  };

  const handleWithdrawProposal = (proposalId) => {
    setProposals((prev) => prev.filter((p) => p.id !== proposalId));
    showToast('Proposal withdrawn.');
  };

  const handleSaveProfile = (nextProfile) => {
    setUserProfile(nextProfile);
    showToast('Profile updated in LocalStorage.');
  };

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || null;

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#F6F3EC] text-[#141A18]">
      <a
        href="#main-content"
        className="visually-hidden rounded-lg bg-[#0D6E62] px-4 py-2 text-sm font-semibold text-white focus:fixed focus:top-3 focus:left-3 focus:z-50"
      >
        Skip to main content
      </a>

      <Navbar
        currentView={currentView}
        onNavigate={(view) => navigate(view)}
        onOpenPostProject={() => setIsPostModalOpen(true)}
        proposalsCount={proposals.length}
        postedCount={projects.filter((p) => p.isOwner).length}
      />

      {/* Global Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-4 bottom-5 z-50 flex items-center gap-2.5 rounded-2xl border border-teal-200 bg-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-xl"
        >
          <CheckCircle2 className="h-4 w-4 text-teal-400" aria-hidden="true" />
          <span>{toast}</span>
        </div>
      )}

      <main id="main-content" className="flex-1">
        {currentView === 'home' && (
          <HomeView
            projects={projects}
            freelancers={INITIAL_FREELANCERS}
            onNavigate={(view) => navigate(view)}
            onSelectCategory={handleSelectCategory}
            onSelectProject={(id) => navigate('project-details', id)}
            onSelectFreelancer={(f) => setSelectedFreelancer(f)}
            onOpenPostProject={() => setIsPostModalOpen(true)}
            onQuickSearch={handleQuickSearch}
          />
        )}

        {currentView === 'projects' && (
          <ProjectsView
            projects={projects}
            searchQuery={projectSearch}
            categoryFilter={projectCategory}
            budgetFilter={projectBudget}
            onSearchChange={setProjectSearch}
            onCategoryChange={setProjectCategory}
            onBudgetChange={setProjectBudget}
            onResetFilters={() => {
              setProjectSearch('');
              setProjectCategory('all');
              setProjectBudget('all');
            }}
            onSelectProject={(id) => navigate('project-details', id)}
            onOpenPostProject={() => setIsPostModalOpen(true)}
          />
        )}

        {currentView === 'project-details' && (
          <ProjectDetailsView
            project={selectedProject}
            userProfile={userProfile}
            existingProposals={proposals}
            onBack={() => navigate('projects')}
            onSubmitProposal={handleSubmitProposal}
            onGoToDashboard={() => navigate('dashboard')}
          />
        )}

        {currentView === 'freelancers' && (
          <FreelancersView
            freelancers={INITIAL_FREELANCERS}
            skillSearch={freelancerSearch}
            levelFilter={freelancerLevel}
            onSkillSearchChange={setFreelancerSearch}
            onLevelFilterChange={setFreelancerLevel}
            onResetFilters={() => {
              setFreelancerSearch('');
              setFreelancerLevel('All Levels');
            }}
            onSelectFreelancer={(f) => setSelectedFreelancer(f)}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            projects={projects}
            proposals={proposals}
            userProfile={userProfile}
            onSelectProject={(id) => navigate('project-details', id)}
            onUpdateProjectStatus={handleUpdateProjectStatus}
            onDeleteProject={handleDeleteProject}
            onWithdrawProposal={handleWithdrawProposal}
            onSaveProfile={handleSaveProfile}
            onOpenPostProject={() => setIsPostModalOpen(true)}
          />
        )}
      </main>

      <Footer
        onNavigate={(view) => navigate(view)}
        onSelectCategory={handleSelectCategory}
        onOpenPostProject={() => setIsPostModalOpen(true)}
      />

      <FreelancerModal
        freelancer={selectedFreelancer}
        onClose={() => setSelectedFreelancer(null)}
        onBrowseProjects={(skill) => {
          setSelectedFreelancer(null);
          setProjectSearch(skill);
          setProjectCategory('all');
          setProjectBudget('all');
          navigate('projects');
        }}
      />

      <PostProjectModal
        isOpen={isPostModalOpen}
        defaultClientName={userProfile.name}
        onClose={() => setIsPostModalOpen(false)}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
}
