import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { WordPressEditor } from './WordPressEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FileText, Search, Filter, Plus, Grid, List } from 'lucide-react';

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
  const [selectedContent, setSelectedContent] = useState<PageContent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPage, setFilterPage] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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

  const filteredContents = contents.filter(content => {
    const matchesSearch = !searchTerm || 
      content.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.page_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterPage === 'all' || content.page_name === filterPage;
    
    return matchesSearch && matchesFilter;
  });

  const uniquePages = [...new Set(contents.map(c => c.page_name))];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Mode édition WordPress-like
  if (selectedContent) {
    return (
      <div className="h-full">
        <WordPressEditor
          content={selectedContent}
          onSave={handleSave}
          onImageUpload={handleImageUpload}
          saving={saving === selectedContent.id}
        />
        <div className="fixed bottom-6 left-6">
          <Button
            onClick={() => setSelectedContent(null)}
            variant="outline"
            className="bg-background shadow-lg"
          >
            ← Retour à la liste
          </Button>
        </div>
      </div>
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

        {/* Barre de recherche et filtres */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par titre, section ou page..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={filterPage}
                  onChange={(e) => setFilterPage(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm bg-background"
                >
                  <option value="all">Toutes les pages</option>
                  {uniquePages.map(page => (
                    <option key={page} value={page}>{page}</option>
                  ))}
                </select>
              </div>
              
              <div className="text-sm text-muted-foreground flex items-center">
                {filteredContents.length} sur {contents.length} sections
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

      {/* Liste de contenu WordPress-like */}
      <div className="space-y-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContents.map((content) => (
              <Card 
                key={content.id} 
                className="hover:shadow-md transition-all duration-200 cursor-pointer group"
                onClick={() => setSelectedContent(content)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base line-clamp-1">
                      {content.title || 'Sans titre'}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      {content.is_active ? (
                        <div className="w-2 h-2 rounded-full bg-green-500" title="Publié" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-gray-400" title="Brouillon" />
                      )}
                    </div>
                  </div>
                  <CardDescription className="text-xs">
                    {content.page_name} • {content.section}
                  </CardDescription>
                </CardHeader>
                
                {content.image_url && (
                  <div className="px-6 pb-3">
                    <img 
                      src={content.image_url} 
                      alt={content.title || ''} 
                      className="w-full h-24 object-cover rounded-md"
                    />
                  </div>
                )}
                
                <CardContent className="pt-0">
                  {content.body_text && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {content.body_text.replace(/<[^>]*>/g, '').substring(0, 100)}...
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Position: {content.order_index}</span>
                    {content.is_active ? (
                      <span className="text-green-600 font-medium">Publié</span>
                    ) : (
                      <span className="text-gray-500">Brouillon</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredContents.map((content) => (
                  <div 
                    key={content.id}
                    className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedContent(content)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">
                          {content.title || 'Sans titre'}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{content.page_name}</span>
                          <span>•</span>
                          <span>{content.section}</span>
                          <span>•</span>
                          <span>Position {content.order_index}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {content.is_active ? (
                          <span className="text-xs text-green-600 font-medium">Publié</span>
                        ) : (
                          <span className="text-xs text-gray-500">Brouillon</span>
                        )}
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedContent(content);
                          }}
                        >
                          Modifier
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
      {filteredContents.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {searchTerm || filterPage !== 'all' ? 'Aucun résultat' : 'Aucun contenu trouvé'}
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              {searchTerm || filterPage !== 'all' 
                ? 'Essayez de modifier vos critères de recherche ou de filtrage.'
                : 'Le contenu sera automatiquement créé lors de la première visite des pages du site.'
              }
            </p>
            {(searchTerm || filterPage !== 'all') && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setFilterPage('all');
                }}
                className="mt-4"
              >
                Effacer les filtres
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};