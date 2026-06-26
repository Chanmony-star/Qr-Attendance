import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Trust } from "@/components/sections/trust";
import { DashboardPreview } from "@/components/sections/dashboard-preview";
import { Testimonials, FAQ } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Trust />
        <DashboardPreview />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
