import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { PointsSection } from "@/components/home/PointsSection";
import { WorkspaceSection } from "@/components/home/WorkspaceSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PointsSection />
        <WorkspaceSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
