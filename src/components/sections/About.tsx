import { Target, Eye, Award, Users, Zap, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedNumber from "@/components/common/AnimatedNumber";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";
import solarWorkerImage from "@/assets/solar-worker-happy.jpg";

const About = () => {
  const { isVisible: statsVisible, elementRef: statsRef } = useScrollAnimation({ threshold: 0.4 });
  const { isVisible: contentVisible, elementRef: contentRef } = useScrollAnimation({ threshold: 0.2 });
  const { t } = useLanguage();
  const { getContentTitle, getContentText } = usePageContent('home');

  const stats = [
    { number: "14+", label: t('about.stats.years'), icon: Award },
    { number: "500+", label: t('about.stats.projects'), icon: Zap },
    { number: "98%", label: t('about.stats.satisfaction'), icon: Users },
    { number: "24/7", label: t('about.stats.support'), icon: Globe },
  ];

  const values = [
    {
      icon: Target,
      title: t('about.values.excellence'),
      description: t('about.values.excellenceDesc')
    },
    {
      icon: Users,
      title: t('about.values.service'),
      description: t('about.values.serviceDesc')
    },
    {
      icon: Globe,
      title: t('about.values.sustainability'),
      description: t('about.values.sustainabilityDesc')
    }
  ];

  return (
    <section ref={contentRef} id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-medium">{t('about.badge')}</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {getContentTitle('about', t('about.title'))}
            <span className="block gradient-text">{t('about.subtitle')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {getContentText('about', t('about.description'))}
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
                <div className="text-sm text-muted-foreground">{t('about.stats.expertise')}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {t('about.stats.subtitle')}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right - Content */}
          <div className="space-y-8 animate-fadeInUp">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {getContentTitle('about_story', t('about.ourStory'))}
              </h3>
              <p className="text-muted-foreground mb-6">
                {getContentText('about_story', t('about.storyP1'))}
              </p>
              <p className="text-muted-foreground">
                {t('about.storyP2')}
              </p>
            </div>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="border-primary/20 hover-lift">
                <CardContent className="p-6 text-center">
                  <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">{getContentTitle('about_vision', t('about.vision'))}</h4>
                  <p className="text-sm text-muted-foreground">
                    {getContentText('about_vision', t('about.visionDesc'))}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-accent/20 hover-lift">
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">{getContentTitle('about_mission', t('about.mission'))}</h4>
                  <p className="text-sm text-muted-foreground">
                    {getContentText('about_mission', t('about.missionDesc'))}
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
            <h3 className="text-3xl font-bold text-foreground mb-4">{t('about.values.title')}</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('about.values.description')}
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