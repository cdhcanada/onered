import React from 'react';
import { Store, ExternalLink, Package, Home } from 'lucide-react';

interface NavigationTabsProps {
  activeTab: 'home' | 'available' | 'external' | 'request';
  onTabChange: (tab: 'home' | 'available' | 'external' | 'request') => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'home' as const,
      label: 'الرئيسية',
      icon: Home,
      description: 'الفئات والمنتجات المميزة'
    },
    {
      id: 'available' as const,
      label: 'جميع المنتجات',
      icon: Store,
      description: 'متوفر محلياً وللطلب من الخارج'
    },
    {
      id: 'request' as const,
      label: 'طلب منتج',
      icon: Package,
      description: 'اطلب أي منتج غير موجود'
    }
  ];

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border-b border-red-500/20 sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-4 md:px-6 py-3 md:py-4 whitespace-nowrap transition-all duration-300 border-b-2 ${
                activeTab === tab.id || (activeTab === 'external' && tab.id === 'available')
                  ? 'border-red-500 text-white bg-red-500/10'
                  : 'border-transparent text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <tab.icon className="w-4 h-4 md:w-5 md:h-5 ml-1" />
              <div className="text-right">
                <div className="font-semibold text-sm md:text-base">{tab.label}</div>
                <div className="text-xs text-gray-500 hidden md:block">{tab.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;