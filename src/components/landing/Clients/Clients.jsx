import { useFetch } from '../../../hooks/useFetch';
import { getClients } from '../../../api/endpoints';
import ClientCard from '../ClientCard/ClientCard';
import Loader from '../../common/Loader/Loader';
import './Clients.css';

// Mock data for public display
const mockClients = [
  {
    _id: '1',
    name: 'TechShop Inc.',
    company: 'TechShop Inc.',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80',
    industry: 'E-Commerce',
    website: 'https://techshop.com'
  },
  {
    _id: '2',
    name: 'FinanceHub',
    company: 'FinanceHub',
    logo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&q=80',
    industry: 'Financial Services',
    website: 'https://financehub.com'
  },
  {
    _id: '3',
    name: 'SocialConnect',
    company: 'SocialConnect',
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&q=80',
    industry: 'Social Media',
    website: 'https://socialconnect.com'
  },
  {
    _id: '4',
    name: 'HealthCare Plus',
    company: 'HealthCare Plus',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&q=80',
    industry: 'Healthcare',
    website: 'https://healthcareplus.com'
  },
  {
    _id: '5',
    name: 'EduTech Solutions',
    company: 'EduTech Solutions',
    logo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&q=80',
    industry: 'Education',
    website: 'https://edutech.com'
  },
  {
    _id: '6',
    name: 'CloudServe',
    company: 'CloudServe',
    logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&q=80',
    industry: 'Cloud Services',
    website: 'https://cloudserve.com'
  }
];

const Clients = () => {
  const { data: clientsData, loading, error } = useFetch(getClients);

  if (loading && !clientsData) {
    return <Loader />;
  }

  // Use backend data if available, otherwise use mock data
  const clients = (clientsData && clientsData.length > 0) ? clientsData : mockClients;

  return (
    <section className="clients" id="clients">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Trusted by Great Teams</h2>
          <p className="section-subtitle">
            Companies we've partnered with
          </p>
        </div>

        {clients && clients.length > 0 ? (
          <div className="clients-grid">
            {clients.map((client) => (
              <ClientCard key={client._id} client={client} />
            ))}
          </div>
        ) : (
          <p className="empty-message">No clients available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default Clients;
