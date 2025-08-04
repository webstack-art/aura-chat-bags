import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Heart, Share2, Truck, Shield, RotateCcw, Minus, Plus, Star, ShoppingCart } from 'lucide-react';
import { useProduct, useProductsByCategory } from '@/hooks/useProducts';
import { useAddToCart } from '@/hooks/useCart';
import { useQuery } from '@tanstack/react-query';
import { reviewService } from '@/services';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, error } = useProduct(slug!);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const addToCartMutation = useAddToCart();

  // Fetch related products
  const { data: relatedProductsData } = useProductsByCategory(
    product?.category?.id || 0,
    { page_size: 4 }
  );

  // Fetch product reviews
  const { data: reviews } = useQuery({
    queryKey: ['reviews', product?.id],
    queryFn: () => reviewService.getProductReviews(product!.id),
    enabled: !!product?.id,
  });

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCartMutation.mutate({
      product: product.id,
      quantity,
      color: selectedColor || undefined,
    }, {
      onSuccess: () => {
        toast.success(`${product.name} added to cart!`);
      },
      onError: () => {
        toast.error('Failed to add to cart. Please try again.');
      }
    });
  };

  const handleQuickBuy = () => {
    if (!product) return;
    
    const message = `Hi! I want to buy this product immediately:

PRODUCT: ${product.name}
PRICE: $${product.price}
QUANTITY: ${quantity}
${selectedColor ? `COLOR: ${selectedColor}` : ''}

Can you please help me complete the purchase?`;
    
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="bg-gray-200 aspect-square rounded-lg"></div>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-200 aspect-square rounded-lg"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images?.length ? product.images : [{ id: 0, image: '/placeholder-product.jpg', alt_text: product.name, is_primary: true }];
  const relatedProducts = relatedProductsData?.results?.filter(p => p.id !== product.id)?.slice(0, 4) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">&gt;</span>
            <Link to="/shop" className="hover:text-foreground">Shop</Link>
            <span className="mx-2">&gt;</span>
            <Link to={`/category/${product.category?.slug}`} className="hover:text-foreground">
              {product.category?.name}
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        {/* Product Details */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-square bg-card rounded-xl overflow-hidden">
                  <img
                    src={images[selectedImage]?.image || '/placeholder-product.jpg'}
                    alt={images[selectedImage]?.alt_text || product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Thumbnail Images */}
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                      <button
                        key={image.id || index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square bg-card rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index ? 'border-primary' : 'border-transparent hover:border-muted'
                        }`}
                      >
                        <img
                          src={image.image}
                          alt={image.alt_text || `${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Title and Brand */}
                <div>
                  {product.is_featured && (
                    <Badge variant="secondary" className="mb-2">Featured</Badge>
                  )}
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2">{product.name}</h1>
                  <p className="text-lg text-muted-foreground">{product.brand?.name}</p>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(product.average_rating || 0) ? 'fill-current' : ''}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.average_rating?.toFixed(1) || '0.0'} ({product.review_count || 0} reviews)
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold">${product.price}</span>
                  {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                    <Badge variant="destructive">Only {product.stock_quantity} left!</Badge>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {product.short_description || product.description}
                </p>

                {/* Options */}
                <div className="space-y-4">
                  {/* Color Selection - Only show if we have color options */}
                  {/* Note: You may need to add a colors field to your product model */}
                  
                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Quantity</label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                        disabled={quantity >= (product.stock_quantity || 0)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Button
                      size="lg"
                      className="flex-1"
                      onClick={handleAddToCart}
                      disabled={addToCartMutation.isPending || product.stock_quantity === 0}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                    <Button size="lg" variant="outline">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full"
                    onClick={handleQuickBuy}
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Quick Buy via WhatsApp
                  </Button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4 text-primary" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <RotateCcw className="h-4 w-4 text-primary" />
                    <span>Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="py-12 border-t">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({product.review_count || 0})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <Card className="p-6">
                  <div className="prose max-w-none">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {product.description}
                    </p>
                    
                    {/* Features - if available */}
                    {/* You may need to add features field to product model */}
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-6">
                <Card className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Product Details</h4>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">SKU:</dt>
                          <dd>{product.sku || 'N/A'}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Weight:</dt>
                          <dd>{product.weight ? `${product.weight}g` : 'N/A'}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Dimensions:</dt>
                          <dd>{product.dimensions || 'N/A'}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Material:</dt>
                          <dd>{product.materials || 'N/A'}</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Care Instructions</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Store in dust bag when not in use</li>
                        <li>• Clean with soft, dry cloth</li>
                        <li>• Avoid exposure to direct sunlight</li>
                        <li>• Keep away from water and moisture</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card className="p-6">
                  {reviews?.length ? (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-b-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h5 className="font-semibold">{review.user.first_name} {review.user.last_name}</h5>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex text-yellow-400">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < review.rating ? 'fill-current' : ''}`}
                                    />
                                  ))}
                                </div>
                                {review.is_verified_purchase && (
                                  <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <h6 className="font-medium mb-2">{review.title}</h6>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
                    </div>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 border-t">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 text-center">You Might Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-square overflow-hidden">
                      <Link to={`/product/${relatedProduct.slug}`}>
                        <img
                          src={relatedProduct.images?.[0]?.image || '/placeholder-product.jpg'}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                    </div>
                    <div className="p-4">
                      <Link to={`/product/${relatedProduct.slug}`}>
                        <h3 className="font-semibold mb-1 hover:text-primary transition-colors">
                          {relatedProduct.name}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground text-sm mb-2">
                        {relatedProduct.brand?.name}
                      </p>
                      <p className="font-bold">${relatedProduct.price}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
