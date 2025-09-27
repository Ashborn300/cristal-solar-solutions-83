-- Insert default content for pages
INSERT INTO public.pages_content (page_name, section, title, body_text, order_index) VALUES
  ('home', 'hero', 'Votre partenaire pour des solutions énergétiques durables', 'Cristal Alternative Engineering est spécialisée dans l''installation de systèmes solaires, l''électrification et les solutions énergétiques innovantes.', 1),
  ('home', 'hero_subtitle', 'Plus de 50 projets réalisés avec succès', 'Faites confiance à notre expertise pour vos besoins énergétiques', 2),
  ('about', 'title', 'À propos de Cristal Alternative Engineering', null, 1),
  ('about', 'description', 'Une entreprise spécialisée dans les solutions énergétiques durables', 'Depuis notre création, nous nous engageons à fournir des solutions énergétiques innovantes et durables. Notre équipe d''experts accompagne nos clients dans leurs projets d''électrification et d''installation de systèmes solaires.', 2),
  ('contact', 'title', 'Contactez-nous', null, 1),
  ('contact', 'description', 'Parlons de votre projet', 'Notre équipe est à votre disposition pour discuter de vos besoins énergétiques et vous proposer des solutions adaptées.', 2),
  ('contact', 'address', 'Kinshasa, République Démocratique du Congo', null, 3),
  ('contact', 'phone', '+243 81 925 7778', null, 4),
  ('contact', 'email', 'info@cristalentreprises.com', null, 5);

-- Insert default services
INSERT INTO public.services (title, description, order_index) VALUES
  ('Installation de panneaux solaires', 'Installation complète de systèmes photovoltaïques résidentiels et commerciaux avec garantie de performance.', 1),
  ('Électrification industrielle', 'Solutions d''électrification pour les entreprises et les installations industrielles.', 2),
  ('Maintenance et dépannage', 'Service de maintenance préventive et corrective de vos installations électriques et solaires.', 3),
  ('Consultation énergétique', 'Audit énergétique et conseil pour optimiser votre consommation et réduire vos coûts.', 4);

-- Insert default realizations (using existing images from assets)
INSERT INTO public.realisations (title, description, image_url, order_index) VALUES
  ('Projet solaire résidentiel', 'Installation de 20 panneaux solaires pour une résidence familiale', '/src/assets/solar-house-modern.jpg', 1),
  ('Électrification école', 'Projet d''électrification complète d''une école primaire', '/src/assets/solar-school-installation.jpg', 2),
  ('Installation industrielle', 'Système énergétique pour complexe industriel', '/src/assets/electrical-equipment-1.jpg', 3),
  ('Stockage d''énergie', 'Installation de système de stockage par batteries', '/src/assets/battery-storage-room.jpg', 4);

-- Insert gallery images (using existing images from assets)
INSERT INTO public.gallery (image_url, alt_text, category, order_index) VALUES
  ('/src/assets/gallery/solar-aerial-view.jpg', 'Vue aérienne installation solaire', 'solaire', 1),
  ('/src/assets/gallery/battery-system.jpg', 'Système de batteries', 'stockage', 2),
  ('/src/assets/gallery/electrical-equipment-1.jpg', 'Équipement électrique', 'électrique', 3),
  ('/src/assets/gallery/solar-construction-1.jpg', 'Construction installation solaire', 'solaire', 4),
  ('/src/assets/gallery/solar-installation-roof.jpg', 'Panneaux solaires sur toit', 'solaire', 5),
  ('/src/assets/gallery/solar-school-installation.jpg', 'Installation école', 'solaire', 6);