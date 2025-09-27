import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { ImageUpload } from './ImageUpload';
import { Plus, Trash2 } from 'lucide-react';

interface Realisation {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  order_index: number;
  is_active: boolean;
}

export const RealisationsManager = () => {
  const [realisations, setRealisations] = useState<Realisation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { language } = useLanguage();

  const texts = {
    fr: {
      title: 'Gestion des réalisations',
      description: 'Gérez vos projets et réalisations',
      addRealisation: 'Ajouter une réalisation',
      save: 'Sauvegarder',
      delete: 'Supprimer',
      saving: 'Sauvegarde...',
      saved: 'Réalisation sauvegardée avec succès',
      deleted: 'Réalisation supprimée avec succès',
      error: 'Erreur lors de l\'opération',
      title_field: 'Titre (optionnel)',
      description_field: 'Description',
      image_field: 'Image (obligatoire)',
      confirmDelete: 'Êtes-vous sûr de vouloir supprimer cette réalisation ?'
    },
    en: {
      title: 'Projects Management',
      description: 'Manage your projects and realizations',
      addRealisation: 'Add Project',
      save: 'Save',
      delete: 'Delete',
      saving: 'Saving...',
      saved: 'Project saved successfully',
      deleted: 'Project deleted successfully',
      error: 'Error during operation',
      title_field: 'Title (optional)',
      description_field: 'Description',
      image_field: 'Image (required)',
      confirmDelete: 'Are you sure you want to delete this project?'
    }
  };

  const t = texts[language];

  useEffect(() => {
    fetchRealisations();
  }, []);

  const fetchRealisations = async () => {
    try {
      const { data, error } = await supabase
        .from('realisations')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setRealisations(data || []);
    } catch (err) {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (realisation: Realisation) => {
    setSaving(realisation.id);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase
        .from('realisations')
        .upsert({
          id: realisation.id,
          title: realisation.title,
          description: realisation.description,
          image_url: realisation.image_url,
          order_index: realisation.order_index,
          is_active: realisation.is_active,
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

  const handleDelete = async (realisationId: string) => {
    if (!window.confirm(t.confirmDelete)) return;

    try {
      const { error } = await supabase
        .from('realisations')
        .delete()
        .eq('id', realisationId);

      if (error) throw error;

      setRealisations(prev => prev.filter(r => r.id !== realisationId));
      setSuccess(t.deleted);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(t.error);
    }
  };

  const addNewRealisation = () => {
    const newRealisation: Realisation = {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      image_url: '',
      order_index: realisations.length,
      is_active: true
    };
    setRealisations(prev => [...prev, newRealisation]);
  };

  const updateRealisation = (id: string, field: keyof Realisation, value: any) => {
    setRealisations(prev => prev.map(r => 
      r.id === id ? { ...r, [field]: value } : r
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
        <Button onClick={addNewRealisation}>
          <Plus className="h-4 w-4 mr-2" />
          {t.addRealisation}
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

      <div className="grid gap-6">
        {realisations.map((realisation) => (
          <Card key={realisation.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{realisation.title || 'Nouvelle réalisation'}</CardTitle>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(realisation.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">{t.title_field}</label>
                <Input
                  value={realisation.title || ''}
                  onChange={(e) => updateRealisation(realisation.id, 'title', e.target.value)}
                  placeholder={t.title_field}
                />
              </div>

              <div>
                <label className="text-sm font-medium">{t.description_field}</label>
                <Textarea
                  value={realisation.description || ''}
                  onChange={(e) => updateRealisation(realisation.id, 'description', e.target.value)}
                  placeholder={t.description_field}
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm font-medium">{t.image_field}</label>
                <ImageUpload
                  currentImageUrl={realisation.image_url}
                  onUpload={(imageUrl) => updateRealisation(realisation.id, 'image_url', imageUrl)}
                  bucket="realisations-images"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleSave(realisation)}
                  disabled={saving === realisation.id || !realisation.image_url}
                >
                  {saving === realisation.id ? t.saving : t.save}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};