import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, Lightbulb, TrendingUp } from "lucide-react";

const Abstract = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <Badge className="mb-4">Research Abstract</Badge>
          <h1 className="text-4xl font-bold mb-4">
            Enhanced Pest Detection in Peanut Farming Using CNN
          </h1>
          <p className="text-lg text-muted-foreground">
            A comprehensive AI-based approach combining insect identification and damage symptom analysis
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Peanut farming faces significant challenges from various pests including aphids, thrips, jassids, 
                  spodoptera (armyworms), caterpillars, white grubs, and termites. Traditional pest detection methods 
                  rely heavily on manual inspection and are often reactive rather than preventive. This project presents 
                  an enhanced pest detection system that leverages Convolutional Neural Networks (CNN) combined with 
                  Moth Flame Optimization (MFO) and Evita algorithms for accurate, real-time pest identification.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Objectives</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Develop a dual-detection system capable of identifying both visible pests and damage symptoms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Implement deep learning models (CNN) optimized with MFO and Evita algorithms for high accuracy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Provide real-time analysis and actionable recommendations for integrated pest management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Create a user-friendly interface accessible to farmers with varying technical expertise</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Maintain detection history and analytics for trend analysis and preventive measures</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Methodology</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">1. Dual Detection Approach</h3>
                    <p className="leading-relaxed">
                      <strong>Insect Identification:</strong> Direct detection of visible pests on peanut leaves, stems, 
                      and pods using object detection algorithms. The system identifies specific pest species such as 
                      aphids, thrips, and caterpillars with bounding box localization.
                    </p>
                    <p className="leading-relaxed mt-2">
                      <strong>Damage Symptom Analysis:</strong> Classification of pest damage patterns including bite marks, 
                      leaf discoloration, curling, and necrosis. This approach works even when pests are not directly visible 
                      in the image.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">2. Deep Learning Architecture</h3>
                    <p className="leading-relaxed">
                      The system employs Convolutional Neural Networks (CNN) as the backbone for feature extraction and 
                      classification. CNNs automatically learn hierarchical features from raw image data, eliminating the 
                      need for manual feature engineering used in traditional methods.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">3. Optimization Techniques</h3>
                    <p className="leading-relaxed">
                      <strong>MFO (Moth Flame Optimization):</strong> A nature-inspired metaheuristic algorithm used to 
                      optimize CNN hyperparameters including learning rate, weight decay, and network architecture parameters.
                    </p>
                    <p className="leading-relaxed mt-2">
                      <strong>Evita Algorithm:</strong> Applied for feature selection and dimensionality reduction, enhancing 
                      model efficiency while maintaining high accuracy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Expected Outcomes</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  This enhanced pest detection system addresses the limitations of existing methods by combining direct 
                  pest identification with symptom-based detection. The dual approach significantly reduces false positives 
                  and provides more robust detection in real-world farming conditions.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p className="text-sm">
                    <strong className="text-foreground">✓ High Accuracy:</strong> Expected detection accuracy above 90% for common peanut pests
                  </p>
                  <p className="text-sm">
                    <strong className="text-foreground">✓ Real-time Processing:</strong> Analysis completed within seconds for immediate decision-making
                  </p>
                  <p className="text-sm">
                    <strong className="text-foreground">✓ Practical Deployment:</strong> Mobile-friendly interface accessible to farmers in the field
                  </p>
                  <p className="text-sm">
                    <strong className="text-foreground">✓ Preventive Management:</strong> Early detection enabling timely intervention and reduced crop loss
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-primary/5 border-primary/20">
            <h2 className="text-xl font-bold mb-3">Keywords</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Peanut Farming",
                "Pest Detection",
                "CNN",
                "Deep Learning",
                "MFO Algorithm",
                "Evita Algorithm",
                "Insect Identification",
                "Damage Symptom Analysis",
                "Agricultural AI",
                "Computer Vision"
              ].map((keyword) => (
                <Badge key={keyword} variant="secondary">
                  {keyword}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </main>

      <footer className="border-t py-8 bg-card mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 PeanutGuard AI. Advancing agricultural technology through AI research.</p>
        </div>
      </footer>
    </div>
  );
};

export default Abstract;