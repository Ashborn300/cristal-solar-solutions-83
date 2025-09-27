import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ContentManager } from '@/components/admin/ContentManager';
import { ServicesManager } from '@/components/admin/ServicesManager';
import { RealisationsManager } from '@/components/admin/RealisationsManager';
import { GalleryManager } from '@/components/admin/GalleryManager';
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
        return <DashboardOverview />;
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

// Composant Dashboard Overview
const DashboardOverview = () => {
  const { language } = useLanguage();
  const { user } = useAuth();

  const texts = {
    fr: {
      welcomeBack: 'Bon retour',
      quickStats: 'Aperçu rapide',
      recentActivity: 'Activité récente',
      contentSections: 'Sections de contenu',
      serviceItems: 'Services',
      projectItems: 'Projets',
      galleryImages: 'Images galerie'
    },
    en: {
      welcomeBack: 'Welcome back',
      quickStats: 'Quick overview',
      recentActivity: 'Recent activity',
      contentSections: 'Content sections',
      serviceItems: 'Services',
      projectItems: 'Projects',
      galleryImages: 'Gallery images'
    }
  };

  const t = texts[language];

  const stats = [
    {
      title: t.contentSections,
      value: '15',
      icon: FileText,
      description: 'Sections actives',
      color: 'text-blue-600'
    },
    {
      title: t.serviceItems,
      value: '5',
      icon: Wrench,
      description: 'Services proposés',
      color: 'text-purple-600'
    },
    {
      title: t.projectItems,
      value: '8',
      icon: FolderOpen,
      description: 'Projets publiés',
      color: 'text-orange-600'
    },
    {
      title: t.galleryImages,
      value: '24',
      icon: Image,
      description: 'Images en ligne',
      color: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          {t.welcomeBack}, {user?.email?.split('@')[0] || 'Admin'} 👋
        </h2>
        <p className="text-muted-foreground">
          Gérez le contenu de votre site web facilement avec ce CMS intuitif.
        </p>
      </div>

      {/* Stats Grid */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">{t.quickStats}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Modifier le contenu</h4>
                  <p className="text-sm text-muted-foreground">Gérer les textes et images des pages</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Gérer les services</h4>
                  <p className="text-sm text-muted-foreground">Ajouter ou modifier les services</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;