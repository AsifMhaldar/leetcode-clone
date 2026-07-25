import { useState } from 'react';

export const useAdmin = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const selectOption = (option) => {
    setSelectedOption(option);
  };

  const clearSelection = () => {
    setSelectedOption(null);
  };

  return {
    selectedOption,
    selectOption,
    clearSelection
  };
};
