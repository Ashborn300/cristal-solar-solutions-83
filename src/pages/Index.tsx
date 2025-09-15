import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Leadership from "@/components/sections/Leadership";
import Statistics from "@/components/sections/Statistics";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import WhatsAppFloat from "@/components/common/WhatsAppFloat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
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
      <section id="contact">
        <Contact />
      </section>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
