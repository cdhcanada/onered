import React, { useState, memo } from 'react';
import { X, Star, ShoppingCart, ExternalLink, ChevronLeft, ChevronRight, Package, Truck, Shield, Plus, Minus, ZoomIn, Download, Share2, AlertTriangle } from 'lucide-react';
import { Product } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductModal: React.FC<ProductModalProps> = memo(({ product, isOpen, onClose, onAddToCart }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  if (!isOpen || !product) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    setImageLoading(true);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    setImageLoading(true);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/400x400/374151/ffffff?text=Red1One';
    setImageLoading(false);
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = product.images[currentImageIndex];
    link.download = `${product.nameAr}-${currentImageIndex + 1}.jpg`;
    link.click();
  };

  const shareProduct = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.nameAr,
          text: product.descriptionAr,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ رابط المنتج!');
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'aliexpress': return 'علي إكسبريس';
      case 'temu': return 'تيمو';
      case 'shein': return 'شين';
      default: return platform;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'aliexpress': return 'from-red-500 to-red-700';
      case 'temu': return 'from-red-600 to-red-800';
      case 'shein': return 'from-red-400 to-red-600';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-2 md:p-4">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-red-500/30 w-full max-w-6xl max-h-[95vh] overflow-y-auto animate-bounceIn shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className={`px-3 py-1 rounded-xl text-xs font-bold text-white bg-gradient-to-r ${getPlatformColor(product.platform)} shadow-lg`}>
                {getPlatformName(product.platform)}
              </div>
              {product.discount && (
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-xl text-xs font-bold animate-pulse shadow-lg">
                  خصم {product.discount}%
                </div>
              )}
              <button
                onClick={shareProduct}
                className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform bg-gray-800/50 p-2 rounded-xl"
                title="مشاركة المنتج"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform bg-gray-800/50 p-2 rounded-xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6">
            {/* Enhanced Image Gallery */}
            <div className="space-y-3">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-xl bg-gray-800 shadow-xl group">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                  </div>
                )}
                <img
                  src={product.images[currentImageIndex]}
                  alt={`${product.nameAr} - صورة ${currentImageIndex + 1}`}
                  className={`w-full h-64 md:h-96 object-contain bg-white transition-all duration-300 ${
                    isImageZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                  loading="lazy"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  onClick={() => setIsImageZoomed(!isImageZoomed)}
                />
                
                {/* Image Controls */}
                <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setIsImageZoomed(!isImageZoomed)}
                    className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
                    title={isImageZoomed ? 'تصغير' : 'تكبير'}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={downloadImage}
                    className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
                    title="تحميل الصورة"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setImageLoading(true);
                      }}
                      className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                        index === currentImageIndex 
                          ? 'border-red-500 shadow-lg shadow-red-500/30' 
                          : 'border-gray-600 hover:border-red-400'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.nameAr} - مصغرة ${index + 1}`}
                        className="w-full h-16 md:h-20 object-cover"
                        loading="lazy"
                      />
                      {index === currentImageIndex && (
                        <div className="absolute inset-0 bg-red-500/20"></div>
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
                <span className="text-gray-300">({product.reviews} تقييم)</span>
                <span className="text-yellow-400 font-bold">{product.rating}</span>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl md:text-3xl font-bold text-red-400">{product.priceInDZD.toLocaleString()} دج</span>
                  <span className="text-lg text-gray-400">(${product.price})</span>
                </div>
                {product.originalPriceInDZD && (
                  <div className="flex items-center space-x-3">
                    <span className="text-lg text-gray-500 line-through">{product.originalPriceInDZD.toLocaleString()} دج</span>
                    <span className="text-sm text-gray-500 line-through">(${product.originalPrice})</span>
                    <span className="text-green-400 text-sm font-bold">
                      وفر {((product.originalPriceInDZD! - product.priceInDZD) / product.originalPriceInDZD! * 100).toFixed(0)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-sm font-medium ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                  {product.inStock ? 'متوفر في المخزون' : 'غير متوفر حالياً'}
                </span>
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
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors duration-200 hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-3 text-gray-300">
                  المجموع: <span className="text-red-400 font-bold text-xl">{(product.priceInDZD * quantity).toLocaleString()} دج</span>
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
                      <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-xl p-4 border border-red-500/30">
                <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-lg p-3 mb-4">
                  <div className="flex items-center text-yellow-400 text-sm">
                    <AlertTriangle className="w-4 h-4 ml-2" />
                    <span className="font-semibold">تنبيه مهم:</span>
                  </div>
                  <p className="text-yellow-300 text-sm mt-1">
                    الأسعار قابلة للتغيير حسب تقلبات السوق العالمي. سيتم تأكيد السعر النهائي عند تأكيد الطلب.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-gray-300 text-sm">
                    <Truck className="w-5 h-5 text-red-400" />
                    <span>مدة التوصيل: {product.deliveryTime}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300 text-sm">
                    <Package className="w-5 h-5 text-red-400" />
                    <span>التوصيل مجاني لجميع الولايات</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300 text-sm">
                    <Shield className="w-5 h-5 text-yellow-400" />
                    <span>دفع مقدماً مطلوب للمنتجات الخارجية</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full py-4 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-xl ${
                    product.inStock
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:shadow-red-500/40'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5 ml-1" />
                  <span>{product.inStock ? `إضافة ${quantity} للسلة` : 'غير متوفر'}</span>
                </button>
                
                <button
                  onClick={() => window.open(product.productUrl, '_blank')}
                  className="w-full bg-transparent border-2 border-red-500 text-red-500 py-3 px-4 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="w-5 h-5 ml-1" />
                  <span>عرض في {getPlatformName(product.platform)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProductModal.displayName = 'ProductModal';

export default ProductModal;