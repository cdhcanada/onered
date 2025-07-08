import React, { useState, useEffect, useRef } from 'react';
import { Search, Clock, TrendingUp, Store, ExternalLink } from 'lucide-react';
import { sampleProducts, Product } from '../data/products';
import { availableProducts, AvailableProduct } from '../data/availableProducts';

interface SearchSuggestionsProps {
  query: string;
  onSelectSuggestion: (suggestion: string) => void;
  onSelectProduct: (product: Product) => void;
  onSelectAvailableProduct: (product: AvailableProduct) => void;
  isVisible: boolean;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  query,
  onSelectSuggestion,
  onSelectProduct,
  onSelectAvailableProduct,
  isVisible
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [productSuggestions, setProductSuggestions] = useState<Product[]>([]);
  const [availableProductSuggestions, setAvailableProductSuggestions] = useState<AvailableProduct[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // كلمات البحث الشائعة
  const popularSearches = [
    'سماعات بلوتوث',
    'ساعة ذكية',
    'جاكيت رجالي',
    'ماوس ألعاب',
    'فستان صيفي',
    'أحذية رياضية',
    'آلة قهوة',
    'سماعات لاسلكية',
    'هواتف ذكية',
    'لابتوب',
    'تابلت',
    'شاحن لاسلكي'
  ];

  // دالة لتمييز النص المطابق
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-red-500/30 text-red-300 font-bold px-1 rounded">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  useEffect(() => {
    // جلب عمليات البحث السابقة من localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      // البحث في أسماء المنتجات
      const matchingProducts = sampleProducts.filter(product =>
        product.nameAr.toLowerCase().includes(query.toLowerCase()) ||
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.descriptionAr.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.featuresAr.some(feature => feature.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6);

      setProductSuggestions(matchingProducts);

      // البحث في المنتجات المتوفرة محلياً
      const matchingAvailableProducts = availableProducts.filter(product =>
        product.nameAr.toLowerCase().includes(query.toLowerCase()) ||
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.descriptionAr.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.featuresAr.some(feature => feature.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 4);

      setAvailableProductSuggestions(matchingAvailableProducts);

      // اقتراحات نصية
      const textSuggestions = [
        ...popularSearches.filter(search => 
          search.toLowerCase().includes(query.toLowerCase())
        ),
        ...matchingProducts.map(p => p.nameAr),
        ...matchingAvailableProducts.map(p => p.nameAr)
      ].slice(0, 6);

      setSuggestions([...new Set(textSuggestions)]);
    } else {
      setSuggestions([]);
      setProductSuggestions([]);
      setAvailableProductSuggestions([]);
    }
  }, [query]);

