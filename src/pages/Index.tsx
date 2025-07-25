import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturedCategories from '@/components/FeaturedCategories';
import BestSellers from '@/components/BestSellers';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCategories />
        <BestSellers />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
