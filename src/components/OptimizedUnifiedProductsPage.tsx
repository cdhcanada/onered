import React, { useState, memo, useMemo } from 'react';
import { Package, Store, ExternalLink } from 'lucide-react';
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

  const { localProducts, externalProducts, totalCount } = useMemo(() => {
    const local = searchAvailableProducts(searchQuery || '', selectedCategory);
    const external = searchProducts(searchQuery || '', selectedCategory);
    
    return {
      localProducts: local,
      externalProducts: external,
      totalCount: local.length + external.length
    };
  }, [selectedCategory, searchQuery]);

  const filteredProducts = useMemo(() => {
    const allProducts = [
      ...localProducts.map(p => ({ product: p, isLocal: true })),
      ...externalProducts.map(p => ({ product: p, isLocal: false }))
    ];

    if (activeFilter === 'local') {
      return allProducts.filter(p => p.isLocal);
    } else if (activeFilter === 'external') {
      return allProducts.filter(p => !p.isLocal);
    }
    
    return allProducts;
  }, [localProducts, externalProducts, activeFilter]);

  return (
    <div className="py-4 relative z-10">
      <div className="container mx-auto px-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">
              {searchQuery ? `البحث: "${searchQuery}"` : selectedCategory ? 'منتجات الفئة' : 'جميع المنتجات'}
            </h2>
          </div>
          <div className="text-gray-300 bg-gray-500/20 px-2 py-1 rounded text-sm">
            {totalCount} منتج
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-gray-800/40 rounded-xl p-3 mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-2 rounded-lg font-semibold transition-colors text-sm flex items-center space-x-1 ${
                activeFilter === 'all'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              <Package className="w-3 h-3" />
              <span>الكل ({totalCount})</span>
            </button>
            <button
              onClick={() => setActiveFilter('local')}
              className={`px-3 py-2 rounded-lg font-semibold transition-colors text-sm flex items-center space-x-1 ${
                activeFilter === 'local'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              <Store className="w-3 h-3" />
              <span>متوفر ({localProducts.length})</span>
            </button>
            <button
              onClick={() => setActiveFilter('external')}
              className={`px-3 py-2 rounded-lg font-semibold transition-colors text-sm flex items-center space-x-1 ${
                activeFilter === 'external'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              <ExternalLink className="w-3 h-3" />
              <span>للطلب ({externalProducts.length})</span>
            </button>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-8">
            <Package className="w-12 h-12 mx-auto mb-3 text-gray-400 opacity-50" />
            <div className="text-white text-lg mb-2">لا توجد منتجات</div>
            <p className="text-gray-300 text-sm">جرب البحث بكلمات مختلفة</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filteredProducts.map(({ product, isLocal }, index) => (
              <OptimizedProductCard
                key={`${isLocal ? 'local' : 'external'}-${product.id}`}
                product={product}
                isLocal={isLocal}
                onAddToCart={onAddToCart}
                onProductClick={onProductClick}
                onAvailableProductClick={onAvailableProductClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

OptimizedUnifiedProductsPage.displayName = 'OptimizedUnifiedProductsPage';

export default OptimizedUnifiedProductsPage;