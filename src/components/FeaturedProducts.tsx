import React, { useState, memo } from 'react';
import { Star, ShoppingCart, Store, ExternalLink, AlertTriangle, Package, ArrowLeft } from 'lucide-react';
import { sampleProducts, Product, getFeaturedProducts } from '../data/products';
import { availableProducts, AvailableProduct } from '../data/availableProducts';

interface FeaturedProductsProps {
  onProductClick: (product: Product) => void;
  onAvailableProductClick: (product: AvailableProduct) => void;
  onAddToCart: (product: Product | AvailableProduct) => void;
  onViewMore: (type: 'local' | 'external') => void;
}

const ProductCard = memo(({ 
  product, 
  isLocal, 
  onProductClick, 
  onAvailableProductClick, 
  onAddToCart 
}: {
  product: Product | AvailableProduct;
  isLocal: boolean;
  onProductClick: (product: Product) => void;
  onAvailableProductClick: (product: AvailableProduct) => void;
  onAddToCart: (product: Product | AvailableProduct) => void;
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
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
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

  return (
    <div
      onClick={handleClick}
      className={`bg-gray-900/60 backdrop-blur-xl rounded-xl overflow-hidden border transition-all duration-300 transform hover:scale-105 hover:shadow-lg group cursor-pointer ${
        isLocal 
          ? 'border-green-500/50 hover:border-green-400/80 hover:shadow-green-500/20' 
          : 'border-gray-700/50 hover:border-red-500/60 hover:shadow-red-500/20'
      } ${isOutOfStock ? 'opacity-75' : ''}`}
    >
      <div className="relative overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10">
            <div className={`animate-spin rounded-full h-6 w-6 border-b-2 ${
              isLocal ? 'border-green-500' : 'border-red-500'
            }`}></div>
          </div>
        )}
        <img
          src={imageError ? 'https://via.placeholder.com/400x400/374151/ffffff?text=Red1One' : product.image}
          alt={product.nameAr}
          className="w-full h-40 md:h-48 object-contain bg-white group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
              نفدت الكمية
            </div>
          </div>
        )}
        
        <div className={`absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-bold text-white shadow-lg ${
          isLocal 
            ? 'bg-gradient-to-r from-green-500 to-green-700 animate-pulse' 
            : 'bg-gradient-to-r from-red-500 to-red-700'
        }`}>
          {isLocal ? (
            <div className="flex items-center">
              <Store className="w-3 h-3 ml-1" />
              متوفر محلياً
            </div>
          ) : (
            'مميز'
          )}
        </div>
        
        {product.discount && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold animate-pulse shadow-lg">
            -{product.discount}%
          </div>
        )}
      </div>
      
      <div className="p-3 md:p-4">
        <h3 className={`font-bold text-sm md:text-base mb-1 transition-colors duration-300 line-clamp-2 ${
          isLocal ? 'text-white group-hover:text-green-400' : 'text-white group-hover:text-red-400'
        }`}>
          {product.nameAr}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-gray-400 text-xs mr-1">({product.reviews})</span>
        </div>
        
        <div className="space-y-1 mb-3">
          <div className="flex items-center space-x-1">
            <span className={`font-bold text-sm md:text-base ${
              isLocal ? 'text-green-400' : 'text-red-400'
            }`}>
              {product.priceInDZD.toLocaleString()} دج
            </span>
            <span className="text-gray-500 text-xs">(${product.price})</span>
          </div>
          {product.originalPriceInDZD && (
            <span className="text-gray-500 line-through text-xs">{product.originalPriceInDZD.toLocaleString()} دج</span>
          )}
        </div>

        {!isLocal && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-2 mb-3">
            <div className="flex items-center text-yellow-400 text-xs">
              <AlertTriangle className="w-3 h-3 ml-1" />
              <span>الأسعار قابلة للتغيير</span>
            </div>
          </div>
        )}
        
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-2 px-3 rounded-lg font-bold transition-all duration-300 transform flex items-center justify-center space-x-1 shadow-lg text-xs md:text-sm ${
            isOutOfStock
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : isLocal
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:scale-105 hover:shadow-green-500/30'
                : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:scale-105 hover:shadow-red-500/30'
          }`}
        >
          <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 ml-1" />
          <span>{isOutOfStock ? 'نفدت الكمية' : 'إضافة للسلة'}</span>
        </button>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  onProductClick, 
  onAvailableProductClick, 
  onAddToCart,
  onViewMore
}) => {
  // Get featured products (with high discounts)
  const featuredExternal = getFeaturedProducts().slice(0, 4);
  const featuredLocal = availableProducts.filter(p => p.discount && p.discount > 20).slice(0, 4);

  return (
    <div className="py-8 md:py-12 relative z-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 animate-slideUp">
          المنتجات المميزة
        </h2>

        {/* Featured Local Products */}
        {featuredLocal.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Store className="w-6 h-6 ml-2 text-green-500" />
                متوفر محلياً - عروض خاصة
              </h3>
              <button
                onClick={() => onViewMore('local')}
                className="text-green-400 hover:text-green-300 transition-colors duration-200 flex items-center text-sm font-medium group"
              >
                <span>عرض الكل</span>
                <ArrowLeft className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {featuredLocal.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-slideUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard
                    product={product}
                    isLocal={true}
                    onProductClick={onProductClick}
                    onAvailableProductClick={onAvailableProductClick}
                    onAddToCart={onAddToCart}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured External Products */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <ExternalLink className="w-6 h-6 ml-2 text-red-500" />
              عروض مميزة من الخارج
            </h3>
            <button
              onClick={() => onViewMore('external')}
              className="text-red-400 hover:text-red-300 transition-colors duration-200 flex items-center text-sm font-medium group"
            >
              <span>عرض الكل</span>
              <ArrowLeft className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredExternal.map((product, index) => (
              <div
                key={product.id}
                className="animate-slideUp"
                style={{ animationDelay: `${(index + featuredLocal.length) * 0.1}s` }}
              >
                <ProductCard
                  product={product}
                  isLocal={false}
                  onProductClick={onProductClick}
                  onAvailableProductClick={onAvailableProductClick}
                  onAddToCart={onAddToCart}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access Buttons */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <button
            onClick={() => onViewMore('local')}
            className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/40 hover:border-green-400/60 text-white py-6 px-8 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/20 group"
          >
            <div className="flex items-center justify-center space-x-3">
              <Store className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-right">
                <div className="text-lg font-bold">المنتجات المتوفرة محلياً</div>
                <div className="text-sm text-gray-300">توصيل سريع خلال 24-48 ساعة</div>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => onViewMore('external')}
            className="bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/40 hover:border-red-400/60 text-white py-6 px-8 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/20 group"
          >
            <div className="flex items-center justify-center space-x-3">
              <ExternalLink className="w-8 h-8 text-red-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-right">
                <div className="text-lg font-bold">المنتجات للطلب من الخارج</div>
                <div className="text-sm text-gray-300">AliExpress • Temu • SHEIN</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;