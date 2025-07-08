import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Store } from 'lucide-react';
import SearchSuggestions from './SearchSuggestions';
import { Product } from '../data/products';
import { AvailableProduct } from '../data/availableProducts';

interface HeaderProps {
  cartCount: number;
  onSearch: (query: string) => void;
  onCartToggle: () => void;
  onProductRequest: () => void;
  onContactOpen: () => void;
  onProductClick?: (product: Product | AvailableProduct) => void;
  onLogoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  onSearch, 
  onCartToggle, 
  onProductRequest, 
  onContactOpen, 
  onProductClick,
  onLogoClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchQuery('');
      setIsMenuOpen(false);
      setShowSuggestions(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0 || true);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleProductSelect = (product: Product) => {
    setShowSuggestions(false);
    onProductClick?.(product);
  };

  const handleAvailableProductSelect = (product: AvailableProduct) => {
    setShowSuggestions(false);
    onProductClick?.(product);
  };

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      // Scroll to top as fallback
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-red-500/40 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={handleLogoClick}
          >
            {/* Red1One Text Logo - نص فقط بدون خلفية */}
            <div className="relative group-hover:scale-105 transition-transform duration-300">
              <div className="flex items-center">
                <span className="text-red-500 font-black text-2xl md:text-3xl tracking-tight">RED</span>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center mx-1">
                  <span className="text-red-500 font-black text-lg md:text-xl">1</span>
                </div>
                <span className="text-gray-300 font-bold text-2xl md:text-3xl tracking-tight">ONE</span>
              </div>
              {/* تأثير الإضاءة عند الـ hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-gray-300 hidden md:block group-hover:text-red-300 transition-colors duration-300">أفضل منصة للتسوق</span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <form onSubmit={handleSearch} className="relative w-full group">
                <input
                  type="text"
                  placeholder="ابحث عن منتجاتك المفضلة..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 300)}
                  className="w-full bg-gray-900/80 border border-red-500/50 rounded-2xl px-6 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-4 focus:ring-red-500/30 transition-all duration-300 group-hover:border-red-400 shadow-lg"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400 hover:text-red-300 transition-colors duration-200 hover:scale-110"
                >
                  <Search className="w-6 h-6" />
                </button>
              </form>
              
              <SearchSuggestions
                query={searchQuery}
                onSelectSuggestion={handleSuggestionSelect}
                onSelectProduct={handleProductSelect}
                onSelectAvailableProduct={handleAvailableProductSelect}
                isVisible={showSuggestions}
              />
            </div>
          </div>

          {/* Desktop Cart */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onCartToggle}
              className="relative text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 transform bg-gray-800/60 p-3 rounded-xl border border-gray-700 hover:border-red-500/60 shadow-lg group"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-bounce shadow-lg font-bold">
                  {cartCount}
                </span>
              )}
              <div className="absolute inset-0 bg-red-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Mobile Search with Suggestions */}
          <div className="md:hidden flex items-center space-x-3">
            <div className="relative">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="بحث..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 300)}
                  className="w-32 bg-gray-900/80 border border-red-500/50 rounded-xl px-3 py-2 pr-8 text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/30 text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-400"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
              
              {/* Mobile Search Suggestions */}
              {showSuggestions && (
                <div className="absolute top-full right-0 w-80 max-w-[90vw] z-50">
                  <SearchSuggestions
                    query={searchQuery}
                    onSelectSuggestion={handleSuggestionSelect}
                    onSelectProduct={handleProductSelect}
                    onSelectAvailableProduct={handleAvailableProductSelect}
                    isVisible={showSuggestions}
                  />
                </div>
              )}
            </div>

            {/* Mobile Cart */}
            <button
              onClick={onCartToggle}
              className="relative text-gray-300 hover:text-white transition-all duration-300 bg-gray-800/60 p-2 rounded-xl border border-gray-700 hover:border-red-500/60"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce shadow-lg font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white bg-gray-800/60 p-2 rounded-xl border border-gray-700 hover:border-red-500/60 transition-all duration-300"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Only for additional options */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/98 border-t border-red-500/40 animate-slideDown backdrop-blur-xl shadow-2xl">
            <div className="px-4 py-4 space-y-3">
              <button
                onClick={() => {
                  onContactOpen();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 text-sm"
              >
                تواصل معنا
              </button>
              <p className="text-gray-400 text-xs text-center">Red1One - أفضل منصة للتسوق الإلكتروني</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;