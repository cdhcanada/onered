import React, { useState, memo } from 'react';
import { X, Star, ShoppingCart, MapPin, Clock, Package, Plus, Minus, Shield } from 'lucide-react';
import { AvailableProduct } from '../data/availableProducts';

interface AvailableProductModalProps {
  product: AvailableProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: AvailableProduct, quantity: number) => void;
}

const AvailableProductModal: React.FC<AvailableProductModalProps> = memo(({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageLoading, setImageLoading] = useState(true);

  if (!isOpen || !product) return null;

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/400x400/374151/ffffff?text=Red1One';
    setImageLoading(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const maxQuantity = Math.min(product.quantity, 10); // حد أقصى 10 قطع أو الكمية المتوفرة

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-2 md:p-4">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-green-500/30 w-full max-w-4xl max-h-[95vh] overflow-y-auto animate-bounceIn shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="px-3 py-1 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-green-500 to-green-700 shadow-lg animate-pulse">
                متوفر محلياً
              </div>
              {product.discount && (
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-xl text-xs font-bold shadow-lg">
                  خصم {product.discount}%
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform bg-gray-800/50 p-2 rounded-xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6">
            {/* Image Gallery */}
            <div className="space-y-3">
              <div className="relative overflow-hidden rounded-xl bg-gray-800 shadow-xl">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                  </div>
                )}
                <img
                  src={product.images[currentImageIndex]}
                  alt={`${product.nameAr} - صورة ${currentImageIndex + 1}`}
                  className="w-full h-64 md:h-96 object-contain bg-white"
                  loading="lazy"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
                
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setImageLoading(true);
                      }}
                      className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                        index === currentImageIndex 
                          ? 'border-green-500 shadow-lg shadow-green-500/30' 
                          : 'border-gray-600 hover:border-green-400'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.nameAr} - مصغرة ${index + 1}`}
                        className="w-full h-16 md:h-20 object-cover"
                        loading="lazy"
                      />
                      {index === currentImageIndex && (
                        <div className="absolute inset-0 bg-green-500/20"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{product.nameAr}</h1>
                <p className="text-gray-300 text-lg">{product.name}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-300">({product.reviews} تقييم محلي)</span>
                <span className="text-yellow-400 font-bold">{product.rating}</span>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl md:text-3xl font-bold text-green-400">{product.priceInDZD.toLocaleString()} دج</span>
                  <span className="text-lg text-gray-400">(${product.price})</span>
                </div>
                {product.originalPriceInDZD && (
                  <div className="flex items-center space-x-3">
                    <span className="text-lg text-gray-500 line-through">{product.originalPriceInDZD.toLocaleString()} دج</span>
                    <span className="text-green-400 text-sm font-bold">
                      وفر {((product.originalPriceInDZD! - product.priceInDZD) / product.originalPriceInDZD! * 100).toFixed(0)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Availability Info */}
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-green-400">
                    <Package className="w-5 h-5" />
                    <span className="font-bold">متوفر: {product.quantity} قطعة</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <span>الموقع: {product.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    <span>{product.deliveryTime}</span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-3">الكمية</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors duration-200 hover:scale-105"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-white text-xl font-bold px-6 py-2 bg-gray-700 rounded-lg min-w-[80px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                    className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors duration-200 hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-3 text-gray-300">
                  المجموع: <span className="text-green-400 font-bold text-xl">{(product.priceInDZD * quantity).toLocaleString()} دج</span>
                </div>
                <div className="mt-1 text-gray-500 text-sm">
                  الحد الأقصى: {maxQuantity} قطعة
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-3">الوصف</h3>
                <p className="text-gray-300 leading-relaxed text-sm">{product.descriptionAr}</p>
              </div>

              {/* Features */}
              <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-3">المميزات</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.featuresAr.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-300 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Local Benefits */}
              <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl p-4 border border-green-500/30">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-gray-300 text-sm">
                    <Clock className="w-5 h-5 text-green-400" />
                    <span>توصيل سريع: {product.deliveryTime}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300 text-sm">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span>ضمان محلي وخدمة ما بعد البيع</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300 text-sm">
                    <Package className="w-5 h-5 text-green-400" />
                    <span>جودة مضمونة ومختبرة مسبقاً</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || product.quantity === 0}
                className={`w-full py-4 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-xl ${
                  product.inStock && product.quantity > 0
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-green-500/40'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5 ml-1" />
                <span>
                  {product.inStock && product.quantity > 0 
                    ? `إضافة ${quantity} للسلة` 
                    : 'غير متوفر'
                  }
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

AvailableProductModal.displayName = 'AvailableProductModal';

export default AvailableProductModal;