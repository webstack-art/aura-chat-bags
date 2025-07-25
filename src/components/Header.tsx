import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Menu, X, Search, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Brands', href: '/brands' },
    { name: 'About', href: '/about' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', href: '/contact' },
  ];

  const customerLinks = [
    { name: 'FAQ', href: '/faq' },
    { name: 'Return Policy', href: '/return-policy' },
    { name: 'Support', href: '/support' },
    { name: 'Terms of Use', href: '/terms-of-use' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Now clickable */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <ShoppingBag className="h-8 w-8 text-primary mr-2" />
            <span className="text-2xl font-bold bg-gradient-luxury bg-clip-text text-transparent">
              Aurabags
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Customer Links Dropdown */}
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors duration-300 font-medium">
                Help
              </button>
              <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-md shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {customerLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            {showSearch ? (
              <form onSubmit={handleSearch} className="hidden sm:flex items-center">
                <Input
                  type="text"
                  placeholder="Search products, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                  autoFocus
                />
                <Button type="submit" variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowSearch(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </form>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden sm:flex"
                onClick={() => setShowSearch(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            <Button 
              variant="whatsapp" 
              size="sm"
              className="hidden sm:flex"
              onClick={() => window.open('https://wa.me/1234567890', '_blank')}
            >
              <MessageCircle className="h-4 w-4" />
              Chat
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-4 py-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Search products, brands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </form>
              
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium px-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Customer Links */}
              <div className="px-4 pt-2 border-t border-border">
                <p className="text-sm font-semibold text-muted-foreground mb-2">Customer Support</p>
                {customerLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block text-foreground hover:text-primary transition-colors duration-300 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              <div className="px-4 pt-2 border-t border-border">
                <Button 
                  variant="whatsapp" 
                  className="w-full"
                  onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;