import React, { useState } from 'react';
import { Filter, X, DollarSign, Star, Truck, Tag } from 'lucide-react';

interface FilterOptions {
  priceRange: [number, number];
  rating: number;
  platform: string[];
  category: string[];
  inStock: boolean;
  hasDiscount: boolean;
  deliveryTime: string;
}

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters
}) => {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  const platforms = [
    { id: 'aliexpress', name: 'علي إكسبريس', color: 'text-red-500' },
    { id: 'temu', name: 'تيمو', color: 'text-red-600' },
    { id: 'shein', name: 'شين', color: 'text-red-400' }
  ];

  const categories = [
    { id: 'electronics', name: 'إلكترونيات' },
    { id: 'clothing', name: 'ملابس' },
    { id: 'home', name: 'المنزل والحديقة' },
    { id: 'gaming', name: 'ألعاب' },
    { id: 'watch', name: 'الساعات' },
    { id: 'baby', name: 'الأطفال' },
    { id: 'sports', name: 'رياضة' },
    { id: 'books', name: 'كتب ووسائط' }
  ];

  const deliveryOptions = [
    '10-15 أيام',
    '10-18 أيام',
    '12-17 أيام',
    '14-18 أيام'
  ];

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      priceRange: [0, 100000],
      rating: 0,
      platform: [],
      category: [],
      inStock: false,
      hasDiscount: false,
      deliveryTime: ''
    };
    setFilters(resetFilters);
  };

  const toggleArrayFilter = (array: string[], value: string) => {
    return array.includes(value)
      ? array.filter(item => item !== value)
      : [...array, value];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900/95 backdrop-blur-lg border-l border-red-500/20 animate-slideInRight">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Filter className="w-6 h-6 ml-2" />
              فلتر متقدم
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Filters */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Price Range */}
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <DollarSign className="w-5 h-5 ml-2" />
                نطاق السعر (دج)
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="من"
                    value={filters.priceRange[0]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [Number(e.target.value), prev.priceRange[1]]
                    }))}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                  />
                  <span className="text-gray-400">إلى</span>
                  <input
                    type="number"
                    placeholder="إلى"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], Number(e.target.value)]
                    }))}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <Star className="w-5 h-5 ml-2" />
                التقييم الأدنى
              </h3>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setFilters(prev => ({ ...prev, rating }))}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg border transition-colors ${
                      filters.rating === rating
                        ? 'bg-yellow-500 border-yellow-500 text-black'
                        : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-yellow-500'
                    }`}
                  >
                    <Star className="w-4 h-4" />
                    <span>{rating}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Platform */}
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-white font-semibold mb-3">المنصة</h3>
              <div className="space-y-2">
                {platforms.map((platform) => (
                  <label key={platform.id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.platform.includes(platform.id)}
                      onChange={() => setFilters(prev => ({
                        ...prev,
                        platform: toggleArrayFilter(prev.platform, platform.id)
                      }))}
                      className="rounded border-gray-600 text-red-500 focus:ring-red-500"
                    />
                    <span className={`${platform.color} font-medium`}>{platform.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-white font-semibold mb-3">الفئة</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.category.includes(category.id)}
                      onChange={() => setFilters(prev => ({
                        ...prev,
                        category: toggleArrayFilter(prev.category, category.id)
                      }))}
                      className="rounded border-gray-600 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-gray-300 text-sm">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Delivery Time */}
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <Truck className="w-5 h-5 ml-2" />
                مدة التوصيل
              </h3>
              <div className="space-y-2">
                {deliveryOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryTime"
                      checked={filters.deliveryTime === option}
                      onChange={() => setFilters(prev => ({ ...prev, deliveryTime: option }))}
                      className="border-gray-600 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-white font-semibold mb-3">خيارات إضافية</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="rounded border-gray-600 text-red-500 focus:ring-red-500"
                  />
                  <span className="text-gray-300">متوفر في المخزون فقط</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.hasDiscount}
                    onChange={(e) => setFilters(prev => ({ ...prev, hasDiscount: e.target.checked }))}
                    className="rounded border-gray-600 text-red-500 focus:ring-red-500"
                  />
                  <span className="text-gray-300 flex items-center">
                    <Tag className="w-4 h-4 ml-1" />
                    المنتجات المخفضة فقط
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-700 p-4 space-y-3">
            <div className="flex space-x-3">
              <button
                onClick={handleApply}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200"
              >
                تطبيق الفلتر
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200"
              >
                إعادة تعيين
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;