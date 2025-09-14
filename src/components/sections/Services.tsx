import { Calculator, Truck, Wrench, Network, Lightbulb, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import solarTeamImage from "@/assets/solar-team-planning.jpg";
import solarMaintenanceImage from "@/assets/solar-maintenance.jpg";
import electricalWorkImage from "@/assets/electrical-work.jpg";
import solarRuralImage from "@/assets/solar-rural-installation.jpg";
import constructionTeamImage from "@/assets/construction-team.jpg";

const Services = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/243819257778", "_blank");
  };

  const services = [
    {
      icon: Calculator,
      title: "Études et Dimensionnements Solaires",
      description: "Analyse complète de vos besoins énergétiques et conception sur mesure de votre installation solaire pour une efficacité optimale.",
      image: solarTeamImage,
      features: ["Analyse de consommation", "Calcul de rentabilité", "Plans techniques détaillés", "Simulation 3D"]
    },
    {
      icon: Truck,
      title: "Fourniture et Installation",
      description: "Approvisionnement en équipements solaires de qualité premium et installation professionnelle par nos équipes certifiées.",
      image: constructionTeamImage,
      features: ["Panneaux haute performance", "Installation certifiée", "Mise en service", "Formation utilisateur"]
    },
    {
      icon: Wrench,
      title: "Maintenance et Dépannage",
      description: "Service après-vente complet avec maintenance préventive et interventions rapides pour assurer la longévité de vos équipements.",
      image: solarMaintenanceImage,
      features: ["Maintenance préventive", "Dépannage 24h/7j", "Pièces de rechange", "Garantie étendue"]
    },
    {
      icon: Network,
      title: "Solutions Hybrides et On-Grid",
      description: "Systèmes innovants combinant solaire, réseau électrique et stockage pour une alimentation continue et optimisée.",
      image: electricalWorkImage,
      features: ["Systèmes hybrides", "Connexion réseau", "Stockage intelligent", "Monitoring avancé"]
    },
    {
      icon: Lightbulb,
      title: "Conseil Technique Énergies Renouvelables",
      description: "Expertise technique et conseil stratégique pour optimiser votre transition vers les énergies renouvelables.",
      image: solarRuralImage,
      features: ["Audit énergétique", "Conseil stratégique", "Formation technique", "Accompagnement projet"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-solar-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-medium">Nos Services</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Solutions Solaires
            <span className="block gradient-text">Complètes & Professionnelles</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez notre gamme complète de services pour votre transition vers l'énergie solaire.
            Plus de 14 ans d'expertise au service de vos projets énergétiques.
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
                  Demander un devis
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-card rounded-2xl p-8 shadow-solar">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Prêt à passer au solaire ?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour une consultation gratuite et découvrez comment 
            l'énergie solaire peut transformer votre consommation énergétique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleWhatsAppClick}
              size="lg"
              className="gradient-primary text-white shadow-warm"
            >
              <Phone className="w-5 h-5 mr-2" />
              Consultation Gratuite
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              En savoir plus
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;