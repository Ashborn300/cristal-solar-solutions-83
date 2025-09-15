import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CVFile {
  id: string;
  filename: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  version: string | null;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
}

export const useCV = () => {
  const [cvFiles, setCvFiles] = useState<CVFile[]>([]);
  const [activeCV, setActiveCV] = useState<CVFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCVFiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cv_files')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCvFiles(data || []);
      setActiveCV(data?.[0] || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching CV files');
    } finally {
      setLoading(false);
    }
  };

  const downloadCV = async (cvFile?: CVFile) => {
    try {
      const fileToDownload = cvFile || activeCV;
      if (!fileToDownload) {
        throw new Error('No CV file available');
      }

      const { data, error } = await supabase.storage
        .from('cv-files')
        .download(fileToDownload.file_path);

      if (error) throw error;

      // Create download link
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileToDownload.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error downloading CV');
      return false;
    }
  };

  const getPublicURL = (cvFile?: CVFile) => {
    const fileToUse = cvFile || activeCV;
    if (!fileToUse) return null;

    const { data } = supabase.storage
      .from('cv-files')
      .getPublicUrl(fileToUse.file_path);

    return data.publicUrl;
  };

  const uploadCV = async (file: File, version?: string) => {
    try {
      setLoading(true);

      // Deactivate previous CV files
      await supabase
        .from('cv_files')
        .update({ is_active: false })
        .eq('is_active', true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', file.name);
      if (version) formData.append('version', version);

      const response = await fetch('/functions/v1/upload-cv', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload CV');
      }

      const result = await response.json();
      
      // Refresh CV files
      await fetchCVFiles();
      
      return result.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading CV');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCVFiles();
  }, []);

  return {
    cvFiles,
    activeCV,
    loading,
    error,
    downloadCV,
    getPublicURL,
    uploadCV,
    refetch: fetchCVFiles
  };
};