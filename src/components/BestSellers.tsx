import { Button } from '@/components/ui/button';
import { MessageCircle, Heart, ShoppingCart } from 'lucide-react';
import { getBestSellers } from '@/data/products';
import { Link } from 'react-router-dom';

const BestSellers = () => {
  const bestSellers = getBestSellers();

  const handleAddToCart = (product) => {
    const message = `Hi! I would like to add this item to my cart:

🛍️ *${product.name}*
💰 Price: ${product.price}
🏷️ Brand: ${product.brand}
📦 Category: ${product.category.replace('-', ' ')}

Please let me know about availability and how to proceed with the purchase.`;
    
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleQuickBuy = (product) => {
    const message = `Hi! I want to buy this product immediately:

🛍️ *${product.name}*
💰 Price: ${product.price}
🏷️ Brand: ${product.brand}

Can you please help me complete the purchase?`;
    
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
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </Link>
                
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
                    onClick={() => handleQuickBuy(product)}
                    className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Quick Buy
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-semibold mb-2 text-card-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                
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

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="whatsapp"
                    size="sm"
                    onClick={() => handleQuickBuy(product)}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="luxury" size="lg" className="px-8" asChild>
            <Link to="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;