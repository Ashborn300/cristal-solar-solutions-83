import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Phone, Mail, Building, Calendar } from "lucide-react";

const CompanyInfo = () => {
  useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center scroll-animate">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              CRISTAL ALTERNATIVE ENGINEERING
            </h2>
            
            <div className="flex items-center justify-center gap-2 mb-6 text-xl font-semibold text-muted-foreground">
              <Calendar className="w-5 h-5" />
              <span>Since 2010</span>
            </div>
            
            <p className="text-xl md:text-2xl font-medium mb-12 text-primary">
              Electricity and life anywhere
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Contact Information */}
              <div className="space-y-6 scroll-animate-left">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-medium mb-1">Adresse</p>
                    <p className="text-muted-foreground">
                      32, Avenue Kabale, Q/Tshimanga,<br />
                      C/ Barumbu, Kinshasa-RDC
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-primary" />
                  <div className="text-left">
                    <p className="font-medium mb-1">Téléphone</p>
                    <p className="text-muted-foreground">+243 81 925 77 78</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-primary" />
                  <div className="text-left">
                    <p className="font-medium mb-1">E-mail</p>
                    <p className="text-muted-foreground">ca.engineer.sales@gmail.com</p>
                  </div>
                </div>
              </div>
              
              {/* Legal Information */}
              <div className="space-y-6 scroll-animate-scale">
                <div className="flex items-start gap-3">
                  <Building className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-medium mb-1">Informations légales</p>
                    <div className="text-muted-foreground space-y-1">
                      <p>RCCM N° CD/KIN/RCCM/15-A-25689</p>
                      <p>Id. Nat 01-93-N96656F</p>
                      <p>N° d'Impôt A2315374M</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;