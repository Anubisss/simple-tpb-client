'use client';

import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="flex items-center justify-center my-32">
      <div className="animate-spin rounded-full h-32 w-32 border-t-8 border-blue-500"></div>
    </div>
  );
};

export default LoadingIndicator;
