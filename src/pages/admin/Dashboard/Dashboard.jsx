import { useFetch } from '../../../hooks/useFetch';
import { getProjects, getClients, getContacts, getSubscribers } from '../../../api/endpoints';
import Navbar from '../../../components/common/Navbar/Navbar';
import Loader from '../../../components/common/Loader/Loader';
import './Dashboard.css';

// Mock data for testing
const mockProjects = [
  {
    _id: '1',
    title: 'E-Commerce Website',
    description: 'A modern e-commerce platform with React and Node.js featuring real-time inventory management, payment gateway integration, and advanced analytics dashboard.',
    client: 'TechShop Inc.',
    status: 'Completed',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    createdAt: '2024-11-15T10:30:00Z'
  },
  {
    _id: '2',
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication and real-time transaction tracking.',
    client: 'FinanceHub',
    status: 'Active',
    technologies: ['React Native', 'Firebase', 'Node.js'],
    createdAt: '2024-12-01T14:20:00Z'
  },
  {
    _id: '3',
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media management with multi-platform integration.',
    client: 'SocialConnect',
    status: 'Ongoing',
    technologies: ['Vue.js', 'Python', 'PostgreSQL', 'D3.js'],
    createdAt: '2024-12-10T09:15:00Z'
  }
];

const mockClients = [
  { _id: '1', name: 'Rajesh Kumar', company: 'TechShop Inc.' },
  { _id: '2', name: 'Priya Sharma', company: 'FinanceHub' },
  { _id: '3', name: 'Amit Patel', company: 'SocialConnect' },
  { _id: '4', name: 'Sneha Reddy', company: 'HealthCare Plus' },
  { _id: '5', name: 'Vikram Singh', company: 'EduTech Solutions' }
];

const mockContacts = [
  { _id: '1', name: 'John Doe', email: 'john@example.com', message: 'Interested in web development' },
  { _id: '2', name: 'Jane Smith', email: 'jane@example.com', message: 'Need mobile app' },
  { _id: '3', name: 'Mike Johnson', email: 'mike@example.com', message: 'Partnership inquiry' }
];

const Dashboard = () => {
  const { data: projectsData, loading: projectsLoading, error: projectsError } = useFetch(getProjects);
  const { data: clientsData, loading: clientsLoading, error: clientsError } = useFetch(getClients);
  const { data: contactsData, loading: contactsLoading, error: contactsError } = useFetch(getContacts);
  const { data: subscribers, loading: subscribersLoading, error: subscribersError } = useFetch(getSubscribers);

  // Use mock data if API fails
  const projects = projectsData || mockProjects;
  const clients = clientsData || mockClients;
  const contacts = contactsData || mockContacts;

  // Only show loader if projects are still loading (main focus)
  const loading = projectsLoading;
  const usingMockData = !projectsData || !clientsData || !contactsData;

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
      </>
    );
  }

  const stats = [
    {
      title: 'Total Projects',
      value: projects?.length || 0,
      icon: '📊',
      color: 'blue',
    },
    {
      title: 'Total Clients',
      value: clients?.length || 0,
      icon: '👥',
      color: 'green',
    },
    {
      title: 'Contact Messages',
      value: contacts?.length || 0,
      icon: '✉️',
      color: 'purple',
    },
  ];

  return (
    <div className="dashboard-page">
      <Navbar />
      <main className="dashboard">
        <div className="container">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Welcome to EngageX Admin Panel</p>
          </div>

          {hasErrors && (
            <div className="error-banner">
              <p>⚠️ Unable to fetch data from the backend. Please ensure your backend API is running and deployed correctly.</p>
              {projectsError && <p className="error-detail">Projects: {projectsError}</p>}
              {clientsError && <p className="error-detail">Clients: {clientsError}</p>}
              {contactsError && <p className="error-detail">Contacts: {contactsError}</p>}
           projectsError && (
            <div className="error-banner">
              <p>⚠️ Backend API se projects load nahi ho rahe. Backend check karein.</p>
              <p className="error-detail">Error: {projectsError}</p>
                <p className="stat-label">{stat.title}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="dashboard-sections">
            <div className="dashboard-section">
              <h2 className="section-title">Recent Projects</h2>
              {projects && projects.length > 0 ? (
                <div className="projects-grid">
                  {projects.slice(0, 3).map((project) => (
                    <div key={project._id} className="project-card">
                      <div className="project-header">
                        <h3 className="project-title">{project.title}</h3>
                        <span className={`project-badge badge-${project.status?.toLowerCase() || 'active'}`}>
                          {project.status || 'Active'}
                        </span>
                      </div>
                      {project.description && (
                        <p className="project-description">
                          {project.description.length > 100 
                            ? `${project.description.substring(0, 100)}...` 
                            : project.description}
                        </p>
                      )}
                      {project.client && (
                        <div className="project-client">
                          <span className="project-label">Client:</span>
                          <span className="project-value">{project.client}</span>
                        </div>
                      )}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="project-technologies">
                          {project.technologies.slice(0, 3).map((tech, index) => (
                            <span key={index} className="tech-tag">{tech}</span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="tech-tag">+{project.technologies.length - 3}</span>
                          )}
                        </div>
                      )}
                      {project.createdAt && (
                        <div className="project-date">
                          <span className="project-label">Created:</span>
                          <span className="project-value">
                            {new Date(project.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-message">No projects yet</p>
              )}
            </div>

            <div className="dashboard-section">
              <h2 className="section-title">Recent Clients</h2>
              {clients && clients.length > 0 ? (
                <div className="items-list">
                  {clients.slice(0, 5).map((client) => (
                    <div key={client._id} className="item-row">
                      <span className="item-name">{client.name}</span>
                      <span className="item-detail">{client.company}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-message">No clients yet</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
