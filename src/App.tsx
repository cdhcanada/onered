import React, { useState, useRef, lazy, Suspense, useCallback } from 'react';
import { useEffect } from 'react';
import LightweightHeader from './components/LightweightHeader';
import NavigationTabs from './components/NavigationTabs';
import LightweightHomePage from './components/LightweightHomePage';
import OptimizedUnifiedProductsPage from './components/OptimizedUnifiedProductsPage';
import ShoppingCart from './components/ShoppingCart';
import Notification from './components/Notification';
import FloatingContactButton from './components/FloatingContactButton';
import FloatingProductRequestButton from './components/FloatingProductRequestButton';
import { useGoogleSheets } from './hooks/useGoogleSheets';
import { Product } from './data/products';
import { AvailableProduct } from './data/availableProducts';

// Lazy load heavy components
const CheckoutForm = lazy(() => import('./components/CheckoutForm'));
const ProductModal = lazy(() => import('./components/ProductModal'));
const AvailableProductModal = lazy(() => import('./components/AvailableProductModal'));
const ProductRequestModal = lazy(() => import('./components/ProductRequestModal'));
const ContactPage = lazy(() => import('./components/ContactPage'));

// Loading component
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
    <div className="bg-gray-900/95 rounded-lg p-4 text-center border border-red-500/30 mx-4">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500 mx-auto mb-2"></div>
      <p className="text-white text-sm font-bold">جارٍ التحميل...</p>
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
  const [activeTab, setActiveTab] = useState<'home' | 'available' | 'external' | 'request'>('home');
  const [notification, setNotification] = useState({
    message: '',
    type: 'success' as 'success' | 'error' | 'info',
    isVisible: false
  });

  const productsRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  
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

  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({
      message,
      type,
      isVisible: true
    });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  }, []);

  const addToCart = useCallback((product: Product | AvailableProduct, quantity: number = 1) => {
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
  }, [showNotification]);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showNotification('تم حذف المنتج من السلة', 'info');
  }, [showNotification]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setSelectedCategory(undefined);
    
    // Switch to appropriate tab for search results
    if (activeTab === 'home') {
      setActiveTab('available'); // Show search results in unified view
    }
    
    showNotification(`جارٍ البحث عن: ${query}`, 'info');
  }, [showNotification]);

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    
    // Switch to appropriate tab based on category selection
    if (activeTab === 'home') {
      setActiveTab('available'); // Show both local and external products
    }
    
    showNotification(`تم اختيار فئة: ${category}`, 'info');
  }, [showNotification]);

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  }, []);

  const handleAvailableProductClick = useCallback((product: AvailableProduct) => {
    setSelectedAvailableProduct(product);
    setIsAvailableProductModalOpen(true);
  }, []);

  const handleCheckout = useCallback(() => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  }, []);

  const handleOrderSubmit = useCallback(async (orderData: any) => {
    try {
      await submitOrder(orderData);
      setCartItems([]);
      setIsCheckoutOpen(false);
      showNotification('تم إرسال طلبك بنجاح! سنتواصل معك قريباً', 'success');
    } catch (error) {
      showNotification('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى', 'error');
    }
  }, [submitOrder, showNotification]);

  const handleProductRequest = useCallback(async (requestData: any) => {
    try {
      await requestProduct(requestData);
      setIsProductRequestOpen(false);
      showNotification('تم إرسال طلب المنتج بنجاح! سنبحث عنه ونرسل لك السعر خلال 24 ساعة', 'success');
    } catch (error) {
      showNotification('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى', 'error');
    }
  }, [requestProduct, showNotification]);

  const handleTabChange = useCallback((tab: 'home' | 'available' | 'external' | 'request') => {
    setActiveTab(tab);
    setSelectedCategory(undefined);
    setSearchQuery('');
    
    if (tab === 'request') {
      setIsProductRequestOpen(true);
    }
  }, []);

  const handleViewMore = useCallback((type: 'local' | 'external') => {
    setActiveTab('available');
    // Smooth scroll to products section
    setTimeout(() => {
      const element = document.querySelector('[data-products-section]');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, []);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTotalInDZD = cartItems.reduce((sum, item) => sum + item.priceInDZD * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Simplified Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-red-500/5 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-red-600/5 rounded-full blur-2xl" />
      </div>

      <LightweightHeader
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onSearch={handleSearch}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        onContactOpen={() => setIsContactOpen(true)}
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
              <LightweightHomePage
                onCategorySelect={handleCategorySelect}
                onViewMore={handleViewMore}
              />
            )}
            
            {(activeTab === 'available' || activeTab === 'external') && (
              <OptimizedUnifiedProductsPage
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
    </div>
  );
}

export default App;