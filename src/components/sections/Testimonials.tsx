import { Star, Quote, Building, Home, Factory } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedNumber from "@/components/common/AnimatedNumber";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

const Testimonials = () => {
  const { isVisible, elementRef } = useScrollAnimation({ threshold: 0.3 });
  const { t } = useLanguage();

  const testimonials = [
    {
      name: "Mukendi Kabamba",
      role: "Directeur Général",
      company: "Société MINABAT",
      type: "enterprise",
      icon: Building,
      rating: 5,
      content: "CRISTAL ALTERNATIVE ENGINEERING a transformé notre consommation énergétique. L'installation solaire a réduit nos coûts de 75% et fonctionne parfaitement depuis 3 ans. Service professionnel et suivi impeccable.",
      project: "Installation 100kW - Système hybride"
    },
    {
      name: "Marie-Claire Tshimanga",
      role: "Propriétaire",
      company: "Résidence Familiale",
      type: "residential",
      icon: Home,
      rating: 5,
      content: "Excellente équipe ! Ils ont installé un système solaire pour notre maison en 2 jours. Plus de coupures d'électricité et une facture divisée par 3. Je recommande vivement leurs services.",
      project: "Installation résidentielle 5kW"
    },
    {
      name: "Dr. Jean Mpiana",
      role: "Directeur Médical",
      company: "Clinique Maman Marie",
      type: "healthcare",
      icon: Building,
      rating: 5,
      content: "Pour une clinique, l'électricité est vitale. Grâce à CRISTAL, nous avons une alimentation continue 24h/24. Leur maintenance préventive assure un fonctionnement optimal de nos équipements médicaux.",
      project: "Système solaire médical 25kW"
    },
    {
      name: "Pascal Nkunku",
      role: "Gérant",
      company: "Hôtel Palm Beach",
      type: "hospitality",
      icon: Building,
      rating: 5,
      content: "Investissement rentabilisé en 18 mois ! L'équipe de CRISTAL a su adapter le système à nos besoins hôteliers. Clients satisfaits de ne plus subir les coupures. Service après-vente au top.",
      project: "Installation hôtelière 50kW"
    },
    {
      name: "Mama Therese",
      role: "Commerçante",
      company: "Marché Central",
      type: "commercial",
      icon: Factory,
      rating: 5,
      content: "Mon commerce de textile fonctionne maintenant toute la journée grâce au solaire. Plus de perte de marchandises due aux coupures. L'équipe CRISTAL est très professionnelle et les prix corrects.",
      project: "Solution commerciale 8kW"
    },
    {
      name: "Ir. Robert Kasongo",
      role: "Ingénieur",
      company: "GECAMINES",
      type: "industrial",
      icon: Factory,
      rating: 5,
      content: "Collaboration exceptionnelle sur notre projet industriel. CRISTAL a livré dans les délais avec une qualité irréprochable. Leur expertise technique et leur engagement sont remarquables.",
      project: "Projet industriel 200kW"
    },
    {
      name: "Sœur Marie-Thérèse",
      role: "Responsable",
      company: "École Sainte-Claire",
      type: "education",
      icon: Building,
      rating: 5,
      content: "Grâce à l'installation solaire, nos élèves peuvent étudier le soir et nous utilisons des outils informatiques. CRISTAL a offert un tarif préférentiel pour l'éducation. Merci !",
      project: "Installation éducative 15kW"
    },
    {
      name: "François Kabila",
      role: "Propriétaire",
      company: "Résidence Lubumbashi",
      type: "residential",
      icon: Home,
      rating: 5,
      content: "Installation impeccable et équipe très professionnelle. Deux ans après, le système fonctionne parfaitement. Les économies réalisées dépassent nos attentes. Service client réactif.",
      project: "Installation résidentielle 7kW"
    },
    {
      name: "Emmanuel Mbuyi",
      role: "Directeur",
      company: "Centre de Formation CFPT",
      type: "education",
      icon: Building,
      rating: 5,
      content: "CRISTAL a installé un système parfaitement adapté à nos besoins de formation. Nos étudiants bénéficient maintenant d'un environnement d'apprentissage optimal. Excellent travail !",
      project: "Formation technique 12kW"
    }
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case 'enterprise': return 'text-primary';
      case 'residential': return 'text-success';
      case 'healthcare': return 'text-red-500';
      case 'hospitality': return 'text-accent';
      case 'commercial': return 'text-purple-500';
      case 'industrial': return 'text-orange-500';
      case 'education': return 'text-blue-500';
      default: return 'text-primary';
    }
  };

  return (
    <section ref={elementRef} id="temoignages" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-medium">{t('testimonials.badge')}</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('testimonials.title')}
            <span className="block gradient-text">{t('testimonials.subtitle')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('testimonials.description')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="group hover-lift bg-card border-border animate-fadeInUp relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Decorative quote */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-12 h-12 text-primary" />
              </div>

              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center`}>
                    <testimonial.icon className={`w-5 h-5 ${getIconColor(testimonial.type)}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-primary font-medium">{testimonial.company}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-4">
                  "{testimonial.content}"
                </p>

                {/* Project info */}
                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground font-medium">
                    Projet: {testimonial.project}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary stats */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold gradient-text mb-2">
                    <AnimatedNumber value={98} suffix="%" />
                  </div>
                  <div className="text-sm text-muted-foreground">Taux de satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text mb-2">
                    <AnimatedNumber value={500} suffix="+" delay={200} />
                  </div>
                  <div className="text-sm text-muted-foreground">Clients satisfaits</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text mb-2">
                    <AnimatedNumber value={4.9} suffix="/5" delay={400} />
                  </div>
                  <div className="text-sm text-muted-foreground">Note moyenne</div>
                </div>
              </div>
              <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
                Rejoignez la communauté grandissante de nos clients satisfaits qui font confiance 
                à CRISTAL ALTERNATIVE ENGINEERING pour leurs besoins en énergie solaire.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;