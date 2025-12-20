import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <article className="project-card">
      {project.image && (
        <div className="project-card-image">
          <img src={project.image} alt={project.title} />
          <div className="project-card-overlay">
            <span className={`project-status-badge status-${project.status?.toLowerCase() || 'active'}`}>
              {project.status || 'Active'}
            </span>
          </div>
        </div>
      )}
      <div className="project-card-content">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-description">{project.description}</p>
        
        <div className="project-card-footer">
          <div className="project-client">
            <span className="client-icon">👤</span>
            <span className="client-name">{project.client}</span>
          </div>
          
          {project.technologies && project.technologies.length > 0 && (
            <div className="project-technologies">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <span key={index} className="tech-badge">{tech}</span>
              ))}
              {project.technologies.length > 3 && (
                <span className="tech-badge">+{project.technologies.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
