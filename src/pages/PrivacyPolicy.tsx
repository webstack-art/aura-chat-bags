import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Shield, Lock, Eye, Database } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we protect and use your information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: July 25, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Introduction */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Lock className="h-6 w-6 text-primary mr-3" />
                Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At Aura Bags, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
                or use our services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By using our services, you consent to the data practices described in this policy. If you do not agree with our practices, 
                please do not use our services.
              </p>
            </Card>

            {/* Information We Collect */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Database className="h-6 w-6 text-primary mr-3" />
                1. Information We Collect
              </h2>
              
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Personal Information</h3>
                  <p className="mb-3">We may collect personal information that you voluntarily provide to us, including:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Name and contact information (email, phone number, address)</li>
                    <li>Payment information (processed securely through third-party providers)</li>
                    <li>Shipping and billing addresses</li>
                    <li>Order history and preferences</li>
                    <li>Communication preferences</li>
                    <li>WhatsApp contact information for order communication</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Automatically Collected Information</h3>
                  <p className="mb-3">When you visit our website, we may automatically collect:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>IP address and browser information</li>
                    <li>Device type and operating system</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Referring website information</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>Search queries and browsing behavior</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Third-Party Information</h3>
                  <p className="mb-3">We may receive information from third parties such as:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Social media platforms (if you connect your accounts)</li>
                    <li>Analytics providers</li>
                    <li>Payment processors</li>
                    <li>Shipping and logistics partners</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* How We Use Information */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We use the information we collect for various purposes, including:</p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Service Provision</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Processing and fulfilling orders</li>
                      <li>Providing customer support</li>
                      <li>Sending order confirmations and updates</li>
                      <li>Managing returns and exchanges</li>
                      <li>WhatsApp communication for orders</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Business Operations</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Improving our website and services</li>
                      <li>Analyzing usage patterns and trends</li>
                      <li>Preventing fraud and ensuring security</li>
                      <li>Legal compliance and dispute resolution</li>
                      <li>Marketing and promotional activities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* Information Sharing */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">3. How We Share Your Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We may share your information in the following circumstances:</p>
                
                <div className="space-y-4 mt-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Service Providers</h3>
                    <p>We share information with trusted third-party service providers who help us operate our business, including:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>Payment processors and financial institutions</li>
                      <li>Shipping and logistics companies</li>
                      <li>Email and communication service providers</li>
                      <li>Analytics and marketing platforms</li>
                      <li>Cloud storage and hosting services</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Legal Requirements</h3>
                    <p>We may disclose information when required by law or to:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>Comply with legal processes or government requests</li>
                      <li>Protect our rights, property, or safety</li>
                      <li>Prevent fraud or illegal activities</li>
                      <li>Enforce our terms and policies</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Business Transfers</h3>
                    <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Data Security */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We implement appropriate security measures to protect your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Secure payment processing through certified providers</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and employee training</li>
                  <li>Secure server infrastructure and monitoring</li>
                </ul>
                <p className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
                  <strong>Important:</strong> While we strive to protect your information, no method of transmission over the Internet 
                  or electronic storage is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>
            </Card>

            {/* Cookies and Tracking */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking Technologies</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We use cookies and similar technologies to enhance your experience:</p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Types of Cookies</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Essential:</strong> Required for basic website functionality</li>
                      <li><strong>Analytics:</strong> Help us understand website usage</li>
                      <li><strong>Marketing:</strong> Used for targeted advertising</li>
                      <li><strong>Preferences:</strong> Remember your settings and choices</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Your Choices</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Browser settings to block or delete cookies</li>
                      <li>Opt-out of analytics tracking</li>
                      <li>Disable targeted advertising</li>
                      <li>Contact us for assistance with preferences</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* Your Rights */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Eye className="h-6 w-6 text-primary mr-3" />
                6. Your Privacy Rights
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Access and Control</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Access your personal information</li>
                      <li>Correct inaccurate information</li>
                      <li>Delete your personal information</li>
                      <li>Restrict processing of your data</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Data Portability</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Receive a copy of your data</li>
                      <li>Transfer data to another service</li>
                      <li>Object to certain processing</li>
                      <li>Withdraw consent where applicable</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800">
                    <strong>To exercise your rights:</strong> Contact us using the information provided at the end of this policy. 
                    We will respond to your request within the timeframe required by applicable law.
                  </p>
                </div>
              </div>
            </Card>

            {/* Children's Privacy */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">7. Children's Privacy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>
                <p>If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately so we can delete such information.</p>
              </div>
            </Card>

            {/* International Transfers */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">8. International Data Transfers</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li>Adequacy decisions by relevant authorities</li>
                  <li>Standard contractual clauses</li>
                  <li>Binding corporate rules</li>
                  <li>Certification schemes and codes of conduct</li>
                </ul>
              </div>
            </Card>

            {/* Retention */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">9. Data Retention</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We retain your personal information for as long as necessary to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li>Provide our services and fulfill orders</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes and enforce agreements</li>
                  <li>Improve our services and business operations</li>
                </ul>
                <p className="mt-4">When information is no longer needed, we securely delete or anonymize it in accordance with our data retention policies.</p>
              </div>
            </Card>

            {/* Changes to Policy */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">10. Changes to This Privacy Policy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We may update this Privacy Policy from time to time. When we make changes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li>We will post the updated policy on our website</li>
                  <li>We will update the "Last updated" date</li>
                  <li>For significant changes, we may notify you by email or website notice</li>
                  <li>Your continued use of our services constitutes acceptance of changes</li>
                </ul>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
                <div className="bg-muted p-6 rounded-lg mt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p><strong>Privacy Officer:</strong></p>
                      <p>Email: privacy@aurabags.com</p>
                      <p>Phone: +1 (234) 567-8900</p>
                    </div>
                    <div>
                      <p><strong>Mailing Address:</strong></p>
                      <p>Aura Bags Privacy Team</p>
                      <p>123 Fashion Street</p>
                      <p>Style City, SC 12345</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm mt-4">
                  We will respond to your inquiry within 30 days of receipt, or sooner as required by applicable law.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h2>
            <p className="text-muted-foreground mb-6">
              Our privacy team is here to help you understand how we protect your information.
            </p>
            <Button
              onClick={() => window.open('https://wa.me/1234567890?text=Hi! I have questions about your Privacy Policy.', '_blank')}
              className="bg-[#25D366] hover:bg-[#20c55a] text-white"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Privacy Team
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
