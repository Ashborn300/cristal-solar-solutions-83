import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-1 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 p-1">
      <Button
        variant={language === 'fr' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('fr')}
        className="p-2 h-8 w-10 text-base hover:scale-105 transition-transform"
        aria-label="Français"
        title="Français"
      >
        🇫🇷
      </Button>
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="p-2 h-8 w-10 text-base hover:scale-105 transition-transform"
        aria-label="English"
        title="English"
      >
        🇬🇧
      </Button>
    </div>
  );
};

export default LanguageToggle;