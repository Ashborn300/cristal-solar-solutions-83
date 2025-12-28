import { Award, Shield, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import deputeEngineeringImage from "@/assets/depute-engineering-team.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";

const Leadership = () => {
  const { t } = useLanguage();
  const { getTitle, getBodyText } = usePageContent('home');
  
  const certifications = [
    "RCCM : CD/KiN/RCCM/15-A-25689",
    "ID National : 01-93-N9 6565F",
    "N° d'Impôt : A2315374 M"
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-medium">{t('leadership.badge')}</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {getTitle('leadership', t('leadership.title'))}
            <span className="block gradient-text">{t('leadership.subtitle')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Section */}
          <div className="relative overflow-hidden rounded-2xl shadow-solar animate-fadeInUp">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={deputeEngineeringImage}
                alt="Ir. Wilondja Watutakubi - Directeur Technique CRISTAL ALTERNATIVE ENGINEERING"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-bold">Ir. Wilondja Watutakubi</h3>
              <p className="text-white/90">Directeur Technique & Expert Solaire Certifié</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Ir. Wilondja Watutakubi</h3>
                    <p className="text-primary font-medium">Directeur Technique & Expert Solaire Certifié</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Fort de <span className="font-semibold text-foreground">18 ans d'expérience</span> dans l'ingénierie électrique et spécialisé en énergies renouvelables, l'Ir. Wilondja Watutakubi est le garant de notre <span className="font-semibold text-primary">Excellence Technique</span>.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Il supervise toutes les études complexes et assure la conformité de chaque installation aux normes les plus rigoureuses, garantissant une solution fiable et durable pour chaque client.
                </p>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-solar-light border-none">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">18+</div>
                  <div className="text-sm text-muted-foreground">Années d'expérience</div>
                </CardContent>
              </Card>
              <Card className="bg-solar-light border-none">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">500+</div>
                  <div className="text-sm text-muted-foreground">Projets supervisés</div>
                </CardContent>
              </Card>
            </div>

            {/* Certifications */}
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Certifications de l'entreprise</h4>
                </div>
                <div className="space-y-2">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;