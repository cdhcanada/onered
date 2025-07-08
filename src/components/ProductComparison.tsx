import React, { useState } from 'react';
import { X, Star, ExternalLink, Plus, Minus } from 'lucide-react';
import { Product } from '../data/products';

interface ProductComparisonProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveProduct: (productId: string) => void;
}

const ProductComparison: React.FC<ProductComparisonProps> = ({
  products,
  isOpen,
  onClose,
  onRemoveProduct
}) => {
  if (!isOpen || products.length === 0) return null;

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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-red-500/30 w-full max-w-7xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">مقارنة المنتجات</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Comparison Table */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 relative">
                  <button
                    onClick={() => onRemoveProduct(product.id)}
                    className="absolute top-2 right-2 text-red-400 hover:text-red-300 transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Product Image */}
                  <div className="mb-4">
                    <img
                      src={product.image}
                      alt={product.nameAr}
                      className="w-full h-48 object-contain bg-white rounded-lg"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <h3 className="text-white font-bold text-lg">{product.nameAr}</h3>
                    
                    <div className="flex items-center space-x-2">
                      {renderStars(product.rating)}
                      <span className="text-gray-300 text-sm">({product.reviews})</span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-red-400 font-bold text-xl">{product.priceInDZD.toLocaleString()} دج</div>
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

                    <button
                      onClick={() => window.open(product.productUrl, '_blank')}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4 ml-1" />
                      <span>عرض المنتج</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;