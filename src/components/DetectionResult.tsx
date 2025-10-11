import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface DetectionResultProps {
  result: {
    pestDetected?: boolean;
    pestName?: string;
    damageDetected?: boolean;
    damageType?: string;
    likelyPest?: string;
    confidence: number;
    severity: string;
    description: string;
    recommendations: string;
  };
}

export const DetectionResult = ({ result }: DetectionResultProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-destructive';
      case 'critical': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return <CheckCircle className="h-5 w-5" />;
      case 'medium': return <Info className="h-5 w-5" />;
      case 'high': return <AlertTriangle className="h-5 w-5" />;
      case 'critical': return <XCircle className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">Detection Results</h3>
          <div className="flex gap-2 flex-wrap">
            {result.pestDetected && result.pestName && (
              <Badge variant="default" className="bg-primary">
                Pest: {result.pestName}
              </Badge>
            )}
            {result.damageDetected && result.damageType && (
              <Badge variant="secondary">
                Damage: {result.damageType}
              </Badge>
            )}
            {result.likelyPest && (
              <Badge variant="outline">
                Likely Cause: {result.likelyPest}
              </Badge>
            )}
          </div>
        </div>
        <div className={`flex items-center gap-2 ${getSeverityColor(result.severity)}`}>
          {getSeverityIcon(result.severity)}
          <span className="font-semibold capitalize">{result.severity} Severity</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Confidence Level</span>
          <span className={`text-sm font-semibold ${getConfidenceColor(result.confidence)}`}>
            {result.confidence}%
          </span>
        </div>
        <Progress value={result.confidence} className="h-2" />
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            Analysis
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {result.description}
          </p>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-primary flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Recommendations
          </h4>
          <p className="text-sm leading-relaxed whitespace-pre-line">
            {result.recommendations}
          </p>
        </div>
      </div>
    </Card>
  );
};