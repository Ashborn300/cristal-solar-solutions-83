import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Calendar,
  User
} from 'lucide-react';

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

interface WordPressEditorProps {
  content: PageContent;
  onSave: (content: PageContent, field: string, value: string | boolean) => Promise<void>;
  onImageUpload: (content: PageContent, imageUrl: string) => void;
  saving: boolean;
}

export function WordPressEditor({ content, onSave, onImageUpload, saving }: WordPressEditorProps) {
  const [localTitle, setLocalTitle] = useState(content.title || '');
  const [localBodyText, setLocalBodyText] = useState(content.body_text || '');
  const [localIsActive, setLocalIsActive] = useState(content.is_active);
  const [hasChanges, setHasChanges] = useState(false);

  const getSectionDisplayName = (section: string) => {
    const sectionNames: Record<string, string> = {
      hero: 'Section Héro',
      hero_badge: 'Badge Héro',
      hero_subtitle: 'Sous-titre Héro',
      hero_description: 'Description Héro',
      about: 'À Propos',
      about_story: 'Notre Histoire',
      about_vision: 'Notre Vision',
      about_mission: 'Notre Mission',
      services: 'Services',
      services_overview: 'Aperçu Services',
      leadership: 'Leadership',
      statistics: 'Statistiques',
      projects: 'Projets',
      testimonials: 'Témoignages',
      faq: 'FAQ',
      company_info: 'Infos Entreprise',
      contact: 'Contact',
      facebook: 'Facebook',
      attestations: 'Attestations'
    };
    return sectionNames[section] || section;
  };

  const handleSaveAll = async () => {
    const updates: Array<{ field: string; value: string | boolean }> = [];
    
    if (localTitle !== content.title) {
      updates.push({ field: 'title', value: localTitle });
    }
    if (localBodyText !== content.body_text) {
      updates.push({ field: 'body_text', value: localBodyText });
    }
    if (localIsActive !== content.is_active) {
      updates.push({ field: 'is_active', value: localIsActive });
    }

    for (const update of updates) {
      await onSave(content, update.field, update.value);
    }
    
    setHasChanges(false);
  };

  const handleTitleChange = (value: string) => {
    setLocalTitle(value);
    setHasChanges(value !== content.title || localBodyText !== content.body_text || localIsActive !== content.is_active);
  };

  const handleBodyTextChange = (value: string) => {
    setLocalBodyText(value);
    setHasChanges(localTitle !== content.title || value !== content.body_text || localIsActive !== content.is_active);
  };

  const handleActiveChange = (value: boolean) => {
    setLocalIsActive(value);
    setHasChanges(localTitle !== content.title || localBodyText !== content.body_text || value !== content.is_active);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header avec actions principales */}
      <div className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Edit3 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              {getSectionDisplayName(content.section)}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="secondary" className="text-xs">
                {content.page_name}
              </Badge>
              <span>•</span>
              <span>Position: {content.order_index}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant={localIsActive ? "default" : "secondary"}>
            {localIsActive ? "Publié" : "Brouillon"}
          </Badge>
          
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
            onClick={handleSaveAll}
            disabled={saving || !hasChanges}
            className="bg-primary hover:bg-primary/90"
            size="sm"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Sauvegarde...' : 'Publier'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Zone principale d'édition */}
        <div className="lg:col-span-2 space-y-6">
          {/* Titre */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-primary" />
                <CardTitle className="text-lg">Titre de la section</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Input
                value={localTitle}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Entrez le titre de la section..."
                className="text-lg font-medium border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </CardContent>
          </Card>

          {/* Contenu */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-primary" />
                <CardTitle className="text-lg">Contenu</CardTitle>
              </div>
              <CardDescription>
                Utilisez l'éditeur riche pour formater votre contenu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                content={localBodyText}
                onChange={handleBodyTextChange}
                placeholder="Commencez à écrire le contenu de cette section..."
              />
            </CardContent>
          </Card>

          {/* Image */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary" />
                <CardTitle className="text-lg">Image mise en avant</CardTitle>
              </div>
              <CardDescription>
                Ajoutez une image pour illustrer cette section
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUpload
                currentImageUrl={content.image_url}
                onUpload={(imageUrl) => onImageUpload(content, imageUrl)}
                bucket="site-images"
                className="border-dashed border-2 border-primary/20 hover:border-primary/40 transition-colors min-h-[200px]"
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar de configuration */}
        <div className="space-y-6">
          {/* Publication */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                <CardTitle className="text-lg">Publication</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="is-active" className="text-sm font-medium">
                  Publier cette section
                </Label>
                <Switch
                  id="is-active"
                  checked={localIsActive}
                  onCheckedChange={handleActiveChange}
                />
              </div>
              
              <div className="text-xs text-muted-foreground">
                {localIsActive ? 
                  "Cette section est visible sur le site web" : 
                  "Cette section est en mode brouillon"
                }
              </div>
            </CardContent>
          </Card>

          {/* Informations de la section */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-primary" />
                <CardTitle className="text-lg">Informations</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Page:</span>
                <Badge variant="outline" className="text-xs">
                  {content.page_name}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Position:</span>
                <span className="font-medium">{content.order_index}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Edit3 className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Section:</span>
                <span className="font-medium">{content.section}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                onClick={() => window.open('/', '_blank')}
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <Eye className="w-4 h-4 mr-2" />
                Prévisualiser le site
              </Button>
              
              <Button
                onClick={handleSaveAll}
                disabled={saving || !hasChanges}
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}