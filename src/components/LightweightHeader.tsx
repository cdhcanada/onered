import React, { useState, memo } from 'react';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';

interface LightweightHeaderProps {
  cartCount: number;
  onSearch: (query: string) => void;
  onCartToggle: () => void;
  onContactOpen: () => void;
  onLogoClick?: () => void;
}

const LightweightHeader = memo(({ 
  cartCount, 
  onSearch, 
  onCartToggle, 
  onContactOpen,
  onLogoClick
}: LightweightHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-red-500/40">
      <div className="container mx-auto px-3">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={handleLogoClick}
          >
            <div className="flex items-center">
              <span className="text-red-500 font-black text-xl">RED</span>
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mx-1">
                <span className="text-red-500 font-black text-sm">1</span>
              </div>
              <span className="text-gray-300 font-bold text-xl">ONE</span>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="ابحث..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900/80 border border-red-500/50 rounded-xl px-4 py-2 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-red-400 text-sm"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search */}
            <div className="md:hidden">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="بحث..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-24 bg-gray-900/80 border border-red-500/50 rounded-lg px-2 py-1 pr-6 text-white placeholder-gray-400 focus:outline-none text-xs"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-red-400"
                >
                  <Search className="w-3 h-3" />
                </button>
              </form>
            </div>

            {/* Cart */}
            <button
              onClick={onCartToggle}
              className="relative text-gray-300 hover:text-white bg-gray-800/60 p-2 rounded-lg border border-gray-700"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white bg-gray-800/60 p-2 rounded-lg border border-gray-700"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/98 border-t border-red-500/40">
            <div className="px-3 py-3">
              <button
                onClick={() => {
                  onContactOpen();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-red-500 text-white py-2 px-3 rounded-lg font-bold text-sm"
              >
                تواصل معنا
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
});

LightweightHeader.displayName = 'LightweightHeader';

export default LightweightHeader;