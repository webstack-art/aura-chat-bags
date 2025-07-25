import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Tote Bags',
    description: 'Spacious and sophisticated',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
    itemCount: '24 items',
    slug: 'tote-bags'
  },
  {
    id: 2,
    name: 'Shoulder Bags',
    description: 'Classic elegance redefined',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    itemCount: '18 items',
    slug: 'shoulder-bags'
  },
  {
    id: 3,
    name: 'Crossbody',
    description: 'Freedom meets fashion',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    itemCount: '15 items',
    slug: 'crossbody'
  },
  {
    id: 4,
    name: 'Clutches',
    description: 'Evening sophistication',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=400&fit=crop',
    itemCount: '12 items',
    slug: 'clutches'
  }
];

const FeaturedCategories = () => {
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
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-card hover:shadow-luxury transition-all duration-500 hover:-translate-y-2 block"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-card-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-muted-foreground mb-3">
                  {category.description}
                </p>
                <p className="text-sm text-accent font-medium mb-4">
                  {category.itemCount}
                </p>
                
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                >
                  Explore {category.name}
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;