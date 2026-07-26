import React from 'react';

const PageLoader = ({ text = 'Loading...' }) => {
  return (
    <div className="page-bg flex items-center justify-center">
      <div className="text-center">
        <div className="page-spinner mx-auto mb-4" />
        <p className="text-gray-300 text-lg">{text}</p>
      </div>
    </div>
  );
};

export default PageLoader;
