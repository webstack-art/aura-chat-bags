import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, User, Calendar, MessageCircle } from 'lucide-react';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2024-01-15",
      product: "Milano Luxury Tote",
      title: "Absolutely Perfect!",
      content: "This tote bag exceeded all my expectations. The quality is outstanding, and it fits everything I need for work. The leather is so soft and luxurious. Highly recommend!",
      verified: true,
      helpful: 24
    },
    {
      id: 2,
      name: "Emily Chen",
      rating: 5,
      date: "2024-01-12",
      product: "Parisian Crossbody",
      title: "Love this bag!",
      content: "Perfect size for daily use. The craftsmanship is excellent and it goes with everything in my wardrobe. The adjustable strap is a great feature.",
      verified: true,
      helpful: 18
    },
    {
      id: 3,
      name: "Jessica Rodriguez",
      rating: 4,
      date: "2024-01-10",
      product: "Venetian Evening Clutch",
      title: "Beautiful for special occasions",
      content: "Gorgeous clutch that's perfect for evenings out. The beaded details are stunning. Only wish it was slightly larger, but overall very happy with the purchase.",
      verified: true,
      helpful: 15
    },
    {
      id: 4,
      name: "Michael Brown",
      rating: 5,
      date: "2024-01-08",
      product: "London Shoulder Bag",
      title: "Gift for my wife - she loves it!",
      content: "Bought this as an anniversary gift for my wife and she absolutely loves it. The quality is exceptional and the customer service was excellent throughout the process.",
      verified: true,
      helpful: 12
    },
    {
      id: 5,
      name: "Amanda Wilson",
      rating: 5,
      date: "2024-01-05",
      product: "Milano Luxury Tote",
      title: "Worth every penny",
      content: "I was hesitant about the price, but this bag is worth every penny. The attention to detail is incredible, and it's so well-made. I know this will last for years.",
      verified: true,
      helpful: 21
    },
    {
      id: 6,
      name: "Lisa Thompson",
      rating: 4,
      date: "2024-01-03",
      product: "Monaco Mini Bag",
      title: "Perfect mini bag",
      content: "Love this compact bag for when I don't want to carry much. It's well-made and stylish. The only thing is I wish it had one more pocket inside.",
      verified: true,
      helpful: 9
    }
  ];

  const stats = {
    totalReviews: 247,
    averageRating: 4.8,
    fiveStars: 185,
    fourStars: 45,
    threeStars: 12,
    twoStars: 3,
    oneStars: 2
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Customer Reviews
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our customers are saying about their Aurabags experience
            </p>
          </div>
        </div>
      </section>

      {/* Review Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">{stats.averageRating}</div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.floor(stats.averageRating))}
                </div>
                <p className="text-muted-foreground">Based on {stats.totalReviews} reviews</p>
              </div>
              
              <div className="space-y-3">
                {[
                  { stars: 5, count: stats.fiveStars },
                  { stars: 4, count: stats.fourStars },
                  { stars: 3, count: stats.threeStars },
                  { stars: 2, count: stats.twoStars },
                  { stars: 1, count: stats.oneStars }
                ].map(({ stars, count }) => (
                  <div key={stars} className="flex items-center space-x-3">
                    <span className="text-sm w-8">{stars} ★</span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${(count / stats.totalReviews) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Reviews List */}
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            
            {reviews.map((review) => (
              <Card key={review.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{review.name}</h3>
                        {review.verified && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{review.product}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      {renderStars(review.rating)}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(review.date)}
                    </div>
                  </div>
                </div>
                
                <h4 className="font-semibold mb-2">{review.title}</h4>
                <p className="text-muted-foreground mb-4 leading-relaxed">{review.content}</p>
                
                <div className="flex items-center justify-between">
                  <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Helpful ({review.helpful})
                  </button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Ask about this product
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Reviews
            </Button>
          </div>
        </div>
      </section>

      {/* Write Review CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
            <p className="text-muted-foreground mb-6">
              Have you purchased from us? We'd love to hear about your experience and help other customers make informed decisions.
            </p>
            <Button
              onClick={() => window.open('https://wa.me/1234567890?text=Hi! I would like to leave a review for my recent purchase.', '_blank')}
              className="bg-[#25D366] hover:bg-[#20c55a] text-white"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Write a Review
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reviews;
