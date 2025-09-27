import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageEditor } from './PageEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FileText, Search, Filter, Plus, Grid, List, Edit3, Eye } from 'lucide-react';

interface PageSummary {
  page_name: string;
  section_count: number;
  active_sections: number;
  last_updated: string;
  has_content: boolean;
}

export const ContentManager = () => {
  const [pages, setPages] = useState<PageSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { language } = useLanguage();

  const texts = {
    fr: {
      title: 'Gestion des pages',
      description: 'Modifiez le contenu complet de vos pages web',
      edit_page: 'Modifier la page',
      view_page: 'Voir la page',
      sections: 'sections',
      active: 'actives',
      last_update: 'Dernière mise à jour',
      no_content: 'Aucun contenu',
      search_placeholder: 'Rechercher une page...'
    },
    en: {
      title: 'Page Management',
      description: 'Edit complete content of your web pages',
      edit_page: 'Edit page',
      view_page: 'View page',
      sections: 'sections',
      active: 'active',
      last_update: 'Last update',
      no_content: 'No content',
      search_placeholder: 'Search for a page...'
    }
  };

  const t = texts[language];

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from('pages_content')
        .select('page_name, is_active, updated_at')
        .order('page_name', { ascending: true });

      if (error) throw error;
      
      // Grouper par page et calculer les statistiques
      const pageStats: Record<string, PageSummary> = {};
      
      data?.forEach(item => {
        if (!pageStats[item.page_name]) {
          pageStats[item.page_name] = {
            page_name: item.page_name,
            section_count: 0,
            active_sections: 0,
            last_updated: item.updated_at,
            has_content: false
          };
        }
        
        pageStats[item.page_name].section_count++;
        if (item.is_active) {
          pageStats[item.page_name].active_sections++;
        }
        
        // Prendre la date la plus récente
        if (new Date(item.updated_at) > new Date(pageStats[item.page_name].last_updated)) {
          pageStats[item.page_name].last_updated = item.updated_at;
        }
        
        pageStats[item.page_name].has_content = true;
      });
      
      setPages(Object.values(pageStats));
    } catch (err) {
      setError('Erreur lors du chargement des pages');
    } finally {
      setLoading(false);
    }
  };

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

  const filteredPages = pages.filter(page => {
    return !searchTerm || 
      page.page_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getPageDisplayName(page.page_name).toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Mode édition d'une page complète
  if (selectedPage) {
    return (
      <PageEditor
        pageName={selectedPage}
        onBack={() => setSelectedPage(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header WordPress-like */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t.title}</h1>
            <p className="text-muted-foreground">{t.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Barre de recherche */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={t.search_placeholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="text-sm text-muted-foreground flex items-center">
                {filteredPages.length} page{filteredPages.length > 1 ? 's' : ''}
              </div>
            </div>
          </CardContent>
        </Card>
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

      {/* Liste des pages */}
      <div className="space-y-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPages.map((page) => (
              <Card 
                key={page.page_name} 
                className="hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base line-clamp-1">
                      {getPageDisplayName(page.page_name)}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500" title="Page" />
                    </div>
                  </div>
                  <CardDescription className="text-xs">
                    {page.section_count} {t.sections} • {page.active_sections} {t.active}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground">
                      {t.last_update}: {formatDate(page.last_updated)}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedPage(page.page_name)}
                        className="flex-1"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        {t.edit_page}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open('/', '_blank')}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredPages.map((page) => (
                  <div 
                    key={page.page_name}
                    className="p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">
                          {getPageDisplayName(page.page_name)}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{page.section_count} {t.sections}</span>
                          <span>•</span>
                          <span>{page.active_sections} {t.active}</span>
                          <span>•</span>
                          <span>{formatDate(page.last_updated)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open('/', '_blank')}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedPage(page.page_name)}
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          {t.edit_page}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Empty State */}
      {filteredPages.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {searchTerm ? 'Aucune page trouvée' : 'Aucune page disponible'}
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              {searchTerm 
                ? 'Essayez de modifier votre recherche.'
                : 'Les pages seront automatiquement créées lors de la première visite du site.'
              }
            </p>
            {searchTerm && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchTerm('')}
                className="mt-4"
              >
                Effacer la recherche
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};