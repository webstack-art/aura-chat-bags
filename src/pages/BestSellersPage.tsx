import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, Heart, Star } from 'lucide-react';
import { getBestSellers } from '@/data/products';
import { Link } from 'react-router-dom';

const BestSellersPage = () => {
  const bestSellers = getBestSellers();

  const handleWhatsAppClick = (product: any) => {
    const message = `Hi! I'm interested in the ${product.name} (${product.price}). Can you provide more details?`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Best Sellers
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our most loved handbags, chosen by customers worldwide for their exceptional quality, 
            timeless design, and unmatched craftsmanship.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-foreground">Best Sellers</span>
        </div>
      </nav>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <p className="text-muted-foreground">Happy Customers</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
            <p className="text-muted-foreground">Average Rating</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <p className="text-muted-foreground">Customer Satisfaction</p>
          </Card>
        </div>

        {/* Best Sellers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product, index) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-luxury transition-all duration-300">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </Link>
                
                {/* Bestseller Badge */}
                <div className="absolute top-4 left-4 bg-gradient-luxury text-white px-3 py-1 rounded-full text-sm font-semibold">
                  #{index + 1} Best Seller
                </div>

                <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
                  <Heart className="h-4 w-4 text-primary" />
                </button>

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

              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-semibold mb-2 text-card-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) 
                            ? 'text-accent fill-current' 
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

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

                <Button
                  variant="outline"
                  className="w-full hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all duration-300"
                  onClick={() => handleWhatsAppClick(product)}
                >
                  <MessageCircle className="h-4 w-4" />
                  Buy on WhatsApp
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Best Sellers Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Why These Are Our Best Sellers
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These handbags have earned their place through exceptional customer reviews and proven quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Unmatched Quality',
                description: 'Premium materials and expert craftsmanship ensure durability that lasts for years.',
                icon: '🏆'
              },
              {
                title: 'Timeless Design',
                description: 'Classic styles that never go out of fashion, perfect for any occasion.',
                icon: '✨'
              },
              {
                title: 'Customer Love',
                description: 'Thousands of 5-star reviews from satisfied customers worldwide.',
                icon: '❤️'
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-luxury transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real reviews from real customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                review: 'The Milano Tote is absolutely perfect! The quality exceeded my expectations and it fits everything I need for work.',
                rating: 5,
                product: 'Milano Luxury Tote'
              },
              {
                name: 'Emily Chen',
                review: 'Love my Parisian Crossbody! It\'s the perfect size and the leather is so soft. Great customer service via WhatsApp too!',
                rating: 5,
                product: 'Parisian Crossbody'
              },
              {
                name: 'Maria Rodriguez',
                review: 'The Venetian Clutch was perfect for my wedding. So elegant and received so many compliments!',
                rating: 5,
                product: 'Venetian Evening Clutch'
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-luxury transition-all duration-300">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.review}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-primary">{testimonial.product}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Bag?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/80 max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover why these are our best-selling handbags.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => window.location.href = '/shop'}
            >
              Browse All Products
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => window.open('https://wa.me/1234567890?text=Hi! I\'m interested in your best-selling handbags. Can you help me choose?', '_blank')}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Get Personal Recommendation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BestSellersPage;