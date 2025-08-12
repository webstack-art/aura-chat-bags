import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Grid, Package, Loader2 } from 'lucide-react';
import { useCategories } from '@/hooks/useProducts';
import { Link } from 'react-router-dom';

const Categories = () => {
  const { data: categories, isLoading, error } = useCategories();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Grid className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Shop by Categories
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collections of luxury handbags organized by style and purpose
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Loading categories...</span>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Unable to load categories</h3>
                <p className="text-muted-foreground">Please try again later.</p>
              </div>
            ) : categories?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category) => (
                  <Link key={category.id} to={`/category/${category.slug}`}>
                    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      {/* Category Image */}
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img
                          src={category.image || '/placeholder-category.jpg'}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-white/90 text-foreground">
                            {category.product_count || 0} items
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Category Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm opacity-90 leading-relaxed">
                          {category.description || `Discover our ${category.name.toLowerCase()} collection`}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No categories available</h3>
                <p className="text-muted-foreground">Check back later for new categories.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories Stats */}
      {categories?.length && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {categories.length}
                  </div>
                  <p className="text-muted-foreground">Categories</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {categories.reduce((total, cat) => total + (cat.product_count || 0), 0)}
                  </div>
                  <p className="text-muted-foreground">Total Products</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    500+
                  </div>
                  <p className="text-muted-foreground">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Categories;
