import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { CalculatorSection } from "@/components/landing/CalculatorSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { PartnershipSection } from "@/components/landing/PartnershipSection";

/**
 * HomePage Component
 * 
 * Main landing page for Oferticando. Fully optimized as a Next.js Server Component,
 * delegating client-side interactions and animations to specialized, isolated components.
 */
export default function HomePage() {
  return (
    <div className="bg-[#fafafa] min-h-screen text-gray-900 font-sans selection:bg-orange-100 selection:text-secondary antialiased overflow-hidden pb-24">
      <HeroSection />
      <FeaturesSection />
      <CalculatorSection />
      <PricingSection />
      <PartnershipSection />
    </div>
  );
}

