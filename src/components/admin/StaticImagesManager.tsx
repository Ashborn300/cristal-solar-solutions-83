import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { ImageUpload } from './ImageUpload';
import { Badge } from '@/components/ui/badge';
import { Search, Image as ImageIcon, Upload, Save, Trash2 } from 'lucide-react';

interface StaticImage {
  id: string;
  name: string;
  description: string;
  current_url: string;
  new_url?: string;
  category: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const StaticImagesManager = () => {
  const [images, setImages] = useState<StaticImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { language } = useLanguage();

  // Images statiques utilisées sur le site
  const staticImages = [
    { name: 'cristal-logo', description: 'Logo principal CRISTAL', category: 'branding', current_url: '/src/assets/cristal-logo.png' },
    { name: 'logo-cristal-new', description: 'Nouveau logo CRISTAL', category: 'branding', current_url: '/src/assets/logo-cristal-new.png' },
    { name: 'solar-worker-happy', description: 'Travailleur solaire heureux', category: 'about', current_url: '/src/assets/solar-worker-happy.jpg' },
    { name: 'attestation-badge', description: 'Badge d\'attestation', category: 'certifications', current_url: '/src/assets/attestation-badge.jpg' },
    { name: 'solar-panels-field', description: 'Champ de panneaux solaires', category: 'hero', current_url: '/src/assets/solar-panels-field.jpg' },
    { name: 'depute-engineering-team', description: 'Équipe d\'ingénierie députée', category: 'leadership', current_url: '/src/assets/depute-engineering-team.jpg' },
    { name: 'solar-house-modern', description: 'Maison moderne avec solaire', category: 'services', current_url: '/src/assets/solar-house-modern.jpg' },
    { name: 'solar-maintenance', description: 'Maintenance solaire', category: 'services', current_url: '/src/assets/solar-maintenance.jpg' },
    { name: 'electrical-work', description: 'Travaux électriques', category: 'services', current_url: '/src/assets/electrical-work.jpg' },
    { name: 'solar-rural-installation', description: 'Installation solaire rurale', category: 'services', current_url: '/src/assets/solar-rural-installation.jpg' },
    { name: 'solar-kit-complete', description: 'Kit solaire complet', category: 'services', current_url: '/src/assets/solar-kit-complete.jpg' },
    { name: 'solar-team-planning', description: 'Équipe planifiant solaire', category: 'projects', current_url: '/src/assets/solar-team-planning.jpg' },
    { name: 'construction-team', description: 'Équipe de construction', category: 'projects', current_url: '/src/assets/construction-team.jpg' },
    { name: 'ministere-finances-project', description: 'Projet Ministère des Finances', category: 'projects', current_url: '/src/assets/ministere-finances-project.jpg' },
    { name: 'laboratoire-mycobacteries-project', description: 'Projet Laboratoire Mycobactéries', category: 'projects', current_url: '/src/assets/laboratoire-mycobacteries-project.jpg' }
  ];

  const texts = {
    fr: {
      title: 'Gestion des images statiques',
      description: 'Modifiez les images utilisées directement dans le code du site',
      search: 'Rechercher une image...',
      category: 'Catégorie',
      currentImage: 'Image actuelle',
      newImage: 'Nouvelle image',
      description_field: 'Description',
      save: 'Sauvegarder',
      saving: 'Sauvegarde...',
      delete: 'Supprimer',
      upload_new: 'Télécharger nouvelle image',
      no_results: 'Aucune image trouvée',
      success_save: 'Image mise à jour avec succès',
      error_save: 'Erreur lors de la sauvegarde'
    },
    en: {
      title: 'Static Images Management',
      description: 'Edit images used directly in the site code',
      search: 'Search image...',
      category: 'Category',
      currentImage: 'Current image',
      newImage: 'New image',
      description_field: 'Description',
      save: 'Save',
      saving: 'Saving...',
      delete: 'Delete',
      upload_new: 'Upload new image',
      no_results: 'No images found',
      success_save: 'Image updated successfully',
      error_save: 'Error saving image'
    }
  };

  const t = texts[language];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('static_images')
        .select('*')
        .order('category', { ascending: true });

      if (error && error.code !== 'PGRST116') { // Table doesn't exist
        throw error;
      }

      const existingImages = (data as StaticImage[]) || [];
      
      // Merge with static image definitions
      const mergedImages = staticImages.map(staticImg => {
        const existing = existingImages.find(img => img.name === staticImg.name);
        return existing || {
          id: `static-${staticImg.name}`,
          ...staticImg,
          new_url: '',
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
      });

      setImages(mergedImages);
    } catch (err) {
      console.error('Error fetching static images:', err);
      // Initialize with static images if table doesn't exist
      const defaultImages = staticImages.map(staticImg => ({
        id: `static-${staticImg.name}`,
        ...staticImg,
        new_url: '',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
      setImages(defaultImages);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (imageId: string) => {
    const image = images.find(img => img.id === imageId);
    if (!image || !image.new_url) return;

    try {
      setSaving(imageId);
      setError('');

      const { error } = await supabase
        .from('static_images')
        .upsert({
          name: image.name,
          description: image.description,
          current_url: image.new_url,
          category: image.category,
          is_active: true,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'name'
        });

      if (error) throw error;

      // Update local state
      setImages(prev => prev.map(img => 
        img.id === imageId 
          ? { ...img, current_url: img.new_url!, new_url: '' }
          : img
      ));

      setSuccess(t.success_save);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error saving image:', err);
      setError(t.error_save);
    } finally {
      setSaving(null);
    }
  };

  const updateImageUrl = (imageId: string, newUrl: string) => {
    setImages(prev => prev.map(img => 
      img.id === imageId ? { ...img, new_url: newUrl } : img
    ));
  };

  const filteredImages = images.filter(image =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      branding: 'bg-purple-100 text-purple-800',
      hero: 'bg-blue-100 text-blue-800',
      about: 'bg-green-100 text-green-800',
      services: 'bg-orange-100 text-orange-800',
      projects: 'bg-red-100 text-red-800',
      certifications: 'bg-yellow-100 text-yellow-800',
      leadership: 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t.title}</h1>
        <p className="text-muted-foreground">{t.description}</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-700">{success}</AlertDescription>
        </Alert>
      )}

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredImages.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{image.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {image.description}
                  </CardDescription>
                </div>
                <Badge className={getCategoryColor(image.category)}>
                  {image.category}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Current Image */}
              <div>
                <Label className="text-sm font-medium">{t.currentImage}</Label>
                <div className="mt-2">
                  <img
                    src={image.current_url.startsWith('/src/') 
                      ? image.current_url.replace('/src/', '/') 
                      : image.current_url
                    }
                    alt={image.description}
                    className="w-full h-32 object-cover rounded-lg border"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDIwMCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04NSA2MEg1NUw3MCA0NUw4NSA2MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTExNSA2MEwxMzAgNDVMMTQ1IDYwSDExNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+SW1hZ2UgaW50cm91dmFibGU8L3A+Cjwvc3ZnPgo=';
                    }}
                  />
                </div>
              </div>

              {/* New Image Upload */}
              <div>
                <Label className="text-sm font-medium">{t.newImage}</Label>
                <div className="mt-2">
                  <ImageUpload
                    currentImageUrl={image.new_url}
                    onUpload={(url) => updateImageUrl(image.id, url)}
                    bucket="site-images"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => handleSave(image.id)}
                  disabled={!image.new_url || saving === image.id}
                  className="flex-1"
                >
                  {saving === image.id ? (
                    <>
                      <Upload className="w-4 h-4 mr-2 animate-spin" />
                      {t.saving}
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {t.save}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {t.no_results}
            </h3>
            <p className="text-muted-foreground">
              Essayez de modifier votre recherche.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};