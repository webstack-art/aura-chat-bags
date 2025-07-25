import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft, Package, RefreshCw, CreditCard } from 'lucide-react';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Return Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your satisfaction is our priority. Easy returns within 30 days of purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 mb-12">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                <h2 className="text-2xl font-bold">30-Day Return Guarantee</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We stand behind the quality of our products. If you're not completely satisfied with your purchase, 
                you can return it within 30 days for a full refund or exchange. No questions asked.
              </p>
            </Card>

            {/* Return Process */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">1. Contact Us</h3>
                <p className="text-muted-foreground">
                  Reach out via WhatsApp or our contact form to initiate your return request.
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowLeft className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">2. Send It Back</h3>
                <p className="text-muted-foreground">
                  Package your item securely and send it back using our prepaid return label.
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">3. Get Refunded</h3>
                <p className="text-muted-foreground">
                  Receive your refund within 5-7 business days after we process your return.
                </p>
              </Card>
            </div>

            {/* Detailed Policy */}
            <div className="space-y-8">
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">Return Conditions</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p>Items must be returned within 30 days of the original purchase date</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p>Products must be in original, unused condition with all tags attached</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p>Original packaging and dust bags must be included</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p>Proof of purchase (receipt or order confirmation) required</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">Non-Returnable Items</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>• Personalized or custom-made items</p>
                  <p>• Items damaged by normal wear and tear</p>
                  <p>• Products returned after 30 days</p>
                  <p>• Items without original tags or packaging</p>
                </div>
              </Card>

              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">Refund Information</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    <strong>Processing Time:</strong> Refunds are processed within 2-3 business days after we receive your return.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Refund Method:</strong> Refunds will be issued to the original payment method used for the purchase.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Shipping Costs:</strong> Original shipping costs are non-refundable unless the return is due to our error.
                  </p>
                </div>
              </Card>

              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">Exchanges</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We're happy to exchange your item for a different size, color, or style. Exchanges follow the same 
                    30-day timeframe and condition requirements as returns.
                  </p>
                  <p className="text-muted-foreground">
                    For exchanges, please contact us first to ensure the desired item is in stock.
                  </p>
                </div>
              </Card>
            </div>

            {/* Contact Section */}
            <Card className="p-8 mt-12 bg-muted/30">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Need Help with a Return?</h3>
                <p className="text-muted-foreground mb-6">
                  Our customer service team is here to make your return process as smooth as possible.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                    className="bg-[#25D366] hover:bg-[#20c55a] text-white"
                  >
                    Chat on WhatsApp
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/contact">Contact Support</a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReturnPolicy;
