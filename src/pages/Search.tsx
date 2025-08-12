import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Search as SearchIcon, Filter, X, Heart, ShoppingCart, Star, Loader2, Package } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSearchProducts, useCategories, useBrands } from '@/hooks/useProducts';
import { useAddToCart } from '@/hooks/useCart';
import { toast } from 'sonner';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const addToCartMutation = useAddToCart();
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();

  // Common search suggestions
  const searchSuggestions = [
    'Luxury tote bags', 'Crossbody bags', 'Evening clutches', 'Leather handbags',
    'Versace bags', 'Chanel bags', 'Gucci bags', 'Louis Vuitton', 'Prada bags',
    'Shoulder bags', 'Mini bags', 'Work bags', 'Black bags', 'Brown bags'
  ];

  // Build filters for API call
  const buildFilters = () => {
    const filters: any = {};
    
    if (categoryFilter !== 'all') {
      filters.category = categoryFilter;
    }
    
    if (brandFilter !== 'all') {
      filters.brand = brandFilter;
    }
    
    if (priceFilter !== 'all') {
      const [min, max] = priceFilter.split('-').map(Number);
      if (min) filters.min_price = min;
      if (max) filters.max_price = max;
    }

    if (sortBy !== 'relevance') {
      filters.ordering = sortBy === 'price_low' ? 'price' : 
                        sortBy === 'price_high' ? '-price' :
                        sortBy === 'newest' ? '-created_at' :
                        sortBy === 'rating' ? '-average_rating' : undefined;
    }

    return filters;
  };

  const { data: searchResults, isLoading, error } = useSearchProducts(query, buildFilters());

  useEffect(() => {
    const searchQuery = searchParams.get('q') || '';
    setQuery(searchQuery);
  }, [searchParams]);

  useEffect(() => {
    // Update suggestions based on query
    if (query.length > 0) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  const handleAddToCart = (productId: number, productName: string) => {
    addToCartMutation.mutate({
      product: productId,
      quantity: 1,
    }, {
      onSuccess: () => {
        toast.success(`${productName} added to cart!`);
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

  const clearFilters = () => {
    setCategoryFilter('all');
    setBrandFilter('all');
    setPriceFilter('all');
    setSortBy('relevance');
  };

  const products = searchResults?.results || [];
  const hasActiveFilters = categoryFilter !== 'all' || brandFilter !== 'all' || priceFilter !== 'all';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Search Header */}
      <section className="pt-24 pb-8 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              {query ? `Search Results for "${query}"` : 'Search Products'}
            </h1>
            
            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for bags, brands, categories..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                  className="pl-12 pr-12 h-12 text-lg"
                />
                <Button
                  onClick={() => handleSearch(query)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  size="sm"
                >
                  Search
                </Button>
              </div>
              
              {/* Search Suggestions */}
              {suggestions.length > 0 && query && (
                <div className="absolute top-full left-0 right-0 bg-background border rounded-lg shadow-lg mt-1 z-50">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(suggestion)}
                      className="w-full px-4 py-3 text-left hover:bg-muted transition-colors border-b last:border-b-0"
                    >
                      <SearchIcon className="inline h-4 w-4 mr-3 text-muted-foreground" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Search Tags */}
            <div className="flex flex-wrap gap-2 justify-center">
              {['Luxury bags', 'Crossbody', 'Tote bags', 'Evening clutch', 'Leather bags'].map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSearch(tag)}
                  className="rounded-full"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      {query && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Filters Toggle */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters {hasActiveFilters && <Badge variant="secondary" className="ml-2">Active</Badge>}
                </Button>
                
                {/* Results count */}
                <div className="text-sm text-muted-foreground">
                  {isLoading ? (
                    'Searching...'
                  ) : searchResults ? (
                    `${searchResults.count || 0} results found`
                  ) : null}
                </div>
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Best Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-8">
              {/* Filters Sidebar */}
              <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-64 flex-shrink-0`}>
                <Card className="p-6 sticky top-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Filters</h3>
                    {hasActiveFilters && (
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        <X className="h-4 w-4 mr-1" />
                        Clear
                      </Button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Category Filter */}
                    <div>
                      <h4 className="font-medium mb-3">Category</h4>
                      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Categories" />
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
                    </div>

                    {/* Brand Filter */}
                    <div>
                      <h4 className="font-medium mb-3">Brand</h4>
                      <Select value={brandFilter} onValueChange={setBrandFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Brands" />
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
                    </div>

                    {/* Price Filter */}
                    <div>
                      <h4 className="font-medium mb-3">Price Range</h4>
                      <Select value={priceFilter} onValueChange={setPriceFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Prices" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Prices</SelectItem>
                          <SelectItem value="0-100">Under $100</SelectItem>
                          <SelectItem value="100-300">$100 - $300</SelectItem>
                          <SelectItem value="300-500">$300 - $500</SelectItem>
                          <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                          <SelectItem value="1000-">Over $1,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Results */}
              <div className="flex-1">
                {isLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-3 text-muted-foreground">Searching...</span>
                  </div>
                ) : error ? (
                  <div className="text-center py-20">
                    <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Search failed</h3>
                    <p className="text-muted-foreground">Please try again or refine your search.</p>
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-20">
                    <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search terms or filters.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Suggestions:</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {searchSuggestions.slice(0, 4).map((suggestion) => (
                          <Button
                            key={suggestion}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSearch(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                        {/* Product Image */}
                        <div className="relative aspect-square overflow-hidden">
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
                              <Badge className="bg-primary text-primary-foreground">
                                Featured
                              </Badge>
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
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

                          {/* Action Buttons */}
                          <div className="space-y-2">
                            <Button 
                              className="w-full"
                              onClick={() => handleAddToCart(product.id, product.name)}
                              disabled={addToCartMutation.isPending || product.stock_quantity === 0}
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
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
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Search;
