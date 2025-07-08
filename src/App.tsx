import React, { useState, useRef, lazy, Suspense } from 'react';
import { useEffect } from 'react';
import Header from './components/Header';
import FloatingParticles from './components/FloatingParticles';
import NavigationTabs from './components/NavigationTabs';
import HomePage from './components/HomePage';
import UnifiedProductsPage from './components/UnifiedProductsPage';
import ShoppingCart from './components/ShoppingCart';
import Notification from './components/Notification';
import CacheManager from './components/CacheManager';
import FloatingContactButton from './components/FloatingContactButton';
import FloatingProductRequestButton from './components/FloatingProductRequestButton';
import { useGoogleSheets } from './hooks/useGoogleSheets';
import { Product } from './data/products';
import { AvailableProduct } from './data/availableProducts';
import { Package } from 'lucide-react';

// Lazy load heavy components
const CheckoutForm = lazy(() => import('./components/CheckoutForm'));
const ProductModal = lazy(() => import('./components/ProductModal'));
const AvailableProductModal = lazy(() => import('./components/AvailableProductModal'));
const ProductRequestModal = lazy(() => import('./components/ProductRequestModal'));
const ContactPage = lazy(() => import('./components/ContactPage'));

// Loading component
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-gray-900/95 rounded-xl p-4 md:p-6 text-center border border-red-500/30 mx-4">
      <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 md:border-b-4 border-red-500 mx-auto mb-2 md:mb-4"></div>
      <p className="text-white text-sm md:text-lg font-bold">جارٍ التحميل...</p>
    </div>
  </div>
);

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

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isAvailableProductModalOpen, setIsAvailableProductModalOpen] = useState(false);
  const [isProductRequestOpen, setIsProductRequestOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedAvailableProduct, setSelectedAvailableProduct] = useState<AvailableProduct | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'available' | 'external' | 'request'>('home');
  const [notification, setNotification] = useState({
    message: '',
    type: 'success' as 'success' | 'error' | 'info',
    isVisible: false
  });

  const productsRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { submitOrder, requestProduct, loading } = useGoogleSheets();

  const scrollToProducts = () => {
    if (activeTab === 'home') {
      productsRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToHome = () => {
    setActiveTab('home');
    setSelectedCategory(undefined);
    setSearchQuery('');
    setTimeout(() => {
      homeRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({
      message,
      type,
      isVisible: true
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const addToCart = (product: Product | AvailableProduct, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { 
        ...product, 
        quantity,
        platform: 'platform' in product ? product.platform : 'local'
      }];
    });
    showNotification(`تم إضافة ${quantity} من ${product.nameAr} إلى السلة`, 'success');
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showNotification('تم حذف المنتج من السلة', 'info');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory(undefined);
    
    // Switch to appropriate tab for search results
    if (activeTab === 'home') {
      setActiveTab('available'); // Show search results in unified view
    }
    
    showNotification(`جارٍ البحث عن: ${query}`, 'info');
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    
    // Switch to appropriate tab based on category selection
    if (activeTab === 'home') {
      setActiveTab('available'); // Show both local and external products
    }
    
    showNotification(`تم اختيار فئة: ${category}`, 'info');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleAvailableProductClick = (product: AvailableProduct) => {
    setSelectedAvailableProduct(product);
    setIsAvailableProductModalOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSubmit = async (orderData: any) => {
    try {
      await submitOrder(orderData);
      setCartItems([]);
      setIsCheckoutOpen(false);
      showNotification('تم إرسال طلبك بنجاح! سنتواصل معك قريباً', 'success');
    } catch (error) {
      showNotification('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى', 'error');
    }
  };

  const handleProductRequest = async (requestData: any) => {
    try {
      await requestProduct(requestData);
      setIsProductRequestOpen(false);
      showNotification('تم إرسال طلب المنتج بنجاح! سنبحث عنه ونرسل لك السعر خلال 24 ساعة', 'success');
    } catch (error) {
      showNotification('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى', 'error');
    }
  };

  const handleTabChange = (tab: 'home' | 'available' | 'external' | 'request') => {
    setActiveTab(tab);
    setSelectedCategory(undefined);
    setSearchQuery('');
    
    if (tab === 'request') {
      setIsProductRequestOpen(true);
    }
  };

  const handleViewMore = (type: 'local' | 'external') => {
    setActiveTab('available');
    // Smooth scroll to products section
    setTimeout(() => {
      const element = document.querySelector('[data-products-section]');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTotalInDZD = cartItems.reduce((sum, item) => sum + item.priceInDZD * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Optimized Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-600/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-red-500/5 to-transparent rounded-full blur-3xl animate-spin" style={{ animationDuration: '60s' }} />
      </div>

      <FloatingParticles />

      <Header
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onSearch={handleSearch}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        onProductRequest={() => setIsProductRequestOpen(true)}
        onContactOpen={() => setIsContactOpen(true)}
        onProductClick={(product) => {
          if ('quantity' in product) {
            handleAvailableProductClick(product as AvailableProduct);
          } else {
            handleProductClick(product as Product);
          }
        }}
        onLogoClick={scrollToHome}
      />

      <NavigationTabs 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <main className="pt-20">
        <div ref={homeRef}>
          <div ref={productsRef}>
            {activeTab === 'home' && (
              <HomePage
                onCategorySelect={handleCategorySelect}
                onProductClick={handleProductClick}
                onAvailableProductClick={handleAvailableProductClick}
                onAddToCart={addToCart}
                onViewMore={handleViewMore}
              />
            )}
            
            {(activeTab === 'available' || activeTab === 'external') && (
              <UnifiedProductsPage
                onAddToCart={addToCart}
                onProductClick={handleProductClick}
                onAvailableProductClick={handleAvailableProductClick}
                selectedCategory={selectedCategory}
                searchQuery={searchQuery}
              />
            )}
          </div>
        </div>
      </main>

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      <Suspense fallback={<LoadingSpinner />}>
        {isCheckoutOpen && (
          <CheckoutForm
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            onSubmit={handleOrderSubmit}
            total={cartTotal}
            totalInDZD={cartTotalInDZD}
            items={cartItems}
          />
        )}

        {isProductModalOpen && (
          <ProductModal
            product={selectedProduct}
            isOpen={isProductModalOpen}
            onClose={() => {
              setIsProductModalOpen(false);
              setSelectedProduct(null);
            }}
            onAddToCart={addToCart}
          />
        )}

        {isAvailableProductModalOpen && (
          <AvailableProductModal
            product={selectedAvailableProduct}
            isOpen={isAvailableProductModalOpen}
            onClose={() => {
              setIsAvailableProductModalOpen(false);
              setSelectedAvailableProduct(null);
            }}
            onAddToCart={addToCart}
          />
        )}

        {isProductRequestOpen && (
          <ProductRequestModal
            isOpen={isProductRequestOpen}
            onClose={() => setIsProductRequestOpen(false)}
            onSubmit={handleProductRequest}
          />
        )}

        {isContactOpen && (
          <ContactPage
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
          />
        )}
      </Suspense>

      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />

      {/* Loading Overlay */}
      {loading && <LoadingSpinner />}

      {/* Floating Contact Button */}
      <FloatingContactButton onContactOpen={() => setIsContactOpen(true)} />

      {/* Floating Product Request Button */}
      <FloatingProductRequestButton onProductRequest={() => setIsProductRequestOpen(true)} />

      {/* Cache Manager */}
      <CacheManager />
    </div>
  );
}

export default App;