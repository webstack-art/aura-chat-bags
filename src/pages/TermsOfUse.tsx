import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Scale, Shield, FileText } from 'lucide-react';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Scale className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Terms of Use
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using our services
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: July 25, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Introduction */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FileText className="h-6 w-6 text-primary mr-3" />
                Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Welcome to Aura Bags. These Terms of Use ("Terms") govern your use of our website, products, and services. 
                By accessing or using our services, you agree to be bound by these Terms.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If you do not agree to these Terms, please do not use our services. We may update these Terms from time to time, 
                and your continued use of our services constitutes acceptance of any changes.
              </p>
            </Card>

            {/* Acceptance of Terms */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>By using Aura Bags services, you confirm that:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You are at least 18 years old or have parental consent</li>
                  <li>You have the legal capacity to enter into these Terms</li>
                  <li>You will use our services in compliance with all applicable laws</li>
                  <li>All information you provide is accurate and up-to-date</li>
                </ul>
              </div>
            </Card>

            {/* Products and Services */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">2. Products and Services</h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-semibold text-foreground">Product Information</h3>
                <p>We strive to provide accurate product descriptions, images, and pricing. However:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Colors may vary due to monitor settings and lighting conditions</li>
                  <li>Product availability is subject to change without notice</li>
                  <li>We reserve the right to correct pricing errors at any time</li>
                  <li>All products are subject to availability and prior sale</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-foreground mt-6">Authenticity Guarantee</h3>
                <p>All products sold by Aura Bags are 100% authentic. We guarantee the authenticity of every item and will provide certificates of authenticity when applicable.</p>
              </div>
            </Card>

            {/* Ordering and Payment */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">3. Ordering and Payment</h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-semibold text-foreground">Order Process</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Orders are typically processed through WhatsApp for personalized service</li>
                  <li>We reserve the right to refuse or cancel any order at our discretion</li>
                  <li>Order confirmation does not guarantee product availability</li>
                  <li>All orders are subject to acceptance and inventory verification</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-foreground mt-6">Payment Terms</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Payment is required before shipping unless otherwise agreed</li>
                  <li>We accept various payment methods as communicated during the order process</li>
                  <li>All prices are subject to change without notice</li>
                  <li>Additional fees may apply for international orders</li>
                </ul>
              </div>
            </Card>

            {/* Shipping and Delivery */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">4. Shipping and Delivery</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Shipping times are estimates and not guaranteed</li>
                  <li>Risk of loss passes to you upon delivery to the carrier</li>
                  <li>We are not responsible for delays caused by shipping carriers</li>
                  <li>International customers are responsible for customs duties and taxes</li>
                  <li>Delivery address changes must be made before shipment</li>
                </ul>
              </div>
            </Card>

            {/* Returns and Exchanges */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">5. Returns and Exchanges</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Please refer to our separate Return Policy for detailed information about returns and exchanges. Key points include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>30-day return window for most items</li>
                  <li>Items must be in original condition with tags attached</li>
                  <li>Custom or personalized items are not eligible for return</li>
                  <li>Return shipping costs may apply</li>
                </ul>
              </div>
            </Card>

            {/* User Conduct */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">6. User Conduct</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>When using our services, you agree not to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use our services for any unlawful or fraudulent purpose</li>
                  <li>Interfere with or disrupt our services or servers</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use our content without proper authorization</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Harass, abuse, or harm other users or our staff</li>
                </ul>
              </div>
            </Card>

            {/* Intellectual Property */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>All content on our website, including but not limited to text, images, logos, and designs, is protected by intellectual property laws and belongs to Aura Bags or our licensors.</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li>You may not reproduce, distribute, or modify our content without permission</li>
                  <li>Product images are for display purposes only</li>
                  <li>Brand names and trademarks remain the property of their respective owners</li>
                  <li>Any user-generated content may be used by us for promotional purposes</li>
                </ul>
              </div>
            </Card>

            {/* Limitation of Liability */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>To the fullest extent permitted by law:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Our liability is limited to the amount you paid for the product or service</li>
                  <li>We are not liable for indirect, incidental, or consequential damages</li>
                  <li>We do not warrant that our services will be uninterrupted or error-free</li>
                  <li>Some jurisdictions do not allow limitation of liability, so these limits may not apply to you</li>
                </ul>
              </div>
            </Card>

            {/* Privacy */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">9. Privacy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.</p>
                <p>By using our services, you consent to the collection and use of your information as described in our Privacy Policy.</p>
              </div>
            </Card>

            {/* Termination */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">10. Termination</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We may terminate or suspend your access to our services at any time, with or without notice, for any reason, including violation of these Terms.</p>
                <p>Upon termination, your right to use our services will cease immediately.</p>
              </div>
            </Card>

            {/* Changes to Terms */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We reserve the right to modify these Terms at any time. Changes will be effective when posted on our website.</p>
                <p>Your continued use of our services after changes are posted constitutes acceptance of the new Terms.</p>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>If you have any questions about these Terms of Use, please contact us:</p>
                <div className="bg-muted p-4 rounded-lg mt-4">
                  <p><strong>Email:</strong> legal@aurabags.com</p>
                  <p><strong>WhatsApp:</strong> +1 (234) 567-8900</p>
                  <p><strong>Address:</strong> 123 Fashion Street, Style City, SC 12345</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Questions About Our Terms?</h2>
            <p className="text-muted-foreground mb-6">
              Our legal team is available to answer any questions you may have about these terms.
            </p>
            <Button
              onClick={() => window.open('https://wa.me/1234567890?text=Hi! I have questions about your Terms of Use.', '_blank')}
              className="bg-[#25D366] hover:bg-[#20c55a] text-white"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Legal Team
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfUse;
