import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users, Heart } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FacebookSection = () => {
  const { t } = useLanguage();
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section ref={elementRef} className={`py-20 bg-gradient-to-br from-[#1877F2]/5 to-[#42A5F5]/5 scroll-animate ${isVisible ? 'in-view' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-[#1877F2]/10 text-[#1877F2] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4 mr-2" />
            {t('facebook.badge')}
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('facebook.title')}
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t('facebook.description')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-2xl shadow-warm p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              
              {/* Facebook Icon Section */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-[#1877F2] rounded-2xl flex items-center justify-center shadow-lg">
                  <svg viewBox="0 0 24 24" className="w-12 h-12 text-white">
                    <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {t('facebook.followTitle')}
                </h3>
                
                <p className="text-lg text-muted-foreground mb-6">
                  {t('facebook.followDescription')}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button 
                    size="lg"
                    className="bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                    onClick={() => window.open('https://www.facebook.com/CristalEnterprises', '_blank')}
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    {t('facebook.visitPage')}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2] hover:text-white font-semibold transition-all duration-300"
                    onClick={() => window.open('https://www.facebook.com/CristalEnterprises', '_blank')}
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    {t('facebook.subscribe')}
                  </Button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#1877F2]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-[#1877F2]" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{t('facebook.feature1.title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('facebook.feature1.desc')}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#1877F2]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ExternalLink className="w-6 h-6 text-[#1877F2]" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{t('facebook.feature2.title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('facebook.feature2.desc')}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#1877F2]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-[#1877F2]" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{t('facebook.feature3.title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('facebook.feature3.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacebookSection;