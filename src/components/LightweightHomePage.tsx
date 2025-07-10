import React, { memo } from 'react';
import { Smartphone, ShirtIcon, Home, Gamepad2, Clock, Baby, Dumbbell, BookOpen, Store, ExternalLink, Package, Truck, Shield, Star } from 'lucide-react';

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
    <div className="space-y-8">
      {/* Enhanced Hero Section */}
      <div className="py-8 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          {/* Main Title */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              مرحباً بك في{' '}
              <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent animate-pulse">
                Red1One
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-2 font-medium">
              أفضل منصة للتسوق الإلكتروني في الجزائر
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-400">
              <span className="flex items-center">
                <Truck className="w-4 h-4 ml-1 text-green-400" />
                توصيل مجاني
              </span>
              <span className="text-gray-600">•</span>
              <span className="flex items-center">
                <Shield className="w-4 h-4 ml-1 text-blue-400" />
                أسعار منافسة
              </span>
              <span className="text-gray-600">•</span>
              <span className="flex items-center">
                <Star className="w-4 h-4 ml-1 text-yellow-400" />
                جودة مضمونة
              </span>
            </div>
          </div>

          {/* Enhanced Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
            <div className="group bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-2xl p-6 hover:border-green-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/20">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-green-500/20 p-3 rounded-full group-hover:bg-green-500/30 transition-colors duration-300">
                  <Store className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <h3 className="text-green-400 font-bold mb-2 text-lg">متوفر محلياً</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                منتجات متوفرة في المخزون
                <br />
                <span className="text-green-400 font-semibold">توصيل خلال 24-48 ساعة</span>
              </p>
              <div className="mt-4 flex items-center text-xs text-gray-400">
                <Package className="w-4 h-4 ml-1" />
                <span>جاهز للشحن فوراً</span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/30 rounded-2xl p-6 hover:border-red-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/20">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-red-500/20 p-3 rounded-full group-hover:bg-red-500/30 transition-colors duration-300">
                  <ExternalLink className="w-8 h-8 text-red-400" />
                </div>
              </div>
              <h3 className="text-red-400 font-bold mb-2 text-lg">من الخارج</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                <span className="font-semibold text-red-400">AliExpress • Temu • SHEIN</span>
                <br />
                أفضل الأسعار العالمية
              </p>
              <div className="mt-4 flex items-center text-xs text-gray-400">
                <Truck className="w-4 h-4 ml-1" />
                <span>10-18 يوم عمل</span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-purple-500/20 p-3 rounded-full group-hover:bg-purple-500/30 transition-colors duration-300">
                  <Package className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              <h3 className="text-purple-400 font-bold mb-2 text-lg">طلب خاص</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                اطلب أي منتج تريده
                <br />
                <span className="text-purple-400 font-semibold">نبحث عنه لك</span>
              </p>
              <div className="mt-4 flex items-center text-xs text-gray-400">
                <Star className="w-4 h-4 ml-1" />
                <span>خدمة مخصصة</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Enhanced Categories Section */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              تصفح حسب الفئات
            </h2>
            <p className="text-gray-400 text-lg">اختر الفئة التي تناسبك</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`
                  group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 
                  hover:scale-105 bg-gradient-to-br ${category.color} 
                  p-6 text-white shadow-lg hover:shadow-2xl
                `}
              >
                <div className="relative z-10">
                  <category.icon className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-bold text-sm md:text-base">{category.nameAr}</h3>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Shine Effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Quick Access Section */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              ابدأ التسوق الآن
            </h2>
            <p className="text-gray-400 text-lg">اختر نوع المنتجات التي تريدها</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <button
              onClick={() => onViewMore('local')}
              className="group bg-gradient-to-br from-green-500/20 to-green-600/10 border-2 border-green-500/40 hover:border-green-400/60 text-white py-8 px-6 rounded-2xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-green-500/30 p-4 rounded-full group-hover:bg-green-500/40 transition-colors duration-300">
                    <Store className="w-10 h-10 text-green-400" />
                  </div>
                </div>
                <div className="text-xl md:text-2xl font-bold mb-2">المنتجات المتوفرة محلياً</div>
                <div className="text-sm md:text-base text-green-300 mb-4">توصيل سريع خلال 24-48 ساعة</div>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-300">
                  <span className="flex items-center">
                    <Package className="w-4 h-4 ml-1" />
                    جاهز للشحن
                  </span>
                  <span className="flex items-center">
                    <Shield className="w-4 h-4 ml-1" />
                    ضمان محلي
                  </span>
                </div>
              </div>
              
              {/* Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={() => onViewMore('external')}
              className="group bg-gradient-to-br from-red-500/20 to-red-600/10 border-2 border-red-500/40 hover:border-red-400/60 text-white py-8 px-6 rounded-2xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-red-500/30 p-4 rounded-full group-hover:bg-red-500/40 transition-colors duration-300">
                    <ExternalLink className="w-10 h-10 text-red-400" />
                  </div>
                </div>
                <div className="text-xl md:text-2xl font-bold mb-2">المنتجات للطلب من الخارج</div>
                <div className="text-sm md:text-base text-red-300 mb-4">AliExpress • Temu • SHEIN</div>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-300">
                  <span className="flex items-center">
                    <Star className="w-4 h-4 ml-1" />
                    أفضل الأسعار
                  </span>
                  <span className="flex items-center">
                    <Truck className="w-4 h-4 ml-1" />
                    توصيل مجاني
                  </span>
                </div>
              </div>
              
              {/* Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="py-8 bg-gradient-to-r from-red-500/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              أرقامنا تتحدث عنا
            </h2>
            <p className="text-gray-400">نفخر بثقة عملائنا</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/30 rounded-2xl p-6 hover:border-red-400/50 transition-all duration-300 hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
                <div className="text-gray-300 text-sm md:text-base">منتج متوفر</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-2xl p-6 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">1000+</div>
                <div className="text-gray-300 text-sm md:text-base">عميل راضي</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">95%</div>
                <div className="text-gray-300 text-sm md:text-base">معدل الرضا</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 rounded-2xl p-6 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">4.8</div>
                <div className="text-gray-300 text-sm md:text-base">تقييم عام</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

LightweightHomePage.displayName = 'LightweightHomePage';

export default LightweightHomePage;