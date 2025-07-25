import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { MessageCircle, Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                Contact Information
              </h2>
              <p className="text-muted-foreground mb-8">
                Reach out through any of these channels. We're here to help with your luxury handbag needs.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Phone,
                  title: 'Phone',
                  info: '+1 (555) 123-4567',
                  description: 'Mon-Fri 9am-6pm EST'
                },
                {
                  icon: Mail,
                  title: 'Email',
                  info: 'hello@aurabags.com',
                  description: 'We respond within 24 hours'
                },
                {
                  icon: MapPin,
                  title: 'Address',
                  info: '123 Fashion Avenue',
                  description: 'New York, NY 10001'
                },
                {
                  icon: MessageCircle,
                  title: 'WhatsApp',
                  info: '+1 (555) 123-4567',
                  description: 'Instant support & shopping',
                  action: () => window.open('https://wa.me/1234567890?text=Hi! I need assistance with Aurabags.', '_blank')
                }
              ].map((contact, index) => (
                <Card key={index} className="p-6 hover:shadow-luxury transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <contact.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{contact.title}</h3>
                      <p className="text-primary font-medium mb-1">{contact.info}</p>
                      <p className="text-sm text-muted-foreground">{contact.description}</p>
                      {contact.action && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3"
                          onClick={contact.action}
                        >
                          Contact via {contact.title}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick WhatsApp CTA */}
            <Card className="p-6 bg-[#25D366]/5 border-[#25D366]/20">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-[#25D366] mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Prefer to chat?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get instant answers on WhatsApp
                </p>
                <Button
                  variant="whatsapp"
                  className="w-full"
                  onClick={() => window.open('https://wa.me/1234567890?text=Hi! I need assistance with Aurabags.', '_blank')}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start WhatsApp Chat
                </Button>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us how we can help you..."
                    rows={6}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Business Hours */}
            <Card className="p-6 mt-8">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-semibold text-foreground">Business Hours</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-1">Customer Service</p>
                  <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM EST</p>
                  <p className="text-muted-foreground">Sunday: Closed</p>
                </div>
                <div>
                  <p className="font-medium mb-1">WhatsApp Support</p>
                  <p className="text-muted-foreground">Monday - Sunday: 8:00 AM - 10:00 PM EST</p>
                  <p className="text-accent text-xs mt-1">Usually responds within minutes</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: 'How do I place an order via WhatsApp?',
                answer: 'Simply click any "Buy on WhatsApp" button, and you\'ll be redirected to WhatsApp with a pre-filled message. Our team will guide you through the rest!'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, PayPal, bank transfers, and various digital payment methods through our secure WhatsApp ordering process.'
              },
              {
                question: 'Do you offer international shipping?',
                answer: 'Yes! We ship worldwide with express delivery options. Shipping costs and times vary by location.'
              },
              {
                question: 'What is your return policy?',
                answer: 'We offer a 30-day return policy for unused items in original condition. Contact us via WhatsApp to initiate a return.'
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold mb-3 text-foreground">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;