import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What materials are your handbags made from?",
      answer: "Our handbags are crafted from premium materials including genuine Italian leather, vegan leather alternatives, satin, and high-quality synthetic materials. Each product page details the specific materials used."
    },
    {
      question: "How do I care for my leather handbag?",
      answer: "To maintain your leather handbag: 1) Clean with a soft, dry cloth regularly 2) Use leather conditioner every 3-6 months 3) Store in a dust bag when not in use 4) Avoid exposure to direct sunlight and moisture 5) Professional cleaning is recommended for stubborn stains."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused items in original condition with tags attached. Returns must be initiated within 30 days of purchase. Custom or personalized items are not eligible for return."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship internationally to most countries. Shipping costs and delivery times vary by location. International customers are responsible for any customs duties or taxes that may apply."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email or WhatsApp. You can use this number to track your package on our carrier's website. For any tracking issues, please contact our support team."
    },
    {
      question: "Are your products authentic?",
      answer: "Absolutely! All our products are 100% authentic and sourced directly from authorized manufacturers. We guarantee the authenticity of every item we sell."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We primarily process orders through WhatsApp for a personalized experience. We accept various payment methods including bank transfers, mobile payments, and cash on delivery (where available)."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary by location: Local delivery: 1-2 business days, National shipping: 3-5 business days, International shipping: 7-14 business days. Express shipping options are available for faster delivery."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our products, shipping, and policies
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-4">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-8">
              Our customer support team is here to help you with any questions or concerns
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                className="bg-[#25D366] hover:bg-[#20c55a] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Chat on WhatsApp
              </button>
              <a
                href="/contact"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
