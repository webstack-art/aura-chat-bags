import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageCircle, Search as SearchIcon, Filter, X, Heart, ShoppingCart } from 'lucide-react';
import { searchProducts, categories, brands } from '@/data/products';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Common search suggestions
  const searchSuggestions = [
    'Luxury tote bags', 'Crossbody bags', 'Evening clutches', 'Leather handbags',
    'Versace bags', 'Chanel bags', 'Gucci bags', 'Louis Vuitton', 'Prada bags',
    'Shoulder bags', 'Mini bags', 'Work bags', 'Black bags', 'Brown bags'
  ];

  useEffect(() => {
    const searchQuery = searchParams.get('q') || '';
    setQuery(searchQuery);
    if (searchQuery) {
      performSearch(searchQuery);
    } else {
      setResults([]);
    }
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

  const performSearch = (searchQuery: string) => {
    setIsLoading(true);
    // Enhanced search with better matching
    setTimeout(() => {
      let searchResults = searchProducts(searchQuery);
      
      // Apply category filter
      if (categoryFilter !== 'all') {
        searchResults = searchResults.filter(product => product.category === categoryFilter);
      }
      
      // Apply brand filter
      if (brandFilter !== 'all') {
        searchResults = searchResults.filter(product => 
          product.brand.toLowerCase() === brandFilter.toLowerCase()
        );
      }
      
      // Apply price filter
      if (priceFilter !== 'all') {
        searchResults = searchResults.filter(product => {
          const price = parseInt(product.price.replace('$', ''));
          switch (priceFilter) {
            case '0-200': return price <= 200;
            case '200-300': return price > 200 && price <= 300;
            case '300-500': return price > 300 && price <= 500;
            case '500+': return price > 500;
            default: return true;
          }
        });
      }
      
      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          searchResults.sort((a, b) => 
            parseInt(a.price.replace('$', '')) - parseInt(b.price.replace('$', ''))
          );
          break;
        case 'price-high':
          searchResults.sort((a, b) => 
            parseInt(b.price.replace('$', '')) - parseInt(a.price.replace('$', ''))
          );
          break;
        case 'rating':
          searchResults.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          searchResults.sort((a, b) => b.id - a.id);
          break;
        default:
          break;
      }
      
      setResults(searchResults);
      setIsLoading(false);
    }, 300);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
      performSearch(query);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSearchParams({ q: suggestion });
    performSearch(suggestion);
    setSuggestions([]);
  };

  const clearFilters = () => {
    setCategoryFilter('all');
    setBrandFilter('all');
    setPriceFilter('all');
    setSortBy('relevance');
    if (query) {
      performSearch(query);
    }
  };

  const handleAddToCart = (product: any) => {
    const message = `Hi! I would like to add this item to my cart:

🛍️ *${product.name}*
💰 Price: ${product.price}
🏷️ Brand: ${product.brand}
📦 Category: ${product.category.replace('-', ' ')}

Please let me know about availability and how to proceed with the purchase.`;
    
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleQuickBuy = (product: any) => {
    const message = `Hi! I found this product through search and want to buy it:

🛍️ *${product.name}*
💰 Price: ${product.price}
🏷️ Brand: ${product.brand}

Can you please help me complete the purchase?`;
    
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Search Hero */}
      <section className="bg-gradient-subtle py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Search Our Collection
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find the perfect handbag for your style
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for handbags, styles, or brands..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button type="submit" size="lg" className="px-8">
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-foreground">
              Search {query && `"${query}"`}
            </span>
          </div>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-primary hover:text-primary/80"
                >
                  Clear All
                </Button>
              </div>
              
              {/* Category Filter */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Brand Filter */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium">Brand</label>
                <Select value={brandFilter} onValueChange={setBrandFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {brands.map(brand => (
                      <SelectItem key={brand.id} value={brand.name.toLowerCase()}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Filter */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium">Price Range</label>
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Prices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-200">$0 - $200</SelectItem>
                    <SelectItem value="200-300">$200 - $300</SelectItem>
                    <SelectItem value="300-500">$300 - $500</SelectItem>
                    <SelectItem value="500+">$500+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            {/* Popular Searches */}
            <Card className="p-6 mt-6">
              <h3 className="font-semibold mb-4">Popular Searches</h3>
              <div className="space-y-2">
                {['Tote bags', 'Crossbody', 'Evening clutch', 'Work bags', 'Weekend bags'].map(term => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      setSearchParams({ q: term });
                    }}
                    className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </Card>
          </aside>

          {/* Search Results */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {query ? `Search Results for "${query}"` : 'Search Results'}
                </h2>
                <p className="text-muted-foreground">
                  {isLoading ? 'Searching...' : `${results.length} products found`}
                </p>
              </div>
            </div>

            {/* Results Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-[4/5] bg-muted"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                      <div className="h-8 bg-muted rounded"></div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((product) => (
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
                          onClick={() => handleQuickBuy(product)}
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
                      
                      <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                      
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
                  </Card>
                ))}
              </div>
            ) : query ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-4">No Results Found</h3>
                <p className="text-muted-foreground mb-8">
                  We couldn't find any products matching "{query}". Try different keywords or browse our categories.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                  <Button asChild>
                    <Link to="/shop">Browse All Products</Link>
                  </Button>
                  <Button 
                    variant="whatsapp"
                    onClick={() => window.open(`https://wa.me/1234567890?text=Hi! I'm looking for "${query}" but couldn't find it on the website. Can you help me?`, '_blank')}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Ask Us
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">👜</div>
                <h3 className="text-2xl font-semibold mb-4">Start Your Search</h3>
                <p className="text-muted-foreground mb-8">
                  Enter a search term above to find the perfect handbag for you.
                </p>
                <Button asChild>
                  <Link to="/shop">Browse All Products</Link>
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Search;