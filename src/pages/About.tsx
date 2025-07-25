import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, Award, Shield, Truck, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Our Story
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Born from a passion for craftsmanship and timeless elegance, Aurabags represents 
            the perfect fusion of luxury, functionality, and modern sophistication.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Crafting Excellence Since 2015
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  What started as a small atelier in Milan has grown into a globally recognized 
                  brand synonymous with luxury handbags. Our journey began with a simple belief: 
                  every woman deserves a bag that's not just beautiful, but tells her story.
                </p>
                <p>
                  Each Aurabag is meticulously crafted by skilled artisans who have perfected 
                  their techniques over decades. We source only the finest materials from 
                  sustainable suppliers, ensuring that every piece meets our exacting standards 
                  for quality and ethics.
                </p>
                <p>
                  Today, we're proud to serve customers worldwide through our innovative 
                  WhatsApp-first approach, bringing personalized luxury shopping directly 
                  to your fingertips.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                alt="Artisan crafting handbag"
                className="w-full rounded-lg shadow-elegant"
              />
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=300&fit=crop"
                alt="Luxury materials"
                className="w-full rounded-lg shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Excellence',
                description: 'We never compromise on quality. Every stitch, every detail is perfected.'
              },
              {
                icon: Shield,
                title: 'Sustainability',
                description: 'Committed to ethical sourcing and environmentally responsible practices.'
              },
              {
                icon: Users,
                title: 'Craftsmanship',
                description: 'Our skilled artisans bring decades of experience to every piece.'
              },
              {
                icon: Truck,
                title: 'Innovation',
                description: 'Blending traditional techniques with modern design and technology.'
              }
            ].map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-luxury transition-all duration-300">
                <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind Aurabags
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Isabella Martinez',
                role: 'Founder & Creative Director',
                image: 'https://images.unsplash.com/photo-1494790108755-2616b6ff51a9?w=400&h=400&fit=crop',
                description: 'With over 15 years in luxury fashion, Isabella brings vision and artistry to every collection.'
              },
              {
                name: 'Marcus Chen',
                role: 'Head of Operations',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
                description: 'Marcus ensures our global operations run smoothly while maintaining our quality standards.'
              },
              {
                name: 'Sofia Rodriguez',
                role: 'Master Artisan',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
                description: 'Sofia leads our craftsmanship team, bringing three generations of leatherworking expertise.'
              }
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-luxury transition-all duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1 text-foreground">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground">{member.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience Luxury Today
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/80 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered the perfect blend 
            of style, quality, and personalized service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => window.location.href = '/shop'}
            >
              Shop Collection
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => window.open('https://wa.me/1234567890?text=Hi! I\'d like to learn more about Aurabags.', '_blank')}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Chat with Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;