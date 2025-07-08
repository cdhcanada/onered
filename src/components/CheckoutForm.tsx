import React, { useState } from 'react';
import { X, User, MapPin, Phone, Mail, CreditCard } from 'lucide-react';
import { algerianStates } from '../data/algerianStates';

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (orderData: any) => void;
  total: number;
  totalInDZD: number;
  items: any[];
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  total, 
  totalInDZD, 
  items 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = {
      ...formData,
      items,
      total,
      totalInDZD,
      orderDate: new Date().toISOString(),
      orderId: Date.now().toString(),
      type: 'order'
    };
    onSubmit(orderData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-gray-900/95 backdrop-blur-lg rounded-xl border border-red-500/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-bounceIn">
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <CreditCard className="w-7 h-7 ml-2" />
              إتمام الطلب
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  <User className="w-4 h-4 inline ml-1" />
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  <Mail className="w-4 h-4 inline ml-1" />
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  <Phone className="w-4 h-4 inline ml-1" />
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  placeholder="أدخل رقم هاتفك"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  <MapPin className="w-4 h-4 inline ml-1" />
                  الولاية
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                >
                  <option value="">اختر الولاية</option>
                  {algerianStates.map((state) => (
                    <option key={state} value={state} className="bg-gray-800">
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                <MapPin className="w-4 h-4 inline ml-1" />
                العنوان الكامل
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                placeholder="أدخل عنوانك الكامل"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                ملاحظات إضافية
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                placeholder="أي ملاحظات خاصة بطلبك..."
              />
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
              <h3 className="text-white font-bold text-lg mb-2">ملخص الطلب</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-300">{item.nameAr} × {item.quantity}</span>
                    <div className="text-right">
                      <div className="text-white">{(item.priceInDZD * item.quantity).toLocaleString()} دج</div>
                    </div>
                  </div>
                ))}
                <div className="border-t border-gray-600 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-white">المجموع:</span>
                    <div className="text-right">
                      <div className="text-red-400">{totalInDZD.toLocaleString()} دج</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-400 font-semibold mb-2">معلومات التوصيل:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• التوصيل مجاني لجميع الولايات الجزائرية</li>
                <li>• مدة التوصيل تختلف حسب نوع المنتج:</li>
                <li className="mr-4">- المنتجات المحلية: 24-48 ساعة</li>
                <li className="mr-4">- المنتجات الخارجية: 10-18 يوم</li>
                <li>• طريقة الدفع تختلف حسب المنتج</li>
                <li>• ضمان الجودة والاستبدال</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105"
            >
              تأكيد الطلب
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;