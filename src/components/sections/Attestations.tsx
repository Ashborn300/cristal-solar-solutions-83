import React from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import attestationBadge from "@/assets/attestation-badge.jpg";

const Attestations = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const { language } = useLanguage();

  const content = {
    fr: {
      title: "NOS ATTESTATIONS",
      subtitle: "Reconnaissance de notre expertise",
      description: "Découvrez nos certifications et attestations qui témoignent de la qualité de nos services et de notre expertise dans le domaine des énergies renouvelables.",
      buttonText: "Voir nos attestations",
    },
    en: {
      title: "OUR CERTIFICATIONS",
      subtitle: "Recognition of our expertise",
      description: "Discover our certifications and attestations that testify to the quality of our services and our expertise in the field of renewable energy.",
      buttonText: "View our certifications",
    }
  };

  const handleViewAttestations = () => {
    window.open("https://drive.google.com/drive/folders/1PHYtYUe9GkPtMGuxYpeOdtqm9WcaJyy8", "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <div
          ref={elementRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            {content[language].title}
          </h2>
          <p className="text-xl text-muted-foreground mb-2">
            {content[language].subtitle}
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {content[language].description}
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <img
                  src={attestationBadge}
                  alt="Attestation badge"
                  className="w-32 h-32 mx-auto object-contain"
                />
              </div>
              <Button
                onClick={handleViewAttestations}
                size="lg"
                className="w-full"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                {content[language].buttonText}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Attestations;