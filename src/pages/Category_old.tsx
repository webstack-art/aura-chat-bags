import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Grid, List, Heart } from 'lucide-react';
import { categories, getProductsByCategory } from '@/data/products';
import { useState } from 'react';

const Category = () => {
  const { categoryName } = useParams();
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');

  const category = categories.find(cat => cat.id === categoryName);
  const products = categoryName ? getProductsByCategory(categoryName) : [];

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">The category you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleWhatsAppClick = (product: any) => {
    const message = `Hi! I'm interested in the ${product.name} (${product.price}). Can you provide more details?`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-subtle">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
            {category.name}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {category.description}
          </p>
          <p className="text-accent font-semibold">
            {category.count} items available
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{category.name}</span>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <p className="text-muted-foreground">
            Showing {products.length} {category.name.toLowerCase()}
          </p>
          
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {products.map((product) => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-luxury transition-all duration-300">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </Link>
                  
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      {product.badge}
                    </div>
                  )}

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
                        <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-accent' : 'text-muted'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">
                      ({product.reviews})
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
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold mb-4">No Products Found</h3>
            <p className="text-muted-foreground mb-8">
              We don't have any products in this category yet.
            </p>
            <Button asChild>
              <Link to="/shop">Browse All Products</Link>
            </Button>
          </div>
        )}

        {/* Category Description */}
        <section className="mt-16 py-12 bg-gradient-subtle rounded-2xl">
          <div className="container mx-auto px-8 text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              About Our {category.name}
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our {category.name.toLowerCase()} collection represents the pinnacle of luxury and functionality. 
              Each piece is carefully crafted with premium materials and attention to detail, 
              ensuring you have a bag that's not just beautiful, but built to last. 
              Whether you're heading to the office, a special event, or everyday adventures, 
              our {category.name.toLowerCase()} offer the perfect blend of style and practicality.
            </p>
            
            <div className="mt-8">
              <Button 
                variant="whatsapp" 
                size="lg"
                onClick={() => window.open(`https://wa.me/1234567890?text=Hi! I'm interested in your ${category.name} collection. Can you help me find the perfect bag?`, '_blank')}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Get Personal Recommendations
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Category;