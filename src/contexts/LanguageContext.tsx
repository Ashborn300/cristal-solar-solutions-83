import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  fr: {
    // Header
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.about': 'À propos',
    'nav.projects': 'Réalisations',
    'nav.testimonials': 'Témoignages',
    'nav.cv': 'CV',
    'nav.contact': 'Contact',
    'nav.freeQuote': 'Devis Gratuit',
    'nav.whatsapp': 'WhatsApp',

    // Hero
    'hero.badge': '14 ans d\'expertise certifiée',
    'hero.title': 'Solutions Solaires',
    'hero.subtitle': 'Durables & Fiables',
    'hero.description': 'CRISTAL ALTERNATIVE ENGINEERING - Votre partenaire de confiance pour l\'énergie solaire à Kinshasa. Études, installation, maintenance et conseil.',
    'hero.years': 'Années d\'expérience',
    'hero.projects': 'Projets réalisés',
    'hero.satisfaction': 'Clients satisfaits',
    'hero.freeQuote': 'Devis Gratuit',
    'hero.contactWhatsapp': 'Contact WhatsApp',
    'hero.viewCV': 'Voir notre CV d\'Expert',
    'hero.viewGallery': 'Voir nos réalisations',
    'hero.completeSolutions': 'Solutions Complètes',
    'hero.completeSolutionsDesc': 'De l\'étude à l\'installation, nous couvrons tous vos besoins en énergie solaire.',
    'hero.localExpertise': 'Expertise Locale',
    'hero.localExpertiseDesc': '14 ans d\'expérience au service des entreprises et particuliers de Kinshasa.',
    'hero.qualityGuarantee': 'Garantie Qualité',
    'hero.qualityGuaranteeDesc': 'Maintenance et support technique pour la durabilité de vos installations.',

    // Services
    'services.title': 'Nos Services',
    'services.heading': 'Solutions Solaires',
    'services.subheading': 'Complètes & Professionnelles',
    'services.description': 'Découvrez notre gamme complète de services pour votre transition vers l\'énergie solaire. Plus de 14 ans d\'expertise au service de vos projets énergétiques.',
    'services.studies.title': 'Études et Dimensionnements Solaires',
    'services.studies.description': 'Analyse complète de vos besoins énergétiques et conception sur mesure de votre installation solaire pour une efficacité optimale.',
    'services.studies.feature1': 'Analyse de consommation',
    'services.studies.feature2': 'Calcul de rentabilité',
    'services.studies.feature3': 'Plans techniques détaillés',
    'services.studies.feature4': 'Simulation 3D',
    'services.supply.title': 'Fourniture et Installation',
    'services.supply.description': 'Approvisionnement en équipements solaires de qualité premium et installation professionnelle par nos équipes certifiées.',
    'services.supply.feature1': 'Panneaux haute performance',
    'services.supply.feature2': 'Installation certifiée',
    'services.supply.feature3': 'Mise en service',
    'services.supply.feature4': 'Formation utilisateur',
    'services.maintenance.title': 'Maintenance et Dépannage',
    'services.maintenance.description': 'Service après-vente complet avec maintenance préventive et interventions rapides pour assurer la longévité de vos équipements.',
    'services.maintenance.feature1': 'Maintenance préventive',
    'services.maintenance.feature2': 'Dépannage 24h/7j',
    'services.maintenance.feature3': 'Pièces de rechange',
    'services.maintenance.feature4': 'Garantie étendue',
    'services.hybrid.title': 'Solutions Hybrides et On-Grid',
    'services.hybrid.description': 'Systèmes innovants combinant solaire, réseau électrique et stockage pour une alimentation continue et optimisée.',
    'services.hybrid.feature1': 'Systèmes hybrides',
    'services.hybrid.feature2': 'Connexion réseau',
    'services.hybrid.feature3': 'Stockage intelligent',
    'services.hybrid.feature4': 'Monitoring avancé',
    'services.consulting.title': 'Conseil Technique Énergies Renouvelables',
    'services.consulting.description': 'Expertise technique et conseil stratégique pour optimiser votre transition vers les énergies renouvelables.',
    'services.consulting.feature1': 'Audit énergétique',
    'services.consulting.feature2': 'Conseil stratégique',
    'services.consulting.feature3': 'Formation technique',
    'services.consulting.feature4': 'Accompagnement projet',
    'services.requestQuote': 'Demander un devis',
    'services.overview.title': 'Nos Domaines d\'Expertise',
    'services.overview.description': 'Découvrez la gamme complète de nos services pour répondre à tous vos besoins énergétiques et techniques.',
    'services.overview.service1': 'Étude de faisabilité solaire',
    'services.overview.service1.desc': 'Analyse technique et économique de votre projet solaire pour garantir sa viabilité et optimiser votre investissement.',
    'services.overview.service2': 'Installation des systèmes solaires',
    'services.overview.service2.desc': 'Installation professionnelle clé en main de vos équipements solaires avec garantie de qualité et de performance.',
    'services.overview.service3': 'Audit énergétique',
    'services.overview.service3.desc': 'Évaluation complète de votre consommation énergétique pour identifier les opportunités d\'économie d\'énergie.',
    'services.overview.service4': 'Modernisation des installations électriques',
    'services.overview.service4.desc': 'Mise à niveau de vos installations électriques selon les normes actuelles pour plus de sécurité et d\'efficacité.',
    'services.overview.service5': 'Installation des systèmes d\'irrigation solaire',
    'services.overview.service5.desc': 'Solutions d\'irrigation alimentées par l\'énergie solaire pour l\'agriculture et l\'aquaculture durables.',
    'services.overview.service6': 'Fourniture et installation des machines de production d\'aliment pour les poissons, les volailles et les porcs',
    'services.overview.service6.desc': 'Équipements complets pour la production d\'aliments pour bétail avec systèmes d\'alimentation solaire.',
    'services.overview.service7': 'Fourniture et installation des pondeuses de briques, pavées et divers',
    'services.overview.service7.desc': 'Machines de fabrication de briques et pavés pour vos projets de construction et d\'aménagement.',
    'services.overview.service8': 'Fourniture et installation des couveuses solaires, de plumeuses et divers',
    'services.overview.service8.desc': 'Équipements avicoles solaires pour l\'élevage moderne et écologique de volailles.',
    'services.overview.service9': 'China Drop Shipping',
    'services.overview.service9.desc': 'Service d\'importation directe depuis la Chine pour tous vos besoins en équipements et matériels.',
    'services.overview.service10': 'Fourniture des bâches géomembranes et divers accessoires',
    'services.overview.service10.desc': 'Matériaux d\'étanchéité et accessoires pour vos projets d\'aménagement et de construction.',
    'services.overview.service11': 'Fourniture et installation des congélateurs, frigo et split solaire',
    'services.overview.service11.desc': 'Systèmes de réfrigération et climatisation alimentés par l\'énergie solaire pour tous usages.',
    'services.overview.service12': 'Évaluation et analyse des études solaires photovoltaïque',
    'services.overview.service12.desc': 'Expertise technique pour l\'évaluation et l\'optimisation de vos projets photovoltaïques existants.',
    'services.cta.title': 'Prêt à passer au solaire ?',
    'services.cta.description': 'Contactez-nous dès aujourd\'hui pour une consultation gratuite et découvrez comment l\'énergie solaire peut transformer votre consommation énergétique.',
    'services.cta.freeConsultation': 'Consultation Gratuite',
    'services.cta.learnMore': 'En savoir plus',

    // About
    'about.badge': 'À Propos',
    'about.title': 'CRISTAL ALTERNATIVE',
    'about.subtitle': 'ENGINEERING',
    'about.description': 'Pionnier de l\'énergie solaire à Kinshasa depuis plus de 14 ans, nous sommes votre partenaire de confiance pour un avenir énergétique durable.',
    'about.ourStory': 'Notre Histoire',
    'about.storyP1': 'Fondée à Kinshasa, CRISTAL ALTERNATIVE ENGINEERING s\'est imposée comme le leader des solutions photovoltaïques en République Démocratique du Congo. Avec plus de 14 années d\'expertise, nous avons accompagné des centaines de clients dans leur transition vers l\'énergie solaire.',
    'about.storyP2': 'Notre engagement pour l\'excellence et l\'innovation nous a permis de développer une expertise unique dans le dimensionnement, l\'installation et la maintenance de systèmes solaires adaptés au climat tropical de la région.',
    'about.vision': 'Notre Vision',
    'about.visionDesc': 'Être le leader incontournable de l\'énergie solaire en Afrique Centrale.',
    'about.mission': 'Notre Mission',
    'about.missionDesc': 'Démocratiser l\'accès à l\'énergie solaire propre et abordable.',
    'about.stats.years': 'Années d\'expérience',
    'about.stats.projects': 'Projets réalisés',
    'about.stats.satisfaction': 'Taux de satisfaction',
    'about.stats.support': 'Support technique',
    'about.stats.expertise': 'Années d\'expertise',
    'about.stats.subtitle': 'Au service de l\'énergie durable',
    'about.values.title': 'Nos Valeurs',
    'about.values.description': 'Les principes qui guident notre action quotidienne pour vous offrir le meilleur service.',
    'about.values.excellence': 'Excellence Technique',
    'about.values.excellenceDesc': 'Nous utilisons les meilleures technologies solaires disponibles sur le marché pour garantir des performances optimales.',
    'about.values.service': 'Service Client',
    'about.values.serviceDesc': 'Notre équipe dédiée vous accompagne à chaque étape de votre projet, de l\'étude à la maintenance.',
    'about.values.sustainability': 'Développement Durable',
    'about.values.sustainabilityDesc': 'Nous contribuons activement à la transition énergétique du Congo vers des solutions plus respectueuses de l\'environnement.',

    // Facebook Section
    'facebook.badge': 'Rejoignez-nous',
    'facebook.title': 'Suivez-nous sur Facebook',
    'facebook.description': 'Découvrez nos dernières réalisations, conseils techniques et actualités sur l\'énergie solaire. Rejoignez notre communauté et restez informé de nos innovations.',
    'facebook.followTitle': 'Cristal Enterprises',
    'facebook.followDescription': 'Suivez notre page Facebook officielle pour ne rien manquer de nos projets et bénéficier de conseils d\'experts en énergie solaire.',
    'facebook.visitPage': 'Visiter notre page',
    'facebook.subscribe': 'S\'abonner',
    'facebook.feature1.title': 'Communauté Active',
    'facebook.feature1.desc': 'Échangez avec d\'autres passionnés d\'énergie solaire',
    'facebook.feature2.title': 'Projets en Direct',
    'facebook.feature2.desc': 'Découvrez nos réalisations en temps réel',
    'facebook.feature3.title': 'Conseils d\'Expert',
    'facebook.feature3.desc': 'Bénéficiez de notre expertise technique',

    // Common
    'common.download': 'Télécharger',
    'common.loading': 'Chargement...',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.testimonials': 'Testimonials',
    'nav.cv': 'CV',
    'nav.contact': 'Contact',
    'nav.freeQuote': 'Free Quote',
    'nav.whatsapp': 'WhatsApp',

    // Hero
    'hero.badge': '14 years of certified expertise',
    'hero.title': 'Solar Solutions',
    'hero.subtitle': 'Sustainable & Reliable',
    'hero.description': 'CRISTAL ALTERNATIVE ENGINEERING - Your trusted partner for solar energy in Kinshasa. Studies, installation, maintenance and consulting.',
    'hero.years': 'Years of experience',
    'hero.projects': 'Completed projects',
    'hero.satisfaction': 'Satisfied clients',
    'hero.freeQuote': 'Free Quote',
    'hero.contactWhatsapp': 'WhatsApp Contact',
    'hero.viewCV': 'View our Expert CV',
    'hero.viewGallery': 'View our Projects',
    'hero.completeSolutions': 'Complete Solutions',
    'hero.completeSolutionsDesc': 'From study to installation, we cover all your solar energy needs.',
    'hero.localExpertise': 'Local Expertise',
    'hero.localExpertiseDesc': '14 years of experience serving businesses and individuals in Kinshasa.',
    'hero.qualityGuarantee': 'Quality Guarantee',
    'hero.qualityGuaranteeDesc': 'Maintenance and technical support for the durability of your installations.',

    // Services
    'services.title': 'Our Services',
    'services.heading': 'Solar Solutions',
    'services.subheading': 'Complete & Professional',
    'services.description': 'Discover our complete range of services for your transition to solar energy. Over 14 years of expertise serving your energy projects.',
    'services.studies.title': 'Solar Studies and Sizing',
    'services.studies.description': 'Complete analysis of your energy needs and custom design of your solar installation for optimal efficiency.',
    'services.studies.feature1': 'Consumption analysis',
    'services.studies.feature2': 'Profitability calculation',
    'services.studies.feature3': 'Detailed technical plans',
    'services.studies.feature4': '3D simulation',
    'services.supply.title': 'Supply and Installation',
    'services.supply.description': 'Premium quality solar equipment supply and professional installation by our certified teams.',
    'services.supply.feature1': 'High performance panels',
    'services.supply.feature2': 'Certified installation',
    'services.supply.feature3': 'Commissioning',
    'services.supply.feature4': 'User training',
    'services.maintenance.title': 'Maintenance and Repair',
    'services.maintenance.description': 'Complete after-sales service with preventive maintenance and rapid interventions to ensure the longevity of your equipment.',
    'services.maintenance.feature1': 'Preventive maintenance',
    'services.maintenance.feature2': '24/7 troubleshooting',
    'services.maintenance.feature3': 'Spare parts',
    'services.maintenance.feature4': 'Extended warranty',
    'services.hybrid.title': 'Hybrid and On-Grid Solutions',
    'services.hybrid.description': 'Innovative systems combining solar, electrical grid and storage for continuous and optimized power supply.',
    'services.hybrid.feature1': 'Hybrid systems',
    'services.hybrid.feature2': 'Grid connection',
    'services.hybrid.feature3': 'Smart storage',
    'services.hybrid.feature4': 'Advanced monitoring',
    'services.consulting.title': 'Renewable Energy Technical Consulting',
    'services.consulting.description': 'Technical expertise and strategic consulting to optimize your transition to renewable energies.',
    'services.consulting.feature1': 'Energy audit',
    'services.consulting.feature2': 'Strategic consulting',
    'services.consulting.feature3': 'Technical training',
    'services.consulting.feature4': 'Project support',
    'services.requestQuote': 'Request a quote',
    'services.overview.title': 'Our Areas of Expertise',
    'services.overview.description': 'Discover our complete range of services to meet all your energy and technical needs.',
    'services.overview.service1': 'Solar feasibility study',
    'services.overview.service1.desc': 'Technical and economic analysis of your solar project to guarantee its viability and optimize your investment.',
    'services.overview.service2': 'Solar systems installation',
    'services.overview.service2.desc': 'Professional turnkey installation of your solar equipment with quality and performance guarantee.',
    'services.overview.service3': 'Energy audit',
    'services.overview.service3.desc': 'Complete evaluation of your energy consumption to identify energy saving opportunities.',
    'services.overview.service4': 'Electrical installations modernization',
    'services.overview.service4.desc': 'Upgrade of your electrical installations according to current standards for more safety and efficiency.',
    'services.overview.service5': 'Solar irrigation systems installation',
    'services.overview.service5.desc': 'Solar-powered irrigation solutions for sustainable agriculture and aquaculture.',
    'services.overview.service6': 'Supply and installation of feed production machines for fish, poultry and pigs',
    'services.overview.service6.desc': 'Complete equipment for livestock feed production with solar power systems.',
    'services.overview.service7': 'Supply and installation of brick layers, pavers and various',
    'services.overview.service7.desc': 'Brick and paver manufacturing machines for your construction and development projects.',
    'services.overview.service8': 'Supply and installation of solar incubators, pluckers and various',
    'services.overview.service8.desc': 'Solar poultry equipment for modern and ecological poultry farming.',
    'services.overview.service9': 'China Drop Shipping',
    'services.overview.service9.desc': 'Direct import service from China for all your equipment and material needs.',
    'services.overview.service10': 'Supply of geomembrane tarps and various accessories',
    'services.overview.service10.desc': 'Waterproofing materials and accessories for your development and construction projects.',
    'services.overview.service11': 'Supply and installation of freezers, fridges and solar split',
    'services.overview.service11.desc': 'Solar-powered refrigeration and air conditioning systems for all uses.',
    'services.overview.service12': 'Evaluation and analysis of photovoltaic solar studies',
    'services.overview.service12.desc': 'Technical expertise for evaluation and optimization of your existing photovoltaic projects.',
    'services.cta.title': 'Ready to go solar?',
    'services.cta.description': 'Contact us today for a free consultation and discover how solar energy can transform your energy consumption.',
    'services.cta.freeConsultation': 'Free Consultation',
    'services.cta.learnMore': 'Learn more',

    // About
    'about.badge': 'About',
    'about.title': 'CRISTAL ALTERNATIVE',
    'about.subtitle': 'ENGINEERING',
    'about.description': 'Pioneer of solar energy in Kinshasa for over 14 years, we are your trusted partner for a sustainable energy future.',
    'about.ourStory': 'Our Story',
    'about.storyP1': 'Founded in Kinshasa, CRISTAL ALTERNATIVE ENGINEERING has established itself as the leader in photovoltaic solutions in the Democratic Republic of Congo. With over 14 years of expertise, we have helped hundreds of clients in their transition to solar energy.',
    'about.storyP2': 'Our commitment to excellence and innovation has allowed us to develop unique expertise in sizing, installation and maintenance of solar systems adapted to the tropical climate of the region.',
    'about.vision': 'Our Vision',
    'about.visionDesc': 'To be the undisputed leader in solar energy in Central Africa.',
    'about.mission': 'Our Mission',
    'about.missionDesc': 'To democratize access to clean and affordable solar energy.',
    'about.stats.years': 'Years of experience',
    'about.stats.projects': 'Completed projects',
    'about.stats.satisfaction': 'Satisfaction rate',
    'about.stats.support': 'Technical support',
    'about.stats.expertise': 'Years of expertise',
    'about.stats.subtitle': 'Serving sustainable energy',
    'about.values.title': 'Our Values',
    'about.values.description': 'The principles that guide our daily actions to provide you with the best service.',
    'about.values.excellence': 'Technical Excellence',
    'about.values.excellenceDesc': 'We use the best solar technologies available on the market to guarantee optimal performance.',
    'about.values.service': 'Customer Service',
    'about.values.serviceDesc': 'Our dedicated team supports you at every stage of your project, from study to maintenance.',
    'about.values.sustainability': 'Sustainable Development',
    'about.values.sustainabilityDesc': 'We actively contribute to Congo\'s energy transition towards more environmentally friendly solutions.',

    // Facebook Section
    'facebook.badge': 'Join Us',
    'facebook.title': 'Follow us on Facebook',
    'facebook.description': 'Discover our latest achievements, technical advice and solar energy news. Join our community and stay informed of our innovations.',
    'facebook.followTitle': 'Cristal Enterprises',
    'facebook.followDescription': 'Follow our official Facebook page to not miss any of our projects and benefit from solar energy expert advice.',
    'facebook.visitPage': 'Visit our page',
    'facebook.subscribe': 'Subscribe',
    'facebook.feature1.title': 'Active Community',
    'facebook.feature1.desc': 'Connect with other solar energy enthusiasts',
    'facebook.feature2.title': 'Live Projects',
    'facebook.feature2.desc': 'Discover our achievements in real time',
    'facebook.feature3.title': 'Expert Advice',
    'facebook.feature3.desc': 'Benefit from our technical expertise',

    // Common
    'common.download': 'Download',
    'common.loading': 'Loading...',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['fr']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};