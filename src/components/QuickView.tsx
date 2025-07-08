import React, { useState } from 'react';
import { X, Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '../data/products';

interface QuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const QuickView: React.FC<QuickViewProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onAddToWishlist,
  onViewDetails
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-xl border border-red-500/20 w-full max-w-2xl animate-bounceIn">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-lg font-bold text-white">عرض سريع</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {/* Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.nameAr}
                className="w-full h-64 object-contain bg-white rounded-lg"
              />
              {product.discount && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                  -{product.discount}%
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-bold text-white">{product.nameAr}</h3>
                <p className="text-gray-400 text-sm">{product.name}</p>
              </div>

              <div className="flex items-center space-x-2">
                {renderStars(product.rating)}
                <span className="text-gray-300 text-sm">({product.reviews})</span>
              </div>

              <div className="space-y-1">
                <div className="text-xl font-bold text-red-400">{product.priceInDZD.toLocaleString()} دج</div>
                {product.originalPriceInDZD && (
                  <div className="text-gray-500 line-through text-sm">{product.originalPriceInDZD.toLocaleString()} دج</div>
                )}
              </div>

              <div className="text-gray-400 text-sm">
                المنصة: {getPlatformName(product.platform)}
              </div>

              <div className="text-gray-400 text-sm">
                التوصيل: {product.deliveryTime}
              </div>

              <p className="text-gray-300 text-sm line-clamp-3">{product.descriptionAr}</p>

              {/* Actions */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-700 text-white px-3 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="text-white px-4 py-1 bg-gray-700 rounded">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-700 text-white px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center"
                  >
                    <ShoppingCart className="w-4 h-4 ml-1" />
                    سلة
                  </button>
                  
                  <button
                    onClick={() => {
                      onAddToWishlist(product);
                      onClose();
                    }}
                    className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center"
                  >
                    <Heart className="w-4 h-4 ml-1" />
                    أمنيات
                  </button>
                  
                  <button
                    onClick={() => {
                      onViewDetails(product);
                      onClose();
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 ml-1" />
                    تفاصيل
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;