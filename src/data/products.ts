export interface Product {
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
  platform: 'aliexpress' | 'temu' | 'shein';
  description: string;
  descriptionAr: string;
  features: string[];
  featuresAr: string[];
  discount?: number;
  deliveryTime: string;
  inStock: boolean;
  productUrl: string;
}

// سعر صرف الدولار مقابل الدينار الجزائري (تقريبي)
const USD_TO_DZD = 260;

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    nameAr: 'سماعات Haylou X1S',
    price: 15.00,
    priceInDZD: Math.round(10.00 * USD_TO_DZD + 500),
    originalPrice: 10.00,
    originalPriceInDZD: Math.round(20.00 * USD_TO_DZD + 500),
    image: '/images/products/haylou-x1s-1.jpg',
    images: [
      '/images/products/haylou-x1s-1.jpg',
      '/images/products/haylou-x1s-2.jpg',
      '/images/products/haylou-x1s-3.jpg'
    ],
    rating: 4.5,
    reviews: 234,
    category: 'electronics',
    platform: 'aliexpress',
    description: 'Haylou X1S wireless earbuds with ENC noise reduction and clear calls',
    descriptionAr: 'سماعات Haylou X1S اللاسلكية بميزة تقليل الضوضاء وجودة صوت ممتازة أثناء المكالمات.',
    features: ['ENC Noise Reduction', 'Bluetooth 5.3', 'Long Battery Life', 'Touch Control'],
    featuresAr: ['تقليل الضوضاء ENC', 'بلوتوث 5.3', 'بطارية طويلة', 'تحكم باللمس'],
    discount: 43,
    deliveryTime: '10-18 أيام',
    inStock: true,
    productUrl: 'https://www.aliexpress.com/item/1005006036311349.html'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    nameAr: 'ساعة ذكية رياضية H9 PRO',
    price: 10.50,
    priceInDZD: Math.round(8.99 * USD_TO_DZD + 500),
    originalPrice: 15.99,
    originalPriceInDZD: Math.round(15.99 * USD_TO_DZD + 500),
    image: '/images/products/h9pro-1.jpg',
    images: [
      '/images/products/h9pro-1.jpg',
      '/images/products/h9pro-2.jpg'
    ],
    rating: 4.8,
    reviews: 156,
    category: 'electronics',
    platform: 'aliexpress',
    description: 'H9 Pro Smartwatch with health tracking, notifications, and a sleek modern design',
    descriptionAr: 'ساعة H9 Pro الذكية لمتابعة الحالة الصحية، عرض الإشعارات، وتصميم عصري أنيق.',
    features: ['Heart Rate Monitor', 'Blood Pressure', 'Notifications Sync', 'Modern Design'],
    featuresAr: ['مراقبة نبضات القلب', 'قياس ضغط الدم', 'مزامنة الإشعارات', 'تصميم عصري'],
    discount: 61,
    deliveryTime: '12-18 أيام',
    inStock: true,
    productUrl: 'https://www.aliexpress.com/item/1005006733306257.html'
  },
  {
    id: '3',
    name: 'Trendy Fashion Jacket',
    nameAr: 'جاكيت أنيق عصري',
    price: 28.99,
    priceInDZD: Math.round(22.99 * USD_TO_DZD+ 500),
    originalPrice: 65.00,
    originalPriceInDZD: Math.round(65.00 * USD_TO_DZD),
    image: '/images/products/jacket-1.jpg',
    images: [
      '/images/products/jacket-1.jpg',
      '/images/products/jacket-2.jpg',
      '/images/products/jacket-3.jpg'
    ],
    rating: 4.2,
    reviews: 89,
    category: 'clothing',
    platform: 'shein',
    description: 'Trendy Fashion Jacket with a modern look and comfortable fit, perfect for all seasons',
    descriptionAr: 'جاكيت موضة عصري بتصميم أنيق ومريح، مثالي لجميع الفصول والإطلالات اليومية.',
    features: ['Modern Style', 'Comfortable Fit', 'Durable Material', 'All-Season Wear'],
    featuresAr: ['تصميم عصري', 'مقاس مريح', 'خامة متينة', 'مناسب لجميع الفصول'],
    discount: 55,
    deliveryTime: '14-18 أيام',
    inStock: true,
    productUrl: 'https://www.shein.com/Manfinity-Homme-Men-s-Solid-Color-Zip-Up-Casual-Jacket-Men-s-Black-Jacket-Men-s-Techwear-Jacket-p-68727431.html?src_identifier=st%3D5%60sc%3DJacket%20Man%60sr%3D0%60ps%3D2&src_module=search&src_tab_page_id=page_search1751831588512&mallCode=1&pageListType=4&imgRatio=3-4&pageListType=4'
  },
  {
    id: '4',
    name: 'Attack Shark X11',
    nameAr: 'افضل ماوسات الالعاب Attack Shark X11',
    price: 15.75,
    priceInDZD: Math.round(15.75 * USD_TO_DZD+ 500),
    image: '/images/products/Attack-Shark-X11-1.jpg',
    images: [
      '/images/products/Attack-Shark-X11-1.jpg',
      '/images/products/Attack-Shark-X11-2.jpg',
      '/images/products/Attack-Shark-X11-3.jpg'
    ],
    rating: 4.6,
    reviews: 324,
    category: 'gaming',
    platform: 'aliexpress',
    description: 'Professional gaming mouse with RGB lighting',
    descriptionAr: 'ماوس ألعاب احترافي مع إضاءة RGB ملونة ودقة عالية للاعبين المحترفين.',
    features: ['RGB Lighting', 'High DPI', 'Ergonomic Design', 'Gaming Grade'],
    featuresAr: ['إضاءة RGB', 'دقة عالية', 'تصميم مريح', 'درجة الألعاب'],
    deliveryTime: '10-15 أيام',
    inStock: true,
    productUrl: 'https://www.aliexpress.com/item/1005007987814586.html?spm=a2g0o.productlist.main.1.2905f0a8f0a89Z&algo_pvid=6abaad15-9b02-4ffd-910b-b405542932ee&algo_exp_id=6abaad15-9b02-4ffd-910b-b405542932ee-38&pdp_ext_f=%7B%22order%22%3A%2242172%22%2C%22eval%22%3A%221%22%2C%22orig_sl_item_id%22%3A%221005007987814586%22%2C%22orig_item_id%22%3A%221005008191631824%22%7D&pdp_npi=4%40dis%21DZD%218616.28%214308.14%21%21%21434.10%21217.05%21%40211b61a417518273050533145e6b43%2112000043169600184%21sea%21DZ%214141867265%21X&curPageLogUid=tpRIQ4d9YWwK&utparam-url=scene%3Asearch%7Cquery_from%3A'
  },
  {
    id: '5',
    name: 'Smart Coffee Maker',
    nameAr: 'آلة صنع القهوة ',
    price: 78.99,
    priceInDZD: Math.round(78.99 * USD_TO_DZD+ 500),
    originalPrice: 160.99,
    originalPriceInDZD: Math.round(160.99 * USD_TO_DZD),
    image: '/images/products/coffee-maker-1.jpg',
    images: [
      '/images/products/coffee-maker-1.jpg',
      '/images/products/coffee-maker-2.jpg',
      '/images/products/coffee-maker-3.jpg'
    ],
    rating: 4.4,
    reviews: 67,
    category: 'home',
    platform: 'temu',
    description: 'Smart Coffee Maker with programmable features and fast brewing for a perfect cup every time',
    descriptionAr: 'آلة تحضير القهوة الذكية بميزات قابلة للبرمجة وتخمير سريع لتحضير قهوتك المثالية في كل مرة.',
    features: ['Programmable Settings', 'Fast Brewing', 'Auto Shut-Off', 'Modern Design'],
    featuresAr: ['إعدادات قابلة للبرمجة', 'تخمير سريع', 'إيقاف تلقائي', 'تصميم عصري'],
    discount: 49,
    deliveryTime: '12-17 أيام',
    inStock: true,
    productUrl: 'https://temu.com/item/example5'
  },
  {
    id: '6',
    name: 'Trendy Sneakers',
    nameAr: 'أحذية رياضية عصرية',
    price: 18.50,
    priceInDZD: Math.round(18.50 * USD_TO_DZD+ 500),
    originalPrice: 30.00,
    originalPriceInDZD: Math.round(30.00 * USD_TO_DZD),
    image: '/images/products/sneakers-1.jpg',
    images: [
      '/images/products/sneakers-1.jpg',
      '/images/products/sneakers-2.jpg',
      '/images/products/sneakers-3.jpg'
    ],
    rating: 4.7,
    reviews: 445,
    category: 'clothing',
    platform: 'temu',
    description: 'Comfortable and stylish sneakers for daily wear',
    descriptionAr: 'أحذية رياضية مريحة وأنيقة للاستخدام اليومي، مصنوعة من مواد عالية الجودة.',
    features: ['Comfortable Sole', 'Breathable Material', 'Multiple Colors', 'Durable'],
    featuresAr: ['نعل مريح', 'مادة قابلة للتنفس', 'ألوان متعددة', 'متين'],
    discount: 57,
    deliveryTime: '14-18 أيام',
    inStock: true,
    productUrl: 'https://www.temu.com/dz/%D8%A3%D8%AD%D8%B0%D9%8A%D8%A9-%D8%AA%D8%B2%D9%84%D8%AC-%D8%B9%D8%B5%D8%B1%D9%8A%D8%A9-%D9%84%D9%84%D8%B1%D8%AC%D8%A7%D9%84-%D8%A3%D8%AD%D8%B0%D9%8A%D8%A9-%D9%85%D9%86%D8%AE%D9%81%D8%B6%D8%A9-%D8%A8%D8%B1%D8%A8%D8%A7%D8%B7-%D9%85%D9%86%D8%B5%D8%A9-%D8%A3%D9%86%D8%B4%D8%B7%D8%A9-%D8%AE%D8%A7%D8%B1%D8%AC%D9%8A%D8%A9-%D9%84%D8%AC%D9%85%D9%8A%D8%B9--g-601099590819287.html?_oak_mp_inf=ENe717ym1ogBGiA4MjEzZjkyMzMyNDc0NDMzYmMzMDU5MzJjMTczN2UwMCCx0cCJ%2FjI%3D&top_gallery_url=https%3A%2F%2Fimg.kwcdn.com%2Fproduct%2Ffancy%2F7f77b893-0529-45e8-a6e0-e6984a4ecc7b.jpg&spec_gallery_id=601099590819287&refer_page_sn=10009&refer_source=0&freesia_scene=2&_oak_freesia_scene=2&_oak_rec_ext_1=MTA4Nw&_oak_gallery_order=1606965310%2C1462119813%2C847949611%2C1032626717%2C1281811288&search_key=%D8%A7%D8%AE%D8%B0%D9%8A%D8%A9%20%D8%B1%D9%8A%D8%A7%D8%B6%D9%8A%D8%A9%20%D8%B9%D8%B5%D8%B1%D9%8A%D8%A9&refer_page_el_sn=200049&_x_ns_irclickid=3wGS262%3AQxycRA8UqVSVCQ5vUksWsMTmx2YdQk0&_x_ads_account=18350&_x_ads_id=1580294&_x_ns_iradname=Online%20Tracking%20Link&_x_ns_iradsize=&_x_ns_prodsku=&_x_ns_irmptype=mediapartner&_x_ns_sharedid=&_x_ns_ts=1747065780910&_x_ns_randint=6520784&_x_ns_adtype=ONLINE_TRACKING_LINK&_x_ns_irmpgroupname=%22aj%22&_x_ads_channel=impact&_x_ns_mp_value2=&_x_ns_mp_value3=&_x_ns_irmpname=Soicos%20International%20AG&_x_ns_irpid=417979&_x_vst_scene=adg&_x_sessn_id=yd4jfb0373&refer_page_name=search_result&refer_page_id=10009_1751829718598_w6mhjulqpe'
  },
  // إضافة منتجات جديدة لتوسيع الكتالوج
  {
    id: '7',
    name: 'Men Watch',
    nameAr: 'ساعة رجالية انيقة ',
    price: 12.99,
    priceInDZD: Math.round(10.99 * USD_TO_DZD+ 500),
    originalPrice: 25.99,
    originalPriceInDZD: Math.round(25.99 * USD_TO_DZD),
    image: '/images/products/Men-WatchLuxury-1.jpg',
    images: ['/images/products/Men-WatchLuxury-1.jpg',
            '/images/products/Men-WatchLuxury-2.jpg',
             '/images/products/Men-WatchLuxury-3.jpg'
            ],
    rating: 4.8,
    reviews: 189,
    category: 'watch',
    platform: 'aliexpress',
    description: 'Luxury Night Glow :The luxury night glow feature of this watch adds a touch of elegance and functionality, allowing you to clearly',
    descriptionAr: 'ساعة انيقة و عصرية حديثة للرجال بتصميم رائع .',
    features: ['Quartz Movement', 'Water Resistance', 'Anti-magnetic', 'Stainless Steel Band'],
    featuresAr: ['راحة في اليد', 'مقوامة الماء', 'فخامة', 'تصميم حديث'],
    discount: 50,
    deliveryTime: '10-16 أيام',
    inStock: true,
    productUrl: 'https://aliexpress.com/item/wireless-charger'
  },
  {
    id: '8',
    name: 'Realfit F4 ',
    nameAr: 'Realfit F4 سماعة بلوتوث ',
    price: 7.50,
    priceInDZD: Math.round(7.50 * USD_TO_DZD+500),
    image: '/images/products/Realfit-F4-1.jpg',
    images: ['/images/products/Realfit-F4-1.jpg',
            '/images/products/Realfit-F4-2.jpg',
             '/images/products/Realfit-F4-3.jpg'
            ],
    rating: 4.6,
    reviews: 278,
    category: 'electronics',
    platform: 'aliexpress',
    description: 'Realfi F4 wireless earbuds with clear sound and long battery life',
    descriptionAr: 'سماعات Realfi F4 اللاسلكية بصوت نقي وعمر بطارية طويل، مثالية للرياضة والاستخدام اليومي.',
    features: ['Wireless', 'Clear Sound', 'Long Battery Life', 'Comfortable Fit'],
    featuresAr: ['لاسلكية', 'صوت نقي', 'عمر بطارية طويل', 'مريحة في الاستخدام'],
    deliveryTime: '11-17 أيام',
    inStock: true,
    productUrl: 'https://temu.com/item/led-lamp'
  },
  {
    id: '9',
    name: 'Summer Dress',
    nameAr: 'فستان صيفي أنيق',
    price: 22.99,
    priceInDZD: Math.round(22.99 * USD_TO_DZD+ 500),
    originalPrice: 45.99,
    originalPriceInDZD: Math.round(45.99 * USD_TO_DZD),
    image: '/images/products/BAE-Women-Summer-1.jpg',
    images: ['/images/products/BAE-Women-Summer-1.jpg',
            '/images/products/BAE-Women-Summer-2.jpg',
            '/images/products/BAE-Women-Summer-3.jpg'
            ],
    rating: 5,
    reviews: 156,
    category: 'clothing',
    platform: 'shein',
    description: 'Elegant summer dress for casual and formal occasions',
    descriptionAr: 'فستان صيفي أنيق مناسب للمناسبات الرسمية والعادية، مصنوع من قماش مريح وخفيف.',
    features: ['Lightweight Fabric', 'Multiple Sizes', 'Easy Care', 'Versatile Style'],
    featuresAr: ['قماش خفيف', 'مقاسات متعددة', 'سهل العناية', 'تصميم متنوع'],
    discount: 50,
    deliveryTime: '13-19 أيام',
    inStock: true,
    productUrl: 'https://www.shein.com/SHEIN-BAE-Women-Summer-Asymmetric-Ruched-Tight-Fit-Printed-Dress-Beach-Resort-Dress-Long-Dress-Summer-Women-Dresses-Beach-Women-Dresses-Club-Dress-Petite-Dress-Graduation-Outfit-Dresses-For-Women-Summer-Dresses-For-Women-Vestidos-Elegantes-Para-Fiesta-Elegant-Dresses-For-Women-Vacation-Dress-p-32777157.html?_t=1751830612682&imgRatio=3-4&mallCode=1&pageListType=4&pageListType=4&src_identifier=st%3D2%60sc%3D%D9%81%D8%B3%D8%AA%D8%A7%D9%86%20%D8%B5%D9%8A%D9%81%D9%8A%20%D8%A7%D9%86%D9%8A%D9%82%60sr%3D0%60ps%3D1&src_module=search&src_tab_page_id=page_home1751830394618'
  },
  {
    id: '10',
    name: 'Lenovo GM2 pro',
    nameAr: 'سماعة بلوتوث Lenovo GM2 pro',
    price: 10.99,
    priceInDZD: Math.round(6.99 * USD_TO_DZD+ 500),
    image: '/images/products/Lenovo-GM2-1.jpg',
    images: ['/images/products/Lenovo-GM2-1.jpg',
             '/images/products/Lenovo-GM2-2.jpg',
             '/images/products/Lenovo-GM2-3.jpg'
            ],
    rating: 4.5,
    reviews: 312,
    category: 'electronics',
    platform: 'aliexpress',
    description: 'Lenovo GM2 Pro gaming earbuds with low latency and LED design',
    descriptionAr: 'سماعات الألعاب Lenovo GM2 Pro بتصميم LED وأداء سريع بدون تأخير، مثالية للغيمرز.',
    features: ['Gaming Mode', 'Low Latency', 'LED Lighting', 'Wireless'],
    featuresAr: ['وضع الألعاب', 'زمن استجابة منخفض', 'إضاءة LED', 'لاسلكية'],
    deliveryTime: '9-15 أيام',
    inStock: true,
    productUrl: 'https://www.aliexpress.com/item/1005007250464550.html?spm=a2g0o.order_list.order_list_main.10.6bc71802Yyr5c7'
  }
];

// دالة للبحث في المنتجات
export const searchProducts = (query: string, category?: string): Product[] => {
  let filteredProducts = sampleProducts;

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

// دالة للحصول على منتجات حسب الفئة
export const getProductsByCategory = (category: string): Product[] => {
  return sampleProducts.filter(product => product.category === category);
};

// دالة للحصول على المنتجات المميزة
export const getFeaturedProducts = (): Product[] => {
  return sampleProducts.filter(product => product.discount && product.discount > 40);
};

// دالة للحصول على منتج واحد
export const getProductById = (id: string): Product | undefined => {
  return sampleProducts.find(product => product.id === id);
};
