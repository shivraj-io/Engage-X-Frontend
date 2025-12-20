import { useFetch } from '../../../hooks/useFetch';
import { getProjects } from '../../../api/endpoints';
import ProjectCard from '../ProjectCard/ProjectCard';
import Loader from '../../common/Loader/Loader';
import './Projects.css';

// Mock data for public display
const mockProjects = [
  {
    _id: '1',
    title: 'E-Commerce Platform',
    description: 'A comprehensive e-commerce solution with real-time inventory, payment integration, and analytics dashboard.',
    client: 'TechShop Inc.',
    status: 'Completed',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
    createdAt: '2024-11-15T10:30:00Z'
  },
  {
    _id: '2',
    title: 'Mobile Banking App',
    description: 'Secure banking application with biometric authentication and real-time transactions.',
    client: 'FinanceHub',
    status: 'Active',
    technologies: ['React Native', 'Firebase', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    createdAt: '2024-12-01T14:20:00Z'
  },
  {
    _id: '3',
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media management with multi-platform integration.',
    client: 'SocialConnect',
    status: 'Ongoing',
    technologies: ['Vue.js', 'Python', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    createdAt: '2024-12-10T09:15:00Z'
  }
];

const Projects = () => {
  const { data: projectsData, loading, error } = useFetch(getProjects);

  if (loading && !projectsData) {
    return <Loader />;
  }

  // Use backend data if available, otherwise use mock data
  const projects = (projectsData && projectsData.length > 0) ? projectsData : mockProjects;

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Real work we've delivered for our clients
          </p>
        </div>

        {projects && projects.length > 0 ? (
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <p className="empty-message">No projects available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default Projects;
