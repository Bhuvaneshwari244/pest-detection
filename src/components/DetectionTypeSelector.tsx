import { Bug, Leaf, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface DetectionTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export const DetectionTypeSelector = ({ value, onChange, disabled }: DetectionTypeSelectorProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Detection Type</h3>
      <RadioGroup value={value} onValueChange={onChange} disabled={disabled}>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="insect" id="insect" className="mt-0.5" />
            <Label htmlFor="insect" className="flex-1 cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <Bug className="h-5 w-5 text-primary" />
                <span className="font-medium">Insect Identification</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Detect visible pests like aphids, thrips, caterpillars, and more
              </p>
            </Label>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="damage" id="damage" className="mt-0.5" />
            <Label htmlFor="damage" className="flex-1 cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <Leaf className="h-5 w-5 text-primary" />
                <span className="font-medium">Damage Symptom Analysis</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Identify pest damage from symptoms like bite marks, discoloration, curling
              </p>
            </Label>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="both" id="both" className="mt-0.5" />
            <Label htmlFor="both" className="flex-1 cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-medium">Comprehensive Analysis</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Complete scan for both visible pests and damage symptoms
              </p>
            </Label>
          </div>
        </div>
      </RadioGroup>
    </Card>
  );
};