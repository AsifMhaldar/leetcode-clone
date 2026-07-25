import React from 'react';

const FilterSelect = ({ label, value, onChange, options }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-white/80 text-sm font-medium">{label}</label>
    <select
      className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:bg-white/15 min-w-[140px]"
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-slate-800">
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default FilterSelect;
