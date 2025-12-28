import { Calculator, Truck, Wrench, Network, Lightbulb, Phone, FileSearch, Package, GraduationCap, Droplets, Wheat, ShoppingCart, Snowflake, Battery, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import solarHouseImage from "@/assets/solar-house-modern.jpg";
import solarMaintenanceImage from "@/assets/solar-maintenance.jpg";
import electricalWorkImage from "@/assets/electrical-work.jpg";
import solarRuralImage from "@/assets/solar-rural-installation.jpg";
import solarKitImage from "@/assets/solar-kit-complete.jpg";

const Services = () => {
  const { t } = useLanguage();
  const { getTitle, getBodyText } = usePageContent('home');
  const { isVisible: headerVisible, elementRef: headerRef } = useScrollAnimation({ threshold: 0.2 });
  const { isVisible: gridVisible, elementRef: gridRef } = useScrollAnimation({ threshold: 0.1 });
  const { isVisible: cardsVisible, elementRef: cardsRef } = useScrollAnimation({ threshold: 0.1 });
  const { isVisible: ctaVisible, elementRef: ctaRef } = useScrollAnimation({ threshold: 0.3 });
  
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/243819257778", "_blank");
  };

  const services = [
    {
      icon: Calculator,
      badge: "Assurez une Rentabilité Maximale",
      title: "Études et Dimensionnements Solaires",
      description: "Analyse complète de vos besoins énergétiques pour maximiser votre retour sur investissement.",
      image: solarHouseImage,
      features: [
        "Analyse complète de vos besoins énergétiques",
        "Calcul de rentabilité et plans techniques détaillés",
        "Simulation 3D et recommandations sur mesure",
        "Devis personnalisé gratuit"
      ]
    },
    {
      icon: Package,
      badge: "Optez pour la Tranquillité d'Esprit",
      title: "Installation Clé en Main",
      description: "Une installation professionnelle complète, de A à Z, pour une transition énergétique sans souci.",
      image: solarKitImage,
      features: [
        "Panneaux solaires haute performance",
        "Installation certifiée et mise en service professionnelle",
        "Formation utilisateur complète",
        "Suivi post-installation inclus"
      ]
    },
    {
      icon: Wrench,
      badge: "Garantissez une Fiabilité 24/7",
      title: "Maintenance et Dépannage",
      description: "Un service de maintenance préventive et corrective pour assurer la longévité de votre installation.",
      image: solarMaintenanceImage,
      features: [
        "Maintenance préventive régulière",
        "Dépannage rapide 24h/7j",
        "Pièces de rechange d'origine",
        "Garantie étendue sur les interventions"
      ]
    },
    {
      icon: Network,
      badge: "Optimisez votre Indépendance Énergétique",
      title: "Solutions Hybrides et On-Grid",
      description: "Des systèmes intelligents combinant plusieurs sources d'énergie pour une autonomie maximale.",
      image: electricalWorkImage,
      features: [
        "Systèmes combinant solaire, réseau et stockage",
        "Monitoring avancé en temps réel",
        "Optimisation continue des performances",
        "Revente d'excédent d'énergie possible"
      ]
    },
    {
      icon: Lightbulb,
      badge: "Bénéficiez d'un Accompagnement Expert",
      title: "Audit et Conseil Technique",
      description: "Un accompagnement personnalisé pour tous vos projets d'énergie renouvelable.",
      image: solarRuralImage,
      features: [
        "Audit énergétique complet",
        "Conseil technique personnalisé",
        "Accompagnement administratif",
        "Suivi de projet de A à Z"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-solar-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Overview */}
        <div className="mb-20">
          <div 
            ref={headerRef}
            className={`text-center mb-12 scroll-animate ${headerVisible ? 'in-view' : ''}`}
          >
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-primary font-medium">{t('services.title')}</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {getTitle('services_overview', t('services.overview.title'))}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              {getBodyText('services_overview', t('services.overview.description'))}
            </p>
          </div>

          {/* Services Grid */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Études et Dimensionnements Solaires", desc: "Analyse complète de vos besoins, calcul de rentabilité et plans techniques détaillés avec simulation 3D", icon: FileSearch },
              { title: "Installation Clé en Main", desc: "Panneaux solaires haute performance, installation certifiée et mise en service professionnelle", icon: Package },
              { title: "Maintenance et Dépannage 24h/7j", desc: "Maintenance préventive, dépannage rapide, pièces de rechange et garantie étendue", icon: Wrench },
              { title: "Solutions Hybrides et On-Grid", desc: "Systèmes combinant solaire, réseau électrique et stockage avec monitoring avancé", icon: Network },
              { title: "Audit Énergétique et Conseil", desc: "Évaluation complète de votre consommation et recommandations personnalisées", icon: Calculator },
              { title: "Formation Utilisateur", desc: "Formation complète sur l'utilisation et l'entretien de votre installation solaire", icon: GraduationCap },
              { title: "Installation de Systèmes d'Irrigation Solaire", desc: "Solutions d'irrigation alimentées par l'énergie solaire pour l'agriculture", icon: Droplets },
              { title: "Équipements Agricoles et Avicoles", desc: "Fourniture et installation d'équipements pour l'agriculture et l'élevage", icon: Wheat },
              { title: "China Drop Shipping", desc: "Importation et livraison de tous vos équipements solaires et électriques", icon: ShoppingCart },
              { title: "Réfrigération et Climatisation Solaire", desc: "Solutions de froid alimentées par l'énergie solaire pour commerces et industries", icon: Snowflake },
              { title: "Stockage par Batteries", desc: "Systèmes de stockage haute capacité pour une autonomie énergétique maximale", icon: Battery },
              { title: "Optimisation Continue", desc: "Suivi et optimisation de vos installations pour des performances maximales", icon: TrendingUp }
            ].map((service, index) => (
              <Card 
                key={index} 
                className={`p-5 hover-lift bg-background border-border group scroll-animate-scale ${gridVisible ? 'in-view' : ''}`}
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm text-foreground font-semibold leading-relaxed mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className={`text-center mb-16 scroll-animate ${headerVisible ? 'in-view' : ''}`}>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {getTitle('services', t('services.heading'))}
            <span className="block gradient-text">{t('services.subheading')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {getBodyText('services', t('services.description'))}
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`group hover-lift bg-background border-border overflow-hidden scroll-animate-left ${cardsVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full shadow-lg">
                    {service.badge}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
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
        <div 
          ref={ctaRef}
          className={`text-center bg-card rounded-2xl p-8 shadow-solar scroll-animate-scale ${ctaVisible ? 'in-view' : ''}`}
        >
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