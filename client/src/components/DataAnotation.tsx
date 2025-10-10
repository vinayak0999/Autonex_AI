import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Activity, Package, ArrowUpRight, MessageSquare, Brain, Users, Wrench, Shield, Clock, DollarSign, Image, Layers } from "lucide-react";
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
    icon: Image,
    title: "Visual Data (Images & Video)",
    description: "Object detection (bounding boxes, segmentation, tracking). Multi-camera synchronization (e.g., factory floor dual-view). Event/incident detection in continuous footage."
  },
  {
    icon: Activity,
    title:"Sensor & Time-Series Data",
    description: "Temperature, vibration, pressure, and other telemetry signals. Anomaly detection labeling for predictive maintenance. Alignment with video or process events.",
  },
  {
    icon: Layers,
    title: "Multimodal Data",
    description: "Combined video + sensor annotation. Fusion datasets for robotics and physical AI applications. Synchronized incident tagging across data streams.",
  },
  {
    icon: Brain,
    title: "Text & Logic-Based Tasks",
    description: "Critical reasoning dataset creation (QA, multi-step logic tasks). PhD-level reasoning and instruction-following annotation.",
  }
];

const additionalServices: ServiceItem[] = [
  {
    icon: Users,
    title: "Expert Engineering Team",
    description: "Experienced engineers who understand industrial processes and physical AI requirements.",
  },
  {
    icon: Wrench,
    title: "Industry-Standard Tools",
    description: "Proficient with YOLOv8, CVAT, SuperAnnotate, and custom annotation platforms.",
    
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Human-in-the-loop workflows with AI-assisted annotation and rigorous quality control.",
  },
  {
    icon: Clock,
    title: "Rapid Turnaround",
    description: "Efficient workflows ensuring secure data handling and fast project delivery.",
  },
  {
    icon: DollarSign,
    title: "Flexible Pricing",
    description: "Competitive hourly rates (dependent on the task)",
  }
  
];

export default function DataAnotations() {
  return (
    <Section id="products" padding="xl">
      <style>{aiKeyframesCSS}</style>
      {/* Intro container (like hero/section headers) */}
      <div className="mb-12 md:mb-16">
        <SlideIn>
          <SectionHeader
            eyebrow="Data Services"
            title="Data Annotation & Labelling for Physical AI"
            subtitle="Specialized multimodal annotation services for physical AI use cases. From computer vision to sensor fusion, we deliver precise, quality-controlled labeling for your AI training pipeline."
            centered
          />
        </SlideIn>
        {/* AI Animation under subtitle */}
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
      </div>

      {/* Data Services container: header + grid (plain HTML container) */}
      <div className="mb-12 md:mb-20">
        <SlideIn>
          <SectionHeader
            title="Data Services"
            subtitle="High-fidelity annotations across vision, sensors, and multimodal datasets."
            titleClassName="text-3xl md:text-4xl"
            subtitleClassName="text-base md:text-lg"
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
                </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </StaggerChildren>
      </div>

      {/* Why Choose Our Team container: header + grid (plain HTML container) */}
      <div>
        <SlideIn>
          <SectionHeader
            title="Why Choose Our Team"
            subtitle="Battle-tested workflows, experienced engineers, and rigorous QA."
            titleClassName="text-3xl md:text-4xl"
            subtitleClassName="text-base md:text-lg"
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

                </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </StaggerChildren>
      </div>
    </Section>
  );
}