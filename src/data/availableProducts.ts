export interface AvailableProduct {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  priceInDZD: number;
  originalPrice?: number;
  originalPriceInDZD?: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  category: string;
  description: string;
  descriptionAr: string;
  features: string[];
  featuresAr: string[];
  discount?: number;
  inStock: boolean;
  quantity: number; // الكمية المتوفرة
  location: string; // مكان التوفر
  deliveryTime: string; // توصيل فوري أو خلال ساعات
}

// المنتجات المتوفرة محلياً
export const availableProducts: AvailableProduct[] = [
  {
    id: 'local-1',
    name: 'Wireless Bluetooth Headphones',
    nameAr: 'سماعات Haylou x1s - متوفرة',
    price: 12.00,
    priceInDZD: 3000,
    originalPrice: 18.00,
    originalPriceInDZD: 5000,
    image: '/images/products/haylou-x1s-1.jpg',
    images: [
      '/images/products/haylou-x1s-1.jpg',
      '/images/products/haylou-x1s-2.jpg',
      '/images/products/haylou-x1s-3.jpg'
    ],
    rating: 4.7,
    reviews: 45,
    category: 'electronics',
    description: 'Haylou X1S wireless earbuds with ENC noise reduction and clear calls',
    descriptionAr: 'سماعات Haylou X1S اللاسلكية بميزة تقليل الضوضاء وجودة صوت ممتازة أثناء المكالمات.',
    features: ['ENC Noise Reduction', 'Bluetooth 5.3', 'Long Battery Life', 'Touch Control'],
    featuresAr: ['تقليل الضوضاء ENC', 'بلوتوث 5.3', 'بطارية طويلة', 'تحكم باللمس'],
    discount: 30,
    inStock: true,
    quantity: 2,
    location: 'سطيف',
    deliveryTime: 'توصيل خلال 24 ساعة'
  },
  {
    id: 'local-2',
    name: ' OPK8135 Men  Watch',
    nameAr: ' ساعة - متوفرة  OPK81335',
    price: 13,
    priceInDZD: 3500,
    originalPrice: 20,
    originalPriceInDZD: 6000,
    image: '/images/products/OPK8135-1.jpg',
    images: [
      '/images/products/OPK8135-1.jpg',
      '/images/products/OPK8135-2.jpg',
      '/images/products/OPK8135-3.jpg'
    ],
    rating: 4.5,
    reviews: 32,
    category: 'watch',
    description: 'Luxury OPK8135 watch for men with stainless steel and elegant finish',
    descriptionAr: 'ساعة OPK8135 الرجالية الفاخرة من الستانلس ستيل، مثالية للمناسبات الرسمية واليومية.',
    features: ['Stainless Steel', 'Water Resistant', 'Elegant Finish', 'Durable'],
    featuresAr: ['ستانلس ستيل', 'مقاومة للماء', 'تشطيب أنيق', 'متينة'],
    discount: 20,
    inStock: true,
    quantity: 1,
    location: 'سطيف',
    deliveryTime: 'توصيل خلال 24 ساعة'
  },
  {
    id: 'local-3',
    name: 'Lenovo GM2 Pro',
    nameAr: 'سماعات Lenovo GM2 pro - متوفر',
    price: 10.00,
    priceInDZD: 2200,
    originalPrice: 15.00,
    originalPriceInDZD: 4200,
    image: '/images/products/Lenovo-GM2-1.jpg',
    images: [
      '/images/products/Lenovo-GM2-1.jpg',
      '/images/products/Lenovo-GM2-2.jpg',
      '/images/products/Lenovo-GM2-3.jpg'
    ],
    rating: 4.8,
    reviews: 67,
    category: 'electronics',
    description: 'Lenovo GM2 Pro gaming earbuds with low latency and LED design',
    descriptionAr: 'سماعات الألعاب Lenovo GM2 Pro بتصميم LED وأداء سريع بدون تأخير، مثالية للغيمرز.',
    features: ['Gaming Mode', 'Low Latency', 'LED Lighting', 'Wireless'],
    featuresAr: ['وضع الألعاب', 'زمن استجابة منخفض', 'إضاءة LED', 'لاسلكية'],
    discount: 29,
    inStock: true,
    quantity: 1,
    location: 'سطيف',
    deliveryTime: 'توصيل خلال 24 ساعة'
  },
  {
    id: 'local-4',
    name: 'Men Luxury Watch',
    nameAr: 'ساعة رجالية فاخرة - متوفرة',
    price: 9.99,
    priceInDZD: 3000,
    originalPrice: 16.99,
    originalPriceInDZD: 4800,
    image: '/images/products/Men-WatchLuxury-1.jpg',
    images: [
      '/images/products/Men-WatchLuxury-1.jpg',
      '/images/products/Men-WatchLuxury-2.jpg',
      '/images/products/Men-WatchLuxury-3.jpg'
    ],
    rating: 4.6,
    reviews: 28,
    category: 'watch',
    description: 'Luxury men watch available locally',
    descriptionAr: 'ساعة رجالية فاخرة متوفرة محلياً، تصميم أنيق وجودة عالية مناسبة لجميع المناسبات.',
    features: ['Stainless Steel', 'Water Resistant', 'Elegant Design', 'Local Service'],
    featuresAr: ['ستانلس ستيل', 'مقاوم للماء', 'تصميم أنيق', 'خدمة محلية'],
    discount: 41,
    inStock: true,
    quantity: 1,
    location: 'سطيف',
    deliveryTime: 'توصيل خلال 24 ساعة'
  },
  {
    id: 'local-5',
    name: 'realfit f4',
    nameAr: ' سماعات realfit f4',
    price: 10.50,
    priceInDZD: 2500,
    originalPrice: 11.50,
    originalPriceInDZD: 3200,
    image: '/images/products/Realfit-F4-1.jpg',
    images: [
      '/images/products/Realfit-F4-1.jpg',
      '/images/products/Realfit-F4-2.jpg',
      '/images/products/Realfit-F4-3.jpg'
    ],
    rating: 4.4,
    reviews: 89,
    category: 'electronics',
    description: 'Realfi F4 wireless earbuds with clear sound and long battery life',
    descriptionAr: 'سماعات Realfi F4 اللاسلكية بصوت نقي وعمر بطارية طويل، مثالية للرياضة والاستخدام اليومي.',
    features: ['Wireless', 'Clear Sound', 'Long Battery Life', 'Comfortable Fit'],
    featuresAr: ['لاسلكية', 'صوت نقي', 'عمر بطارية طويل', 'مريحة في الاستخدام'],
    discount: 31,
    inStock: true,
    quantity: 1,
    location: 'سطيف',
    deliveryTime: 'توصيل خلال 24 ساعة'
  },
  {
    id: 'local-6',
    name: 'Men Relogio Masculino Watch',
    nameAr: 'ساعة رجالية فاخرة Relogio Masculino - متوفرة',
    price: 11,
    priceInDZD: 3200,
    originalPrice: 16.99,
    originalPriceInDZD: 4800,
    image: '/images/products/Relogio-Masculino-1.jpg',
    images: [
      '/images/products/Relogio-Masculino-1.jpg',
      '/images/products/Relogio-Masculino-2.jpg',
      '/images/products/Relogio-Masculino-3.jpg'
    ],
    rating: 4.6,
    reviews: 28,
    category: 'watch',
    description: 'Luxury men watch available locally',
    descriptionAr: 'ساعة رجالية فاخرة متوفرة محلياً، تصميم أنيق وجودة عالية مناسبة لجميع المناسبات.',
    features: ['Stainless Steel', 'Water Resistant', 'Elegant Design', 'Local Service'],
    featuresAr: ['ستانلس ستيل', 'مقاوم للماء', 'تصميم أنيق', 'خدمة محلية'],
    discount: 41,
    inStock: true,
    quantity: 0,
    location: 'سطيف',
    deliveryTime: 'توصيل خلال 24 ساعة'
      },
  {
    id: 'local-7',
    name: 'GAMINJA G10S Air Mouse Voice Remote',
    nameAr: ' ريموت GAMINJA G10S الذكي بالتحكم الصوتي والماوس الهوائي',
    price: 10.50,
    priceInDZD: 2500,
    originalPrice: 11.50,
    originalPriceInDZD: 3500,
    image: '/images/products/GAMINJA-G10S-1.jpg',
    images: [
      '/images/products/GAMINJA-G10S-1.jpg',
      '/images/products/GAMINJA-G10S-2.jpg',
      '/images/products/GAMINJA-G10S-3.jpg'
    ],
    rating: 4.4,
    reviews: 89,
    category: 'electronics',
    description: 'GAMINJA G10S Air Mouse with voice control and gyroscope function',
    descriptionAr: 'جهاز تحكم G10S الذكي بخاصية الماوس الهوائي والتحكم الصوتي لتجربة استخدام مريحة وسريعة.',
    features: ['Voice Control', 'Air Mouse', 'Gyroscope Sensor', 'Plug and Play'],
    featuresAr: ['تحكم صوتي', 'ماوس هوائي', 'حساس جيروسكوب', 'تشغيل مباشر بدون إعداد'],
    discount: 31,
    inStock: true,
    quantity: 0,
    location: 'سطيف',
    deliveryTime: 'توصيل خلال 24 ساعة'
  },
  
  {
    id: 'local-8',
    name: 'Tanix Tv Box 2/16',
    nameAr: 'tv box tanix 2/16 - متوفرة',
    price: 20,
    priceInDZD: 5000,
    originalPrice: 25.99,
    originalPriceInDZD: 6500,
    image: '/images/products/tvbox-tanix-1.jpg',
    images: [
      '/images/products/tvbox-tanix-1.jpg',
      '/images/products/tvbox-tanix-2.jpg',
      '/images/products/tvbox-tanix-3.jpg'
    ],
    rating: 4.6,
    reviews: 28,
    category: 'electronics',
    description: 'Tanix TX1 Android TV Box with smooth 4K streaming and fast performance',
    descriptionAr: 'جهاز Tanix TX1 لتحويل التلفاز إلى سمارت، يدعم 4K ويوفر أداءً سريعاً وتجربة ترفيه مميزة.',
    features: ['Android OS', '4K Support', 'High Performance', 'Multiple Ports'],
    featuresAr: ['نظام أندرويد', 'دعم 4K', 'أداء عالي', 'منافذ متعددة'],
    discount: 41,
    inStock: true,
    quantity: 0,
    location: 'سطيف',
    deliveryTime: 'توصيل خلال 24 ساعة'
        },
  {
    id: 'local-9',
    name: 'Kingston Original USB Flash Drive 64GB',
    nameAr: ' فلاشة كينغستون الأصلية 64 جيجابايت',
    price: 5,
    priceInDZD: 1200,
    originalPrice: 6,
    originalPriceInDZD: 1500,
    image: '/images/products/Kingston-USB64-1.jpg',
    images: [
      '/images/products/Kingston-USB64-1.jpg',
      '/images/products/Kingston-USB64-2.jpg',
      '/images/products/Kingston-USB64-3.jpg'
    ],
    rating: 4.4,
    reviews: 89,
    category: 'electronics',
    description: 'Kingston 64GB USB Flash Drive with fast transfer speed and compact design',
    descriptionAr: 'فلاشة Kingston الأصلية بسعة 64 جيجابايت، نقل سريع وتصميم صغير يسهل حمله.',
    features: ['64GB Storage', 'High-Speed Transfer', 'Durable Build', 'Compact Size'],
    featuresAr: ['سعة 64GB', 'نقل بيانات سريع', 'تصميم متين', 'حجم صغير ومريح'],
    discount: 31,
    inStock: true,
    quantity: 0,
    location: 'سطيف',
    deliveryTime: 'توصيل خلال 24 ساعة'
  }
];

// دالة للبحث في المنتجات المتوفرة
export const searchAvailableProducts = (query: string, category?: string): AvailableProduct[] => {
  let filteredProducts = availableProducts;

  if (category) {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }

  if (query) {
    const searchTerm = query.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      product.nameAr.toLowerCase().includes(searchTerm) ||
      product.name.toLowerCase().includes(searchTerm) ||
      product.descriptionAr.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }

  return filteredProducts;
};

// دالة للحصول على المنتجات المتوفرة حسب الفئة
export const getAvailableProductsByCategory = (category: string): AvailableProduct[] => {
  return availableProducts.filter(product => product.category === category);
};

// دالة للحصول على منتج متوفر واحد
export const getAvailableProductById = (id: string): AvailableProduct | undefined => {
  return availableProducts.find(product => product.id === id);
};
