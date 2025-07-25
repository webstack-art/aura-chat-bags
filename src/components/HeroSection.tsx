import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-handbags.jpg';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury handbags collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Luxury You Can
          <span className="block bg-gradient-to-r from-gold to-gold-muted bg-clip-text text-transparent">
            Carry
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in">
          Discover our curated collection of premium handbags crafted for the modern woman
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            Explore Collection
          </Button>
          <Button 
            variant="whatsapp" 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => window.open('https://wa.me/1234567890?text=Hi! I\'m interested in your handbag collection.', '_blank')}
          >
            Shop via WhatsApp
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;