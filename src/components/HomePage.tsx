import React from 'react';
import CategoryGrid from './CategoryGrid';
import FeaturedProducts from './FeaturedProducts';
import QuickStats from './QuickStats';
import { Product } from '../data/products';
import { AvailableProduct } from '../data/availableProducts';

interface HomePageProps {
  onCategorySelect: (category: string) => void;
  onProductClick: (product: Product) => void;
  onAvailableProductClick: (product: AvailableProduct) => void;
  onAddToCart: (product: Product | AvailableProduct) => void;
  onViewMore: (type: 'local' | 'external') => void;
}

const HomePage: React.FC<HomePageProps> = ({
  onCategorySelect,
  onProductClick,
  onAvailableProductClick,
  onAddToCart,
  onViewMore
}) => {
  return (
    <div className="space-y-8 md:space-y-12">
      {/* Hero Section */}
      <div className="py-8 md:py-12 text-center relative z-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6 animate-slideUp leading-tight">
            مرحباً بك في{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 animate-pulse block md:inline">
              Red1One
            </span>
          </h1>
          
          <p className="text-sm md:text-lg text-gray-400 mb-6 md:mb-8 animate-slideUp px-4" style={{ animationDelay: '0.3s' }}>
            أفضل منصة للتسوق الإلكتروني • توصيل مجاني • أسعار منافسة
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto animate-slideUp" style={{ animationDelay: '0.4s' }}>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 hover:bg-green-500/20 transition-all duration-300 cursor-pointer group">
              <h3 className="text-green-400 font-bold mb-2 group-hover:text-green-300">متوفر محلياً</h3>
              <p className="text-gray-300 text-sm">توصيل سريع خلال 24-48 ساعة</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 hover:bg-red-500/20 transition-all duration-300 cursor-pointer group">
              <h3 className="text-red-400 font-bold mb-2 group-hover:text-red-300">من الخارج</h3>
              <p className="text-gray-300 text-sm">AliExpress • Temu • SHEIN</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 hover:bg-blue-500/20 transition-all duration-300 cursor-pointer group">
              <h3 className="text-blue-400 font-bold mb-2 group-hover:text-blue-300">طلب خاص</h3>
              <p className="text-gray-300 text-sm">اطلب أي منتج تريده</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <CategoryGrid onCategorySelect={onCategorySelect} />

      {/* Featured Products */}
      <FeaturedProducts
        onProductClick={onProductClick}
        onAvailableProductClick={onAvailableProductClick}
        onAddToCart={onAddToCart}
        onViewMore={onViewMore}
      />

      {/* Quick Stats - نقل إلى نهاية الصفحة */}
      <QuickStats />
    </div>
  );
};

export default HomePage;