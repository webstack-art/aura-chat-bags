import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { brands } from '@/data/products';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Brands = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Luxury Brands
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collection of premium fashion brands from around the world
            </p>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <Card key={brand.id} className="group overflow-hidden hover:shadow-luxury transition-all duration-300">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{brand.name}</h3>
                    <p className="text-white/80 text-sm mb-3">{brand.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">{brand.count} products</span>
                      <Link to={`/shop?brand=${brand.name.toLowerCase()}`}>
                        <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Shop Now
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brand Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Brand Collections</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our most popular brand collections, handpicked for their exceptional quality and timeless appeal
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {brands.slice(0, 2).map((brand) => (
              <Card key={brand.id} className="p-8 hover:shadow-luxury transition-all duration-300">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{brand.name}</h3>
                    <p className="text-muted-foreground mb-4">{brand.description}</p>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">{brand.count} products available</span>
                      <Link to={`/shop?brand=${brand.name.toLowerCase()}`}>
                        <Button variant="outline" size="sm">
                          Explore Collection
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Brands;
