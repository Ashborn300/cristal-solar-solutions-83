-- Créer une table pour gérer les images statiques du site
CREATE TABLE public.static_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  current_url TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.static_images ENABLE ROW LEVEL SECURITY;

-- Create policies for admin and editor access
CREATE POLICY "Admin and editors can manage static images" 
ON public.static_images 
FOR ALL 
USING (is_admin_or_editor(auth.uid()));

-- Create policy for public read access
CREATE POLICY "Public can view active static images" 
ON public.static_images 
FOR SELECT 
USING (is_active = true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_static_images_updated_at
BEFORE UPDATE ON public.static_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();