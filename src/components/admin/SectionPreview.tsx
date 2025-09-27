import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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

interface SectionPreviewProps {
  content: PageContent;
}

export function SectionPreview({ content }: SectionPreviewProps) {
  const navigate = useNavigate();
  const getSectionColor = (section: string) => {
    const colors: Record<string, string> = {
      hero: 'bg-blue-500',
      about: 'bg-green-500',
      services: 'bg-purple-500',
      projects: 'bg-orange-500',
      contact: 'bg-red-500',
      leadership: 'bg-indigo-500',
      statistics: 'bg-yellow-500',
      testimonials: 'bg-pink-500',
      faq: 'bg-teal-500',
      company_info: 'bg-gray-500',
      facebook: 'bg-blue-600',
      attestations: 'bg-emerald-500'
    };
    
    const baseSection = section.split('_')[0];
    return colors[baseSection] || 'bg-gray-400';
  };

  const scrollToSection = () => {
    const sectionId = content.section.includes('hero') ? 'accueil' : 
                     content.section.includes('about') ? 'about' :
                     content.section.includes('services') ? 'services' :
                     content.section.includes('projects') ? 'realisations' :
                     content.section.includes('contact') ? 'contact' :
                     content.section.includes('leadership') ? 'leadership' :
                     content.section.includes('testimonials') ? 'temoignages' :
                     content.section.includes('faq') ? 'faq' :
                     'accueil';
    navigate({ pathname: '/', hash: `#${sectionId}` });
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getSectionColor(content.section)}`} />
            <CardTitle className="text-sm font-medium truncate">
              {content.section.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </CardTitle>
          </div>
          <Badge variant={content.is_active ? "default" : "secondary"} className="text-xs">
            {content.is_active ? "Actif" : "Inactif"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Title Preview */}
        {content.title && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Titre:</p>
            <p className="text-sm font-medium line-clamp-2 text-foreground">
              {content.title}
            </p>
          </div>
        )}

        {/* Content Preview */}
        {content.body_text && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Contenu:</p>
            <p className="text-xs text-muted-foreground line-clamp-3">
              {content.body_text}
            </p>
          </div>
        )}

        {/* Image Preview */}
        {content.image_url && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Image:</p>
            <div className="w-full h-20 bg-muted rounded overflow-hidden">
              <img
                src={content.image_url}
                alt={content.title || 'Aperçu'}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Empty State */}
        {!content.title && !content.body_text && !content.image_url && (
          <div className="flex items-center justify-center h-20 text-muted-foreground">
            <div className="text-center">
              <Eye className="w-6 h-6 mx-auto mb-1 opacity-50" />
              <p className="text-xs">Aucun contenu</p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={scrollToSection}
            variant="outline"
            size="sm"
            className="w-full text-xs"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Voir sur le site
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}