import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Beaker, Factory, ArrowRight } from "lucide-react";

const industries = [
  {
    icon: Package,
    title: "Corrugated Packaging",
    features: [
      "Machine tracking & quality control",
      "Artwork quality checks", 
      "Dispatch quantity tracking"
    ],
  },
  {
    icon: Beaker,
    title: "Plastics Manufacturing",
    features: [
      "Predictive quality control",
      "Energy optimization",
      "Process uptime monitoring"
    ],
  },
  {
    icon: Factory,
    title: "Other Industries",
    features: [
      "Customized AI models",
      "Machine health monitoring",
      "Compliance & throughput enhancement"
    ],
  },
];

export default function Industries() {
  const handleLearnMore = (industry: string) => {
    console.log(`Learn more about ${industry} clicked`); // TODO: remove mock functionality
  };

  return (
    <section id="industries" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-industries-title">
            Industries We Serve
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="text-industries-subtitle">
            Tailored solutions for different industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;
            return (
              <Card 
                key={index} 
                className="group hover-elevate transition-all duration-300 border-card-border bg-card/50 backdrop-blur-sm h-[450px] flex flex-col"
                data-testid={`card-industry-${index}`}
              >
                <CardHeader className="text-center pb-6 p-6 h-[140px] flex flex-col justify-center">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-primary" data-testid={`icon-industry-${index}`} />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-card-foreground" data-testid={`text-industry-title-${index}`}>
                    {industry.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-grow flex flex-col justify-between p-6">
                  <ul className="space-y-3 mb-8 h-[180px] overflow-hidden">
                    {industry.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex} 
                        className="flex items-start space-x-3"
                        data-testid={`text-industry-feature-${index}-${featureIndex}`}
                      >
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={() => handleLearnMore(industry.title)}
                    data-testid={`button-learn-more-${index}`}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}