import React, { useState, memo, useMemo } from 'react';
import { Star, ShoppingCart, ExternalLink, AlertTriangle, Store, Package, MapPin, Clock, Truck } from 'lucide-react';
import { sampleProducts, Product, searchProducts } from '../data/products';
import { availableProducts, AvailableProduct, searchAvailableProducts } from '../data/availableProducts';

interface UnifiedProductsPageProps {
  onAddToCart: (product: Product | AvailableProduct) => void;
  onProductClick: (product: Product) => void;
  onAvailableProductClick: (product: AvailableProduct) => void;
  selectedCategory?: string;
  searchQuery?: string;
}

const ProductCard = memo(({ 
  product, 
  isLocal, 
  onAddToCart, 
  onProductClick, 
  onAvailableProductClick 
}: {
  product: Product | AvailableProduct;
  isLocal: boolean;
  onAddToCart: (product: Product | AvailableProduct) => void;
  onProductClick: (product: Product) => void;
  onAvailableProductClick: (product: AvailableProduct) => void;
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const isOutOfStock = isLocal && (product as AvailableProduct).quantity === 0;

  const handleImageLoad = () => setImageLoading(false);
  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 transition-colors duration-200 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-500'}`}
      />
    ));
  };

  const handleClick = () => {
    if (isLocal) {
      onAvailableProductClick(product as AvailableProduct);
    } else {
      onProductClick(product as Product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOutOfStock) {
      onAddToCart(product);
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'aliexpress': return 'علي إكسبريس';
      case 'temu': return 'تيمو';
      case 'shein': return 'شين';
      default: return platform;
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-xl rounded-2xl overflow-hidden border transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl group cursor-pointer ${
        isLocal 
          ? 'border-green-500/40 hover:border-green-400/80 hover:shadow-green-500/25' 
          : 'border-gray-700/40 hover:border-red-500/60 hover:shadow-red-500/25'
      } ${isOutOfStock ? 'opacity-75' : ''}`}
    >
      <div className="relative overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800/90 backdrop-blur-sm z-10">
            <div className={`animate-spin rounded-full h-6 w-6 border-b-2 ${
              isLocal ? 'border-green-500' : 'border-red-500'
            }`}></div>
          </div>
        )}
        <img
          src={imageError ? 'https://via.placeholder.com/400x400/374151/ffffff?text=Red1One' : product.image}
          alt={product.nameAr}
          className="w-full h-40 md:h-48 object-contain bg-gradient-to-br from-white to-gray-50 group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
              نفدت الكمية
            </div>
          </div>
        )}
        
        <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-lg backdrop-blur-sm ${
          isLocal 
            ? 'bg-gradient-to-r from-green-500/90 to-green-600/90 border border-green-400/30' 
            : 'bg-gradient-to-r from-red-500/90 to-red-600/90 border border-red-400/30'
        }`}>
          {isLocal ? (
            <div className="flex items-center">
              <Store className="w-3 h-3 ml-1" />
              متوفر محلياً
            </div>
          ) : (
            getPlatformName((product as Product).platform)
          )}
        </div>
        
        {product.discount && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg border border-red-400/30 backdrop-blur-sm">
            -{product.discount}%
          </div>
        )}

        {isLocal && (
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-xs border border-gray-600/30">
            <div className="flex items-center">
              <Package className="w-3 h-3 ml-1" />
              {(product as AvailableProduct).quantity} قطعة
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3 md:p-4">
        <h3 className={`font-bold text-sm md:text-base mb-1 transition-colors duration-300 line-clamp-2 ${
          isLocal ? 'text-white group-hover:text-green-400' : 'text-white group-hover:text-red-400'
        }`}>
          {product.nameAr}
        </h3>
        <p className="text-gray-400 text-xs mb-2 line-clamp-1 group-hover:text-gray-300 transition-colors duration-300">{product.name}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-gray-500 text-xs mr-1 group-hover:text-gray-400 transition-colors duration-300">({product.reviews})</span>
          <span className="text-yellow-400 text-xs mr-2 font-medium">{product.rating}</span>
        </div>
        
        <div className="space-y-1 mb-3">
          <div className="flex items-center space-x-1">
            <span className={`font-bold text-sm md:text-base ${
              isLocal ? 'text-green-400' : 'text-red-400'
            }`}>
              {product.priceInDZD.toLocaleString()} دج
            </span>
            <span className="text-gray-500 text-xs group-hover:text-gray-400 transition-colors duration-300">(${product.price})</span>
          </div>
          {product.originalPriceInDZD && (
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 line-through text-xs">{product.originalPriceInDZD.toLocaleString()} دج</span>
              <span className="text-green-400 text-xs font-bold bg-green-500/10 px-2 py-0.5 rounded-full">
                وفر {Math.round(((product.originalPriceInDZD - product.priceInDZD) / product.originalPriceInDZD) * 100)}%
              </span>
            </div>
          )}
        </div>

        {isLocal ? (
          <div className="space-y-1.5 mb-3 bg-green-500/5 rounded-lg p-2 border border-green-500/20">
            <div className="text-gray-400 text-xs flex items-center group-hover:text-green-400 transition-colors duration-300">
              <MapPin className="w-3 h-3 ml-1" />
              <span>{(product as AvailableProduct).location}</span>
            </div>
            <div className="text-green-400 text-xs flex items-center group-hover:text-green-300 transition-colors duration-300">
              <Clock className="w-3 h-3 ml-1" />
              <span>{(product as AvailableProduct).deliveryTime}</span>
            </div>
          </div>
        ) : (
          <>
            <div className="text-gray-400 text-xs mb-3 flex items-center group-hover:text-gray-300 transition-colors duration-300">
              <Truck className="w-3 h-3 ml-1" />
              <span>التوصيل: {(product as Product).deliveryTime}</span>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-2 mb-3 group-hover:bg-yellow-500/15 transition-colors duration-300">
              <div className="flex items-center text-yellow-400 text-xs group-hover:text-yellow-300 transition-colors duration-300">
                <AlertTriangle className="w-3 h-3 ml-1" />
                <span>الأسعار قابلة للتغيير</span>
              </div>
            </div>
          </>
        )}
        
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-2.5 px-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-1 shadow-lg text-xs md:text-sm ${
            isOutOfStock
              ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed border border-gray-600/30'
              : isLocal
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-green-500/40 border border-green-400/30'
                : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:shadow-red-500/40 border border-red-400/30'
          }`}
        >
          <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 ml-1" />
          <span>{isOutOfStock ? 'نفدت الكمية' : 'إضافة للسلة'}</span>
        </button>

        {!isLocal && (
          <div className="mt-3 text-center bg-gray-800/30 rounded-lg p-2 border border-gray-700/30">
            <span className="text-gray-500 text-xs group-hover:text-gray-400 transition-colors duration-300">
              الدفع مقدماً • تأكيد السعر عند الطلب
            </span>
          </div>
        )}
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

const UnifiedProductsPage: React.FC<UnifiedProductsPageProps> = ({ 
  onAddToCart, 
  onProductClick, 
  onAvailableProductClick,
  selectedCategory, 
  searchQuery 
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'local' | 'external'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'rating' | 'newest'>('default');

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

    let filtered = allProducts;
    
    if (activeFilter === 'local') {
      filtered = allProducts.filter(p => p.isLocal);
    } else if (activeFilter === 'external') {
      filtered = allProducts.filter(p => !p.isLocal);
    }
    
    // Apply sorting
    if (sortBy !== 'default') {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.product.priceInDZD - b.product.priceInDZD;
          case 'price-high':
            return b.product.priceInDZD - a.product.priceInDZD;
          case 'rating':
            return b.product.rating - a.product.rating;
          case 'newest':
            return parseInt(b.product.id) - parseInt(a.product.id);
          default:
            return 0;
        }
      });
    }
    
    return filtered;
  }, [localProducts, externalProducts, activeFilter, sortBy]);

  return (
    <div className="py-8 md:py-12 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white animate-slideUp">
              {searchQuery ? `البحث: "${searchQuery}"` : selectedCategory ? 'منتجات الفئة' : 'جميع المنتجات'}
            </h2>
            <p className="text-gray-400 text-sm mt-2">متوفر محلياً • للطلب من الخارج</p>
          </div>
          <div className="text-gray-300 bg-gray-500/20 px-3 py-1 rounded-lg border border-gray-500/30 text-sm">
            {totalCount} منتج
          </div>
        </div>

        {/* Enhanced Filter and Sort Controls */}
        <div className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-gray-700/50 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 ${
                  activeFilter === 'all'
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white border border-gray-600/50 hover:border-red-500/30'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>الكل ({totalCount})</span>
              </button>
              <button
                onClick={() => setActiveFilter('local')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 ${
                  activeFilter === 'local'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white border border-gray-600/50 hover:border-green-500/30'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>متوفر محلياً ({localProducts.length})</span>
              </button>
              <button
                onClick={() => setActiveFilter('external')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 ${
                  activeFilter === 'external'
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white border border-gray-600/50 hover:border-red-500/30'
                }`}
              >
                <ExternalLink className="w-4 h-4" />
                <span>للطلب ({externalProducts.length})</span>
              </button>
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-4 bg-gray-800/50 rounded-xl p-3 border border-gray-600/50">
              <span className="text-white text-sm font-medium">ترتيب حسب:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-800 border border-gray-600 rounded-xl px-4 py-2 text-white text-sm font-medium focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 cursor-pointer hover:border-red-400"
              >
                <option value="default" className="bg-gray-800 text-white">الافتراضي</option>
                <option value="price-low" className="bg-gray-800 text-white">💰 السعر: الأقل أولاً</option>
                <option value="price-high" className="bg-gray-800 text-white">💎 السعر: الأعلى أولاً</option>
                <option value="rating" className="bg-gray-800 text-white">⭐ التقييم الأعلى</option>
                <option value="newest" className="bg-gray-800 text-white">🆕 الأحدث</option>
              </select>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
            <div className="text-white text-xl md:text-2xl mb-4">لا توجد منتجات</div>
            <p className="text-gray-300">جرب البحث بكلمات مختلفة أو تصفح الفئات</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 product-grid" data-products-section>
            {filteredProducts.map(({ product, isLocal }, index) => (
              <div
                key={`${isLocal ? 'local' : 'external'}-${product.id}`}
                className="animate-slideUp product-card"
                style={{ animationDelay: `${Math.min(index * 0.05, 1)}s` }}
              >
                <ProductCard
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
      </div>
    </div>
  );
};

export default UnifiedProductsPage;