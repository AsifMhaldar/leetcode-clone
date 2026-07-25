import { useState } from 'react';

export const useAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  return {
    timeRange,
    setTimeRange
  };
};
