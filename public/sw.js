// Service Worker لحل مشكلة التخزين المؤقت
const CACHE_NAME = 'red1one-v' + Date.now(); // تغيير اسم الكاش مع كل تحديث
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx'
];

// تثبيت Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
  // فرض التحديث الفوري
  self.skipWaiting();
});

// تفعيل Service Worker الجديد
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // حذف الكاش القديم
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // السيطرة على جميع العملاء فوراً
  self.clients.claim();
});

// استراتيجية Network First للحصول على أحدث المحتوى
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // إذا نجح الطلب، احفظ النسخة الجديدة في الكاش
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseClone);
            });
        }
        return response;
      })
      .catch(() => {
        // إذا فشل الطلب، استخدم النسخة المحفوظة
        return caches.match(event.request);
      })
  );
});