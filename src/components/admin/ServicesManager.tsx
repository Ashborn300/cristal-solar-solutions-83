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

interface Service {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  order_index: number;
  is_active: boolean;
}

export const ServicesManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { language } = useLanguage();

  const texts = {
    fr: {
      title: 'Gestion des services',
      description: 'Gérez les services proposés par votre entreprise',
      addService: 'Ajouter un service',
      save: 'Sauvegarder',
      delete: 'Supprimer',
      saving: 'Sauvegarde...',
      saved: 'Service sauvegardé avec succès',
      deleted: 'Service supprimé avec succès',
      error: 'Erreur lors de l\'opération',
      title_field: 'Titre du service',
      description_field: 'Description',
      image_field: 'Image',
      confirmDelete: 'Êtes-vous sûr de vouloir supprimer ce service ?'
    },
    en: {
      title: 'Services Management',
      description: 'Manage the services offered by your company',
      addService: 'Add Service',
      save: 'Save',
      delete: 'Delete',
      saving: 'Saving...',
      saved: 'Service saved successfully',
      deleted: 'Service deleted successfully',
      error: 'Error during operation',
      title_field: 'Service Title',
      description_field: 'Description',
      image_field: 'Image',
      confirmDelete: 'Are you sure you want to delete this service?'
    }
  };

  const t = texts[language];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (err) {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (service: Service) => {
    setSaving(service.id);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase
        .from('services')
        .upsert({
          id: service.id,
          title: service.title,
          description: service.description,
          image_url: service.image_url,
          order_index: service.order_index,
          is_active: service.is_active,
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

  const handleDelete = async (serviceId: string) => {
    if (!window.confirm(t.confirmDelete)) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);

      if (error) throw error;

      setServices(prev => prev.filter(s => s.id !== serviceId));
      setSuccess(t.deleted);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(t.error);
    }
  };

  const addNewService = () => {
    const newService: Service = {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      image_url: null,
      order_index: services.length,
      is_active: true
    };
    setServices(prev => [...prev, newService]);
  };

  const updateService = (id: string, field: keyof Service, value: any) => {
    setServices(prev => prev.map(s => 
      s.id === id ? { ...s, [field]: value } : s
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
        <Button onClick={addNewService}>
          <Plus className="h-4 w-4 mr-2" />
          {t.addService}
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
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{service.title || 'Nouveau service'}</CardTitle>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(service.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">{t.title_field}</label>
                <Input
                  value={service.title}
                  onChange={(e) => updateService(service.id, 'title', e.target.value)}
                  placeholder={t.title_field}
                />
              </div>

              <div>
                <label className="text-sm font-medium">{t.description_field}</label>
                <Textarea
                  value={service.description || ''}
                  onChange={(e) => updateService(service.id, 'description', e.target.value)}
                  placeholder={t.description_field}
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm font-medium">{t.image_field}</label>
                <ImageUpload
                  currentImageUrl={service.image_url}
                  onUpload={(imageUrl) => updateService(service.id, 'image_url', imageUrl)}
                  bucket="services-images"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleSave(service)}
                  disabled={saving === service.id || !service.title.trim()}
                >
                  {saving === service.id ? t.saving : t.save}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};