import React, { useState, memo, useMemo, useCallback } from 'react';
import { Package, Store, ExternalLink, Filter, Grid, List } from 'lucide-react';
import { searchProducts } from '../data/products';
import { searchAvailableProducts } from '../data/availableProducts';
import OptimizedProductCard from './OptimizedProductCard';

interface OptimizedUnifiedProductsPageProps {
  onAddToCart: (product: any) => void;
  onProductClick: (product: any) => void;
  onAvailableProductClick: (product: any) => void;
  selectedCategory?: string;
  searchQuery?: string;
}

const OptimizedUnifiedProductsPage = memo(({ 
  onAddToCart, 
  onProductClick, 
  onAvailableProductClick,
  selectedCategory, 
  searchQuery 
}: OptimizedUnifiedProductsPageProps) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'local' | 'external'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'rating'>('default');

  const { localProducts, externalProducts, totalCount } = useMemo(() => {
    const local = searchAvailableProducts(searchQuery || '', selectedCategory);
    const external = searchProducts(searchQuery || '', selectedCategory);
    
    return {
      localProducts: local,
      externalProducts: external,
      totalCount: local.length + external.length
    };
  }, [selectedCategory, searchQuery]);

  const sortProducts = useCallback((products: any[]) => {
    switch (sortBy) {
      case 'price-low':
        return [...products].sort((a, b) => a.product.priceInDZD - b.product.priceInDZD);
      case 'price-high':
        return [...products].sort((a, b) => b.product.priceInDZD - a.product.priceInDZD);
      case 'rating':
        return [...products].sort((a, b) => b.product.rating - a.product.rating);
      default:
        return products;
    }
  }, [sortBy]);

  const filteredProducts = useMemo(() => {
    const allProducts = [
      ...localProducts.map(p => ({ product: p, isLocal: true })),
      ...externalProducts.map(p => ({ product: p, isLocal: false }))
    ];

    let filtered = allProducts;
    
    if (activeFilter === 'local') {
      filtered = allProducts.filter(p => p.isLocal);
    } else if (activeFilter === 'external') {
      filtered = allProducts.filter(p => !p.isLocal);
    }
    
    return sortProducts(filtered);
  }, [localProducts, externalProducts, activeFilter, sortProducts]);

  const getGridClasses = () => {
    if (viewMode === 'list') {
      return 'grid grid-cols-1 gap-4';
    }
    return 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4';
  };

  return (
    <div className="py-4 relative z-10" data-products-section>
      <div className="container mx-auto px-3">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {searchQuery ? `البحث: "${searchQuery}"` : selectedCategory ? 'منتجات الفئة' : 'جميع المنتجات'}
            </h2>
            <div className="text-gray-300 text-sm">
              {totalCount} منتج متوفر
            </div>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Enhanced Filter Bar */}
        <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-2xl p-4 mb-6 border border-gray-700/50">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Filter Tabs */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 text-sm flex items-center space-x-2 ${
                  activeFilter === 'all'
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>الكل ({totalCount})</span>
              </button>
              
              <button
                onClick={() => setActiveFilter('local')}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 text-sm flex items-center space-x-2 ${
                  activeFilter === 'local'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>متوفر ({localProducts.length})</span>
              </button>
              
              <button
                onClick={() => setActiveFilter('external')}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 text-sm flex items-center space-x-2 ${
                  activeFilter === 'external'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                }`}
              >
                <ExternalLink className="w-4 h-4" />
                <span>للطلب ({externalProducts.length})</span>
              </button>
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-3">
              <span className="text-gray-300 text-sm font-medium">ترتيب:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
              >
                <option value="default">افتراضي</option>
                <option value="price-low">السعر: من الأقل للأعلى</option>
                <option value="price-high">السعر: من الأعلى للأقل</option>
                <option value="rating">التقييم الأعلى</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 max-w-md mx-auto">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
              <div className="text-white text-xl font-bold mb-2">لا توجد منتجات</div>
              <p className="text-gray-300 text-sm">جرب البحث بكلمات مختلفة أو تصفح الفئات الأخرى</p>
            </div>
          </div>
        ) : (
          <div className={getGridClasses()}>
            {filteredProducts.map(({ product, isLocal }, index) => (
              <div
                key={`${isLocal ? 'local' : 'external'}-${product.id}`}
                className="animate-slideUp"
                style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
              >
                <OptimizedProductCard
                  product={product}
                  isLocal={isLocal}
                  onAddToCart={onAddToCart}
                  onProductClick={onProductClick}
                  onAvailableProductClick={onAvailableProductClick}
                />
              </div>
            ))}
          </div>
        )}

        {/* Load More Button (for future pagination) */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-8">
            <div className="text-gray-400 text-sm">
              عرض {filteredProducts.length} من أصل {totalCount} منتج
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

OptimizedUnifiedProductsPage.displayName = 'OptimizedUnifiedProductsPage';

export default OptimizedUnifiedProductsPage;