import React, { memo } from 'react';
import { Smartphone, ShirtIcon, Home, Gamepad2, Clock, Baby, Dumbbell, BookOpen } from 'lucide-react';

interface LightweightHomePageProps {
  onCategorySelect: (category: string) => void;
  onViewMore: (type: 'local' | 'external') => void;
}

const categories = [
  { id: 'electronics', nameAr: 'إلكترونيات', icon: Smartphone, color: 'from-blue-500 to-blue-700' },
  { id: 'clothing', nameAr: 'ملابس', icon: ShirtIcon, color: 'from-pink-500 to-pink-700' },
  { id: 'home', nameAr: 'المنزل والحديقة', icon: Home, color: 'from-green-500 to-green-700' },
  { id: 'gaming', nameAr: 'ألعاب', icon: Gamepad2, color: 'from-purple-500 to-purple-700' },
  { id: 'watch', nameAr: 'الساعات', icon: Clock, color: 'from-yellow-500 to-yellow-700' },
  { id: 'baby', nameAr: 'الأطفال', icon: Baby, color: 'from-orange-500 to-orange-700' },
  { id: 'sports', nameAr: 'رياضة', icon: Dumbbell, color: 'from-red-500 to-red-700' },
  { id: 'books', nameAr: 'كتب ووسائط', icon: BookOpen, color: 'from-indigo-500 to-indigo-700' }
];

const LightweightHomePage = memo(({ onCategorySelect, onViewMore }: LightweightHomePageProps) => {
  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
    setTimeout(() => {
      const element = document.querySelector('[data-products-section]');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="py-6 text-center">
        <div className="container mx-auto px-3">
          <h1 className="text-2xl md:text-3xl font-black text-white mb-3">
            مرحباً بك في{' '}
            <span className="text-red-500">Red1One</span>
          </h1>
          
          <p className="text-sm text-gray-400 mb-4">
            أفضل منصة للتسوق الإلكتروني • توصيل مجاني • أسعار منافسة
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <h3 className="text-green-400 font-bold mb-1 text-sm">متوفر محلياً</h3>
              <p className="text-gray-300 text-xs">توصيل سريع خلال 24-48 ساعة</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <h3 className="text-red-400 font-bold mb-1 text-sm">من الخارج</h3>
              <p className="text-gray-300 text-xs">AliExpress • Temu • SHEIN</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <h3 className="text-blue-400 font-bold mb-1 text-sm">طلب خاص</h3>
              <p className="text-gray-300 text-xs">اطلب أي منتج تريده</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-6">
        <div className="container mx-auto px-3">
          <h2 className="text-xl font-bold text-center text-white mb-4">
            تصفح حسب الفئات
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`
                  relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-200 
                  hover:scale-105 bg-gradient-to-br ${category.color} 
                  p-4 text-white
                `}
              >
                <category.icon className="w-6 h-6 mb-2" />
                <h3 className="font-semibold text-sm">{category.nameAr}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="py-6">
        <div className="container mx-auto px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => onViewMore('local')}
              className="bg-green-500/20 border border-green-500/40 text-white py-4 px-4 rounded-lg font-bold transition-colors hover:bg-green-500/30"
            >
              <div className="text-center">
                <div className="text-lg font-bold">المنتجات المتوفرة محلياً</div>
                <div className="text-sm text-gray-300">توصيل سريع خلال 24-48 ساعة</div>
              </div>
            </button>
            
            <button
              onClick={() => onViewMore('external')}
              className="bg-red-500/20 border border-red-500/40 text-white py-4 px-4 rounded-lg font-bold transition-colors hover:bg-red-500/30"
            >
              <div className="text-center">
                <div className="text-lg font-bold">المنتجات للطلب من الخارج</div>
                <div className="text-sm text-gray-300">AliExpress • Temu • SHEIN</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-6 bg-red-500/5">
        <div className="container mx-auto px-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">500+</div>
              <div className="text-gray-300 text-sm">منتج متوفر</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">1000+</div>
              <div className="text-gray-300 text-sm">عميل راضي</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">95%</div>
              <div className="text-gray-300 text-sm">معدل الرضا</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">4.8</div>
              <div className="text-gray-300 text-sm">تقييم عام</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

LightweightHomePage.displayName = 'LightweightHomePage';

export default LightweightHomePage;