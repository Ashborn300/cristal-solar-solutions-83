import { ExternalLink, MapPin, Zap, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Updated to use Supabase content
import AnimatedNumber from "@/components/common/AnimatedNumber";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";
import solarFieldImage from "@/assets/solar-panels-field.jpg";
import solarTeamImage from "@/assets/solar-team-planning.jpg";
import solarRuralImage from "@/assets/solar-rural-installation.jpg";
import constructionTeamImage from "@/assets/construction-team.jpg";
import ministereFinancesImage from "@/assets/ministere-finances-project.jpg";
import laboratoireMycobacteriesImage from "@/assets/laboratoire-mycobacteries-project.jpg";
// Import gallery images
import projetMemling1 from "@/assets/projet-memling-1.jpg";
import projetMemling2 from "@/assets/projet-memling-2.jpg";
import projetMemling3 from "@/assets/projet-memling-3.jpg";
// Import Rigini project images
import projetRigini1 from "@/assets/projet-rigini-1.jpg";
import projetRigini2 from "@/assets/projet-rigini-2.jpg";
import projetRigini3 from "@/assets/projet-rigini-3.jpg";
import projetRigini4 from "@/assets/projet-rigini-4.jpg";
import projetRigini5 from "@/assets/projet-rigini-5.jpg";
// Import Rhigine Industrielle project images
import projetRhigineIndustrielle1 from "@/assets/projet-rhigine-industrielle-1.jpg";
import projetRhigineIndustrielle2 from "@/assets/projet-rhigine-industrielle-2.jpg";
import projetRhigineIndustrielle3 from "@/assets/projet-rhigine-industrielle-3.jpg";
import projetRhigineIndustrielle4 from "@/assets/projet-rhigine-industrielle-4.jpg";

const Projects = () => {
  const { isVisible, elementRef } = useScrollAnimation({ threshold: 0.3 });
  const { t } = useLanguage();
  const { getTitle, getBodyText } = usePageContent('home');

  const projects = [
    {
      title: "Ministère des Finances – Pointe-Noire et Brazzaville",
      category: "Études & Supervision",
      location: "Brazzaville et Pointe-Noire",
      power: "—",
      year: "2019–2022",
      duration: "04/06/2019 au 31/12/2022",
      client: "BANQUE MONDIALE / PRISP",
      description: "Réaliser l'étude de faisabilité et dimensionner les systèmes solaires photovoltaïques pour l'alimentation en énergie électrique des sites du Ministère des Finances à Pointe-Noire et Brazzaville. Élaborer le cahier des spécifications techniques du système solaire. Suivre, contrôler et réceptionner le système solaire lors de sa mise en œuvre.",
      image: ministereFinancesImage,
      features: ["Étude de faisabilité", "Dimensionnement PV", "Cahier des spécifications", "Suivi, contrôle et réception"],
      savings: "Livrables validés & mise en œuvre contrôlée",
      beneficiaries: "Ministère des Finances (PRISP)"
    },
    {
      title: "Laboratoire National de Mycobactéries",
      category: "Médical",
      location: "Kinshasa",
      power: "—",
      year: "2022",
      duration: "07/2022",
      client: "USAID/IDDS/ICF",
      description: "Consultant international en charge de : Réaliser l'étude de faisabilité et dimensionner les systèmes solaires photovoltaïques pour le Laboratoire national de Mycobactéries pour le Programme National de Lutte Contre la Tuberculose.",
      image: laboratoireMycobacteriesImage,
      features: ["Étude de faisabilité", "Dimensionnement PV", "Laboratoire médical", "Programme tuberculose"],
      savings: "Étude complétée avec succès",
      beneficiaries: "Programme National de Lutte Contre la Tuberculose"
    },
    {
      title: "Villa Moderne - Ma Campagne",
      category: "Résidentiel",
      location: "Kinshasa",
      power: "5.7 kW",
      year: "2022",
      duration: "10/2022",
      client: "Madame Solange",
      description: "Expert en charge de la conception, du suivi et évaluation de l'installation solaire d'une villa moderne à Ma Campagne. Système Solaire de 5700WC, 20 KWH, 10 KVA.",
      image: constructionTeamImage,
      features: [
        "Système 5700WC",
        "Stockage 20 KWH", 
        "Onduleur 10 KVA",
        "Suivi et évaluation"
      ],
      savings: "Installation complète validée",
      beneficiaries: "Villa résidentielle"
    },
    {
      title: "Villa Moderne - Lemba RIGINI",
      category: "Résidentiel",
      location: "Kinshasa",
      power: "5.7 kW",
      year: "2022",
      duration: "12/2022",
      client: "Madame Noëlla",
      description: "Expert en charge de la conception, du suivi et évaluation de l'installation solaire d'une villa moderne à Lemba RIGINI. Système Solaire de 5700WC, 20 KWH, 10 KVA.",
      image: solarTeamImage,
      features: [
        "Système 5700WC",
        "Stockage 20 KWH",
        "Onduleur 10 KVA",
        "Suivi et évaluation"
      ],
      savings: "Installation complète validée",
      beneficiaries: "Villa résidentielle"
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
            <span className="text-primary font-medium">{t('projects.badge')}</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {getTitle('projects', t('projects.title'))}
            <span className="block gradient-text">{t('projects.subtitle')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {getBodyText('projects', t('projects.description'))}
          </p>
        </div>

        {/* Featured Project Gallery - Rigini Project */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Dernière Installation 2022
              <span className="block gradient-text">Projet Rigini - Kinshasa</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The last installation of 2022 at Rigini (Kinshasa)
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { image: projetRigini1, title: "Panneaux solaires sur toiture" },
              { image: projetRigini2, title: "Installation complète" },
              { image: projetRigini3, title: "Onduleurs et équipements" },
              { image: projetRigini4, title: "Système de stockage" },
              { image: projetRigini5, title: "Installation technique" }
            ].map((item, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-lg shadow-lg hover-lift animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-medium">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Project Gallery - Memling Project */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Projet Phare
              <span className="block gradient-text">Hôtel Memling - Burotop Iris</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Réhabilitation d'un système solaire entre l'Hôtel Memling et Burotop Iris à Kinshasa. 
              Sozacom et Beautour visible à droite.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { image: projetMemling1, title: "Installation sur toiture 1" },
              { image: projetMemling2, title: "Installation sur toiture 2" },
              { image: projetMemling3, title: "Vue d'ensemble du projet" }
            ].map((item, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-lg shadow-lg hover-lift animate-fadeInUp"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-medium">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Project Gallery - Rhigine Industrielle Project */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Projet Industriel
              <span className="block gradient-text">Travaux d'installation à Rhigine et 10ème Rue industrielle</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Installation complète de panneaux solaires sur toiture industrielle à Rhigine et 10ème Rue industrielle, Kinshasa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { image: projetRhigineIndustrielle1, title: "Panneaux solaires sur toiture bleue" },
              { image: projetRhigineIndustrielle2, title: "Installation de haute qualité" },
              { image: projetRhigineIndustrielle3, title: "Vue panoramique de l'installation" },
              { image: projetRhigineIndustrielle4, title: "Équipe technique au travail" }
            ].map((item, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-lg shadow-lg hover-lift animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-medium">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                  {project.client && (
                    <div className="text-sm text-muted-foreground mb-1">
                      Client: <span className="font-medium text-foreground">{project.client}</span>
                    </div>
                  )}
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