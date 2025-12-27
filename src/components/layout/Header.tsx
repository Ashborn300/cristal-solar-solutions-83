import { useState } from "react";
import { Menu, X, Zap, Phone, Settings, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LanguageToggle from "@/components/common/LanguageToggle";
import logoImage from "@/assets/cristal-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { isEditor } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navigation: { name: string; href: string; external?: boolean }[] = [
    { name: t('nav.home'), href: "#accueil" },
    { name: t('nav.services'), href: "#services" },
    { name: t('nav.about'), href: "#about" },
    { name: t('nav.projects'), href: "/gallery" },
    { name: t('nav.testimonials'), href: "#temoignages" },
    { name: t('nav.cv'), href: "/cv" },
    { name: t('nav.contact'), href: "#contact" }
  ];

  const handleEmailClick = () => {
    window.open("https://mail.hostinger.com/v2/auth/login", "_blank");
  };

  const scrollToSection = (href: string, external?: boolean) => {
    setIsMenuOpen(false);
    
    // Handle external links
    if (external) {
      window.open(href, "_blank");
      return;
    }
    
    if (href.startsWith("/")) {
      navigate(href);
      return;
    }

    const isHome = location.pathname === "/";
    if (!isHome) {
      // Navigate to home with hash so the browser scrolls after route change
      navigate({
        pathname: "/",
        hash: href
      });
      return;
    }

    // Small delay to allow menu to close before scrolling
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }, 100);
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/243819257778", "_blank");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div 
              className="flex items-center space-x-3 cursor-pointer" 
              onClick={() => navigate("/")} 
              role="button" 
              aria-label="Aller à l'accueil"
            >
              <div className="flex items-center justify-center w-12 h-12 overflow-hidden">
                <img 
                  src={logoImage} 
                  alt="CRISTAL ENTERPRISES - CRISTAL ALTERNATIVE ENGINEERING Logo" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-primary">CRISTAL ENTERPRISES</span>
                <span className="text-xs text-muted-foreground leading-none">
                  ALTERNATIVE ENGINEERING
                </span>
              </div>
            </div>
            {isEditor && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/admin')}
                aria-label="Administration"
                className="text-muted-foreground hover:text-primary"
              >
                <Settings className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation
              .filter(item => item.href !== "#about" && item.href !== "#contact")
              .map(item => (
                <button 
                  key={item.name} 
                  onClick={() => scrollToSection(item.href, item.external)} 
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.name}
                </button>
              ))}
          </nav>

          {/* Desktop Language Toggle + CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            <Button
              onClick={handleEmailClick}
              className="gradient-primary text-white shadow-warm"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
            <Button
              onClick={handleWhatsAppClick}
              variant="outline"
              size="sm"
              className="bg-green-500 text-white border-green-500 hover:bg-green-600"
            >
              <Phone className="w-4 h-4 mr-2" />
              {t('nav.whatsapp')}
            </Button>
            <Button
              onClick={() => scrollToSection("#contact")}
              className="gradient-primary text-white shadow-warm"
            >
              <Zap className="w-4 h-4 mr-2" />
              {t('nav.freeQuote')}
            </Button>
          </div>

          {/* Mobile Language Toggle + Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <LanguageToggle />
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card rounded-lg mt-2 shadow-lg border">
              {navigation.map(item => (
                <button 
                  key={item.name} 
                  onClick={() => scrollToSection(item.href, item.external)} 
                  className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md w-full text-left transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-2 space-y-2">
                {isEditor && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      navigate('/admin');
                      setIsMenuOpen(false);
                    }} 
                    className="w-full"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                )}
                <Button 
                  onClick={() => {
                    handleEmailClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full gradient-primary text-white"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button 
                  onClick={handleWhatsAppClick} 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-green-500 text-white border-green-500 hover:bg-green-600"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {t('nav.whatsapp')}
                </Button>
                <Button 
                  onClick={() => scrollToSection("#contact")} 
                  className="w-full gradient-primary text-white"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {t('nav.freeQuote')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;