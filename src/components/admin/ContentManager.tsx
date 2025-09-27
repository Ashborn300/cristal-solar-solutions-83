import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { ContentEditor } from './ContentEditor';
import { FileText } from 'lucide-react';

interface PageContent {
  id: string;
  page_name: string;
  section: string;
  title: string | null;
  body_text: string | null;
  image_url: string | null;
  order_index: number;
  is_active: boolean;
}

export const ContentManager = () => {
  const [contents, setContents] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { language } = useLanguage();

  const texts = {
    fr: {
      title: 'Gestion du contenu des pages',
      description: 'Modifiez les textes et images de votre site web',
      save: 'Sauvegarder',
      saving: 'Sauvegarde...',
      saved: 'Contenu sauvegardé avec succès',
      error: 'Erreur lors de la sauvegarde',
      title_field: 'Titre',
      content_field: 'Contenu',
      image_field: 'Image',
      page: 'Page',
      section: 'Section'
    },
    en: {
      title: 'Page Content Management',
      description: 'Edit texts and images of your website',
      save: 'Save',
      saving: 'Saving...',
      saved: 'Content saved successfully',
      error: 'Error saving content',
      title_field: 'Title',
      content_field: 'Content',
      image_field: 'Image',
      page: 'Page',
      section: 'Section'
    }
  };

  const t = texts[language];

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const { data, error } = await supabase
        .from('pages_content')
        .select('*')
        .order('page_name', { ascending: true })
        .order('order_index', { ascending: true });

      if (error) throw error;
      setContents(data || []);
    } catch (err) {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (content: PageContent, field: string, value: string) => {
    setSaving(content.id);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase
        .from('pages_content')
        .update({
          [field]: value,
          updated_at: new Date().toISOString()
        })
        .eq('id', content.id);

      if (error) throw error;

      setContents(prev => prev.map(c => 
        c.id === content.id ? { ...c, [field]: value } : c
      ));

      setSuccess(t.saved);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(t.error);
    } finally {
      setSaving(null);
    }
  };

  const handleImageUpload = (content: PageContent, imageUrl: string) => {
    handleSave(content, 'image_url', imageUrl);
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{t.title}</h2>
          <p className="text-muted-foreground">{t.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">
            {contents.length} sections trouvées
          </div>
        </div>
      </div>

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

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {contents.map((content) => (
          <ContentEditor
            key={content.id}
            content={content}
            onSave={handleSave}
            onImageUpload={handleImageUpload}
            saving={saving === content.id}
          />
        ))}
      </div>

      {/* Empty State */}
      {contents.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Aucun contenu trouvé</h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Le contenu sera automatiquement créé lors de la première visite des pages du site.
          </p>
        </div>
      )}
    </div>
  );
};