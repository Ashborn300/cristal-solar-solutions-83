import { Sun, Phone, Mail, MapPin, Facebook, Zap, Users, Award } from "lucide-react";
import AnimatedNumber from "@/components/common/AnimatedNumber";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Footer = () => {
  const { isVisible, elementRef } = useScrollAnimation({ threshold: 0.5 });
  const currentYear = new Date().getFullYear();

  const services = [
    "Études et dimensionnements solaires",
    "Fourniture et installation",
    "Maintenance et dépannage",
    "Solutions hybrides et on-grid",
    "Conseil technique"
  ];

  const quickLinks = [
    { name: "Accueil", href: "#accueil" },
    { name: "Services", href: "#services" },
    { name: "À propos", href: "#about" },
    { name: "Réalisations", href: "#realisations" },
    { name: "Témoignages", href: "#temoignages" },
    { name: "Contact", href: "#contact" }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer ref={elementRef} className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full gradient-primary">
                  <Sun className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-primary">CRISTAL</span>
                  <span className="text-xs text-muted-foreground leading-none">
                    ALTERNATIVE ENGINEERING
                  </span>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                Pionnier de l'énergie solaire en RDC avec plus de 14 ans d'expertise. 
                Votre partenaire de confiance pour un avenir énergétique durable.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">
                    <AnimatedNumber value={14} suffix="+" />
                  </div>
                  <div className="text-xs text-muted-foreground">Années</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-accent">
                    <AnimatedNumber value={500} suffix="+" delay={100} />
                  </div>
                  <div className="text-xs text-muted-foreground">Projets</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-success">
                    <AnimatedNumber value={98} suffix="%" delay={200} />
                  </div>
                  <div className="text-xs text-muted-foreground">Satisfaction</div>
                </div>
              </div>

              {/* Certifications */}
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Award className="w-3 h-3 mr-1" />
                  Certifié
                </div>
                <div className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  Agréé
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-6">Nos Services</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection("#services")}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center"
                    >
                      <Zap className="w-3 h-3 mr-2 text-primary/60" />
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-6">Navigation</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-6 border-t border-border">
                <button
                  onClick={() => window.open("https://wa.me/243819257778", "_blank")}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium flex items-center justify-center"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact WhatsApp
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-6">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    32, Avenue Kabale, Q/Tshimanga<br />
                    C/Barumbu, Kinshasa - RDC
                  </div>
                </div>
                
                <button
                  onClick={() => window.open("tel:+243819257778", "_blank")}
                  className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors w-full text-left"
                >
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>+243 81 925 77 78</span>
                </button>
                
                <button
                  onClick={() => window.open("mailto:ca.engineer.sales@gmail.com", "_blank")}
                  className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors w-full text-left"
                >
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>ca.engineer.sales@gmail.com</span>
                </button>
                
                <button
                  onClick={() => window.open("https://www.facebook.com/cristalentrerprises", "_blank")}
                  className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors w-full text-left"
                >
                  <Facebook className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>cristalentrerprises</span>
                </button>
              </div>

              {/* Business Hours */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-medium text-foreground mb-3 text-sm">Horaires</h4>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Lun-Ven:</span>
                    <span>8h00-17h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi:</span>
                    <span>8h00-13h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche:</span>
                    <span>Urgences</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              <p>© {currentYear} CRISTAL ALTERNATIVE ENGINEERING. Tous droits réservés.</p>
              <p className="mt-1">
                RCCM: CD/KiN/RCCM/15-A-25689 • ID: 01-93-N9 6565F • N° Impôt: A2315374 M
              </p>
            </div>
            
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span className="flex items-center">
                <Sun className="w-3 h-3 mr-1 text-accent" />
                Énergie durable
              </span>
              <span className="flex items-center">
                <Award className="w-3 h-3 mr-1 text-primary" />
                Qualité certifiée
              </span>
              <span className="flex items-center">
                <Users className="w-3 h-3 mr-1 text-success" />
                Service 24/7
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;