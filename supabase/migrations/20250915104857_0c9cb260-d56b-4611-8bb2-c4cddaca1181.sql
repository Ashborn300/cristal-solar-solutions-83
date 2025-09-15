-- Create CV files table to track CV versions
CREATE TABLE public.cv_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT DEFAULT 'application/pdf',
  version TEXT DEFAULT '1.0',
  is_active BOOLEAN DEFAULT true,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cv_files ENABLE ROW LEVEL SECURITY;

-- Create policies for CV files
CREATE POLICY "Everyone can view active CV files" 
ON public.cv_files 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage CV files" 
ON public.cv_files 
FOR ALL 
USING (is_admin());

-- Create storage bucket for CV files if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('cv-files', 'cv-files', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for CV files
CREATE POLICY "Public can view CV files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'cv-files');

CREATE POLICY "Admins can upload CV files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'cv-files' AND is_admin());

CREATE POLICY "Admins can update CV files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'cv-files' AND is_admin());

-- Add trigger for updated_at
CREATE TRIGGER update_cv_files_updated_at
BEFORE UPDATE ON public.cv_files
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();