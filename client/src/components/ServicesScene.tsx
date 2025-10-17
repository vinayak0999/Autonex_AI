import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Activity, Shield, Package, FileCheck, ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "./motion/Section";
import { StaggerChildren, SlideIn, serviceCardVariants, serviceCardHover } from "./motion/Motion";
import MagneticExplode from "./motion/MagneticExplode";
import { motion } from "framer-motion";
import dashboardMockupPath from "@assets/generated_images/new graph.png";

const services = [
  {
    icon: CheckCircle,
    title: "Material Verification",
    description: "Real-time verification of inbound materials and their quantities across all industrial processes with AI-powered accuracy.",
    features: ["Real-time scanning", "Quality assurance", "Automated logging"]
  },
  {
    icon: Activity,
    title: "Process Monitoring",
    description: "Continuous tracking of production processes and workflow optimization with intelligent analytics and predictive insights.",
    features: ["Live monitoring", "Performance analytics", "Workflow optimization"]
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "AI-powered quality control and inspection systems for consistent output and reduced defect rates.",
    features: ["Automated inspection", "Defect detection", "Quality reporting"]
  },
  {
    icon: Package,
    title: "Inventory Management",
    description: "Automated tracking and logging for complete inventory visibility with predictive restocking capabilities.",
    features: ["Smart tracking", "Predictive restocking", "Cost optimization"]
  },
  {
    icon: FileCheck,
    title: "Compliance Monitoring",
    description: "Automated compliance monitoring and maintenance scheduling systems to ensure regulatory standards.",
    features: ["Regulatory compliance", "Automated reporting", "Risk assessment"]
  },
];

export default function ServicesScene() {
  return (
    <Section id="services" padding="xl">
      <SlideIn>
        <SectionHeader
          eyebrow="What We Do"
          title="Comprehensive AI Solutions"
          subtitle="XYZ combines AI, IIoT, and edge computing to build sector-specific digital twins that deliver actionable insights, predictive maintenance, and dynamic operational optimization."
        />
      </SlideIn>

      {/* Dashboard Preview with Parallax */}
      <SlideIn>
        <motion.div 
          className="mb-20 relative"
          whileInView={{ y: 0 }}
          initial={{ y: 50 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Card interactive={false} className="overflow-hidden border-card-border bg-card/30 backdrop-blur-sm relative">
            <CardContent className="p-0 relative">
              <img
                src={dashboardMockupPath}
                alt="Live Production Line Monitoring Dashboard"
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                data-testid="img-dashboard"
              />
              {/* Overlay removed hover reaction */}
              <div className="absolute inset-0 pointer-events-none" />
            </CardContent>
          </Card>
          
          {/* Floating Elements */}
          <motion.div 
            className="absolute -top-6 -right-6 w-12 h-12 bg-primary/20 rounded-full backdrop-blur-sm border border-primary/30"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          
          <motion.div 
            className="absolute -bottom-8 -left-8 w-8 h-8 bg-secondary/30 rounded-full backdrop-blur-sm border border-secondary/50"
            animate={{ 
              y: [0, 15, 0],
              x: [0, 10, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
          />
        </motion.div>
      </SlideIn>

      {/* Services Grid */}
      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={index}
              variants={serviceCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2, margin: "0px 0px -10% 0px" }}
              whileHover={serviceCardHover}
              data-testid={`card-service-${index}`}
              data-service-card={index}
            >
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
          );
        })}
      </StaggerChildren>
    </Section>
  );
}