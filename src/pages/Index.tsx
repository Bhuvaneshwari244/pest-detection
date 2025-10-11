import { useState } from "react";
import { Leaf, Sparkles, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";
import { DetectionTypeSelector } from "@/components/DetectionTypeSelector";
import { DetectionResult } from "@/components/DetectionResult";
import { DetectionHistory } from "@/components/DetectionHistory";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [detectionType, setDetectionType] = useState("both");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleImageSelect = (file: File, preview: string) => {
    setSelectedImage(preview);
    setSelectedFile(file);
    setResult(null);
  };

  const handleClear = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !selectedImage) {
      toast.error("Please select an image first");
      return;
    }

    setIsAnalyzing(true);
    toast.info("Analyzing image...");

    try {
      // Upload image to storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('pest-images')
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('pest-images')
        .getPublicUrl(fileName);

      // Convert image to base64
      const base64 = selectedImage.split(',')[1];

      // Call detection function
      const { data: detectionData, error: detectionError } = await supabase.functions.invoke('detect-pest', {
        body: {
          imageBase64: base64,
          detectType: detectionType
        }
      });

      if (detectionError) throw detectionError;

      // Save detection to database
      const { error: saveError } = await supabase
        .from('pest_detections')
        .insert({
          image_url: publicUrl,
          detection_type: detectionType,
          pest_name: detectionData.pestName,
          damage_type: detectionData.damageType,
          confidence_score: detectionData.confidence,
          severity: detectionData.severity,
          recommendations: detectionData.recommendations
        });

      if (saveError) throw saveError;

      setResult(detectionData);
      toast.success("Analysis complete!");
    } catch (error: any) {
      console.error('Analysis error:', error);
      toast.error(error.message || "Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">PeanutGuard</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Pest Detection</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Secure & Private</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Info Banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-semibold mb-2">Advanced Dual Detection System</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our AI analyzes your peanut crop images for both visible pests (aphids, thrips, caterpillars) 
                and damage symptoms (bite marks, discoloration, curling). Get instant, accurate results with 
                expert recommendations for integrated pest management.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <ImageUpload
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
              onClear={handleClear}
              isAnalyzing={isAnalyzing}
            />

            {result && <DetectionResult result={result} />}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <DetectionTypeSelector
              value={detectionType}
              onChange={setDetectionType}
              disabled={isAnalyzing}
            />

            <Button
              onClick={handleAnalyze}
              disabled={!selectedImage || isAnalyzing}
              className="w-full h-12 text-base font-semibold"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="h-5 w-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Analyze Image
                </>
              )}
            </Button>

            <DetectionHistory />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 PeanutGuard. Empowering farmers with AI technology.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;