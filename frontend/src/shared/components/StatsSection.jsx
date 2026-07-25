const StatsSection = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <div className={`text-${stat.color.split(' ')[1]}`}>{stat.icon}</div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
