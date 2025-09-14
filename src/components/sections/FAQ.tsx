import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const FAQ = () => {
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
      question: "Combien coûte une installation solaire à Kinshasa ?",
      answer: "Le coût varie selon vos besoins (5kW résidentiel: 8000-12000$, 25kW commercial: 30000-45000$). Nous proposons un devis gratuit personnalisé et des solutions de financement flexibles. L'investissement est généralement rentabilisé en 2-4 ans grâce aux économies d'électricité."
    },
    {
      question: "Quelle est la durée de vie des panneaux solaires ?",
      answer: "Nos panneaux solaires ont une garantie de 25 ans et une durée de vie de 30+ ans. Les onduleurs sont garantis 10-15 ans. Nous proposons des contrats de maintenance pour optimiser les performances sur le long terme. La technologie photovoltaïque actuelle est très fiable."
    },
    {
      question: "Le système fonctionne-t-il pendant la saison des pluies ?",
      answer: "Absolument ! Même par temps nuageux, les panneaux produisent 20-40% de leur capacité. Nos systèmes hybrides incluent des batteries pour stocker l'énergie et assurer une alimentation continue. La pluie nettoie également les panneaux naturellement."
    },
    {
      question: "Proposez-vous un service de maintenance ?",
      answer: "Oui, nous offrons un service de maintenance complet : nettoyage des panneaux, vérification des connexions, monitoring des performances, remplacement des pièces défectueuses. Contrats annuels disponibles avec intervention d'urgence 24h/7j."
    },
    {
      question: "Puis-je revendre l'électricité excédentaire ?",
      answer: "Avec les systèmes on-grid, l'excédent peut être injecté dans le réseau SNEL. Nous vous accompagnons dans les démarches administratives. Pour les systèmes hybrides, l'excédent charge les batteries pour utilisation nocturne."
    },
    {
      question: "Quelles sont les autorisations nécessaires ?",
      answer: "Nous nous occupons de toutes les démarches : permis de construire (si nécessaire), autorisation SNEL pour l'injection réseau, certification technique. Notre expérience de 14 ans facilite ces procédures administratives."
    },
    {
      question: "Combien de temps dure l'installation ?",
      answer: "Installation résidentielle (5-10kW): 2-5 jours. Installation commerciale (25-50kW): 1-3 semaines. Installation industrielle (100kW+): 1-3 mois. Nous respectons scrupuleusement les délais convenus et communiquons régulièrement sur l'avancement."
    },
    {
      question: "Que se passe-t-il en cas de panne ?",
      answer: "Service d'urgence 24h/7j pour les clients sous contrat de maintenance. Diagnostic à distance via monitoring, intervention rapide par nos techniciens qualifiés. Stock de pièces de rechange disponible. Garantie totale sur notre intervention."
    },
    {
      question: "Les panneaux résistent-ils aux conditions climatiques locales ?",
      answer: "Nos panneaux sont certifiés pour les climats tropicaux : résistance à la grêle, vents forts (jusqu'à 200 km/h), forte humidité, variations de température. Structure de montage en aluminium anti-corrosion. Tests d'endurance validés pour la région."
    },
    {
      question: "Proposez-vous des solutions de financement ?",
      answer: "Oui, plusieurs options : paiement échelonné, partenariat avec institutions financières locales, leasing solaire. Nous étudions chaque dossier pour proposer la solution la plus adaptée à votre budget et vos besoins."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-medium">FAQ</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Questions
            <span className="block gradient-text">Fréquemment Posées</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Retrouvez les réponses aux questions les plus courantes sur nos solutions solaires. 
            Notre équipe reste à votre disposition pour tout complément d'information.
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
              Vous avez d'autres questions ?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions 
              et vous accompagner dans votre projet d'énergie solaire.
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
                onClick={() => window.open("mailto:ca.engineer.sales@gmail.com", "_blank")}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center"
              >
                <span className="mr-2">✉️</span>
                ca.engineer.sales@gmail.com
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