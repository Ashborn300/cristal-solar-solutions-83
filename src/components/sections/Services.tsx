import { Calculator, Truck, Wrench, Network, Lightbulb, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import solarHouseImage from "@/assets/solar-house-modern.jpg";
import solarMaintenanceImage from "@/assets/solar-maintenance.jpg";
import electricalWorkImage from "@/assets/electrical-work.jpg";
import solarRuralImage from "@/assets/solar-rural-installation.jpg";
import solarKitImage from "@/assets/solar-kit-complete.jpg";

const Services = () => {
  const { t } = useLanguage();
  const { isVisible, elementRef } = useScrollAnimation({ threshold: 0.2 });
  
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/243819257778", "_blank");
  };

  const services = [
    {
      icon: Calculator,
      title: t('services.studies.title'),
      description: t('services.studies.description'),
      image: solarHouseImage,
      features: [t('services.studies.feature1'), t('services.studies.feature2'), t('services.studies.feature3'), t('services.studies.feature4')]
    },
    {
      icon: Truck,
      title: t('services.supply.title'),
      description: t('services.supply.description'),
      image: solarKitImage,
      features: [t('services.supply.feature1'), t('services.supply.feature2'), t('services.supply.feature3'), t('services.supply.feature4')]
    },
    {
      icon: Wrench,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.description'),
      image: solarMaintenanceImage,
      features: [t('services.maintenance.feature1'), t('services.maintenance.feature2'), t('services.maintenance.feature3'), t('services.maintenance.feature4')]
    },
    {
      icon: Network,
      title: t('services.hybrid.title'),
      description: t('services.hybrid.description'),
      image: electricalWorkImage,
      features: [t('services.hybrid.feature1'), t('services.hybrid.feature2'), t('services.hybrid.feature3'), t('services.hybrid.feature4')]
    },
    {
      icon: Lightbulb,
      title: t('services.consulting.title'),
      description: t('services.consulting.description'),
      image: solarRuralImage,
      features: [t('services.consulting.feature1'), t('services.consulting.feature2'), t('services.consulting.feature3'), t('services.consulting.feature4')]
    }
  ];

  return (
    <section ref={elementRef} id="services" className={`py-20 bg-solar-light scroll-animate ${isVisible ? 'in-view' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 scroll-animate ${isVisible ? 'in-view' : ''}`}>
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-medium">{t('services.title')}</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('services.heading')}
            <span className="block gradient-text">{t('services.subheading')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('services.description')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover-lift bg-background border-border overflow-hidden animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleWhatsAppClick}
                  variant="outline"
                  className="w-full group border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {t('services.requestQuote')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`text-center bg-card rounded-2xl p-8 shadow-solar scroll-animate-scale ${isVisible ? 'in-view' : ''}`}>
          <h3 className="text-2xl font-bold text-foreground mb-4">
            {t('services.cta.title')}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t('services.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleWhatsAppClick}
              size="lg"
              className="gradient-primary text-white shadow-warm"
            >
              <Phone className="w-5 h-5 mr-2" />
              {t('services.cta.freeConsultation')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t('services.cta.learnMore')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;