import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

export const usePageContent = (pageName: string, section?: string) => {
  const [content, setContent] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        let query = supabase
          .from('pages_content')
          .select('*')
          .eq('page_name', pageName)
          .eq('is_active', true);

        if (section) {
          query = query.eq('section', section);
        }

        const { data, error } = await query.order('order_index', { ascending: true });

        if (error) throw error;
        setContent(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement du contenu');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [pageName, section]);

  const getContent = (sectionName: string) => {
    return content.find(c => c.section === sectionName);
  };

  const getContentText = (sectionName: string, fallback: string = '') => {
    const sectionContent = getContent(sectionName);
    return sectionContent?.body_text || fallback;
  };

  const getContentTitle = (sectionName: string, fallback: string = '') => {
    const sectionContent = getContent(sectionName);
    return sectionContent?.title || fallback;
  };

  const getContentImage = (sectionName: string) => {
    const sectionContent = getContent(sectionName);
    return sectionContent?.image_url;
  };

  return {
    content,
    loading,
    error,
    getContent,
    getContentText,
    getContentTitle,
    getContentImage
  };
};