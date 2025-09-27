import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ImageUpload } from './ImageUpload';
import { Save, Eye, Edit3, Type, Image as ImageIcon } from 'lucide-react';

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

interface ContentEditorProps {
  content: PageContent;
  onSave: (content: PageContent, field: string, value: string) => Promise<void>;
  onImageUpload: (content: PageContent, imageUrl: string) => void;
  saving: boolean;
}

export function ContentEditor({ content, onSave, onImageUpload, saving }: ContentEditorProps) {
  const [editMode, setEditMode] = useState<string | null>(null);
  const [localTitle, setLocalTitle] = useState(content.title || '');
  const [localBodyText, setLocalBodyText] = useState(content.body_text || '');

  const handleSaveField = async (field: string, value: string) => {
    await onSave(content, field, value);
    setEditMode(null);
  };

  const handleTitleSave = () => {
    handleSaveField('title', localTitle);
  };

  const handleBodyTextSave = () => {
    handleSaveField('body_text', localBodyText);
  };

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

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-primary" />
              {getSectionDisplayName(content.section)}
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {content.page_name}
              </Badge>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                Position: {content.order_index}
              </span>
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={content.is_active ? "default" : "secondary"}>
              {content.is_active ? "Actif" : "Inactif"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Title Editor */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-primary" />
            <label className="text-sm font-medium">Titre</label>
          </div>
          
          {editMode === 'title' ? (
            <div className="space-y-2">
              <Input
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                placeholder="Entrez le titre..."
                className="border-primary/50 focus:border-primary"
              />
              <div className="flex gap-2">
                <Button 
                  onClick={handleTitleSave}
                  size="sm"
                  disabled={saving}
                  className="flex items-center gap-1"
                >
                  <Save className="w-3 h-3" />
                  {saving ? 'Sauvegarde...' : 'Sauvegarder'}
                </Button>
                <Button 
                  onClick={() => {
                    setEditMode(null);
                    setLocalTitle(content.title || '');
                  }}
                  variant="outline"
                  size="sm"
                >
                  Annuler
                </Button>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => {
                setEditMode('title');
                setLocalTitle(content.title || '');
              }}
              className="min-h-[40px] p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
            >
              {content.title ? (
                <span className="text-foreground">{content.title}</span>
              ) : (
                <span className="text-muted-foreground italic">Cliquez pour ajouter un titre...</span>
              )}
            </div>
          )}
        </div>

        <Separator />

        {/* Body Text Editor */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-primary" />
            <label className="text-sm font-medium">Contenu</label>
          </div>
          
          {editMode === 'body_text' ? (
            <div className="space-y-2">
              <Textarea
                value={localBodyText}
                onChange={(e) => setLocalBodyText(e.target.value)}
                placeholder="Entrez le contenu..."
                rows={4}
                className="border-primary/50 focus:border-primary resize-none"
              />
              <div className="flex gap-2">
                <Button 
                  onClick={handleBodyTextSave}
                  size="sm"
                  disabled={saving}
                  className="flex items-center gap-1"
                >
                  <Save className="w-3 h-3" />
                  {saving ? 'Sauvegarde...' : 'Sauvegarder'}
                </Button>
                <Button 
                  onClick={() => {
                    setEditMode(null);
                    setLocalBodyText(content.body_text || '');
                  }}
                  variant="outline"
                  size="sm"
                >
                  Annuler
                </Button>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => {
                setEditMode('body_text');
                setLocalBodyText(content.body_text || '');
              }}
              className="min-h-[80px] p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
            >
              {content.body_text ? (
                <p className="text-foreground whitespace-pre-wrap">{content.body_text}</p>
              ) : (
                <span className="text-muted-foreground italic">Cliquez pour ajouter du contenu...</span>
              )}
            </div>
          )}
        </div>

        <Separator />

        {/* Image Upload */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-primary" />
            <label className="text-sm font-medium">Image</label>
          </div>
          
          <ImageUpload
            currentImageUrl={content.image_url}
            onUpload={(imageUrl) => onImageUpload(content, imageUrl)}
            bucket="site-images"
            className="border-dashed border-2 border-primary/20 hover:border-primary/40 transition-colors"
          />
        </div>

        {/* Preview Button */}
        <div className="pt-4 border-t">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open('/', '_blank')}
          >
            <Eye className="w-4 h-4 mr-2" />
            Prévisualiser sur le site
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}