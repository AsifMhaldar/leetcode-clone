import React from 'react';

const ResizableDivider = ({ onMouseDown }) => {
  return (
    <div
      className="resizable-divider"
      onMouseDown={onMouseDown}
      role="separator"
      aria-orientation="vertical"
      tabIndex={0}
    />
  );
};

export default ResizableDivider;
