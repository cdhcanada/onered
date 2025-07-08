import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Product } from '../data/products';

interface WishListProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemoveItem: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

const WishList: React.FC<WishListProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onAddToCart,
  onProductClick
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900/95 backdrop-blur-lg border-l border-red-500/20 animate-slideInRight">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Heart className="w-6 h-6 ml-2 text-red-500" />
              قائمة الأمنيات
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>قائمة الأمنيات فارغة</p>
                <p className="text-sm mt-2">أضف منتجاتك المفضلة هنا</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-red-500/30 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.nameAr}
                        className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                        onClick={() => onProductClick(item)}
                      />
                      <div className="flex-1">
                        <h3 
                          className="text-white font-semibold text-sm cursor-pointer hover:text-red-400 transition-colors"
                          onClick={() => onProductClick(item)}
                        >
                          {item.nameAr}
                        </h3>
                        <p className="text-gray-400 text-xs">{item.name}</p>
                        <div className="space-y-1">
                          <p className="text-red-400 font-bold text-sm">{item.priceInDZD.toLocaleString()} دج</p>
                          {item.originalPriceInDZD && (
                            <p className="text-gray-500 line-through text-xs">{item.originalPriceInDZD.toLocaleString()} دج</p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => onAddToCart(item)}
                          className="text-green-400 hover:text-green-300 transition-colors duration-200 p-1"
                          title="إضافة للسلة"
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200 p-1"
                          title="حذف من الأمنيات"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-700 p-4">
              <div className="text-center text-gray-300 mb-4">
                {items.length} منتج في قائمة الأمنيات
              </div>
              <button
                onClick={() => {
                  items.forEach(item => onAddToCart(item));
                  onClose();
                }}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105"
              >
                إضافة الكل للسلة
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishList;