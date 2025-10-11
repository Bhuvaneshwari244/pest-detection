import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Cpu, TrendingUp, Users, ArrowRight, Sparkles } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import heroImage from "@/assets/peanut-field-hero.jpg";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Advanced Protection",
      description: "AI-powered pest detection with comprehensive analysis of both visible insects and damage symptoms."
    },
    {
      icon: Cpu,
      title: "CNN Technology",
      description: "Deep learning models trained on thousands of peanut crop images for accurate pest identification."
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Monitor pest trends and track detection history to make informed agricultural decisions."
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Agricultural specialists available with detailed recommendations for integrated pest management."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section 
        className="relative h-[500px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.85), rgba(22, 163, 74, 0.85)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/90" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Enhanced Pest Management
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-6 font-medium">
            in Peanut Farming Using CNN
          </p>
          <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
            Revolutionary AI-powered pest detection system specifically designed for peanut crops. Identify 
            threats early, protect your harvest, and maximize agricultural productivity.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/detection")}
              className="bg-white text-primary hover:bg-white/90 text-base font-semibold px-8"
            >
              Start Detection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/abstract")}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-base font-semibold px-8"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose PeanutGuard AI?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our cutting-edge CNN technology provides farmers with the most accurate and 
              efficient pest detection solution available today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Protect Your Peanut Crops?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-95">
            Start using our AI-powered detection system today and join thousands of farmers 
            protecting their harvest with cutting-edge technology.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/detection")}
            className="bg-white text-primary hover:bg-white/90 text-base font-semibold px-8"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 PeanutGuard AI. Empowering farmers with advanced pest detection technology.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;