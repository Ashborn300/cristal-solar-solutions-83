import { 
  Home, 
  FileText, 
  Wrench, 
  FolderOpen, 
  Image, 
  Users, 
  BarChart3, 
  Settings,
  Eye,
  LogOut
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { language } = useLanguage();
  
  const currentTab = new URLSearchParams(location.search).get('tab') || 'content';

  const texts = {
    fr: {
      dashboard: 'Tableau de bord',
      content: 'Contenu des pages',
      services: 'Services',
      projects: 'Réalisations',
      gallery: 'Galerie',
      users: 'Utilisateurs',
      analytics: 'Statistiques',
      settings: 'Paramètres',
      previewSite: 'Voir le site',
      logout: 'Déconnexion',
      cms: 'CMS CRISTAL'
    },
    en: {
      dashboard: 'Dashboard',
      content: 'Page Content',
      services: 'Services',
      projects: 'Projects',
      gallery: 'Gallery',
      users: 'Users',
      analytics: 'Analytics',
      settings: 'Settings',
      previewSite: 'View Site',
      logout: 'Logout',
      cms: 'CRISTAL CMS'
    }
  };

  const t = texts[language];

  const menuItems = [
    { 
      id: 'content', 
      title: t.content, 
      icon: FileText, 
      description: 'Gérer les textes et images du site'
    },
    { 
      id: 'services', 
      title: t.services, 
      icon: Wrench, 
      description: 'Ajouter et modifier les services'
    },
    { 
      id: 'realisations', 
      title: t.projects, 
      icon: FolderOpen, 
      description: 'Gérer les projets réalisés'
    },
    { 
      id: 'gallery', 
      title: t.gallery, 
      icon: Image, 
      description: 'Organiser les images de la galerie'
    },
    { 
      id: 'images', 
      title: 'Images statiques', 
      icon: Image, 
      description: 'Modifier les images du site'
    }
  ];

  const isActive = (tabId: string) => currentTab === tabId;

  const handleTabChange = (tabId: string) => {
    navigate(`/admin?tab=${tabId}`);
  };

  const handlePreviewSite = () => {
    window.open('/', '_blank');
  };

  const getNavClasses = (active: boolean) => 
    `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-primary text-white shadow-md' 
        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
    }`;

  return (
    <Sidebar
      className={`border-r bg-background ${collapsed ? "w-16" : "w-64"}`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          {!collapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-foreground">{t.cms}</h1>
                <p className="text-xs text-muted-foreground">Administration</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
            </div>
          )}
        </div>

        <SidebarContent className="flex-1">
          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
              Gestion du contenu
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      onClick={() => handleTabChange(item.id)}
                      className={getNavClasses(isActive(item.id))}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && (
                        <div className="flex-1">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs opacity-70">{item.description}</div>
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Quick Actions */}
          {!collapsed && (
            <SidebarGroup>
              <SidebarGroupLabel>Actions rapides</SidebarGroupLabel>
              <SidebarGroupContent className="space-y-2">
                <Button
                  onClick={handlePreviewSite}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {t.previewSite}
                </Button>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>

        {/* User Profile & Actions */}
        <div className="p-4 border-t">
          {!collapsed ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-primary text-white">
                    {user?.email?.[0]?.toUpperCase() || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user?.email || 'Admin'}
                  </p>
                  <p className="text-xs text-muted-foreground">Administrateur</p>
                </div>
              </div>
              
              <Button
                onClick={signOut}
                variant="outline"
                size="sm"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t.logout}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <Avatar>
                <AvatarFallback className="bg-primary text-white">
                  {user?.email?.[0]?.toUpperCase() || 'A'}
                </AvatarFallback>
              </Avatar>
              <Button
                onClick={signOut}
                variant="ghost"
                size="sm"
                className="p-2"
                title={t.logout}
              >
                <LogOut className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          )}
        </div>

        {/* Sidebar Toggle */}
        <div className="absolute top-4 right-4">
          <SidebarTrigger className="w-8 h-8" />
        </div>
      </div>
    </Sidebar>
  );
}