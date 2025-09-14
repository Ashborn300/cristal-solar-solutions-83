import { Target, Eye, Award, Users, Zap, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedNumber from "@/components/common/AnimatedNumber";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import solarWorkerImage from "@/assets/solar-worker-happy.jpg";

const About = () => {
  const { isVisible: statsVisible, elementRef: statsRef } = useScrollAnimation({ threshold: 0.4 });
  const { isVisible: contentVisible, elementRef: contentRef } = useScrollAnimation({ threshold: 0.2 });

  const stats = [
    { number: "14+", label: "Années d'expérience", icon: Award },
    { number: "500+", label: "Projets réalisés", icon: Zap },
    { number: "98%", label: "Taux de satisfaction", icon: Users },
    { number: "24/7", label: "Support technique", icon: Globe },
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence Technique",
      description: "Nous utilisons les meilleures technologies solaires disponibles sur le marché pour garantir des performances optimales."
    },
    {
      icon: Users,
      title: "Service Client",
      description: "Notre équipe dédiée vous accompagne à chaque étape de votre projet, de l'étude à la maintenance."
    },
    {
      icon: Globe,
      title: "Développement Durable",
      description: "Nous contribuons activement à la transition énergétique du Congo vers des solutions plus respectueuses de l'environnement."
    }
  ];

  return (
    <section ref={contentRef} id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-medium">À Propos</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            CRISTAL ALTERNATIVE
            <span className="block gradient-text">ENGINEERING</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pionnier de l'énergie solaire à Kinshasa depuis plus de 14 ans, 
            nous sommes votre partenaire de confiance pour un avenir énergétique durable.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Image */}
          <div className="relative animate-slideInLeft">
            <div className="relative overflow-hidden rounded-2xl shadow-solar">
              <img
                src={solarWorkerImage}
                alt="Équipe CRISTAL ALTERNATIVE ENGINEERING"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            {/* Stats Card Overlay */}
            <Card className="absolute -bottom-8 -right-8 bg-white shadow-warm animate-scaleIn animation-delay-400">
              <CardContent className="p-6">
                <div className="text-3xl font-bold gradient-text mb-1">
                  <AnimatedNumber value={14} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">Années d'expertise</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Au service de l'énergie durable
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right - Content */}
          <div className="space-y-8 animate-fadeInUp">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Notre Histoire
              </h3>
              <p className="text-muted-foreground mb-6">
                Fondée à Kinshasa, CRISTAL ALTERNATIVE ENGINEERING s'est imposée comme 
                le leader des solutions photovoltaïques en République Démocratique du Congo. 
                Avec plus de 14 années d'expertise, nous avons accompagné des centaines de 
                clients dans leur transition vers l'énergie solaire.
              </p>
              <p className="text-muted-foreground">
                Notre engagement pour l'excellence et l'innovation nous a permis de développer 
                une expertise unique dans le dimensionnement, l'installation et la maintenance 
                de systèmes solaires adaptés au climat tropical de la région.
              </p>
            </div>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="border-primary/20 hover-lift">
                <CardContent className="p-6 text-center">
                  <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">Notre Vision</h4>
                  <p className="text-sm text-muted-foreground">
                    Être le leader incontournable de l'énergie solaire en Afrique Centrale.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-accent/20 hover-lift">
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">Notre Mission</h4>
                  <p className="text-sm text-muted-foreground">
                    Démocratiser l'accès à l'énergie solaire propre et abordable.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16" ref={statsRef}>
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover-lift animate-scaleIn" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold gradient-text mb-2 animate-counter">
                  <AnimatedNumber 
                    value={parseInt(stat.number.replace(/[^0-9]/g, '')) || 0} 
                    suffix={stat.number.replace(/[0-9]/g, '')} 
                    delay={index * 150}
                  />
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Values Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-foreground mb-4">Nos Valeurs</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident notre action quotidienne pour vous offrir le meilleur service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover-lift animate-fadeInUp" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-4">{value.title}</h4>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Info */}
        <Card className="mt-16 bg-solar-light border-primary/20">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold text-foreground mb-2">RCCM</h4>
                <p className="text-muted-foreground">CD/KiN/RCCM/15-A-25689</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">ID National</h4>
                <p className="text-muted-foreground">01-93-N9 6565F</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">N° d'Impôt</h4>
                <p className="text-muted-foreground">A2315374 M</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About;