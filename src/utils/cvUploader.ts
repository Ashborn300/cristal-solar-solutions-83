import { supabase } from '@/integrations/supabase/client';

export const uploadInitialCV = async () => {
  try {
    // Check if CV already exists
    const { data: existingCV } = await supabase
      .from('cv_files')
      .select('*')
      .eq('is_active', true)
      .limit(1);

    if (existingCV && existingCV.length > 0) {
      console.log('CV already exists in database');
      return existingCV[0];
    }

    // Fetch the PDF file from public folder
    const response = await fetch('/assets/CV_EXPERT_DEPUTE_23_AVRIL_2025_FR.pdf');
    if (!response.ok) {
      throw new Error('Failed to fetch CV file');
    }

    const blob = await response.blob();
    const file = new File([blob], 'CV_EXPERT_DEPUTE_23_AVRIL_2025_FR.pdf', {
      type: 'application/pdf'
    });

    // Upload to Supabase storage
    const filePath = `cv_initial_${Date.now()}.pdf`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('cv-files')
      .upload(filePath, file, {
        contentType: 'application/pdf',
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    // Insert record in database
    const { data: dbData, error: dbError } = await supabase
      .from('cv_files')
      .insert({
        filename: 'CV_EXPERT_DEPUTE_23_AVRIL_2025_FR.pdf',
        file_path: uploadData.path,
        file_size: file.size,
        mime_type: 'application/pdf',
        version: '1.0',
        is_active: true
      })
      .select()
      .single();

    if (dbError) {
      throw dbError;
    }

    console.log('Initial CV uploaded successfully:', dbData);
    return dbData;

  } catch (error) {
    console.error('Error uploading initial CV:', error);
    throw error;
  }
};