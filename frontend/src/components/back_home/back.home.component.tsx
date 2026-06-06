const BackHomeComponent = () => {
  return (
    <div className="group relative overflow-hidden rounded-lg p-2 transition text-blue-600 cursor-pointer">
      {/* Base Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-blue-500/10 to-slate-800 transition-opacity duration-300 group-hover:opacity-0" />
      
      {/* Hover Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-blue-500/30 to-slate-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Content (Z-index ensures text stays on top of absolute backgrounds) */}
      <span className="relative z-10">
        <i className="fa-solid fa-backward"></i> Back
      </span>
    </div>
  );
};

export default BackHomeComponent;
