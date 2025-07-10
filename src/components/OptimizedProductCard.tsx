import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import { Star, ShoppingCart, Store, ExternalLink, Package } from 'lucide-react';

interface OptimizedProductCardProps {
  product: any;
  isLocal: boolean;
  onAddToCart: (product: any) => void;
  onProductClick: (product: any) => void;
  onAvailableProductClick: (product: any) => void;
}

const OptimizedProductCard = memo(({ 
  product, 
  isLocal, 
  onAddToCart, 
  onProductClick, 
  onAvailableProductClick 
}: OptimizedProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const isOutOfStock = isLocal && product.quantity === 0;

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  const handleClick = useCallback(() => {
    if (isLocal) {
      onAvailableProductClick(product);
    } else {
      onProductClick(product);
    }
  }, [isLocal, product, onAvailableProductClick, onProductClick]);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOutOfStock) {
      onAddToCart(product);
    }
  }, [isOutOfStock, onAddToCart, product]);

  const renderStars = useCallback((rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-500'}`}
      />
    ));
  }, []);

  // Create optimized image URL with quality and format parameters
  const getOptimizedImageUrl = (url: string) => {
    if (url.includes('via.placeholder.com')) return url;
    
    // For external images, add optimization parameters
    if (url.startsWith('http')) {
      return `${url}?w=300&h=300&q=75&f=webp`;
    }
    
    return url;
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className={`group bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-2xl ${
        isLocal 
          ? 'border-green-500/30 hover:border-green-400/60 hover:shadow-green-500/20' 
          : 'border-red-500/30 hover:border-red-500/60 hover:shadow-red-500/20'
      } ${isOutOfStock ? 'opacity-75' : ''}`}
    >
      {/* Image Container with Enhanced Loading */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50">
        {/* Loading Skeleton */}
        {!imageLoaded && isVisible && (
          <div className="w-full h-40 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
          </div>
        )}
        
        {/* Actual Image */}
        {isVisible && (
          <img
            src={imageError ? 'https://via.placeholder.com/400x400/374151/ffffff?text=Red1One' : getOptimizedImageUrl(product.image)}
            alt={product.nameAr}
            className={`w-full h-40 object-contain transition-all duration-500 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } group-hover:scale-105`}
            loading="lazy"
            decoding="async"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
        
        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-red-500/90 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              نفدت الكمية
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-sm transition-all duration-300 ${
          isLocal 
            ? 'bg-green-500/90 group-hover:bg-green-400/90' 
            : 'bg-red-500/90 group-hover:bg-red-400/90'
        }`}>
          {isLocal ? (
            <div className="flex items-center space-x-1">
              <Store className="w-3 h-3" />
              <span>متوفر</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <ExternalLink className="w-3 h-3" />
              <span>للطلب</span>
            </div>
          )}
        </div>
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-bounce">
            -{product.discount}%
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-bold text-sm text-white line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
          {product.nameAr}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-gray-400 text-xs">({product.reviews})</span>
        </div>
        
        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className={`font-bold text-lg ${
              isLocal ? 'text-green-400' : 'text-red-400'
            } group-hover:scale-105 transition-transform duration-300`}>
              {product.priceInDZD.toLocaleString()} دج
            </span>
            {product.originalPriceInDZD && (
              <span className="text-gray-500 line-through text-xs">
                {product.originalPriceInDZD.toLocaleString()} دج
              </span>
            )}
          </div>
          
          {/* Savings */}
          {product.originalPriceInDZD && (
            <div className="text-green-400 text-xs font-medium">
              وفر {((product.originalPriceInDZD - product.priceInDZD) / product.originalPriceInDZD * 100).toFixed(0)}%
            </div>
          )}
        </div>
        
        {/* Local Product Info */}
        {isLocal && (
          <div className="text-xs text-gray-400 space-y-1">
            <div className="flex items-center space-x-1">
              <Package className="w-3 h-3" />
              <span>الكمية: {product.quantity}</span>
            </div>
            <div>{product.deliveryTime}</div>
          </div>
        )}
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-sm shadow-lg ${
            isOutOfStock
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : isLocal
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-green-500/40'
                : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:shadow-red-500/40'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{isOutOfStock ? 'نفدت الكمية' : 'إضافة للسلة'}</span>
        </button>
      </div>
    </div>
  );
});

OptimizedProductCard.displayName = 'OptimizedProductCard';

export default OptimizedProductCard;