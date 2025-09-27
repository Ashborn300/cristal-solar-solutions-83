import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from './RichTextEditor';
import { ImageUpload } from './ImageUpload';
import { 
  Save, 
  Eye, 
  Edit3, 
  Type, 
  Image as ImageIcon, 
  Settings,
  Globe,
  FileText,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PageSection {
  id: string;
  page_name: string;
  section: string;
  title: string | null;
  body_text: string | null;
  image_url: string | null;
  order_index: number;
  is_active: boolean;
}

interface PageEditorProps {
  pageName: string;
  onBack: () => void;
}

export function PageEditor({ pageName, onBack }: PageEditorProps) {
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const getPageDisplayName = (pageName: string) => {
    const pageNames: Record<string, string> = {
      'home': 'Accueil',
      'about': 'À Propos',
      'services': 'Services',
      'gallery': 'Galerie',
      'projects': 'Projets',
      'contact': 'Contact'
    };
    return pageNames[pageName] || pageName.charAt(0).toUpperCase() + pageName.slice(1);
  };

  useEffect(() => {
    fetchSections();
  }, [pageName]);

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from('pages_content')
        .select('*')
        .eq('page_name', pageName)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      console.error('Error fetching sections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      for (const section of sections) {
        const { error } = await supabase
          .from('pages_content')
          .update({
            title: section.title,
            body_text: section.body_text,
            image_url: section.image_url,
            is_active: section.is_active,
            updated_at: new Date().toISOString()
          })
          .eq('id', section.id);

        if (error) throw error;
      }
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving sections:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateSection = (sectionId: string, field: string, value: any) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId ? { ...section, [field]: value } : section
    ));
    setHasChanges(true);
  };

  const moveSection = async (sectionId: string, direction: 'up' | 'down') => {
    const currentIndex = sections.findIndex(s => s.id === sectionId);
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= sections.length) return;

    const newSections = [...sections];
    [newSections[currentIndex], newSections[newIndex]] = [newSections[newIndex], newSections[currentIndex]];
    
    // Update order_index
    newSections.forEach((section, index) => {
      section.order_index = index;
    });

    setSections(newSections);
    setHasChanges(true);
  };

  const addSection = async () => {
    const newSection = {
      page_name: pageName,
      section: `section_${Date.now()}`,
      title: 'Nouvelle section',
      body_text: '',
      image_url: null,
      order_index: sections.length,
      is_active: true
    };

    try {
      const { data, error } = await supabase
        .from('pages_content')
        .insert([newSection])
        .select()
        .single();

      if (error) throw error;
      
      setSections(prev => [...prev, data]);
      setHasChanges(true);
    } catch (error) {
      console.error('Error adding section:', error);
    }
  };

  const deleteSection = async (sectionId: string) => {
    try {
      const { error } = await supabase
        .from('pages_content')
        .delete()
        .eq('id', sectionId);

      if (error) throw error;
      
      setSections(prev => prev.filter(s => s.id !== sectionId));
      setHasChanges(true);
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header avec actions principales */}
      <div className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              Édition de la page: {getPageDisplayName(pageName)}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="secondary" className="text-xs">
                {sections.length} section{sections.length > 1 ? 's' : ''}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {hasChanges && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              Modifications non sauvegardées
            </Badge>
          )}
          
          <Button
            onClick={() => window.open('/', '_blank')}
            variant="outline"
            size="sm"
          >
            <Eye className="w-4 h-4 mr-2" />
            Aperçu
          </Button>
          
          <Button
            onClick={addSection}
            variant="outline"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une section
          </Button>
          
          <Button
            onClick={handleSaveAll}
            disabled={saving || !hasChanges}
            className="bg-primary hover:bg-primary/90"
            size="sm"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Sauvegarde...' : 'Publier la page'}
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {sections.map((section, index) => (
          <Card key={section.id} className="relative">
            {/* Controls de section */}
            <div className="absolute right-4 top-4 flex items-center gap-2 z-10">
              <div className="flex items-center gap-1 bg-background border rounded-md p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveSection(section.id, 'up')}
                  disabled={index === 0}
                  className="h-6 w-6 p-0"
                >
                  <ArrowUp className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveSection(section.id, 'down')}
                  disabled={index === sections.length - 1}
                  className="h-6 w-6 p-0"
                >
                  <ArrowDown className="w-3 h-3" />
                </Button>
              </div>
              
              <div className="flex items-center gap-1 bg-background border rounded-md p-1">
                <Label htmlFor={`active-${section.id}`} className="text-xs mr-1">
                  Actif
                </Label>
                <Switch
                  id={`active-${section.id}`}
                  checked={section.is_active}
                  onCheckedChange={(checked) => updateSection(section.id, 'is_active', checked)}
                  className="h-4 w-7"
                />
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteSection(section.id)}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <CardHeader className="pb-4 pr-40">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-primary" />
                <CardTitle className="text-lg">Section {index + 1}</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {section.section}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Titre */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Titre</Label>
                  <Input
                    value={section.title || ''}
                    onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                    placeholder="Titre de la section..."
                    className="text-base"
                  />
                </div>

                {/* Image */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Image</Label>
                  <ImageUpload
                    currentImageUrl={section.image_url}
                    onUpload={(imageUrl) => updateSection(section.id, 'image_url', imageUrl)}
                    bucket="site-images"
                    className="border-dashed border-2 border-primary/20 hover:border-primary/40 transition-colors h-32"
                  />
                </div>
              </div>

              {/* Contenu */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Contenu</Label>
                <RichTextEditor
                  content={section.body_text || ''}
                  onChange={(content) => updateSection(section.id, 'body_text', content)}
                  placeholder="Contenu de cette section..."
                  className="min-h-[200px]"
                />
              </div>
            </CardContent>
          </Card>
        ))}

        {sections.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Aucune section trouvée
              </h3>
              <p className="text-muted-foreground max-w-sm mx-auto mb-4">
                Cette page ne contient aucune section. Ajoutez votre première section pour commencer.
              </p>
              <Button onClick={addSection} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une section
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bouton retour fixe */}
      <div className="fixed bottom-6 left-6">
        <Button
          onClick={onBack}
          variant="outline"
          className="bg-background shadow-lg"
        >
          ← Retour aux pages
        </Button>
      </div>
    </div>
  );
}