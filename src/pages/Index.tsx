import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryBanner } from "@/components/home/CategoryBanner";
import { VendorSpotlight } from "@/components/home/VendorSpotlight";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProducts />
        <CategoryBanner />
        <VendorSpotlight />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
