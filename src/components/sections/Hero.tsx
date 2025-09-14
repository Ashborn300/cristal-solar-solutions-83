import { ArrowRight, Zap, Users, Award, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedNumber from "@/components/common/AnimatedNumber";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import solarFieldImage from "@/assets/solar-panels-field.jpg";

const Hero = () => {
  const { isVisible: statsVisible, elementRef: statsRef } = useScrollAnimation({ threshold: 0.5 });

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/243819257778", "_blank");
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={solarFieldImage}
          alt="Installation solaire CRISTAL"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-sm font-medium flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  14 ans d'expertise certifiée
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight animate-fadeInUp">
                Solutions Solaires
                <span className="block text-white text-shadow">
                  Durables & Fiables
                </span>
              </h1>

              <p className="text-xl text-white/90 max-w-lg animate-fadeInUp animation-delay-200">
                CRISTAL ALTERNATIVE ENGINEERING - Votre partenaire de confiance pour 
                l'énergie solaire à Kinshasa. Études, installation, maintenance et conseil.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-6 py-8 animate-fadeInUp animation-delay-400">
              <div className="text-center">
                <div className="text-3xl font-bold text-white animate-counter">
                  <AnimatedNumber value={14} suffix="+" />
                </div>
                <div className="text-sm text-white/80">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white animate-counter">
                  <AnimatedNumber value={500} suffix="+" delay={200} />
                </div>
                <div className="text-sm text-white/80">Projets réalisés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white animate-counter">
                  <AnimatedNumber value={98} suffix="%" delay={400} />
                </div>
                <div className="text-sm text-white/80">Clients satisfaits</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-600">
              <Button
                onClick={scrollToContact}
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-warm group"
              >
                <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Devis Gratuit
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={handleWhatsAppClick}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-white/10 backdrop-blur-sm"
              >
                <Phone className="w-5 h-5 mr-2" />
                Contact WhatsApp
              </Button>
            </div>
          </div>

          {/* Right Content - Features */}
          <div className="space-y-6 animate-slideInLeft animation-delay-400">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover-lift">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-solar-orange rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Solutions Complètes
                  </h3>
                  <p className="text-white/80">
                    De l'étude à l'installation, nous couvrons tous vos besoins en énergie solaire.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover-lift">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-solar-green rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Expertise Locale
                  </h3>
                  <p className="text-white/80">
                    14 ans d'expérience au service des entreprises et particuliers de Kinshasa.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover-lift">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Garantie Qualité
                  </h3>
                  <p className="text-white/80">
                    Maintenance et support technique pour la durabilité de vos installations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;