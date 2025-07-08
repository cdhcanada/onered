import React from 'react';
import { MessageCircle, Instagram, Phone, MapPin, Clock, Mail, X } from 'lucide-react';

interface ContactPageProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/213699217021?text=مرحباً، أريد الاستفسار عن منتجاتكم', '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://instagram.com/1red.one1', '_blank');
  };

  const handlePhoneClick = () => {
    window.open('tel:+213699217021', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-red-500/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-bounceIn shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <MessageCircle className="w-7 h-7 ml-2 text-red-500" />
              تواصل معنا
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform bg-gray-800/50 p-2 rounded-xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Welcome Message */}
            <div className="text-center bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-xl p-6 border border-red-500/30">
              <h3 className="text-xl font-bold text-white mb-2">مرحباً بك في Red1One</h3>
              <p className="text-gray-300">نحن هنا لخدمتك على مدار الساعة. تواصل معنا عبر الطرق التالية:</p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* WhatsApp */}
              <button
                onClick={handleWhatsAppClick}
                className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 hover:border-green-500/70 rounded-xl p-6 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <h4 className="text-white font-bold text-lg">واتساب</h4>
                    <p className="text-green-400 font-mono text-sm">+213 699 217 021</p>
                    <p className="text-gray-400 text-xs">الطريقة الأسرع للتواصل</p>
                  </div>
                </div>
              </button>

              {/* Instagram */}
              <button
                onClick={handleInstagramClick}
                className="bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/50 hover:border-pink-500/70 rounded-xl p-6 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <h4 className="text-white font-bold text-lg">إنستغرام</h4>
                    <p className="text-pink-400 font-mono text-sm">@1red.one1</p>
                    <p className="text-gray-400 text-xs">تابعنا للعروض الحصرية</p>
                  </div>
                </div>
              </button>

              {/* Phone */}
              <button
                onClick={handlePhoneClick}
                className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 hover:border-blue-500/70 rounded-xl p-6 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <h4 className="text-white font-bold text-lg">اتصال مباشر</h4>
                    <p className="text-blue-400 font-mono text-sm">+213 699 217 021</p>
                    <p className="text-gray-400 text-xs">للاستفسارات العاجلة</p>
                  </div>
                </div>
              </button>

              {/* Location */}
              <div className="bg-gray-500/20 border border-gray-500/50 rounded-xl p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-500 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <h4 className="text-white font-bold text-lg">الموقع</h4>
                    <p className="text-gray-300 text-sm">سطيف، الجزائر</p>
                    <p className="text-gray-400 text-xs">نخدم جميع الولايات</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h4 className="text-white font-bold text-lg mb-4 flex items-center">
                <Clock className="w-5 h-5 ml-2 text-yellow-400" />
                ساعات العمل
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                <div>
                  <p className="font-semibold">السبت - الخميس</p>
                  <p className="text-sm text-gray-400">9:00 ص - 10:00 م</p>
                </div>
                <div>
                  <p className="font-semibold">الجمعة</p>
                  <p className="text-sm text-gray-400">2:00 م - 10:00 م</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                <p className="text-green-400 text-sm font-semibold">📱 واتساب متاح 24/7</p>
              </div>
            </div>

            {/* Services */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h4 className="text-white font-bold text-lg mb-4">خدماتنا</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 text-gray-300">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm">طلب منتجات من الخارج</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">منتجات متوفرة محلياً</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">توصيل مجاني</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">دفع عند الاستلام</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleWhatsAppClick}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5 ml-1" />
                <span>تواصل عبر واتساب</span>
              </button>
              
              <button
                onClick={handleInstagramClick}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-xl font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Instagram className="w-5 h-5 ml-1" />
                <span>تابعنا على إنستغرام</span>
              </button>
            </div>

            {/* Footer Message */}
            <div className="text-center text-gray-400 text-sm">
              <p>نحن نقدر تواصلكم معنا ونسعى لتقديم أفضل خدمة ممكنة</p>
              <p className="mt-1">🛍️ Red1One - أفضل منصة للتسوق الإلكتروني 🛍️</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;