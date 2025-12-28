import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQ = () => {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "Quel est le coût d'une installation solaire ?",
      answer: "Le coût varie selon la taille du système. Pour une installation résidentielle (5 kW) : 8 000 à 12 000 $. Pour une installation commerciale (25 kW) : 30 000 à 45 000 $. La rentabilité est estimée entre 2 à 4 ans selon votre consommation actuelle. Contactez-nous pour un devis personnalisé gratuit."
    },
    {
      question: "Quelle est la durée de vie des panneaux solaires ?",
      answer: "Nos panneaux solaires haute performance ont une durée de vie de 25 à 30 ans. Ils sont couverts par une garantie constructeur et conservent au moins 80% de leur capacité après 25 ans d'utilisation."
    },
    {
      question: "Les systèmes fonctionnent-ils quand il pleut ou par temps nuageux ?",
      answer: "Oui, le système reste fonctionnel même par temps nuageux ou pluvieux. La production est réduite mais compensée par les batteries de stockage adaptées. Votre installation continue de fournir de l'électricité 24h/24."
    },
    {
      question: "Offrez-vous des services de maintenance ?",
      answer: "Oui, nous proposons une maintenance préventive régulière et un service de dépannage rapide 24h/7j. Nos contrats incluent des visites périodiques, le nettoyage des panneaux, la vérification des connexions et le remplacement des pièces si nécessaire avec garantie étendue."
    },
    {
      question: "Peut-on revendre l'excédent d'énergie produite ?",
      answer: "Oui, selon la réglementation locale en vigueur, il est possible de revendre l'excédent d'énergie au réseau électrique. Nos systèmes hybrides et on-grid sont conçus pour cette fonctionnalité. Nous vous accompagnons dans les démarches administratives."
    },
    {
      question: "Aidez-vous avec les autorisations et démarches administratives ?",
      answer: "Oui, nous offrons une assistance complète pour toutes les démarches administratives : permis d'installation, raccordement au réseau, déclarations fiscales et toute autre formalité nécessaire. Notre équipe s'occupe de tout pour vous."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-medium">{t('faq.badge')}</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('faq.title')}
            <span className="block gradient-text">{t('faq.subtitle')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('faq.description')}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={index} 
              className="border-border hover:border-primary/30 transition-all duration-300 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openItems.includes(index) ? (
                      <Minus className="w-5 h-5 text-primary" />
                    ) : (
                      <Plus className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-6 animate-fadeInUp">
                    <div className="border-t border-border pt-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="mt-16 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t('faq.contactTitle')}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('faq.contactDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open("https://wa.me/243819257778", "_blank")}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center"
              >
                <span className="mr-2">📱</span>
                WhatsApp: +243 81 925 77 78
              </button>
              <button
                onClick={() => window.open("mailto:info@cristalentreprises.com", "_blank")}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center"
              >
                <span className="mr-2">✉️</span>
                info@cristalentreprises.com
              </button>
            </div>
            <div className="mt-6 text-sm text-muted-foreground">
              <p>Consultation gratuite • Devis personnalisé • Réponse sous 24h</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FAQ;