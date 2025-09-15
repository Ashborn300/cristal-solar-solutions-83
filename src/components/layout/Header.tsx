import { useState } from "react";
import { Menu, X, Zap, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo-cristal.jpg";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = [{
    name: "Accueil",
    href: "#accueil"
  }, {
    name: "Services",
    href: "#services"
  }, {
    name: "À propos",
    href: "#about"
  }, {
    name: "Réalisations",
    href: "#realisations"
  }, {
    name: "Témoignages",
    href: "#temoignages"
  }, {
    name: "CV",
    href: "/cv"
  }, {
    name: "Contact",
    href: "#contact"
  }];
  const scrollToSection = (href: string) => {
    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  };
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/243819257778", "_blank");
  };
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full overflow-hidden bg-white">
              <img src={logoImage} alt="Cristal Alternative Engineering Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary">CRISTAL</span>
              <span className="text-xs text-muted-foreground leading-none">
                ALTERNATIVE ENGINEERING
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map(item => <button key={item.name} onClick={() => scrollToSection(item.href)} className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
                {item.name}
              </button>)}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            
            <Button onClick={() => scrollToSection("#contact")} className="gradient-primary text-white shadow-solar">
              <Zap className="w-4 h-4 mr-2" />
              Devis Gratuit
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card rounded-lg mt-2 shadow-lg border">
              {navigation.map(item => <button key={item.name} onClick={() => scrollToSection(item.href)} className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md w-full text-left transition-colors">
                  {item.name}
                </button>)}
              <div className="pt-2 space-y-2">
                <Button onClick={handleWhatsAppClick} variant="outline" size="sm" className="w-full bg-green-500 text-white border-green-500 hover:bg-green-600">
                  <Phone className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button onClick={() => scrollToSection("#contact")} className="w-full gradient-primary text-white">
                  <Zap className="w-4 h-4 mr-2" />
                  Devis Gratuit
                </Button>
              </div>
            </div>
          </div>}
      </div>
    </header>;
};
export default Header;