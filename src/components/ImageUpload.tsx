import { useState, useRef } from "react";
import { Upload, Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ImageUploadProps {
  onImageSelect: (file: File, preview: string) => void;
  selectedImage: string | null;
  onClear: () => void;
  isAnalyzing: boolean;
}

export const ImageUpload = ({ onImageSelect, selectedImage, onClear, isAnalyzing }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageSelect(file, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageSelect(file, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <Card className="relative overflow-hidden">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {selectedImage ? (
        <div className="relative">
          <img 
            src={selectedImage} 
            alt="Selected crop" 
            className="w-full h-[400px] object-contain bg-muted"
          />
          {!isAnalyzing && (
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-4 right-4"
              onClick={onClear}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            flex flex-col items-center justify-center 
            h-[400px] p-8 border-2 border-dashed rounded-lg
            transition-colors cursor-pointer
            ${isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary hover:bg-muted/50'
            }
          `}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="p-4 rounded-full bg-primary/10">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Upload Plant Image</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop your image here, or click to browse
              </p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" size="sm">
                  <Camera className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Supports: JPG, PNG, WEBP (Max 10MB)
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};