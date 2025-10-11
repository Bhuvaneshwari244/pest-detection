-- Create pest detections table
CREATE TABLE public.pest_detections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  image_url TEXT NOT NULL,
  detection_type TEXT NOT NULL CHECK (detection_type IN ('insect', 'damage', 'both')),
  pest_name TEXT,
  damage_type TEXT,
  confidence_score DECIMAL(5,2),
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  recommendations TEXT,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.pest_detections ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no authentication required for MVP)
CREATE POLICY "Anyone can view detections" 
ON public.pest_detections 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create detections" 
ON public.pest_detections 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_pest_detections_updated_at
BEFORE UPDATE ON public.pest_detections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for pest images
INSERT INTO storage.buckets (id, name, public)
VALUES ('pest-images', 'pest-images', true);

-- Create policies for pest images bucket
CREATE POLICY "Anyone can view pest images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'pest-images');

CREATE POLICY "Anyone can upload pest images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'pest-images');