import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import WhatsAppFloat from "@/components/common/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, User, Briefcase, Award, Phone, Mail, MapPin } from "lucide-react";

const CV = () => {
  const handleDownloadCV = () => {
    window.open("https://drive.google.com/uc?id=1D_Gw8CtnJ4JlmIUEdGhY7lckjXWLFhyb", "_blank");
  };

  const competences = [
    "Évaluer les besoins énergétiques des clients utilisateurs",
    "Dimensionner les systèmes solaires",
    "Conseil et sélection des composants des systèmes solaires de qualité",
    "Évaluer les coûts des projets solaires",
    "Installation, maintenance et réparation des systèmes solaires",
    "Conception et installation des solutions de monitoring des systèmes solaires",
    "Suivi, contrôle et évaluation des projets d'implémentation des solutions solaires",
    "Conception, installation des chambres froides solaires et des morgues solaires",
    "Conception, installation et gestion des solutions de l'électrification rurale solaire",
    "Suivi du développement des forages d'eau et Installation de système de pompage d'eau solaire",
    "Conception, suivi et installation de réseau de distribution d'eau communautaire",
    "Installation électrique domestique et industrielle",
    "Conception et Installation des systèmes électriques des salles serveurs",
    "Maître de la norme BBC (Bâtiment Basse consommation) pour la construction de bâtiment au standard passif",
    "Maîtrise des principes d'efficacité énergétique"
  ];

  const experiencesRecentes = [
    {
      client: "BANQUE MONDIALE / COREF ENCORE",
      lieu: "Kinshasa",
      travail: "Consultant électricien en chargé de l'étude de faisabilité de l'installation des systèmes Photovoltaïques pour les Bâtiments des Administrations Financières des Provinces du Kasaï, Kasaï central, Kasaï Oriental et Lomami.",
      date: "Septembre 2024 à ce jour"
    },
    {
      client: "BCECO",
      lieu: "Kinshasa", 
      travail: "Consultant électricien en chargé de l'étude de faisabilité de l'installation des systèmes Photovoltaïque, de pompage solaire, de suivi de développement de puits d'eau potable (forage) et de l'éclairage publique solaire dans les provinces du Sankuru, Kasaï (Secteur Lunyeka), Kasaï central et Kasaï Oriental.",
      date: "Janvier 2023 à ce jour"
    },
    {
      client: "BANQUE MONDIALE / PRISP",
      lieu: "Brazzaville",
      travail: "Réaliser l'étude de faisabilité et dimensionner les systèmes solaires photovoltaïques pour l'alimentation en énergie électrique des sites du Ministère des Finances à Pointe-Noire et Brazzaville",
      date: "4/06/2019 au 31/12/2022"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FileText className="h-12 w-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Curriculum Vitae
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8">
              WILONDJA Watutakubi Député - Expert en Systèmes Solaires
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={handleDownloadCV}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              >
                <Download className="h-5 w-5" />
                Télécharger le CV (PDF)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Informations de contact */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-6 w-6 text-primary" />
                  Identité & Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">WILONDJA Watutakubi Député</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>23 Avenue SONABATA, Quartier Tshimanga, Commune de BARUMBU, KINSHASA, RD CONGO</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>+243(0)819257778 / +243(0)999153778</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>depute.wilondja@gmail.com</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <Button 
                      onClick={handleDownloadCV}
                      variant="outline"
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Télécharger CV Complet
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Compétences */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-primary" />
                  Compétences Accumulées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {competences.map((competence, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{competence}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Expérience Professionnelle */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-primary" />
                  Expérience Professionnelle Récente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {experiencesRecentes.map((exp, index) => (
                    <div key={index} className="border-l-4 border-primary/30 pl-6 pb-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h3 className="font-semibold text-lg">{exp.client}</h3>
                        <span className="text-sm text-muted-foreground">{exp.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{exp.lieu}</p>
                      <p className="text-sm">{exp.travail}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Button 
                    onClick={handleDownloadCV}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Voir l'expérience complète (PDF)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default CV;