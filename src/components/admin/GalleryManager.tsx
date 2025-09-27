import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { ImageUpload } from './ImageUpload';
import { Plus, Trash2 } from 'lucide-react';

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  category: string;
  order_index: number;
  is_active: boolean;
}

export const GalleryManager = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { language } = useLanguage();

  const texts = {
    fr: {
      title: 'Gestion de la galerie',
      description: 'Gérez les images de votre galerie',
      addImage: 'Ajouter une image',
      save: 'Sauvegarder',
      delete: 'Supprimer',
      saving: 'Sauvegarde...',
      saved: 'Image sauvegardée avec succès',
      deleted: 'Image supprimée avec succès',
      error: 'Erreur lors de l\'opération',
      alt_text_field: 'Texte alternatif',
      category_field: 'Catégorie',
      image_field: 'Image (obligatoire)',
      confirmDelete: 'Êtes-vous sûr de vouloir supprimer cette image ?'
    },
    en: {
      title: 'Gallery Management',
      description: 'Manage your gallery images',
      addImage: 'Add Image',
      save: 'Save',
      delete: 'Delete',
      saving: 'Saving...',
      saved: 'Image saved successfully',
      deleted: 'Image deleted successfully',
      error: 'Error during operation',
      alt_text_field: 'Alt Text',
      category_field: 'Category',
      image_field: 'Image (required)',
      confirmDelete: 'Are you sure you want to delete this image?'
    }
  };

  const t = texts[language];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setImages(data || []);
    } catch (err) {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (image: GalleryImage) => {
    setSaving(image.id);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase
        .from('gallery')
        .upsert({
          id: image.id,
          image_url: image.image_url,
          alt_text: image.alt_text,
          category: image.category,
          order_index: image.order_index,
          is_active: image.is_active,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setSuccess(t.saved);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(t.error);
    } finally {
      setSaving(null);
    }
  };

  const handleDelete = async (imageId: string) => {
    if (!window.confirm(t.confirmDelete)) return;

    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', imageId);

      if (error) throw error;

      setImages(prev => prev.filter(img => img.id !== imageId));
      setSuccess(t.deleted);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(t.error);
    }
  };

  const addNewImage = () => {
    const newImage: GalleryImage = {
      id: crypto.randomUUID(),
      image_url: '',
      alt_text: '',
      category: 'general',
      order_index: images.length,
      is_active: true
    };
    setImages(prev => [...prev, newImage]);
  };

  const updateImage = (id: string, field: keyof GalleryImage, value: any) => {
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, [field]: value } : img
    ));
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{t.title}</h2>
          <p className="text-muted-foreground">{t.description}</p>
        </div>
        <Button onClick={addNewImage}>
          <Plus className="h-4 w-4 mr-2" />
          {t.addImage}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {images.map((image) => (
          <Card key={image.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Image #{image.order_index + 1}</CardTitle>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(image.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">{t.image_field}</label>
                <ImageUpload
                  currentImageUrl={image.image_url}
                  onUpload={(imageUrl) => updateImage(image.id, 'image_url', imageUrl)}
                  bucket="gallery-images"
                />
              </div>

              <div>
                <label className="text-sm font-medium">{t.alt_text_field}</label>
                <Input
                  value={image.alt_text || ''}
                  onChange={(e) => updateImage(image.id, 'alt_text', e.target.value)}
                  placeholder={t.alt_text_field}
                />
              </div>

              <div>
                <label className="text-sm font-medium">{t.category_field}</label>
                <Input
                  value={image.category}
                  onChange={(e) => updateImage(image.id, 'category', e.target.value)}
                  placeholder={t.category_field}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleSave(image)}
                  disabled={saving === image.id || !image.image_url}
                >
                  {saving === image.id ? t.saving : t.save}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};