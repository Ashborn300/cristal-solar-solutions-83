import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  Activity,
  FileText, 
  Wrench, 
  FolderOpen, 
  Image, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Globe,
  Eye,
  Edit
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardStats {
  contentSections: number;
  services: number;
  projects: number;
  galleryImages: number;
  activeContent: number;
  draftContent: number;
}

export function CMSDashboard() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    contentSections: 0,
    services: 0,
    projects: 0,
    galleryImages: 0,
    activeContent: 0,
    draftContent: 0
  });
  const [loading, setLoading] = useState(true);

  const texts = {
    fr: {
      welcomeBack: 'Bon retour',
      dashboard: 'Tableau de bord',
      overview: 'Vue d\'ensemble',
      quickStats: 'Statistiques rapides',
      recentActivity: 'Activité récente',
      quickActions: 'Actions rapides',
      contentSections: 'Sections de contenu',
      services: 'Services',
      projects: 'Projets',
      galleryImages: 'Images galerie',
      activeContent: 'Contenu publié',
      draftContent: 'Brouillons',
      editContent: 'Modifier le contenu',
      manageServices: 'Gérer les services',
      manageProjects: 'Gérer les projets',
      manageGallery: 'Gérer la galerie',
      viewSite: 'Voir le site',
      completionRate: 'Taux de completion',
      siteHealth: 'Santé du site',
      allGood: 'Tout va bien',
      needsAttention: 'Nécessite attention'
    },
    en: {
      welcomeBack: 'Welcome back',
      dashboard: 'Dashboard',
      overview: 'Overview',
      quickStats: 'Quick stats',
      recentActivity: 'Recent activity',
      quickActions: 'Quick actions',
      contentSections: 'Content sections',
      services: 'Services',
      projects: 'Projects',
      galleryImages: 'Gallery images',
      activeContent: 'Published content',
      draftContent: 'Drafts',
      editContent: 'Edit content',
      manageServices: 'Manage services',
      manageProjects: 'Manage projects',
      manageGallery: 'Manage gallery',
      viewSite: 'View site',
      completionRate: 'Completion rate',
      siteHealth: 'Site health',
      allGood: 'All good',
      needsAttention: 'Needs attention'
    }
  };

  const t = texts[language];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [contentResult, servicesResult, projectsResult, galleryResult] = await Promise.all([
        supabase.from('pages_content').select('is_active'),
        supabase.from('services').select('id'),
        supabase.from('realisations').select('id'),
        supabase.from('gallery').select('id')
      ]);

      const contentData = contentResult.data || [];
      const activeContent = contentData.filter(item => item.is_active).length;
      const draftContent = contentData.filter(item => !item.is_active).length;

      setStats({
        contentSections: contentData.length,
        services: servicesResult.data?.length || 0,
        projects: projectsResult.data?.length || 0,
        galleryImages: galleryResult.data?.length || 0,
        activeContent,
        draftContent
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const completionRate = Math.round((stats.activeContent / Math.max(stats.contentSections, 1)) * 100);

  const statCards = [
    {
      title: t.contentSections,
      value: stats.contentSections,
      icon: FileText,
      description: `${stats.activeContent} publiés, ${stats.draftContent} brouillons`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: () => navigate('/admin?tab=content')
    },
    {
      title: t.services,
      value: stats.services,
      icon: Wrench,
      description: 'Services proposés',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      action: () => navigate('/admin?tab=services')
    },
    {
      title: t.projects,
      value: stats.projects,
      icon: FolderOpen,
      description: 'Projets réalisés',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      action: () => navigate('/admin?tab=realisations')
    },
    {
      title: t.galleryImages,
      value: stats.galleryImages,
      icon: Image,
      description: 'Images en galerie',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      action: () => navigate('/admin?tab=gallery')
    }
  ];

  const quickActions = [
    {
      title: t.editContent,
      description: 'Modifier les textes et images des pages',
      icon: Edit,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: () => navigate('/admin?tab=content')
    },
    {
      title: t.manageServices,
      description: 'Ajouter ou modifier les services',
      icon: Wrench,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      action: () => navigate('/admin?tab=services')
    },
    {
      title: t.manageProjects,
      description: 'Gérer les projets et réalisations',
      icon: FolderOpen,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      action: () => navigate('/admin?tab=realisations')
    },
    {
      title: t.viewSite,
      description: 'Voir le site en direct',
      icon: Globe,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      action: () => window.open('/', '_blank')
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* En-tête de bienvenue */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-lg p-6 border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {t.welcomeBack}, {user?.email?.split('@')[0] || 'Admin'} 👋
            </h1>
            <p className="text-muted-foreground">
              Votre CMS WordPress-like pour gérer le site CRISTAL facilement.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Activity className="w-3 h-3 mr-1" />
              En ligne
            </Badge>
          </div>
        </div>
      </div>

      {/* Métriques principales */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          {t.quickStats}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => (
            <Card 
              key={index} 
              className="hover:shadow-md transition-all duration-200 cursor-pointer group"
              onClick={stat.action}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Santé du site et actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Santé du site */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              {t.siteHealth}
            </CardTitle>
            <CardDescription>
              État général de votre site web
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{t.completionRate}</span>
                <span className="text-sm text-muted-foreground">{completionRate}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              {completionRate >= 80 ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-green-700">{t.allGood}</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-700">{t.needsAttention}</span>
                </>
              )}
            </div>
            
            <div className="text-xs text-muted-foreground">
              {stats.activeContent} sections publiées sur {stats.contentSections} au total
            </div>
          </CardContent>
        </Card>

        {/* Actions rapides */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              {t.quickActions}
            </CardTitle>
            <CardDescription>
              Accès rapide aux fonctionnalités principales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start h-auto p-3 hover:bg-muted/50"
                onClick={action.action}
              >
                <div className={`w-10 h-10 rounded-lg ${action.bgColor} flex items-center justify-center mr-3`}>
                  <action.icon className={`w-5 h-5 ${action.color}`} />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Activité récente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            {t.recentActivity}
          </CardTitle>
          <CardDescription>
            Dernières modifications sur votre site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Contenu mis à jour</p>
                <p className="text-xs text-muted-foreground">Il y a quelques instants</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Eye className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Site prévisualisé</p>
                <p className="text-xs text-muted-foreground">Il y a 5 minutes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}