import { TrendingUp, Zap, Users, Clock, Award, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedNumber from "@/components/common/AnimatedNumber";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Statistics = () => {
  const { isVisible, elementRef } = useScrollAnimation({ threshold: 0.3 });

  const stats = [
    {
      icon: Award,
      number: 14,
      suffix: "+",
      label: "Années d'Expérience",
      description: "Au service de l'énergie durable",
      color: "text-primary"
    },
    {
      icon: Zap,
      number: 500,
      suffix: "+",
      label: "Projets Réalisés",
      description: "Installations solaires complètes",
      color: "text-accent"
    },
    {
      icon: Users,
      number: 98,
      suffix: "%",
      label: "Clients Satisfaits",
      description: "Taux de satisfaction client",
      color: "text-success"
    },
    {
      icon: TrendingUp,
      number: 150,
      suffix: "MW",
      label: "Puissance Installée",
      description: "Capacité totale en mégawatts",
      color: "text-primary"
    },
    {
      icon: Clock,
      number: 24,
      suffix: "/7",
      label: "Support Technique",
      description: "Assistance continue",
      color: "text-accent"
    },
    {
      icon: Globe,
      number: 50,
      suffix: "+",
      label: "Localités Desservies",
      description: "À travers le Congo",
      color: "text-success"
    }
  ];

  return (
    <section ref={elementRef} className="py-20 bg-gradient-to-br from-solar-light to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-medium">Nos Performances</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Des Chiffres qui
            <span className="block gradient-text">Parlent d'Eux-Mêmes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez l'impact de notre engagement pour l'énergie solaire en République Démocratique du Congo.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="group hover-lift bg-background/80 backdrop-blur-sm border-border animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                
                <div className={`${stat.color} mb-2 animate-counter text-4xl lg:text-5xl font-bold`}>
                  <AnimatedNumber 
                    value={stat.number} 
                    suffix={stat.suffix} 
                    delay={index * 200}
                  />
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {stat.label}
                </h3>
                
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fadeInUp animation-delay-600">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Rejoignez les centaines de clients satisfaits
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Faites confiance à notre expertise reconnue pour vos projets d'énergie solaire. 
                Plus de <AnimatedNumber value={14} suffix=" ans" className="font-semibold text-primary" /> d'expérience au service de la transition énergétique du Congo.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-sm">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">Étude gratuite</span>
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full">Installation certifiée</span>
                <span className="px-3 py-1 bg-success/10 text-success rounded-full">Maintenance incluse</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">Garantie étendue</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Statistics;