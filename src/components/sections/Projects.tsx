import { ExternalLink, MapPin, Zap, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AnimatedNumber from "@/components/common/AnimatedNumber";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import solarFieldImage from "@/assets/solar-panels-field.jpg";
import solarTeamImage from "@/assets/solar-team-planning.jpg";
import solarRuralImage from "@/assets/solar-rural-installation.jpg";
import constructionTeamImage from "@/assets/construction-team.jpg";

const Projects = () => {
  const { isVisible, elementRef } = useScrollAnimation({ threshold: 0.3 });

  const projects = [
    {
      title: "Complexe Industriel MINABAT",
      category: "Industriel",
      location: "Zone Industrielle, Kinshasa",
      power: "200 kW",
      year: "2023",
      duration: "3 mois",
      description: "Installation d'un système solaire hybride pour alimenter l'usine de fabrication. Solution complète avec stockage et connexion réseau.",
      image: solarFieldImage,
      features: ["Panneaux monocristallins", "Stockage 500kWh", "Monitoring intelligent", "Maintenance préventive"],
      savings: "75% de réduction des coûts énergétiques",
      beneficiaries: "150 employés"
    },
    {
      title: "Hôpital Général de Référence",
      category: "Médical",
      location: "Commune de Lemba, Kinshasa",
      power: "100 kW",
      year: "2023",
      duration: "2 mois",
      description: "Système solaire critique pour assurer l'alimentation continue des équipements médicaux. Redondance et fiabilité maximales.",
      image: solarTeamImage,
      features: ["Système redondant", "UPS médical", "Monitoring 24/7", "Maintenance d'urgence"],
      savings: "Alimentation continue garantie",
      beneficiaries: "5000 patients/mois"
    },
    {
      title: "Villages Ruraux - Projet PNUD",
      category: "Rural",
      location: "Province du Kwilu",
      power: "50 kW",
      year: "2022",
      duration: "6 mois",
      description: "Électrification de 5 villages ruraux via micro-réseaux solaires. Accès à l'électricité pour écoles, centres de santé et ménages.",
      image: solarRuralImage,
      features: ["Micro-réseaux", "Stockage communautaire", "Formation locale", "Gestion participative"],
      savings: "Première électrification",
      beneficiaries: "2000 habitants"
    },
    {
      title: "Centre Commercial Victoire",
      category: "Commercial",
      location: "Boulevard du 30 Juin, Kinshasa",
      power: "80 kW",
      year: "2022",
      duration: "1 mois",
      description: "Installation solaire pour réduire les coûts opérationnels du centre commercial. Système hybride avec injection réseau.",
      image: constructionTeamImage,
      features: ["Injection réseau", "Monitoring temps réel", "Maintenance préventive", "Optimisation consommation"],
      savings: "60% de réduction des coûts",
      beneficiaries: "50 commerces"
    }
  ];

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/243819257778", "_blank");
  };

  return (
    <section ref={elementRef} id="realisations" className="py-20 bg-solar-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-medium">Nos Réalisations</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Projets Solaires
            <span className="block gradient-text">Réalisés avec Succès</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez quelques-uns de nos projets phares qui illustrent notre expertise 
            dans différents secteurs d'activité.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="group hover-lift bg-background border-border overflow-hidden animate-fadeInUp"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary font-medium text-sm rounded-full">
                    {project.category}
                  </span>
                </div>

                {/* Power Badge */}
                <div className="absolute bottom-4 right-4">
                  <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="font-medium text-sm">{project.power}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Project Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {project.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {project.year}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4 text-sm">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2 text-sm">Caractéristiques principales:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs text-muted-foreground">
                        <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="bg-solar-light p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="font-semibold text-success text-sm">{project.savings}</div>
                      <div className="text-xs text-muted-foreground">Économies réalisées</div>
                    </div>
                    <div>
                      <div className="font-semibold text-primary text-sm flex items-center justify-center">
                        <Users className="w-3 h-3 mr-1" />
                        {project.beneficiaries}
                      </div>
                      <div className="text-xs text-muted-foreground">Bénéficiaires</div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Durée: {project.duration}
                  </div>
                  <Button
                    onClick={handleWhatsAppClick}
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Projet similaire
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Section */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Votre Projet Solaire Nous Intéresse
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Chaque projet est unique. Notre équipe d'experts étudie vos besoins spécifiques 
              pour vous proposer la solution solaire la plus adaptée et rentable.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
              <div>
                <div className="text-2xl font-bold gradient-text mb-1">
                  <AnimatedNumber value={500} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">Projets réalisés</div>
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text mb-1">
                  <AnimatedNumber value={150} suffix="MW" delay={200} />
                </div>
                <div className="text-sm text-muted-foreground">Puissance installée</div>
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text mb-1">
                  <AnimatedNumber value={50} suffix="+" delay={400} />
                </div>
                <div className="text-sm text-muted-foreground">Localités desservies</div>
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text mb-1">
                  <AnimatedNumber value={14} suffix="+" delay={600} />
                </div>
                <div className="text-sm text-muted-foreground">Années d'expérience</div>
              </div>
            </div>

            <Button
              onClick={handleWhatsAppClick}
              size="lg"
              className="gradient-primary text-white shadow-warm"
            >
              <Zap className="w-5 h-5 mr-2" />
              Discuter de Votre Projet
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Projects;