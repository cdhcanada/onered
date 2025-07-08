import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, Instagram, X } from 'lucide-react';

interface FloatingContactButtonProps {
  onContactOpen: () => void;
}

const FloatingContactButton: React.FC<FloatingContactButtonProps> = ({ onContactOpen }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/213699217021?text=مرحباً، أريد الاستفسار عن منتجاتكم', '_blank');
  };

  const handlePhoneClick = () => {
    window.open('tel:+213699217021', '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://instagram.com/1red.one1', '_blank');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 transition-all duration-300">
      {/* Expanded Menu */}
      <div className={`absolute bottom-16 left-0 space-y-3 transition-all duration-300 ${
        isExpanded ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {/* WhatsApp */}
        <button
          onClick={handleWhatsAppClick}
          className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 group"
        >
          <MessageCircle className="w-5 h-5 ml-2" />
          <span className="text-sm font-medium">واتساب</span>
          <div className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            تواصل سريع عبر واتساب
          </div>
        </button>

        {/* Phone */}
        <button
          onClick={handlePhoneClick}
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 group"
        >
          <Phone className="w-5 h-5 ml-2" />
          <span className="text-sm font-medium">اتصال</span>
          <div className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            اتصال مباشر
          </div>
        </button>

        {/* Instagram */}
        <button
          onClick={handleInstagramClick}
          className="flex items-center bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 group"
        >
          <Instagram className="w-5 h-5 ml-2" />
          <span className="text-sm font-medium">إنستغرام</span>
          <div className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            تابعنا على إنستغرام
          </div>
        </button>

        {/* Contact Page */}
        <button
          onClick={onContactOpen}
          className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 group"
        >
          <MessageCircle className="w-5 h-5 ml-2" />
          <span className="text-sm font-medium">تواصل معنا</span>
          <div className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            جميع طرق التواصل
          </div>
        </button>
      </div>

      {/* Main Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
          isExpanded ? 'rotate-45' : 'animate-bounce'
        }`}
        style={{ animationDelay: '2s' }}
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
        
        {/* Pulse Animation */}
        {!isExpanded && (
          <>
            <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20"></div>
            <div className="absolute inset-0 rounded-full bg-red-500 animate-pulse opacity-30"></div>
          </>
        )}
      </button>

      {/* Notification Badge */}
      {!isExpanded && (
        <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
          !
        </div>
      )}
    </div>
  );
};

export default FloatingContactButton;