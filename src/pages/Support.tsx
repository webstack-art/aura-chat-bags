import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail, Phone, MapPin, Clock, Headphones } from 'lucide-react';

const Support = () => {
  const supportOptions = [
    {
      icon: MessageCircle,
      title: "WhatsApp Chat",
      description: "Get instant help through our WhatsApp support. Available 24/7 for your convenience.",
      action: "Start Chat",
      actionFn: () => window.open('https://wa.me/1234567890', '_blank'),
      availability: "24/7 Available",
      color: "bg-[#25D366]"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message and we'll get back to you within 24 hours.",
      action: "Send Email",
      actionFn: () => window.location.href = 'mailto:support@aurabags.com',
      availability: "Response within 24h",
      color: "bg-blue-500"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our customer service team for immediate assistance.",
      action: "Call Now",
      actionFn: () => window.location.href = 'tel:+1234567890',
      availability: "Mon-Fri 9AM-6PM",
      color: "bg-green-500"
    }
  ];

  const helpTopics = [
    {
      title: "Order Issues",
      description: "Help with tracking, modifications, or cancellations",
      icon: "📦"
    },
    {
      title: "Product Information",
      description: "Details about materials, sizing, and care instructions",
      icon: "👜"
    },
    {
      title: "Returns & Exchanges",
      description: "Assistance with return process and exchanges",
      icon: "🔄"
    },
    {
      title: "Payment Questions",
      description: "Help with payment methods and billing inquiries",
      icon: "💳"
    },
    {
      title: "Shipping Information",
      description: "Delivery options, costs, and timeframes",
      icon: "🚚"
    },
    {
      title: "Account Support",
      description: "Help with account management and preferences",
      icon: "👤"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Headphones className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Customer Support
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're here to help! Get the support you need, when you need it.
            </p>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Can We Help You?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose your preferred way to get in touch with our support team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {supportOptions.map((option, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-luxury transition-all duration-300">
                <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <option.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{option.title}</h3>
                <p className="text-muted-foreground mb-4">{option.description}</p>
                <div className="mb-4">
                  <span className="text-sm bg-muted px-3 py-1 rounded-full">{option.availability}</span>
                </div>
                <Button onClick={option.actionFn} className="w-full">
                  {option.action}
                </Button>
              </Card>
            ))}
          </div>

          {/* Help Topics */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Popular Help Topics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpTopics.map((topic, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={() => window.open('https://wa.me/1234567890', '_blank')}>
                  <div className="text-center">
                    <div className="text-4xl mb-3">{topic.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
                    <p className="text-muted-foreground text-sm">{topic.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Contact Information</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <span>WhatsApp: +1 (234) 567-8900</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>Email: support@aurabags.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>Phone: +1 (234) 567-8900</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>123 Fashion Street, Style City, SC 12345</span>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <h3 className="text-xl font-semibold mb-6">Support Hours</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">WhatsApp Support</p>
                      <p className="text-muted-foreground text-sm">24/7 Available</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-muted-foreground text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-muted-foreground text-sm">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-muted-foreground text-sm">Sunday: Closed</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-muted-foreground text-sm">Response within 24 hours</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-8 text-center bg-gradient-to-r from-primary/10 to-primary/5">
            <h2 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h2>
            <p className="text-muted-foreground mb-6">
              Our WhatsApp support is available 24/7 for urgent inquiries and immediate help.
            </p>
            <Button
              onClick={() => window.open('https://wa.me/1234567890', '_blank')}
              className="bg-[#25D366] hover:bg-[#20c55a] text-white"
              size="lg"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Chat Now on WhatsApp
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Support;
