import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import WhatsAppFloat from "@/components/common/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

// Import images
import solarConstruction1 from "@/assets/gallery/solar-construction-1.jpg";
import solarAerialView from "@/assets/gallery/solar-aerial-view.jpg";
import solarConstruction2 from "@/assets/gallery/solar-construction-2.jpg";
import electricalEquipment1 from "@/assets/gallery/electrical-equipment-1.jpg";
import solarInstallationRoof from "@/assets/gallery/solar-installation-roof.jpg";
import batterySystem from "@/assets/gallery/battery-system.jpg";
import electricalEquipment2 from "@/assets/gallery/electrical-equipment-2.jpg";
import electricalEquipment3 from "@/assets/gallery/electrical-equipment-3.jpg";
import solarSchoolInstallation from "@/assets/gallery/solar-school-installation.jpg";
import batteryStorageRoom from "@/assets/gallery/battery-storage-room.jpg";

const Gallery = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const content = {
    fr: {
      title: "NOS RÉALISATIONS",
      subtitle: "Galerie de nos projets solaires",
      description: "Découvrez nos installations solaires à travers cette galerie complète de nos réalisations. De la construction à la mise en service, chaque projet témoigne de our expertise technique et de notre engagement pour les énergies renouvelables.",
      categories: {
        construction: "Construction & Installation",
        equipment: "Équipements Électriques",
        installations: "Installations Complètes"
      }
    },
    en: {
      title: "OUR ACHIEVEMENTS",
      subtitle: "Gallery of our solar projects",
      description: "Discover our solar installations through this comprehensive gallery of our achievements. From construction to commissioning, each project demonstrates our technical expertise and commitment to renewable energy.",
      categories: {
        construction: "Construction & Installation",
        equipment: "Electrical Equipment",
        installations: "Complete Installations"
      }
    }
  };

  const galleryImages = [
    {
      src: solarConstruction1,
      alt: "Construction de structure solaire",
      category: "construction"
    },
    {
      src: solarAerialView,
      alt: "Vue aérienne installation solaire",
      category: "installations"
    },
    {
      src: solarConstruction2,
      alt: "Construction panneaux solaires",
      category: "construction"
    },
    {
      src: electricalEquipment1,
      alt: "Équipements électriques - salle technique",
      category: "equipment"
    },
    {
      src: solarInstallationRoof,
      alt: "Installation solaire sur toiture",
      category: "installations"
    },
    {
      src: batterySystem,
      alt: "Système de batteries",
      category: "equipment"
    },
    {
      src: electricalEquipment2,
      alt: "Équipements électriques - onduleurs",
      category: "equipment"
    },
    {
      src: electricalEquipment3,
      alt: "Salle technique équipements",
      category: "equipment"
    },
    {
      src: solarSchoolInstallation,
      alt: "Installation solaire école",
      category: "installations"
    },
    {
      src: batteryStorageRoom,
      alt: "Salle de stockage batteries",
      category: "equipment"
    }
  ];

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div
            ref={elementRef}
            className={`text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              {content[language].title}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              {content[language].subtitle}
            </p>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              {content[language].description}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg bg-card hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedImage(index)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-foreground font-medium text-sm">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-background/95 backdrop-blur-sm">
          {selectedImage !== null && (
            <div className="relative w-full h-full flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-5 h-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
                onClick={handlePrevious}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
                onClick={handleNext}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
              
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="max-w-full max-h-full object-contain"
              />
              
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-foreground font-medium bg-background/80 rounded-lg px-4 py-2 inline-block">
                  {galleryImages[selectedImage].alt}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Gallery;