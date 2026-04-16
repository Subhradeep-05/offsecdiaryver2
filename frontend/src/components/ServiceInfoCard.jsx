const ServiceInfoCard = ({ icon, title, children }) => {
  return (
    <div className="service-card">
      <div className="service-card-header">
        <span className="icon">{icon}</span>
        <h3>{title}</h3>
      </div>

      <div className="service-card-content">
        {children}
      </div>
    </div>
  );
};

export default ServiceInfoCard;