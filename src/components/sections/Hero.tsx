import { ArrowRight, Zap, Users, Award, Phone, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedNumber from "@/components/common/AnimatedNumber";
// Updated to use Supabase content
import CVDownloadButton from "@/components/common/CVDownloadButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { usePageContent } from "@/hooks/usePageContent";
import solarFieldImage from "@/assets/solar-panels-field.jpg";

const Hero = () => {
  const { isVisible: statsVisible, elementRef: statsRef } = useScrollAnimation({ threshold: 0.5 });
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { getTitle, getBodyText, getImageUrl } = usePageContent('home');

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/243819257778", "_blank");
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGalleryClick = () => {
    navigate("/gallery");
  };

  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={solarFieldImage}
          alt="CRISTAL ENTERPRISES - CRISTAL ALTERNATIVE ENGINEERING Installation solaire Kinshasa"
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
                  {getTitle('hero_badge', t('hero.badge'))}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight animate-fadeInUp">
                {getTitle('hero', t('hero.title'))}
                <span className="block text-white text-shadow">
                  {getTitle('hero_subtitle', t('hero.subtitle'))}
                </span>
              </h1>

              <p className="text-xl text-white/90 max-w-lg animate-fadeInUp animation-delay-200">
                {getBodyText('hero_description', t('hero.description'))}
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-6 py-8 animate-fadeInUp animation-delay-400">
              <div className="text-center">
                <div className="text-3xl font-bold text-white animate-counter">
                  <AnimatedNumber value={14} suffix="+" />
                </div>
                <div className="text-sm text-white/80">{t('hero.years')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white animate-counter">
                  <AnimatedNumber value={500} suffix="+" delay={200} />
                </div>
                <div className="text-sm text-white/80">{t('hero.projects')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white animate-counter">
                  <AnimatedNumber value={98} suffix="%" delay={400} />
                </div>
                <div className="text-sm text-white/80">{t('hero.satisfaction')}</div>
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
                {t('hero.freeQuote')}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={handleWhatsAppClick}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-white/10 backdrop-blur-sm"
              >
                <Phone className="w-5 h-5 mr-2" />
                {t('hero.contactWhatsapp')}
              </Button>

              <Button
                onClick={handleGalleryClick}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-white/10 backdrop-blur-sm"
              >
                <Images className="w-5 h-5 mr-2" />
                {t('hero.viewGallery')}
              </Button>
            </div>

            {/* CV Download Section */}
            <div className="mt-6 animate-fadeInUp animation-delay-800">
              <CVDownloadButton 
                variant="outline" 
                className="justify-center sm:justify-start"
              >
                {t('hero.viewCV')}
              </CVDownloadButton>
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
                    {t('hero.completeSolutions')}
                  </h3>
                  <p className="text-white/80">
                    {t('hero.completeSolutionsDesc')}
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
                    {t('hero.localExpertise')}
                  </h3>
                  <p className="text-white/80">
                    {t('hero.localExpertiseDesc')}
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
                    {t('hero.qualityGuarantee')}
                  </h3>
                  <p className="text-white/80">
                    {t('hero.qualityGuaranteeDesc')}
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