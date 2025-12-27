import { MapPin, Phone, Mail, Facebook, Clock, Send, MessageCircle, Sun, Zap, Home, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";
import { Checkbox } from "@/components/ui/checkbox";

interface LightingConsumption {
  room: string;
  watts: string;
  hours: string;
}

interface ApplianceConsumption {
  appliance: string;
  watts: string;
  hours: string;
}

const Contact = () => {
  const { t } = useLanguage();
  const { getTitle, getBodyText } = usePageContent('home');
  const { toast } = useToast();
  
  // Personal Information
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    address: "",
    quarter: "",
    phone: "",
    city: "",
    installationAddress: ""
  });

  // Sunny space
  const [sunnySpace, setSunnySpace] = useState<string>("");
  
  // Distance
  const [distance, setDistance] = useState("");

  // Usage frequency
  const [usageFrequency, setUsageFrequency] = useState<string>("");
  
  // Months of use
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  
  // Lighting consumption
  const [lightingConsumption, setLightingConsumption] = useState<LightingConsumption[]>([
    { room: "Cuisine", watts: "", hours: "" },
    { room: "Salon", watts: "", hours: "" },
    { room: "Salle à manger", watts: "", hours: "" },
    { room: "Chambre 1", watts: "", hours: "" },
    { room: "Chambre 2", watts: "", hours: "" },
    { room: "Chambre 3", watts: "", hours: "" },
    { room: "Salle de bains", watts: "", hours: "" },
    { room: "WC", watts: "", hours: "" },
    { room: "Couloir", watts: "", hours: "" },
    { room: "Cave", watts: "", hours: "" },
    { room: "Extérieur", watts: "", hours: "" },
    { room: "Autres", watts: "", hours: "" }
  ]);

  // Appliance consumption
  const [applianceConsumption, setApplianceConsumption] = useState<ApplianceConsumption[]>([
    { appliance: "TV", watts: "", hours: "" },
    { appliance: "Chaîne Hi-fi", watts: "", hours: "" },
    { appliance: "Magnétoscope", watts: "", hours: "" },
    { appliance: "Ordinateur", watts: "", hours: "" },
    { appliance: "Décodeur", watts: "", hours: "" },
    { appliance: "Réfrigérateur", watts: "", hours: "" },
    { appliance: "Congélateur", watts: "", hours: "" },
    { appliance: "Imprimante", watts: "", hours: "" },
    { appliance: "Ventilateur", watts: "", hours: "" },
    { appliance: "Cuisinière", watts: "", hours: "" },
    { appliance: "DVD Player", watts: "", hours: "" }
  ]);

  // Generator
  const [hasGenerator, setHasGenerator] = useState<string>("");
  
  // Autonomy
  const [autonomy, setAutonomy] = useState("");

  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLightingChange = (index: number, field: 'watts' | 'hours', value: string) => {
    const updated = [...lightingConsumption];
    updated[index][field] = value;
    setLightingConsumption(updated);
  };

  const handleApplianceChange = (index: number, field: 'watts' | 'hours', value: string) => {
    const updated = [...applianceConsumption];
    updated[index][field] = value;
    setApplianceConsumption(updated);
  };

  const toggleMonth = (month: string) => {
    setSelectedMonths(prev => 
      prev.includes(month) 
        ? prev.filter(m => m !== month)
        : [...prev, month]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build lighting details
    const lightingDetails = lightingConsumption
      .filter(item => item.watts || item.hours)
      .map(item => `${item.room}: ${item.watts}W x ${item.hours}h`)
      .join('\n');

    // Build appliance details
    const applianceDetails = applianceConsumption
      .filter(item => item.watts || item.hours)
      .map(item => `${item.appliance}: ${item.watts}W x ${item.hours}h`)
      .join('\n');

    const whatsappMessage = `
🌞 DEMANDE DE DEVIS SOLAIRE - CRISTAL ALTERNATIVE ENGINEERING

━━━━━━━━━━━━━━━━━━━━━━━━
📋 INFORMATIONS PERSONNELLES
━━━━━━━━━━━━━━━━━━━━━━━━
👤 Nom: ${formData.lastName}
👤 Prénom: ${formData.firstName}
🏠 Adresse: ${formData.address}
📍 Quartier: ${formData.quarter}
📱 Téléphone: ${formData.phone}
🏙️ Ville: ${formData.city}
📍 Adresse d'installation: ${formData.installationAddress || 'Même adresse'}

━━━━━━━━━━━━━━━━━━━━━━━━
☀️ ESPACE ENSOLEILLÉ DISPONIBLE
━━━━━━━━━━━━━━━━━━━━━━━━
${sunnySpace || 'Non spécifié'}

📏 Distance modules-local technique: ${distance || 'Non spécifié'}

━━━━━━━━━━━━━━━━━━━━━━━━
📅 FRÉQUENCE D'UTILISATION
━━━━━━━━━━━━━━━━━━━━━━━━
${usageFrequency || 'Non spécifié'}
Mois: ${selectedMonths.length > 0 ? selectedMonths.join(', ') : 'Non spécifié'}

━━━━━━━━━━━━━━━━━━━━━━━━
💡 CONSOMMATION - ÉCLAIRAGE
━━━━━━━━━━━━━━━━━━━━━━━━
${lightingDetails || 'Non spécifié'}

━━━━━━━━━━━━━━━━━━━━━━━━
🔌 CONSOMMATION - APPAREILS
━━━━━━━━━━━━━━━━━━━━━━━━
${applianceDetails || 'Non spécifié'}

━━━━━━━━━━━━━━━━━━━━━━━━
⚡ AUTRE SOURCE D'ALIMENTATION
━━━━━━━━━━━━━━━━━━━━━━━━
Groupe électrogène: ${hasGenerator || 'Non spécifié'}
Autonomie souhaitée: ${autonomy || 'Non spécifié'}

---
Envoyé depuis le site web cristalentreprises.com
    `.trim();

    const whatsappUrl = `https://wa.me/243819257778?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Demande préparée !",
      description: "Votre formulaire va s'ouvrir dans WhatsApp."
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "32, Avenue Kabale, Q/Tshimanga\nC/Barumbu, Kinshasa - RDC",
      action: () => window.open("https://maps.google.com/?q=32+Avenue+Kabale+Kinshasa", "_blank")
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "+243 81 925 77 78",
      action: () => window.open("tel:+243819257778", "_blank")
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@cristalentreprises.com",
      action: () => window.open("mailto:info@cristalentreprises.com", "_blank")
    },
    {
      icon: Facebook,
      title: "Facebook",
      content: "www.facebook.com/cristalentrerprises",
      action: () => window.open("https://www.facebook.com/cristalentrerprises", "_blank")
    }
  ];

  const businessHours = [
    { day: "Lundi - Vendredi", hours: "8h00 - 17h00" },
    { day: "Samedi", hours: "8h00 - 13h00" },
    { day: "Dimanche", hours: "Urgences uniquement" }
  ];

  return (
    <section id="contact" className="py-20 bg-solar-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-medium">Contact</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Demander un Devis
            <span className="block gradient-text">Installation Solaire</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Remplissez ce formulaire détaillé pour obtenir un devis précis et personnalisé pour votre installation solaire.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-background border-border shadow-solar">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-foreground flex items-center">
                    <Sun className="w-6 h-6 mr-3 text-primary" />
                    Formulaire de Devis
                  </h3>
                  <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    Numéro de formulaire
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground flex items-center border-b pb-2">
                      <Home className="w-5 h-5 mr-2 text-primary" />
                      Informations Personnelles
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Nom *
                        </label>
                        <Input 
                          name="lastName" 
                          value={formData.lastName} 
                          onChange={handleInputChange} 
                          placeholder="Votre nom" 
                          required 
                          className="border-border focus:border-primary" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Prénom *
                        </label>
                        <Input 
                          name="firstName" 
                          value={formData.firstName} 
                          onChange={handleInputChange} 
                          placeholder="Votre prénom" 
                          required 
                          className="border-border focus:border-primary" 
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Adresse *
                        </label>
                        <Input 
                          name="address" 
                          value={formData.address} 
                          onChange={handleInputChange} 
                          placeholder="Votre adresse" 
                          required 
                          className="border-border focus:border-primary" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Quartier *
                        </label>
                        <Input 
                          name="quarter" 
                          value={formData.quarter} 
                          onChange={handleInputChange} 
                          placeholder="Votre quartier" 
                          required 
                          className="border-border focus:border-primary" 
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Téléphone *
                        </label>
                        <Input 
                          type="tel" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                          placeholder="+243 XXX XXX XXX" 
                          required 
                          className="border-border focus:border-primary" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Ville *
                        </label>
                        <Input 
                          name="city" 
                          value={formData.city} 
                          onChange={handleInputChange} 
                          placeholder="Votre ville" 
                          required 
                          className="border-border focus:border-primary" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Adresse de l'installation (si différente)
                      </label>
                      <Input 
                        name="installationAddress" 
                        value={formData.installationAddress} 
                        onChange={handleInputChange} 
                        placeholder="Adresse où sera installé le système solaire" 
                        className="border-border focus:border-primary" 
                      />
                    </div>
                  </div>

                  {/* Sunny Space */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground flex items-center border-b pb-2">
                      <Sun className="w-5 h-5 mr-2 text-primary" />
                      Espace ensoleillé plein Sud/Nord disponible *
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {["Oui", "Non", "À étudier"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setSunnySpace(option)}
                          className={`px-6 py-3 rounded-lg border-2 transition-all ${
                            sunnySpace === option 
                              ? 'border-primary bg-primary/10 text-primary font-medium' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Distance entre les modules solaires et le local technique
                      </label>
                      <Input 
                        value={distance} 
                        onChange={(e) => setDistance(e.target.value)} 
                        placeholder="Ex: 10 mètres" 
                        className="border-border focus:border-primary" 
                      />
                    </div>
                  </div>

                  {/* Usage Frequency */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground flex items-center border-b pb-2">
                      <Clock className="w-5 h-5 mr-2 text-primary" />
                      Fréquence d'utilisation *
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {["Toute l'année", "Week-end", "Vacances", "Autres"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setUsageFrequency(option)}
                          className={`px-6 py-3 rounded-lg border-2 transition-all ${
                            usageFrequency === option 
                              ? 'border-primary bg-primary/10 text-primary font-medium' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Mois d'utilisation (sélectionnez tous les mois concernés)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {months.map((month) => (
                          <button
                            key={month}
                            type="button"
                            onClick={() => toggleMonth(month)}
                            className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                              selectedMonths.includes(month) 
                                ? 'border-primary bg-primary text-primary-foreground font-medium' 
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            {month}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Lighting Consumption */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground flex items-center border-b pb-2">
                      <Zap className="w-5 h-5 mr-2 text-primary" />
                      Consommation Journalière - Points d'Éclairage
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted">
                            <th className="border border-border px-4 py-2 text-left text-sm font-medium">Point d'éclairage</th>
                            <th className="border border-border px-4 py-2 text-left text-sm font-medium">Consommation (Watt)</th>
                            <th className="border border-border px-4 py-2 text-left text-sm font-medium">Durée (heures)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lightingConsumption.map((item, index) => (
                            <tr key={item.room}>
                              <td className="border border-border px-4 py-2 text-sm">{item.room}</td>
                              <td className="border border-border px-2 py-1">
                                <Input 
                                  type="number"
                                  value={item.watts}
                                  onChange={(e) => handleLightingChange(index, 'watts', e.target.value)}
                                  placeholder="W"
                                  className="h-8 text-sm"
                                />
                              </td>
                              <td className="border border-border px-2 py-1">
                                <Input 
                                  type="number"
                                  value={item.hours}
                                  onChange={(e) => handleLightingChange(index, 'hours', e.target.value)}
                                  placeholder="h"
                                  className="h-8 text-sm"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Appliance Consumption */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground flex items-center border-b pb-2">
                      <Building2 className="w-5 h-5 mr-2 text-primary" />
                      Consommation Journalière - Appareils
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted">
                            <th className="border border-border px-4 py-2 text-left text-sm font-medium">Appareil</th>
                            <th className="border border-border px-4 py-2 text-left text-sm font-medium">Consommation (Watt)</th>
                            <th className="border border-border px-4 py-2 text-left text-sm font-medium">Durée (heures)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {applianceConsumption.map((item, index) => (
                            <tr key={item.appliance}>
                              <td className="border border-border px-4 py-2 text-sm">{item.appliance}</td>
                              <td className="border border-border px-2 py-1">
                                <Input 
                                  type="number"
                                  value={item.watts}
                                  onChange={(e) => handleApplianceChange(index, 'watts', e.target.value)}
                                  placeholder="W"
                                  className="h-8 text-sm"
                                />
                              </td>
                              <td className="border border-border px-2 py-1">
                                <Input 
                                  type="number"
                                  value={item.hours}
                                  onChange={(e) => handleApplianceChange(index, 'hours', e.target.value)}
                                  placeholder="h"
                                  className="h-8 text-sm"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Other Power Source */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground flex items-center border-b pb-2">
                      <Zap className="w-5 h-5 mr-2 text-primary" />
                      Autre Source d'Alimentation
                    </h4>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Groupe électrogène existant *
                      </label>
                      <div className="flex gap-4">
                        {["Oui", "Non"].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setHasGenerator(option)}
                            className={`px-6 py-3 rounded-lg border-2 transition-all ${
                              hasGenerator === option 
                                ? 'border-primary bg-primary/10 text-primary font-medium' 
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Autonomie du système souhaitée
                      </label>
                      <Input 
                        value={autonomy} 
                        onChange={(e) => setAutonomy(e.target.value)} 
                        placeholder="Ex: 2 jours, 48 heures..." 
                        className="border-border focus:border-primary" 
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full gradient-primary text-white shadow-warm">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Envoyer la Demande via WhatsApp
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    * Champs obligatoires. Votre demande sera envoyée directement à notre équipe technique via WhatsApp.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <Card className="bg-background border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Contact Rapide
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <button 
                      key={index} 
                      onClick={info.action} 
                      className="flex items-start space-x-3 w-full text-left hover:bg-muted/50 p-3 rounded-lg transition-colors"
                    >
                      <info.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-foreground text-sm">{info.title}</div>
                        <div className="text-muted-foreground text-sm whitespace-pre-line">
                          {info.content}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="bg-background border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  Horaires d'Ouverture
                </h3>
                <div className="space-y-3">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-foreground font-medium text-sm">{schedule.day}</span>
                      <span className="text-muted-foreground text-sm">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-xs font-medium">
                    🔧 Service d'urgence 24h/7j pour nos clients sous contrat de maintenance
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Company Legal Info */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Informations Légales
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-foreground">RCCM:</span>
                    <span className="text-muted-foreground ml-2">CD/KiN/RCCM/15-A-25689</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">ID National:</span>
                    <span className="text-muted-foreground ml-2">01-93-N9 6565F</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">N° d'Impôt:</span>
                    <span className="text-muted-foreground ml-2">A2315374 M</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <Card className="mt-12 overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-muted h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-foreground mb-2">Notre Adresse</h4>
                <p className="text-muted-foreground mb-4">
                  32, Avenue Kabale, Q/Tshimanga<br />
                  C/Barumbu, Kinshasa - RDC
                </p>
                <Button 
                  onClick={() => window.open("https://maps.google.com/?q=32+Avenue+Kabale+Kinshasa", "_blank")} 
                  variant="outline"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Voir sur Google Maps
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
