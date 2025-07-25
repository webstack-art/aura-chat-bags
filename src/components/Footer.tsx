import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Instagram, Facebook, Mail, Phone, MapPin, ShoppingBag } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-accent mr-2" />
              <span className="text-2xl font-bold">Aurabags</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Crafting luxury handbags that embody elegance, quality, and timeless style for the modern woman.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent hover:bg-white/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent hover:bg-white/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-[#25D366] hover:bg-[#25D366]/20"
                onClick={() => window.open('https://wa.me/1234567890', '_blank')}
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {['Home', 'Shop', 'About Us', 'Contact', 'Size Guide', 'Care Instructions'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Categories</h3>
            <nav className="flex flex-col space-y-2">
              {['Tote Bags', 'Shoulder Bags', 'Crossbody', 'Clutches', 'Evening Bags', 'Travel Bags'].map((category) => (
                <a
                  key={category}
                  href="#"
                  className="text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                >
                  {category}
                </a>
              ))}
            </nav>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Stay Connected</h3>
            <p className="text-primary-foreground/80 text-sm">
              Subscribe to get updates on new arrivals and exclusive offers.
            </p>
            
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="secondary" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center space-x-2 text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-foreground/80">
                <Mail className="h-4 w-4" />
                <span className="text-sm">hello@aurabags.com</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-foreground/80">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 Aurabags. All rights reserved. Crafted with luxury in mind.
            </p>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Return Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;