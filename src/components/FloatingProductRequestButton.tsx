import React, { useState } from 'react';
import { Package, Plus, X } from 'lucide-react';

interface FloatingProductRequestButtonProps {
  onProductRequest: () => void;
}

const FloatingProductRequestButton: React.FC<FloatingProductRequestButtonProps> = ({ onProductRequest }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300">
      <button
        onClick={onProductRequest}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 animate-bounce group"
        style={{ animationDelay: '3s' }}
      >
        <div className="flex items-center space-x-2">
          <Package className="w-6 h-6" />
          {isHovered && (
            <span className="text-sm font-medium whitespace-nowrap animate-slideInRight">
              طلب منتج
            </span>
          )}
        </div>
        
        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-20"></div>
        <div className="absolute inset-0 rounded-full bg-purple-500 animate-pulse opacity-30"></div>
        
        {/* Plus Icon Animation */}
        <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
          <Plus className="w-3 h-3" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          اطلب أي منتج تريده
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </button>
    </div>
  );
};

export default FloatingProductRequestButton;