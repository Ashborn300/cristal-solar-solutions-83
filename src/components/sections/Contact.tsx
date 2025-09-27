import { MapPin, Phone, Mail, Facebook, Clock, Send, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Updated to use Supabase content
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";
const Contact = () => {
  const { t } = useLanguage();
  const { getTitle, getBodyText } = usePageContent('home');
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project: "",
    message: ""
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Créer le message WhatsApp
    const whatsappMessage = `
🌞 DEMANDE DE DEVIS SOLAIRE - CRISTAL ALTERNATIVE ENGINEERING

👤 Nom: ${formData.name}
📧 Email: ${formData.email}
📱 Téléphone: ${formData.phone}
🔧 Type de projet: ${formData.project}

💬 Message:
${formData.message}

---
Envoyé depuis le site web cristal-engineering.com
    `.trim();
    const whatsappUrl = `https://wa.me/243819257778?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    toast({
      title: "Message préparé !",
      description: "Votre demande va s'ouvrir dans WhatsApp."
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      project: "",
      message: ""
    });
  };
  const contactInfo = [{
    icon: MapPin,
    title: "Adresse",
    content: "32, Avenue Kabale, Q/Tshimanga\nC/Barumbu, Kinshasa - RDC",
    action: () => window.open("https://maps.google.com/?q=32+Avenue+Kabale+Kinshasa", "_blank")
  }, {
    icon: Phone,
    title: "Téléphone",
    content: "+243 81 925 77 78",
    action: () => window.open("tel:+243819257778", "_blank")
  }, {
    icon: Mail,
    title: "Email",
    content: "info@cristalentreprises.com",
    action: () => window.open("mailto:info@cristalentreprises.com", "_blank")
  }, {
    icon: Facebook,
    title: "Facebook",
    content: "www.facebook.com/cristalentrerprises",
    action: () => window.open("https://www.facebook.com/cristalentrerprises", "_blank")
  }];
  const businessHours = [{
    day: "Lundi - Vendredi",
    hours: "8h00 - 17h00"
  }, {
    day: "Samedi",
    hours: "8h00 - 13h00"
  }, {
    day: "Dimanche",
    hours: "Urgences uniquement"
  }];
  return <section id="contact" className="py-20 bg-solar-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-medium">Contact</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {getTitle('contact', 'Parlons de Votre')}
            <span className="block gradient-text">Projet Solaire</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {getBodyText('contact', 'Notre équipe d\'experts est prête à vous accompagner. Contactez-nous pour une consultation gratuite et un devis personnalisé adapté à vos besoins énergétiques.')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-background border-border shadow-solar">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <Send className="w-6 h-6 mr-3 text-primary" />
                  Demande de Devis Gratuit
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nom complet *
                      </label>
                      <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Votre nom complet" required className="border-border focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="votre@email.com" required className="border-border focus:border-primary" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Téléphone *
                      </label>
                      <Input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+243 XXX XXX XXX" required className="border-border focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Type de projet *
                      </label>
                      <select name="project" value={formData.project} onChange={handleInputChange} required className="w-full p-3 border border-border rounded-md focus:border-primary focus:outline-none bg-background">
                        <option value="">Sélectionnez un type</option>
                        <option value="Résidentiel">Installation Résidentielle</option>
                        <option value="Commercial">Installation Commerciale</option>
                        <option value="Industriel">Installation Industrielle</option>
                        <option value="Rural">Électrification Rurale</option>
                        <option value="Maintenance">Maintenance/Dépannage</option>
                        <option value="Conseil">Conseil et Étude</option>
                        <option value="Autre">Autre projet</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Décrivez votre projet *
                    </label>
                    <Textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Décrivez vos besoins: puissance souhaitée, budget approximatif, délais, contraintes particulières..." rows={4} required className="border-border focus:border-primary" />
                  </div>

                  <Button type="submit" size="lg" className="w-full gradient-primary text-white shadow-warm">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Envoyer via WhatsApp
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    En envoyant ce formulaire, votre demande s'ouvrira dans WhatsApp pour un contact direct avec notre équipe.
                    Réponse garantie sous 24h.
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
                  {contactInfo.map((info, index) => <button key={index} onClick={info.action} className="flex items-start space-x-3 w-full text-left hover:bg-muted/50 p-3 rounded-lg transition-colors">
                      <info.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-foreground text-sm">{info.title}</div>
                        <div className="text-muted-foreground text-sm whitespace-pre-line">
                          {info.content}
                        </div>
                      </div>
                    </button>)}
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
                  {businessHours.map((schedule, index) => <div key={index} className="flex justify-between items-center">
                      <span className="text-foreground font-medium text-sm">{schedule.day}</span>
                      <span className="text-muted-foreground text-sm">{schedule.hours}</span>
                    </div>)}
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
                <Button onClick={() => window.open("https://maps.google.com/?q=32+Avenue+Kabale+Kinshasa", "_blank")} variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  Voir sur Google Maps
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>;
};
export default Contact;