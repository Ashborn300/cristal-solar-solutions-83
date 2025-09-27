-- Initialiser le contenu des pages avec toutes les sections du site
INSERT INTO pages_content (page_name, section, title, body_text, image_url, order_index, is_active) VALUES
-- Section Hero
('home', 'hero', 'Expert Énergie Solaire RDC', 'Solutions solaires complètes pour particuliers et entreprises. Plus de 14 ans d''expertise en énergie renouvelable.', NULL, 1, true),
('home', 'hero_badge', 'Certifié Expert Solaire', NULL, NULL, 2, true),
('home', 'hero_subtitle', 'Votre Partenaire Solaire', NULL, NULL, 3, true),
('home', 'hero_description', 'Installations photovoltaïques professionnelles, systèmes hybrides et maintenance complète pour un avenir énergétique durable.', NULL, NULL, 4, true),

-- Section About
('home', 'about', 'À Propos de CRISTAL', 'Depuis plus de 14 ans, CRISTAL ALTERNATIVE ENGINEERING est votre partenaire de confiance pour tous vos projets d''énergie solaire en République Démocratique du Congo.', NULL, 10, true),
('home', 'about_story', 'Notre Histoire', 'Fondée avec la vision de démocratiser l''accès à l''énergie propre, CRISTAL s''est imposée comme leader du secteur solaire en RDC. Notre équipe d''experts passionnés travaille chaque jour pour offrir des solutions énergétiques durables et accessibles.', NULL, 11, true),
('home', 'about_vision', 'Notre Vision', 'Être le leader incontournable de l''énergie solaire en Afrique Centrale, en rendant l''énergie propre accessible à tous.', NULL, 12, true),
('home', 'about_mission', 'Notre Mission', 'Fournir des solutions énergétiques solaires de qualité supérieure, accompagner nos clients vers l''autonomie énergétique.', NULL, 13, true),

-- Section Services
('home', 'services', 'Nos Services', 'Des solutions complètes d''énergie solaire adaptées à vos besoins spécifiques.', NULL, 20, true),
('home', 'services_overview', 'Services Complets', 'De l''étude à la maintenance, nous vous accompagnons dans tous vos projets solaires avec expertise et professionnalisme.', NULL, 21, true),

-- Section Leadership
('home', 'leadership', 'Notre Leadership', 'Une équipe d''experts dédiés à votre réussite énergétique.', NULL, 30, true),

-- Section Statistics
('home', 'statistics', 'Nos Résultats', 'Plus de 14 ans d''expérience et 500+ projets réalisés avec 98% de satisfaction client.', NULL, 40, true),

-- Section Projects
('home', 'projects', 'Nos Réalisations', 'Découvrez nos projets les plus emblématiques et notre savoir-faire technique.', NULL, 50, true),

-- Section Testimonials
('home', 'testimonials', 'Témoignages', 'Ce que disent nos clients satisfaits de nos services.', NULL, 60, true),

-- Section FAQ
('home', 'faq', 'Questions Fréquentes', 'Trouvez les réponses aux questions les plus courantes sur nos services solaires.', NULL, 70, true),

-- Section Company Info
('home', 'company_info', 'Informations Légales', 'CRISTAL ALTERNATIVE ENGINEERING - Société légalement constituée en RDC.', NULL, 80, true),

-- Section Contact
('home', 'contact', 'Contactez-Nous', 'Discutons de votre projet solaire et trouvons ensemble la solution idéale.', NULL, 90, true),

-- Section Facebook
('home', 'facebook', 'Suivez-nous', 'Restez connectés avec nos dernières actualités et réalisations.', NULL, 85, true),

-- Section Attestations
('home', 'attestations', 'Nos Certifications', 'Certifications et attestations de qualité qui garantissent notre expertise.', NULL, 75, true)

ON CONFLICT (page_name, section) DO NOTHING;