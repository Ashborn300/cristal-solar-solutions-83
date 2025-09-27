import deputeEngineeringImage from "@/assets/depute-engineering-team.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
// Updated to use Supabase content
import { usePageContent } from "@/hooks/usePageContent";

const Leadership = () => {
  const { t } = useLanguage();
  const { getTitle, getBodyText } = usePageContent('home');
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative overflow-hidden rounded-2xl shadow-solar animate-fadeInUp">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={deputeEngineeringImage}
                alt="Depute leading the engineering and installation team"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>

          {/* Content Section */}
          <div className="animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-primary font-medium">{t('leadership.badge')}</span>
            </div>
            
            <h2 className="text-4xl font-bold text-foreground mb-6">
              {getTitle('leadership', t('leadership.title'))}
              <span className="block gradient-text">{t('leadership.subtitle')}</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6">
              {getBodyText('leadership', t('leadership.description'))}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-solar-light p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">10+</div>
                <div className="text-sm text-muted-foreground">Années d'expérience terrain</div>
              </div>
              <div className="bg-solar-light p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Villages électrifiés</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;