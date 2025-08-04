import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Grid, List, Heart, Star, Loader2, Package } from 'lucide-react';
import { useState } from 'react';
import { useCategory, useProductsByCategory } from '@/hooks/useProducts';
import { useAddToCart } from '@/hooks/useCart';
import { toast } from 'sonner';

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [page, setPage] = useState(1);

  const { data: category, isLoading: categoryLoading, error: categoryError } = useCategory(slug!);
  const { data: productsData, isLoading: productsLoading, error: productsError } = useProductsByCategory(
    category?.id || 0,
    {
      page,
      page_size: 12,
      ordering: sortBy === 'price_low' ? 'price' : 
                sortBy === 'price_high' ? '-price' :
                sortBy === 'newest' ? '-created_at' :
                sortBy === 'rating' ? '-average_rating' : undefined
    }
  );

  const addToCartMutation = useAddToCart();

  const handleAddToCart = (productId: number) => {
    addToCartMutation.mutate({
      product: productId,
      quantity: 1,
    }, {
      onSuccess: () => {
        toast.success('Product added to cart!');
      },
      onError: () => {
        toast.error('Failed to add to cart. Please try again.');
      }
    });
  };

  const handleWhatsAppClick = (product: any) => {
    const message = `Hi! I'm interested in the ${product.name} ($${product.price}). Can you provide more details?`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (categoryLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-muted-foreground">Loading category...</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (categoryError || !category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">The category you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/categories">Browse All Categories</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const products = productsData?.results || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-subtle">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={category.image || '/placeholder-category.jpg'}
            alt={category.name}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-2xl">
            <nav className="text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span className="mx-2">&gt;</span>
              <Link to="/categories" className="hover:text-foreground">Categories</Link>
              <span className="mx-2">&gt;</span>
              <span className="text-foreground">{category.name}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {category.name}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {category.description || `Discover our premium ${category.name.toLowerCase()} collection`}
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{category.product_count || products.length} products</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Sort */}
      <section className="py-6 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
              {productsData?.count ? (
                <>Showing {products.length} of {productsData.count} products</>
              ) : (
                <>Showing {products.length} products</>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Best Rated</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {productsLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Loading products...</span>
            </div>
          ) : productsError ? (
            <div className="text-center py-20">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Unable to load products</h3>
              <p className="text-muted-foreground">Please try again later.</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                This category doesn't have any products yet.
              </p>
              <Button asChild>
                <Link to="/shop">Browse All Products</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-6"
              }>
                {products.map((product) => (
                  <Card key={product.id} className={`group overflow-hidden hover:shadow-lg transition-all duration-300 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}>
                    {/* Product Image */}
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'
                    }`}>
                      <Link to={`/product/${product.slug}`}>
                        <img
                          src={product.images?.[0]?.image || '/placeholder-product.jpg'}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      
                      {/* Wishlist Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>

                      {product.is_featured && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                      <div>
                        <Link to={`/product/${product.slug}`}>
                          <h3 className="font-semibold mb-1 hover:text-primary transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <p className="text-muted-foreground text-sm mb-2">
                          {product.brand?.name}
                        </p>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < Math.floor(product.average_rating || 0) ? 'fill-current' : ''}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({product.review_count || 0})
                          </span>
                        </div>

                        <p className="font-bold text-lg mb-3">${product.price}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        <Button 
                          className="w-full"
                          onClick={() => handleAddToCart(product.id)}
                          disabled={addToCartMutation.isPending || product.stock_quantity === 0}
                        >
                          {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => handleWhatsAppClick(product)}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Quick Buy
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {productsData && productsData.count > productsData.results.length && (
                <div className="flex justify-center mt-12">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setPage(page - 1)}
                      disabled={!productsData.previous}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setPage(page + 1)}
                      disabled={!productsData.next}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Category;
