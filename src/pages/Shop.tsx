import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { MessageCircle, Filter, Grid, List, Heart, ShoppingCart } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useAddToCart } from '@/hooks/useCart';
import { useQuery } from '@tanstack/react-query';
import { categoryService, brandService } from '@/services';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const addToCartMutation = useAddToCart();

  // Build filters object
  const filters: any = {};
  
  if (selectedCategory !== 'all') {
    filters.category = parseInt(selectedCategory);
  }
  
  if (selectedBrand !== 'all') {
    filters.brand = parseInt(selectedBrand);
  }
  
  if (priceRange !== 'all') {
    const [min, max] = priceRange.split('-').map(p => p === '+' ? undefined : parseInt(p));
    if (min !== undefined) filters.min_price = min;
    if (max !== undefined) filters.max_price = max;
  }
  
  if (searchQuery) {
    filters.search = searchQuery;
  }

  // Set ordering
  switch (sortBy) {
    case 'price-low':
      filters.ordering = 'price';
      break;
    case 'price-high':
      filters.ordering = '-price';
      break;
    case 'newest':
      filters.ordering = '-created_at';
      break;
    case 'name':
      filters.ordering = 'name';
      break;
    default:
      filters.ordering = '-is_featured';
  }

  // Fetch data
  const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts(filters);
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getCategories(),
  });
  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: () => brandService.getBrands(),
  });

  const handleAddToCart = (product: any) => {
    addToCartMutation.mutate({
      product: product.id,
      quantity: 1,
    }, {
      onSuccess: () => {
        toast.success(`${product.name} added to cart!`);
      },
      onError: () => {
        toast.error('Failed to add to cart. Please try again.');
      }
    });
  };

  const handleQuickBuy = (product: any) => {
    const message = `Hi! I want to buy this product immediately:

PRODUCT: ${product.name}
PRICE: $${product.price}
BRAND: ${product.brand?.name || 'Unknown'}

Can you please help me complete the purchase?`;
    
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/5 to-secondary/5 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop All Handbags</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover our complete collection of luxury handbags, from timeless classics to contemporary designs
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="w-full lg:w-auto">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="min-w-[300px]"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center">
                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Brand Filter */}
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {brands?.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id.toString()}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Price Range Filter */}
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-200">$0 - $200</SelectItem>
                    <SelectItem value="200-300">$200 - $300</SelectItem>
                    <SelectItem value="300-500">$300 - $500</SelectItem>
                    <SelectItem value="500+">$500+</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort By */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border rounded">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Results Count */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-muted-foreground">
                {productsLoading ? 'Loading...' : `${productsData?.count || 0} products found`}
              </p>
            </div>

            {/* Loading State */}
            {productsLoading && (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {productsError && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Failed to load products. Please try again.</p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
              </div>
            )}

            {/* Products Grid/List */}
            {!productsLoading && !productsError && (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
                {productsData?.results?.map((product) => (
                  <Card key={product.id} className={`group overflow-hidden hover:shadow-lg transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''}`}>
                    {/* Product Image */}
                    <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'}`}>
                      <Link to={`/product/${product.slug}`}>
                        <img
                          src={product.images?.[0]?.image || '/placeholder-product.jpg'}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      
                      {/* Badge */}
                      {product.is_featured && (
                        <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold">
                          Featured
                        </div>
                      )}

                      {/* Quick Actions */}
                      <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="secondary" className="rounded-full">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Quick Buy on Hover */}
                      <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Add to Cart
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleQuickBuy(product)}
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 flex-1">
                      <Link to={`/product/${product.slug}`}>
                        <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground text-sm mb-2">
                        {product.brand?.name || 'Unknown Brand'}
                      </p>
                      {viewMode === 'list' && (
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {product.short_description || product.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold">${product.price}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex text-yellow-400">
                            {'★'.repeat(Math.floor(product.average_rating || 0))}
                            {'☆'.repeat(5 - Math.floor(product.average_rating || 0))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            ({product.review_count || 0})
                          </span>
                        </div>
                      </div>

                      {viewMode === 'list' && (
                        <div className="flex gap-2 mt-4">
                          <Button
                            className="flex-1"
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleQuickBuy(product)}
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* No Products Found */}
            {!productsLoading && !productsError && (!productsData?.results?.length) && (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  setPriceRange('all');
                }}>
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Pagination - TODO: Implement when backend supports it */}
            {productsData?.next && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
