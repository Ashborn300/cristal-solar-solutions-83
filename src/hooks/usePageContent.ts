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
          .eq('is_active', true)
          .order('order_index', { ascending: true });

        if (section) {
          query = query.eq('section', section);
        }

        const { data, error } = await query;

        if (error) throw error;
        setContent(data || []);
      } catch (err) {
        console.error('Error fetching page content:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [pageName, section]);

  // Helper functions to get specific content
  const getContent = (sectionName: string): PageContent | null => {
    return content.find(c => c.section === sectionName) || null;
  };

  const getTitle = (sectionName: string, fallback: string = ''): string => {
    return getContent(sectionName)?.title || fallback;
  };

  const getBodyText = (sectionName: string, fallback: string = ''): string => {
    return getContent(sectionName)?.body_text || fallback;
  };

  const getImageUrl = (sectionName: string): string | null => {
    return getContent(sectionName)?.image_url || null;
  };

  return {
    content,
    loading,
    error,
    getContent,
    getTitle,
    getBodyText,
    getImageUrl
  };
};