import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { EcosystemSection } from "../components/EcosystemSection";
import { CapabilitiesSection } from "../components/CapabilitiesSection";
import { TrustedBrandsSection } from "../components/TrustedBrandsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { TeamSection } from "../components/TeamSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { Footer } from "../components/Footer";

export function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EcosystemSection />
      <CapabilitiesSection />
      <TrustedBrandsSection />
      <ProjectsSection />
      <TeamSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}