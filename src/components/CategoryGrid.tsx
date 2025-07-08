import React from 'react';
import { Smartphone, ShirtIcon, Home, Gamepad2, Clock, Baby, Dumbbell, BookOpen } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  nameAr: string;
  icon: React.ComponentType<any>;
  color: string;
  subcategories?: string[];
}

const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    nameAr: 'إلكترونيات',
    icon: Smartphone,
    color: 'from-blue-500 to-blue-700',
    subcategories: ['هواتف', 'لابتوب', 'أجهزة منزلية', 'إكسسوارات']
  },
  {
    id: 'clothing',
    name: 'Clothing',
    nameAr: 'ملابس',
    icon: ShirtIcon,
    color: 'from-pink-500 to-pink-700',
    subcategories: ['رجال', 'نساء', 'أطفال', 'أحذية']
  },
  {
    id: 'home',
    name: 'Home & Garden',
    nameAr: 'المنزل والحديقة',
    icon: Home,
    color: 'from-green-500 to-green-700',
    subcategories: ['أثاث', 'ديكور', 'أدوات المطبخ', 'حديقة']
  },
  {
    id: 'gaming',
    name: 'Gaming',
    nameAr: 'ألعاب',
    icon: Gamepad2,
    color: 'from-purple-500 to-purple-700',
    subcategories: ['أجهزة الألعاب', 'إكسسوارات', 'ألعاب الكمبيوتر']
  },
  {
    id: 'watch',
    name: 'watch',
    nameAr: 'الساعات',
    icon: Clock,
    color: 'from-yellow-500 to-yellow-700',
    subcategories: ['الساعات', 'إكسسوارات ', 'خواتم']
  },
  {
    id: 'baby',
    name: 'Baby & Kids',
    nameAr: 'الأطفال',
    icon: Baby,
    color: 'from-orange-500 to-orange-700',
    subcategories: ['ملابس الأطفال', 'ألعاب', 'مستلزمات الطفل']
  },
  {
    id: 'sports',
    name: 'Sports',
    nameAr: 'رياضة',
    icon: Dumbbell,
    color: 'from-red-500 to-red-700',
    subcategories: ['معدات رياضية', 'ملابس رياضية', 'مكملات غذائية']
  },
  {
    id: 'books',
    name: 'Books & Media',
    nameAr: 'كتب ووسائط',
    icon: BookOpen,
    color: 'from-indigo-500 to-indigo-700',
    subcategories: ['كتب', 'مجلات', 'أفلام وموسيقى']
  }
];

interface CategoryGridProps {
  onCategorySelect: (category: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
    // Smooth scroll to top of products section instead of jumping
    setTimeout(() => {
      const element = document.querySelector('[data-products-section]');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="py-12 relative z-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-8 animate-slideUp">
          تصفح حسب الفئات
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`
                relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 
                hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 bg-gradient-to-br ${category.color} 
                p-6 text-white group animate-slideUp
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative z-10">
                <category.icon className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold text-lg mb-1">{category.nameAr}</h3>
                <p className="text-sm opacity-90">{category.name}</p>
                {category.subcategories && (
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-xs">{category.subcategories.slice(0, 2).join(' • ')}</p>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full transform translate-x-6 -translate-y-6 group-hover:scale-150 transition-transform duration-500" />
              
              {/* Enhanced hover effect */}
              <div className="absolute inset-0 border-2 border-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
