import { Button } from '@/components/ui/button';
import { MessageCircle, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAddToCart } from '@/hooks/useCart';
import { useFeaturedProducts } from '@/hooks/useProducts';
import { toast } from 'sonner';

const BestSellers = () => {
  const { data: bestSellers, isLoading, error } = useFeaturedProducts();
  const addToCartMutation = useAddToCart();

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

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Best Sellers
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our most loved handbags, chosen by customers worldwide
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Best Sellers
            </h2>
            <p className="text-muted-foreground">Failed to load products. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Best Sellers
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our most loved handbags, chosen by customers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers?.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-luxury transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Link to={`/product/${product.slug}`}>
                  <img
                    src={product.images?.[0]?.image || '/placeholder-product.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </Link>
                
                {/* Badge */}
                {product.is_featured && (
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    Best Seller
                  </div>
                )}

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                {/* Bottom Action Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
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
              <div className="p-6">
                <Link to={`/product/${product.slug}`}>
                  <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-muted-foreground text-sm mb-3">
                  {product.brand?.name || 'Unknown Brand'}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">
                      ${product.price}
                    </span>
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
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/shop">
            <Button size="lg" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
