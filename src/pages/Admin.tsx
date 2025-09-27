import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { ContentManager } from '@/components/admin/ContentManager';
import { ServicesManager } from '@/components/admin/ServicesManager';
import { RealisationsManager } from '@/components/admin/RealisationsManager';
import { GalleryManager } from '@/components/admin/GalleryManager';

const Admin = () => {
  const { user, loading, signOut, isEditor } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const texts = {
    fr: {
      title: 'Panneau d\'Administration',
      description: 'Gérez le contenu de votre site web',
      logout: 'Déconnexion',
      backToSite: 'Retour au site',
      content: 'Contenu des pages',
      services: 'Services',
      realisations: 'Réalisations',
      gallery: 'Galerie',
      loading: 'Chargement...',
      accessDenied: 'Accès refusé',
      needLogin: 'Vous devez vous connecter pour accéder à cette page.'
    },
    en: {
      title: 'Administration Panel',
      description: 'Manage your website content',
      logout: 'Logout',
      backToSite: 'Back to site',
      content: 'Page content',
      services: 'Services',
      realisations: 'Projects',
      gallery: 'Gallery',
      loading: 'Loading...',
      accessDenied: 'Access denied',
      needLogin: 'You need to sign in to access this page.'
    }
  };

  const t = texts[language];

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (!user || !isEditor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t.accessDenied}</CardTitle>
            <CardDescription>{t.needLogin}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/auth')} className="w-full">
              {t.needLogin}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{t.title}</h1>
              <p className="text-muted-foreground">{t.description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate('/')}>
                {t.backToSite}
              </Button>
              <Button variant="outline" onClick={signOut}>
                {t.logout}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="content" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content">{t.content}</TabsTrigger>
            <TabsTrigger value="services">{t.services}</TabsTrigger>
            <TabsTrigger value="realisations">{t.realisations}</TabsTrigger>
            <TabsTrigger value="gallery">{t.gallery}</TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <ContentManager />
          </TabsContent>

          <TabsContent value="services">
            <ServicesManager />
          </TabsContent>

          <TabsContent value="realisations">
            <RealisationsManager />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;