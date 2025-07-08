import React, { useEffect, useState } from 'react';
import { RefreshCw, Download } from 'lucide-react';

const CacheManager: React.FC = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showLater, setShowLater] = useState(false);

  useEffect(() => {
    // التحقق من إخفاء التحديث مؤقتاً
    const hiddenUntil = localStorage.getItem('hideUpdateUntil');
    if (hiddenUntil && Date.now() < parseInt(hiddenUntil)) {
      setShowLater(true);
      return;
    }

    // التحقق من وجود تحديثات
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setUpdateAvailable(true);
        setShowLater(false);
      });

      // التحقق من التحديثات كل 30 ثانية
      const checkForUpdates = () => {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(registration => {
            registration.update();
          });
        });
      };

      const interval = setInterval(checkForUpdates, 30000);
      return () => clearInterval(interval);
    }
  }, []);

  const handleUpdate = async () => {
    setIsUpdating(true);
    
    try {
      // مسح الكاش
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }

      // إعادة تحميل الصفحة
      window.location.reload();
    } catch (error) {
      console.error('Error updating cache:', error);
      setIsUpdating(false);
    }
  };

  const clearCache = async () => {
    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }
      
      // مسح localStorage
      localStorage.clear();
      
      // مسح sessionStorage
      sessionStorage.clear();
      
      alert('تم مسح البيانات المؤقتة بنجاح!');
      window.location.reload();
    } catch (error) {
      console.error('Error clearing cache:', error);
      alert('حدث خطأ أثناء مسح البيانات المؤقتة');
    }
  };

  const handleLater = () => {
    // إخفاء التحديث لمدة ساعة واحدة
    const hideUntil = Date.now() + (60 * 60 * 1000); // ساعة واحدة
    localStorage.setItem('hideUpdateUntil', hideUntil.toString());
    setUpdateAvailable(false);
    setShowLater(true);
  };

  // إظهار التحديث مرة أخرى عند تحديث الصفحة إذا انتهت المدة
  useEffect(() => {
    const handlePageRefresh = () => {
      const hiddenUntil = localStorage.getItem('hideUpdateUntil');
      if (hiddenUntil && Date.now() >= parseInt(hiddenUntil)) {
        localStorage.removeItem('hideUpdateUntil');
        setShowLater(false);
        // التحقق من وجود تحديثات مرة أخرى
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(registration => {
              registration.update();
            });
          });
        }
      }
    };

    window.addEventListener('beforeunload', handlePageRefresh);
    return () => window.removeEventListener('beforeunload', handlePageRefresh);
  }, []);

  if (!updateAvailable || showLater) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-xl shadow-2xl border border-red-400 animate-bounce">
        <div className="flex items-center space-x-3 mb-3">
          <Download className="w-5 h-5" />
          <span className="font-bold">تحديث متاح!</span>
        </div>
        <p className="text-sm mb-3">يتوفر إصدار جديد من الموقع</p>
        <div className="flex space-x-2">
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-1 disabled:opacity-50"
          >
            {isUpdating ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            <span>{isUpdating ? 'جارٍ التحديث...' : 'تحديث'}</span>
          </button>
          <button
            onClick={handleLater}
            className="bg-transparent border border-white text-white px-4 py-2 rounded-lg font-bold hover:bg-white/10 transition-colors duration-200"
          >
            لاحقاً
          </button>
        </div>
      </div>
    </div>
  );
};

export default CacheManager;