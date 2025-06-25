const StatCard = ({ title, count, icon }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-orange-500 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
          <p className="text-3xl font-bold text-gray-800 mt-1">{count}</p>
        </div>
        {icon && <div className="text-4xl text-orange-500">{icon}</div>}
      </div>
    </div>
  );
};

export default StatCard;
