import { Button } from '@/components/ui/button';
import { MessageCircle, Heart } from 'lucide-react';

const bestSellers = [
  {
    id: 1,
    name: 'Milano Luxury Tote',
    price: '$299',
    originalPrice: '$399',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop',
    badge: 'Best Seller',
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: 'Parisian Crossbody',
    price: '$199',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop',
    badge: 'New',
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: 'Venetian Evening Clutch',
    price: '$159',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&h=600&fit=crop',
    badge: 'Limited',
    rating: 4.7,
    reviews: 67
  },
  {
    id: 4,
    name: 'London Shoulder Bag',
    price: '$249',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=600&fit=crop',
    rating: 4.6,
    reviews: 92
  }
];

const BestSellers = () => {
  const handleWhatsAppClick = (product) => {
    const message = `Hi! I'm interested in the ${product.name} (${product.price}). Can you provide more details?`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Best Sellers
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our most loved handbags, chosen by customers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-luxury transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {product.badge}
                  </div>
                )}

                {/* Heart Icon */}
                <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
                  <Heart className="h-4 w-4 text-primary" />
                </button>

                {/* Quick WhatsApp Button */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    variant="whatsapp"
                    size="sm"
                    onClick={() => handleWhatsAppClick(product)}
                    className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Quick Buy
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-card-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-accent' : 'text-muted'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-primary">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* WhatsApp Button */}
                <Button
                  variant="outline"
                  className="w-full hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all duration-300"
                  onClick={() => handleWhatsAppClick(product)}
                >
                  <MessageCircle className="h-4 w-4" />
                  Buy on WhatsApp
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="luxury" size="lg" className="px-8">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;