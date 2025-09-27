import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Leadership from "@/components/sections/Leadership";
import Statistics from "@/components/sections/Statistics";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CompanyInfo from "@/components/sections/CompanyInfo";
import FacebookSection from "@/components/sections/FacebookSection";
import Attestations from "@/components/sections/Attestations";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import WhatsAppFloat from "@/components/common/WhatsAppFloat";
import { usePageContent } from "@/hooks/usePageContent";

const LoadingSpinner = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const Index = () => {
  const { loading, error } = usePageContent('home');

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.error('Error loading page content:', error);
    // Continue rendering the page with fallback content
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <section id="accueil">
          <Hero />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="leadership">
          <Leadership />
        </section>
        <section id="statistics">
          <Statistics />
        </section>
        <section id="realisations">
          <Projects />
        </section>
        <section id="temoignages">
          <Testimonials />
        </section>
        <section id="faq">
          <FAQ />
        </section>
        <section id="company-info">
          <CompanyInfo />
        </section>
        <section id="facebook">
          <FacebookSection />
        </section>
        <section id="attestations">
          <Attestations />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <Footer />
        <WhatsAppFloat />
      </Suspense>
    </div>
  );
};

export default Index;
