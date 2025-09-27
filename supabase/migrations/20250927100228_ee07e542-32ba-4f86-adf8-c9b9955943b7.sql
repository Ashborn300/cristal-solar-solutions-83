-- Create storage bucket for CV files
INSERT INTO storage.buckets (id, name, public) VALUES ('cv-files', 'cv-files', false);

-- Create cv_files table
CREATE TABLE public.cv_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  version TEXT DEFAULT '1.0',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cv_files ENABLE ROW LEVEL SECURITY;

-- Create policies for cv_files (public read access for active CVs)
CREATE POLICY "Public can view active CV files" 
ON public.cv_files 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Public can insert CV files" 
ON public.cv_files 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can update CV files" 
ON public.cv_files 
FOR UPDATE 
USING (true);

-- Create storage policies for cv-files bucket
CREATE POLICY "Public can view CV files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'cv-files');

CREATE POLICY "Public can upload CV files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'cv-files');

CREATE POLICY "Public can update CV files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'cv-files');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_cv_files_updated_at
BEFORE UPDATE ON public.cv_files
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();