import React, { useState } from 'react';
import { X, Package, ExternalLink, User, MapPin, Phone, Mail } from 'lucide-react';
import { algerianStates } from '../data/algerianStates';

interface ProductRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (requestData: any) => void;
}

const ProductRequestModal: React.FC<ProductRequestModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    productName: '',
    productUrl: '',
    productDescription: '',
    name: '',
    email: '',
    phone: '',
    state: '',
    address: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requestData = {
      ...formData,
      requestDate: new Date().toISOString(),
      requestId: Date.now().toString(),
      type: 'product_request'
    };
    onSubmit(requestData);
    setFormData({
      productName: '',
      productUrl: '',
      productDescription: '',
      name: '',
      email: '',
      phone: '',
      state: '',
      address: '',
      notes: ''
    });
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
              <Package className="w-7 h-7 ml-2" />
              طلب منتج غير موجود
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Product Information */}
            <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Package className="w-5 h-5 ml-2" />
                معلومات المنتج
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    اسم المنتج
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    placeholder="أدخل اسم المنتج المطلوب"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    <ExternalLink className="w-4 h-4 inline ml-1" />
                    رابط المنتج
                  </label>
                  <input
                    type="url"
                    name="productUrl"
                    value={formData.productUrl}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    placeholder="https://aliexpress.com/item/... أو https://temu.com/... أو https://shein.com/..."
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    وصف المنتج (اختياري)
                  </label>
                  <textarea
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    placeholder="اكتب وصف مختصر للمنتج أو أي تفاصيل إضافية..."
                  />
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <User className="w-5 h-5 ml-2" />
                معلوماتك الشخصية
              </h3>
              
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

              <div className="mt-4">
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

              <div className="mt-4">
                <label className="block text-white text-sm font-medium mb-2">
                  ملاحظات إضافية
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  placeholder="أي ملاحظات أو تفاصيل إضافية..."
                />
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-400 font-semibold mb-2">معلومات مهمة:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• سنقوم بالبحث عن المنتج وإرسال السعر النهائي خلال 24 ساعة</li>
                <li>• مدة التوصيل من 10 إلى 18 يوم عمل</li>
                <li>• التوصيل مجاني لجميع الولايات الجزائرية</li>
                <li>• الدفع عند الاستلام</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105"
            >
              إرسال طلب المنتج
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductRequestModal;