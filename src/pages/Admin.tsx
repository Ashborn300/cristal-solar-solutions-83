import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ContentManager } from '@/components/admin/ContentManager';
import { ServicesManager } from '@/components/admin/ServicesManager';
import { RealisationsManager } from '@/components/admin/RealisationsManager';
import { GalleryManager } from '@/components/admin/GalleryManager';
import { CMSDashboard } from '@/components/admin/CMSDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, FileText, Wrench, FolderOpen, Image } from 'lucide-react';

const Admin = () => {
  const { user, loading, isEditor } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'content';

  const texts = {
    fr: {
      title: 'CMS CRISTAL',
      description: 'Système de gestion de contenu',
      loading: 'Chargement...',
      accessDenied: 'Accès refusé',
      needLogin: 'Vous devez vous connecter pour accéder à cette page.',
      dashboard: 'Tableau de bord',
      welcomeBack: 'Bon retour',
      quickStats: 'Statistiques rapides',
      recentActivity: 'Activité récente'
    },
    en: {
      title: 'CRISTAL CMS',
      description: 'Content Management System',
      loading: 'Loading...',
      accessDenied: 'Access denied',
      needLogin: 'You need to sign in to access this page.',
      dashboard: 'Dashboard',
      welcomeBack: 'Welcome back',
      quickStats: 'Quick stats',
      recentActivity: 'Recent activity'
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
          <p className="mt-4 text-muted-foreground">{t.loading}</p>
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
            <button 
              onClick={() => navigate('/auth')} 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md"
            >
              Se connecter
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'content':
        return <ContentManager />;
      case 'services':
        return <ServicesManager />;
      case 'realisations':
        return <RealisationsManager />;
      case 'gallery':
        return <GalleryManager />;
      default:
        return <CMSDashboard />;
    }
  };

  return (
    <AdminLayout>
      <div className="h-full overflow-auto">
        {/* Header */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">{t.title}</h1>
                <p className="text-muted-foreground">{t.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Activity className="w-3 h-3 mr-1" />
                  En ligne
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </AdminLayout>
  );
};


export default Admin;