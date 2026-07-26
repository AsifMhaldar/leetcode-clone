import React from 'react';
import './FilterSelect.scss';

const FilterSelect = ({ label, value, onChange, options }) => (
  <div className="filter-select">
    <label className="filter-select__label">{label}</label>
    <select
      className="filter-select__input"
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default FilterSelect;
