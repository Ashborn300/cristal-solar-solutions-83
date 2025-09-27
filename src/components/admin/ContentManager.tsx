import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { ImageUpload } from './ImageUpload';

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

  const addNewContent = () => {
    const newSection = prompt('Nom de la nouvelle section:');
    if (!newSection) return;

    const newContent: Omit<PageContent, 'id'> = {
      page_name: 'home',
      section: newSection,
      title: `Nouveau titre - ${newSection}`,
      body_text: `Nouveau contenu pour la section ${newSection}`,
      image_url: null,
      order_index: Math.max(...contents.map(c => c.order_index), 0) + 1,
      is_active: true
    };

    // Créer en base de données
    const createContent = async () => {
      try {
        const { data, error } = await supabase
          .from('pages_content')
          .insert([newContent])
          .select()
          .single();

        if (error) throw error;
        setContents(prev => [...prev, data]);
        setSuccess('Nouvelle section créée avec succès');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Erreur lors de la création de la section');
      }
    };

    createContent();
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{t.title}</h2>
          <p className="text-muted-foreground">{t.description}</p>
        </div>
        <Button onClick={addNewContent} className="bg-primary text-white hover:bg-primary/90">
          Ajouter une section
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
        {contents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Aucun contenu trouvé. Cliquez sur "Ajouter une section" pour commencer.
          </div>
        ) : (
          contents.map((content) => (
            <Card key={content.id}>
              <CardHeader>
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>{t.page}: {content.page_name} - {t.section}: {content.section}</span>
                  <span className="text-sm text-muted-foreground">Ordre: {content.order_index}</span>
                </CardTitle>
              </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">{t.title_field}</label>
                <Input
                  value={content.title || ''}
                  onChange={(e) => {
                    const updatedContents = contents.map(c =>
                      c.id === content.id ? { ...c, title: e.target.value } : c
                    );
                    setContents(updatedContents);
                  }}
                  onBlur={(e) => handleSave(content, 'title', e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">{t.content_field}</label>
                <Textarea
                  value={content.body_text || ''}
                  onChange={(e) => {
                    const updatedContents = contents.map(c =>
                      c.id === content.id ? { ...c, body_text: e.target.value } : c
                    );
                    setContents(updatedContents);
                  }}
                  onBlur={(e) => handleSave(content, 'body_text', e.target.value)}
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm font-medium">{t.image_field}</label>
                <ImageUpload
                  currentImageUrl={content.image_url}
                  onUpload={(imageUrl) => handleImageUpload(content, imageUrl)}
                  bucket="site-images"
                />
              </div>

              {saving === content.id && (
                <div className="text-sm text-muted-foreground">{t.saving}</div>
              )}
            </CardContent>
          </Card>
          ))
        )}
      </div>
    </div>
  );
};