  const saveRecentSearch = (searchTerm: string) => {
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleSuggestionClick = (suggestion: string) => {
    saveRecentSearch(suggestion);
    onSelectSuggestion(suggestion);
  };

  const handleProductClick = (product: Product) => {
    saveRecentSearch(product.nameAr);
    onSelectProduct(product);
  };

  const handleAvailableProductClick = (product: AvailableProduct) => {
    saveRecentSearch(product.nameAr);
    onSelectAvailableProduct(product);
  };

  if (!isVisible) return null;

  return (
    <div 
      ref={suggestionsRef}
      className="absolute top-full left-0 right-0 bg-gray-900/98 backdrop-blur-xl border border-red-500/40 rounded-xl mt-2 shadow-2xl z-50 max-h-96 overflow-y-auto"
    >
      {/* عمليات البحث السابقة */}
      {query.length === 0 && recentSearches.length > 0 && (
        <div className="p-4 border-b border-gray-700">
          <h4 className="text-gray-300 text-sm font-semibold mb-2 flex items-center">
            <Clock className="w-4 h-4 ml-1" />
            عمليات البحث السابقة
          </h4>
          {recentSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(search)}
              className="block w-full text-right text-gray-300 hover:text-white hover:bg-gray-800/50 px-3 py-2 rounded-lg transition-colors duration-200 text-sm"
            >
              {search}
            </button>
          ))}
        </div>
      )}

      {/* البحث الشائع */}
      {query.length === 0 && (
        <div className="p-4 border-b border-gray-700">
          <h4 className="text-gray-300 text-sm font-semibold mb-2 flex items-center">
            <TrendingUp className="w-4 h-4 ml-1" />
            البحث الشائع
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {popularSearches.slice(0, 8).map((search, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(search)}
                className="text-gray-300 hover:text-white hover:bg-red-500/20 hover:border-red-500/40 border border-transparent px-3 py-2 rounded-lg transition-all duration-200 text-sm text-right"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* اقتراحات البحث */}
      {suggestions.length > 0 && (
        <div className="p-4 border-b border-gray-700">
          <h4 className="text-gray-300 text-sm font-semibold mb-2 flex items-center">
            <Search className="w-4 h-4 ml-1" />
            اقتراحات البحث
          </h4>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="block w-full text-right text-gray-300 hover:text-white hover:bg-red-500/20 hover:border-red-500/40 border border-transparent px-3 py-2 rounded-lg transition-all duration-200 text-sm mb-1"
            >
              <Search className="w-4 h-4 inline ml-2 opacity-50" />
              {highlightMatch(suggestion, query)}
            </button>
          ))}
        </div>
      )}

      {/* المنتجات المقترحة */}
      {productSuggestions.length > 0 && (
        <div className="p-4 border-b border-gray-700">
          <h4 className="text-white text-sm font-semibold mb-3 flex items-center">
            <ExternalLink className="w-4 h-4 ml-1 text-red-400" />
            منتجات للطلب
          </h4>
          {productSuggestions.map((product) => (
            <button
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="flex items-center space-x-3 w-full text-right hover:bg-red-500/15 hover:border-red-500/40 border border-red-500/20 px-3 py-3 rounded-lg transition-all duration-200 mb-2 group"
            >
              <img
                src={product.image}
                alt={product.nameAr}
                className="w-16 h-16 object-cover rounded-lg border border-gray-600 group-hover:border-red-500/60 transition-colors duration-200"
              />
              <div className="flex-1">
                <div className="text-white text-sm font-medium group-hover:text-red-300 transition-colors duration-200 line-clamp-1">
                  {highlightMatch(product.nameAr, query)}
                </div>
                <div className="text-red-400 text-sm font-bold group-hover:text-red-300 transition-colors duration-200">{product.priceInDZD.toLocaleString()} دج</div>
                <div className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-200">
                  {product.platform === 'aliexpress' ? 'علي إكسبريس' : product.platform === 'temu' ? 'تيمو' : 'شين'} • {product.deliveryTime}
                </div>
              </div>
              <div className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ExternalLink className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* المنتجات المتوفرة محلياً */}
      {availableProductSuggestions.length > 0 && (
        <div className="p-4">
          <h4 className="text-white text-sm font-semibold mb-3 flex items-center">
            <Store className="w-4 h-4 ml-1 text-green-400" />
            متوفر محلياً
          </h4>
          {availableProductSuggestions.map((product) => (
            <button
              key={product.id}
              onClick={() => handleAvailableProductClick(product)}
              className="flex items-center space-x-3 w-full text-right hover:bg-green-500/15 hover:border-green-500/50 border border-green-500/30 px-3 py-3 rounded-lg transition-all duration-200 mb-2 group"
            >
              <img
                src={product.image}
                alt={product.nameAr}
                className="w-16 h-16 object-cover rounded-lg border border-green-500/40 group-hover:border-green-500/70 transition-colors duration-200"
              />
              <div className="flex-1">
                <div className="text-white text-sm font-medium group-hover:text-green-300 transition-colors duration-200 line-clamp-1">
                  {highlightMatch(product.nameAr, query)}
                </div>
                <div className="text-green-400 text-sm font-bold group-hover:text-green-300 transition-colors duration-200">{product.priceInDZD.toLocaleString()} دج</div>
                <div className="text-gray-400 text-xs group-hover:text-green-400 transition-colors duration-200">
                  متوفر: {product.quantity} قطعة • {product.location} • {product.deliveryTime}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-green-400 text-xs bg-green-500/20 px-2 py-1 rounded-full mb-1 group-hover:bg-green-500/30 transition-colors duration-200">
                  متوفر
                </div>
                <Store className="w-4 h-4 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* رسالة عدم وجود نتائج */}
      {query.length > 0 && suggestions.length === 0 && productSuggestions.length === 0 && availableProductSuggestions.length === 0 && (
        <div className="p-4 text-center text-white">
          <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>لا توجد نتائج لـ "{query}"</p>
          <p className="text-sm mt-1 text-gray-300">جرب كلمات مختلفة أو تصفح الفئات</p>
          <div className="mt-4">
            <p className="text-xs text-gray-400 mb-2">اقتراحات:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {popularSearches.slice(0, 4).map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="text-xs bg-gray-800/50 hover:bg-red-500/20 text-gray-300 hover:text-white px-3 py-1 rounded-full transition-all duration-200"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;