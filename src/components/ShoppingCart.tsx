import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  priceInDZD: number;
  image: string;
  quantity: number;
  platform: string;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const totalInDZD = items.reduce((sum, item) => sum + item.priceInDZD * item.quantity, 0);

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'aliexpress': return 'علي إكسبريس';
      case 'temu': return 'تيمو';
      case 'shein': return 'شين';
      default: return platform;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900/95 backdrop-blur-lg border-l border-red-500/20 animate-slideInRight">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white flex items-center">
              <ShoppingBag className="w-6 h-6 ml-2" />
              سلة التسوق
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
                <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>سلة التسوق فارغة</p>
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
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-sm">{item.nameAr}</h3>
                        <p className="text-gray-400 text-xs">{item.name}</p>
                        <p className="text-gray-400 text-xs">{getPlatformName(item.platform)}</p>
                        <div className="space-y-1">
                          <p className="text-red-400 font-bold text-sm">{item.priceInDZD.toLocaleString()} دج</p>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-700 hover:bg-gray-600 text-white p-1 rounded transition-colors duration-200"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-white px-3 py-1 bg-gray-700 rounded">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-700 hover:bg-gray-600 text-white p-1 rounded transition-colors duration-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <span className="text-white font-bold text-sm">{(item.priceInDZD * item.quantity).toLocaleString()} دج</span>
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
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-white">المجموع:</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-red-400">{totalInDZD.toLocaleString()} دج</span>
                </div>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105"
              >
                إتمام الشراء
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;