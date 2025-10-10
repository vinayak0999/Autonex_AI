import { Card, CardContent } from "@/components/ui/card";
import { Eye, AlertTriangle, Zap } from "lucide-react";

const visionCards = [
  {
    icon: Eye,
    title: "100% Transparency",
    description: "Build AI-native digital twins to unlock 100% transparency and intelligent, real-time decisions across industrial operations.",
  },
  {
    icon: AlertTriangle,
    title: "Predictive Intelligence",
    description: "Predict failures before they happen and eliminate blind spots across machines and processes.",
  },
  {
    icon: Zap,
    title: "Optimized Operations",
    description: "Optimize quality, uptime, and sustainability - so every factory can think and act with the intelligence of the human mind.",
  },
];

export default function Vision() {
  return (
    <section id="vision" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-vision-title">
            Our Vision
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visionCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Card 
                key={index} 
                className="group hover-elevate transition-all duration-300 border-card-border bg-card/50 backdrop-blur-sm"
                data-testid={`card-vision-${index}`}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-primary" data-testid={`icon-vision-${index}`} />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-card-foreground mb-4" data-testid={`text-vision-title-${index}`}>
                    {card.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed" data-testid={`text-vision-description-${index}`}>
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}