import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900/95 rounded-xl p-4 md:p-6 text-center border border-red-500/30 mx-4">
        <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 md:border-b-4 border-red-500 mx-auto mb-2 md:mb-4"></div>
        <p className="text-white text-sm md:text-lg font-bold">جارٍ التحميل...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;