import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { PointsSection } from "@/components/home/PointsSection";
import { RolesSection } from "@/components/home/RolesSection";
import { WorkspaceSection } from "@/components/home/WorkspaceSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <PartnersSection />
        <FeaturesSection />
        <PointsSection />
        <RolesSection />
        <WorkspaceSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
