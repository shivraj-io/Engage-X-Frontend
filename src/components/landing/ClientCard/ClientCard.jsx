import './ClientCard.css';

const ClientCard = ({ client }) => {
  return (
    <article className="client-card">
      <div className="client-logo-wrapper">
        {client.logo ? (
          <div className="client-logo">
            <img src={client.logo} alt={client.name} />
          </div>
        ) : (
          <div className="client-logo-placeholder">
            {client.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      
      <div className="client-info">
        <h3 className="client-name">{client.name}</h3>
        {client.industry && (
          <p className="client-industry">{client.industry}</p>
        )}
      </div>
    </article>
  );
};

export default ClientCard;
