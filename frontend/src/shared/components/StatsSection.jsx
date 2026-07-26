import './StatsSection.scss';

const StatsSection = ({ stats }) => {
  return (
    <div className="stats-section">
      {stats.map((stat, idx) => (
        <div key={idx} className="stats-section__card">
          <div className="stats-section__inner">
            <div className={`stats-section__icon bg-gradient-to-r ${stat.bg}`}>
              <div className={`text-${stat.color.split(' ')[1]}`}>{stat.icon}</div>
            </div>
            <div>
              <p className="stats-section__value">{stat.value}</p>
              <p className="stats-section__label">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
