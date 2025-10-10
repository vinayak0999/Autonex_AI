import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Activity, Shield, Package, FileCheck } from "lucide-react";
import dashboardMockupPath from "@assets/generated_images/Industrial_monitoring_dashboard_mockup_02e09966.png";

const services = [
  {
    icon: CheckCircle,
    title: "Material Verification",
    description: "Real-time verification of inbound materials and their quantities across all industrial processes",
  },
  {
    icon: Activity,
    title: "Process Monitoring",
    description: "Continuous tracking of production processes and workflow optimization",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "AI-powered quality control and inspection systems for consistent output",
  },
  {
    icon: Package,
    title: "Inventory Management",
    description: "Automated tracking and logging for complete inventory visibility",
  },
  {
    icon: FileCheck,
    title: "Compliance Monitoring",
    description: "Automated compliance monitoring and maintenance scheduling systems",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-services-title">
            What We Do
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-services-subtitle">
            XYZ combines AI, IIoT, and edge computing to build sector-specific digital twins that deliver actionable insights, predictive maintenance, and dynamic operational optimization.
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="mb-16">
          <Card className="overflow-hidden border-card-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <img
                src={dashboardMockupPath}
                alt="Live Production Line Monitoring Dashboard"
                className="w-full h-auto"
                data-testid="img-dashboard"
              />
            </CardContent>
          </Card>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="group hover-elevate transition-all duration-300 border-card-border bg-card/50 backdrop-blur-sm"
                data-testid={`card-service-${index}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="h-6 w-6 text-primary" data-testid={`icon-service-${index}`} />
                    </div>
                    <CardTitle className="text-card-foreground" data-testid={`text-service-title-${index}`}>
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground" data-testid={`text-service-description-${index}`}>
                    {service.description}
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