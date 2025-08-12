import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/services';

const FeaturedCategories = () => {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getCategories(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Discover Our Collections
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From everyday essentials to evening elegance, find the perfect bag for every occasion
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Discover Our Collections
            </h2>
            <p className="text-muted-foreground">Failed to load categories. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // Filter to show only main categories (no parent)
  const featuredCategories = categories?.filter(cat => !cat.parent)?.slice(0, 4) || [];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Discover Our Collections
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From everyday essentials to evening elegance, find the perfect bag for every occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCategories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-3xl bg-card shadow-card hover:shadow-luxury transition-all duration-500 hover:-translate-y-2">
                {/* Category Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image || '/placeholder-category.jpg'}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-white/90 text-sm mb-4">
                    {category.description || 'Explore our collection'}
                  </p>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="self-start bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white hover:text-black"
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/categories">
            <Button size="lg" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
              View All Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
