import React, { memo, useState, useCallback } from 'react';
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

  const isOutOfStock = isLocal && product.quantity === 0;

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

  return (
    <div
      onClick={handleClick}
      className={`bg-gray-900/60 rounded-xl overflow-hidden border transition-transform duration-200 hover:scale-[1.02] cursor-pointer ${
        isLocal 
          ? 'border-green-500/40 hover:border-green-400/60' 
          : 'border-gray-700/40 hover:border-red-500/40'
      } ${isOutOfStock ? 'opacity-75' : ''}`}
    >
      <div className="relative">
        {!imageLoaded && (
          <div className="w-full h-32 bg-gray-800 flex items-center justify-center">
            <div className={`animate-spin rounded-full h-4 w-4 border-b-2 ${
              isLocal ? 'border-green-500' : 'border-red-500'
            }`}></div>
          </div>
        )}
        <img
          src={imageError ? '/images/placeholder.jpg' : product.image}
          alt={product.nameAr}
          className={`w-full h-32 object-contain bg-white ${imageLoaded ? 'block' : 'hidden'}`}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              نفدت الكمية
            </div>
          </div>
        )}
        
        <div className={`absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-bold text-white ${
          isLocal 
            ? 'bg-green-500/90' 
            : 'bg-red-500/90'
        }`}>
          {isLocal ? (
            <div className="flex items-center">
              <Store className="w-3 h-3 ml-1" />
              متوفر
            </div>
          ) : (
            'للطلب'
          )}
        </div>
        
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
            -{product.discount}%
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-bold text-sm mb-1 text-white line-clamp-2">
          {product.nameAr}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-gray-500 text-xs mr-1">({product.reviews})</span>
        </div>
        
        <div className="mb-3">
          <div className="flex items-center space-x-1">
            <span className={`font-bold text-sm ${
              isLocal ? 'text-green-400' : 'text-red-400'
            }`}>
              {product.priceInDZD.toLocaleString()} دج
            </span>
          </div>
          {product.originalPriceInDZD && (
            <span className="text-gray-500 line-through text-xs">{product.originalPriceInDZD.toLocaleString()} دج</span>
          )}
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-2 px-3 rounded-lg font-bold transition-colors duration-200 flex items-center justify-center space-x-1 text-xs ${
            isOutOfStock
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : isLocal
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          <ShoppingCart className="w-3 h-3 ml-1" />
          <span>{isOutOfStock ? 'نفدت الكمية' : 'إضافة للسلة'}</span>
        </button>
      </div>
    </div>
  );
});

OptimizedProductCard.displayName = 'OptimizedProductCard';

export default OptimizedProductCard;