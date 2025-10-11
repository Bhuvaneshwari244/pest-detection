import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, TrendingUp } from "lucide-react";

export const DetectionHistory = () => {
  const { data: detections, isLoading } = useQuery({
    queryKey: ['pest-detections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pest_detections')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Detections</h3>
        <p className="text-sm text-muted-foreground">Loading history...</p>
      </Card>
    );
  }

  if (!detections || detections.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Detections</h3>
        <p className="text-sm text-muted-foreground">No detection history yet. Upload an image to start!</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Detections</h3>
        <Badge variant="outline">
          <TrendingUp className="h-3 w-3 mr-1" />
          {detections.length} Records
        </Badge>
      </div>
      
      <div className="space-y-3">
        {detections.map((detection) => (
          <div
            key={detection.id}
            className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
          >
            <img
              src={detection.image_url}
              alt="Detection"
              className="w-16 h-16 rounded object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={detection.severity === 'high' || detection.severity === 'critical' ? 'destructive' : 'default'}>
                  {detection.detection_type}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {detection.severity}
                </Badge>
              </div>
              <p className="text-sm font-medium truncate">
                {detection.pest_name || detection.damage_type || 'Analysis Complete'}
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(detection.created_at), 'MMM dd, yyyy HH:mm')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};