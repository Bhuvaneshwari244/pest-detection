import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Layers, Zap, Database, CloudCog, Shield } from "lucide-react";

const Technical = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <Badge className="mb-4">Technical Documentation</Badge>
          <h1 className="text-4xl font-bold mb-4">
            System Architecture & Implementation
          </h1>
          <p className="text-lg text-muted-foreground">
            Detailed technical specifications and implementation details
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">System Architecture</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Frontend Layer</h3>
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <p className="text-sm"><strong>Framework:</strong> React 18 with TypeScript</p>
                      <p className="text-sm"><strong>Build Tool:</strong> Vite for fast development and optimized production builds</p>
                      <p className="text-sm"><strong>UI Components:</strong> Shadcn/ui with Radix UI primitives</p>
                      <p className="text-sm"><strong>Styling:</strong> Tailwind CSS with custom design tokens</p>
                      <p className="text-sm"><strong>State Management:</strong> React Query for server state, React hooks for local state</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Backend Infrastructure</h3>
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <p className="text-sm"><strong>Platform:</strong> Lovable Cloud (Supabase-powered)</p>
                      <p className="text-sm"><strong>Database:</strong> PostgreSQL with Row Level Security (RLS)</p>
                      <p className="text-sm"><strong>Storage:</strong> Object storage for image files</p>
                      <p className="text-sm"><strong>Functions:</strong> Edge Functions (Deno runtime) for serverless compute</p>
                      <p className="text-sm"><strong>Authentication:</strong> Built-in auth system (optional for future implementation)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">AI Detection Pipeline</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Image Processing</h3>
                    <ol className="space-y-2 text-sm text-muted-foreground ml-4">
                      <li>1. User uploads image through drag-and-drop or file picker interface</li>
                      <li>2. Image is validated (format, size) and previewed client-side</li>
                      <li>3. Image converted to base64 encoding for API transmission</li>
                      <li>4. Uploaded to secure cloud storage with public URL generation</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <p className="text-sm"><strong>Model:</strong> Google Gemini 2.5 Flash (multimodal)</p>
                      <p className="text-sm"><strong>Gateway:</strong> Lovable AI Gateway for secure API access</p>
                      <p className="text-sm"><strong>Input:</strong> Base64-encoded image + detection type (insect/damage/both)</p>
                      <p className="text-sm"><strong>Processing:</strong> Vision-language model analyzes image content</p>
                      <p className="text-sm"><strong>Output:</strong> Structured JSON with pest identification, confidence scores, severity assessment, and recommendations</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Detection Types</h3>
                    <div className="grid gap-3">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="font-semibold text-sm mb-1">🐛 Insect Identification</p>
                        <p className="text-sm text-muted-foreground">Detects visible pests: Aphids, Thrips, Jassids, Spodoptera, Caterpillars, White grubs, Termites</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="font-semibold text-sm mb-1">🍂 Damage Symptom Analysis</p>
                        <p className="text-sm text-muted-foreground">Identifies damage: Bite marks, holes, discoloration, curling, wilting, necrosis, pod damage</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="font-semibold text-sm mb-1">✨ Comprehensive Analysis</p>
                        <p className="text-sm text-muted-foreground">Combined detection for maximum accuracy and robustness</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">Database Schema</h2>
                
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">pest_detections Table</h3>
                    <div className="space-y-2 text-sm font-mono">
                      <p><span className="text-primary">id:</span> UUID (Primary Key)</p>
                      <p><span className="text-primary">user_id:</span> UUID (Optional, for future auth)</p>
                      <p><span className="text-primary">image_url:</span> TEXT (Storage URL)</p>
                      <p><span className="text-primary">detection_type:</span> ENUM (insect, damage, both)</p>
                      <p><span className="text-primary">pest_name:</span> TEXT (Identified pest species)</p>
                      <p><span className="text-primary">damage_type:</span> TEXT (Type of damage observed)</p>
                      <p><span className="text-primary">confidence_score:</span> DECIMAL(5,2) (0-100)</p>
                      <p><span className="text-primary">severity:</span> ENUM (low, medium, high, critical)</p>
                      <p><span className="text-primary">recommendations:</span> TEXT (Treatment advice)</p>
                      <p><span className="text-primary">location_lat/lng:</span> DECIMAL (GPS coordinates)</p>
                      <p><span className="text-primary">created_at:</span> TIMESTAMP</p>
                      <p><span className="text-primary">updated_at:</span> TIMESTAMP</p>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Storage Bucket</h3>
                    <p className="text-sm text-muted-foreground">
                      <strong>Name:</strong> pest-images<br />
                      <strong>Access:</strong> Public read (images accessible via URL)<br />
                      <strong>Security:</strong> Insert allowed for all users, server-side validation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <CloudCog className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">Edge Functions</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">detect-pest Function</h3>
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <p className="text-sm"><strong>Runtime:</strong> Deno (TypeScript)</p>
                      <p className="text-sm"><strong>Endpoint:</strong> /functions/v1/detect-pest</p>
                      <p className="text-sm"><strong>Method:</strong> POST</p>
                      <p className="text-sm"><strong>CORS:</strong> Enabled for cross-origin requests</p>
                      <p className="text-sm"><strong>Authentication:</strong> Public (no auth required for MVP)</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Request Flow</h3>
                    <ol className="space-y-2 text-sm text-muted-foreground ml-4">
                      <li>1. Receive base64 image and detection type from client</li>
                      <li>2. Construct specialized system prompt based on detection type</li>
                      <li>3. Call Lovable AI Gateway with image and prompt</li>
                      <li>4. Parse AI response (JSON with detection results)</li>
                      <li>5. Return structured data to client</li>
                      <li>6. Client saves results to database with image URL</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">Security & Performance</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Security Measures</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Row Level Security (RLS) policies on database tables</li>
                      <li>• API keys secured as environment variables (never exposed to client)</li>
                      <li>• CORS headers configured for secure cross-origin requests</li>
                      <li>• Input validation and sanitization on both client and server</li>
                      <li>• Rate limiting handled by AI Gateway (429/402 responses)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Performance Optimization</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Image compression and size validation before upload</li>
                      <li>• React Query for efficient data fetching and caching</li>
                      <li>• Lazy loading of detection history (limit 10 recent entries)</li>
                      <li>• Optimized bundle size with tree-shaking and code splitting</li>
                      <li>• Edge functions deployed globally for low latency</li>
                      <li>• Google Gemini 2.5 Flash for fast AI inference (FREE until Oct 13, 2025)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-primary/5 border-primary/20">
            <h2 className="text-xl font-bold mb-3">Technology Stack Summary</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2 text-sm">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "Vite", "Tailwind CSS", "React Query", "Shadcn/ui"].map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-sm">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {["Lovable Cloud", "PostgreSQL", "Deno", "Edge Functions", "Supabase Storage"].map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-sm">AI & ML</h3>
                <div className="flex flex-wrap gap-2">
                  {["Google Gemini 2.5", "Lovable AI Gateway", "Computer Vision", "Multimodal AI"].map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-sm">DevOps</h3>
                <div className="flex flex-wrap gap-2">
                  {["Git", "GitHub", "Automatic Deployment", "CORS", "Environment Variables"].map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <footer className="border-t py-8 bg-card mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 PeanutGuard AI. Built with cutting-edge technology for modern agriculture.</p>
        </div>
      </footer>
    </div>
  );
};

export default Technical;