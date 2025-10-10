import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Activity, Package, ArrowUpRight, MessageSquare, Plug, Cpu, Factory, Building2 } from "lucide-react";
import { Section, SectionHeader } from "./motion/Section";
import { StaggerChildren, SlideIn, serviceCardVariants, serviceCardHover, splitEntry } from "./motion/Motion";
import MagneticExplode from "./motion/MagneticExplode";
import { motion } from "framer-motion";

const aiKeyframesCSS = `
  @keyframes rotateAurora { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
  @keyframes spin-horizontal { from { transform: rotateX(75deg) rotateZ(0deg); } to { transform: rotateX(75deg) rotateZ(360deg); } }
  @keyframes spin-vertical { from { transform: rotateY(75deg) rotateZ(0deg); } to { transform: rotateY(75deg) rotateZ(-360deg); } }
  @keyframes pulse-out { 0% { transform: scale(0.3); opacity: 0.8; } 100% { transform: scale(1.2); opacity: 0; } }
`;

type ServiceItem = {
  icon: typeof CheckCircle;
  title: string;
  description?: string;
  features?: string[];
};


const services: ServiceItem[] = [
  {
    icon: CheckCircle,
    title: "Real-time Machine Monitoring",
    description: "Continuous monitoring of all machine parameters with instant alerts and performance analytics."
  },
  {
    icon: Activity,
    title: "Predictive Maintenance",
    description: "Advanced AI models predict equipment failures 10-30 days in advance, reducing downtime.",
  },
  {
    icon: MessageSquare,
    title: "GenAI Chatbot",
    description: "Intelligent assistant for operator-level decisions with natural language processing.",
  },
  {
    icon: Plug,
    title: "Seamless Integration",
    description: "Compatible with SCADA, PLC, ERP systems for unified operational control.",
  },
  {
    icon: Cpu,
    title: "Local Edge AI",
    description: "On-premise AI processing eliminates cloud latency for critical real-time decisions.",
  },
];

const additionalServices: ServiceItem[] = [
  {
    icon: Package,
    title: "Corrugated Packaging",
    features: ["Raw material verification", "Artwork quality checks", "Dispatch quantity tracking"],
  },
  {
    icon: Factory,
    title: "Plastics Manufacturing",
    features: ["Predictive quality control","Energy optimization","Process uptime monitoring"],
  },
  {
    icon: Building2,
    title: "Other Industries",
    features: ["Customized AI models","Machine health monitoring","Compliance & throughput enhancement"],
  }
  
];

export default function IndustrialSolutions() {
  return (
    <Section id="products" padding="xl">
      <style>{aiKeyframesCSS}</style>
      <SlideIn>
        <SectionHeader
          eyebrow="Our Products"
          title="Industrial Solutions"
          subtitle="Comprehensive AI-powered platforms designed for modern industrial operations"
        />
      </SlideIn>

      {/* AI Animation directly under the first subtitle */}
      <div className="mt-10 sm:mt-12 flex justify-center">
        <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 pointer-events-none select-none">
          <div className="absolute inset-0 animate-pulse" style={{ animationDelay: '0.5s' }}>
            <svg className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50%" cy="50%" r="35%" className="stroke-primary/10" strokeWidth="1" />
              <circle cx="50%" cy="50%" r="25%" className="stroke-primary/10" strokeWidth="1" />
            </svg>
          </div>
          <div className="absolute inset-[35%] rounded-full bg-primary/20 shadow-[0_0_30px_5px_hsl(var(--primary)/0.3)] animate-pulse">
            <div className="absolute inset-4 rounded-full bg-primary/30 shadow-[inset_0_0_10px_hsl(var(--primary))] flex items-center justify-center text-primary font-bold text-3xl sm:text-4xl">AI</div>
          </div>
          <div className="absolute inset-[20%] border border-primary/30 rounded-full" style={{ transform: 'rotateX(75deg)', animation: 'spin-horizontal 10s linear infinite' }} />
          <div className="absolute inset-[20%] border border-primary/30 rounded-full" style={{ transform: 'rotateY(75deg)', animation: 'spin-vertical 12s linear infinite' }} />
          <div className="absolute inset-0 border border-primary/20 rounded-full" style={{ animation: 'pulse-out 3s ease-out infinite' }} />
        </div>
      </div>
      
      {/* Intelligent Factory OS intro */}
      <SlideIn>
        <SectionHeader
          title="Intelligent Factory OS"
          subtitle="From insight to action—faster than ever."
          className="mt-16"
        />
      </SlideIn>

      {/* Services Grid */}
      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              data-testid={`card-service-${index}`}
              data-service-card={index}
            >
              <motion.div whileHover={serviceCardHover}>
              <Card className="group relative h-full overflow-hidden border-card-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-500">
                <CardHeader className="pb-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div 
                      className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MagneticExplode triggerSelector={`[data-service-card="${index}"]`}>
                        <IconComponent className="h-8 w-8 text-primary" data-testid={`icon-service-${index}`} />
                      </MagneticExplode>
                    </motion.div>
                    
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ x: 5, y: -5 }}
                    >
                      <ArrowUpRight className="h-6 w-6 text-muted-foreground" />
                    </motion.div>
                  </div>
                  
                  <CardTitle className="text-xl text-card-foreground group-hover:text-primary transition-colors duration-300" data-testid={`text-service-title-${index}`}>
                    {service.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0 space-y-6">
                  <p className="text-muted-foreground leading-relaxed" data-testid={`text-service-description-${index}`}>
                    {service.description}
                  </p>
                  
                  {service.features && (
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div 
                          key={featureIndex}
                          className="flex items-center space-x-2 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-muted-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>

                {/* Bottom Glow */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </Card>
              </motion.div>
            </motion.div>
          );
        })}
      </StaggerChildren>

      <SlideIn>
        <SectionHeader
          title="Sector-Specific Digital Twins"
          subtitle="Tailored solutions for different industries."
          className="mt-32 md:mt-40"
        />
      </SlideIn>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {additionalServices.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              data-testid={`card-additional-service-${index}`}
              data-service-card={`extra-${index}`}
            >
              <motion.div whileHover={serviceCardHover}>
              <Card className="group relative h-full overflow-hidden border-card-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-500">
                <CardHeader className="pb-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MagneticExplode triggerSelector={`[data-service-card=extra-${index}]`}>
                        <IconComponent className="h-8 w-8 text-primary" data-testid={`icon-additional-service-${index}`} />
                      </MagneticExplode>
                    </motion.div>

                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ x: 5, y: -5 }}
                    >
                      <ArrowUpRight className="h-6 w-6 text-muted-foreground" />
                    </motion.div>
                  </div>

                  <CardTitle className="text-xl text-card-foreground group-hover:text-primary transition-colors duration-300" data-testid={`text-additional-service-title-${index}`}>
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0 space-y-6">
                  <p className="text-muted-foreground leading-relaxed" data-testid={`text-additional-service-description-${index}`}>
                    {service.description}
                  </p>

                  {service.features && (
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          className="flex items-center space-x-2 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-muted-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </Card>
              </motion.div>
            </motion.div>
          );
        })}
      </StaggerChildren>
    </Section>
  );
}