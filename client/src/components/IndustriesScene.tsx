import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MagneticButton } from "./motion/MagneticButton";
import { Package, Beaker, Factory, ArrowRight, TrendingUp } from "lucide-react";
import { Section, SectionHeader } from "./motion/Section";
import { StaggerChildren, SlideIn, serviceCardHover, splitEntry } from "./motion/Motion";
import { CountUp } from "./motion/CountUp";
import { motion } from "framer-motion";
import MagneticExplode from "./motion/MagneticExplode";

const industries = [
  {
    icon: Package,
    title: "Corrugated Packaging",
    features: [
      "Machine tracking & quality control",
      "Artwork quality checks", 
      "Dispatch quantity tracking"
    ],
    stats: { improvement: 35, metric: "Quality Improvement" },
    color: "from-blue-500/20 to-indigo-500/20"
  },
  {
    icon: Beaker,
    title: "Plastics Manufacturing",
    features: [
      "Predictive quality control",
      "Energy optimization",
      "Process uptime monitoring"
    ],
    stats: { improvement: 42, metric: "Energy Savings" },
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    icon: Factory,
    title: "Other Industries",
    features: [
      "Customized AI models",
      "Machine health monitoring",
      "Compliance & throughput enhancement"
    ],
    stats: { improvement: 28, metric: "Uptime Increase" },
    color: "from-purple-500/20 to-violet-500/20"
  },
];

export default function IndustriesScene() {
  const handleLearnMore = (industry: string) => {
    console.log(`Learn more about ${industry} clicked`); // TODO: remove mock functionality
  };

  return (
    <Section id="industries" background="gradient" padding="xl">
      <SlideIn>
        <SectionHeader
          eyebrow="Industries We Serve"
          title="Tailored Solutions for Every Sector"
          subtitle="Advanced AI automation customized for your industry's unique challenges and requirements"
        />
      </SlideIn>

      <StaggerChildren className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {industries.map((industry, index) => {
          const IconComponent = industry.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              data-testid={`card-industry-${index}`}
              data-industry-card={index}
              style={{ perspective: 1000 }}
            >
              <motion.div whileHover={serviceCardHover}>
              <Card className="group relative h-[500px] overflow-hidden border-card-border bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 flex flex-col">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Stats Badge */}
                <motion.div 
                  className="absolute top-6 right-6 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-2 border border-primary/20"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
                >
                  <div className="flex items-center space-x-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-primary font-semibold">
                      <CountUp end={industry.stats.improvement} suffix="%" />
                    </span>
                  </div>
                </motion.div>
                
                <CardHeader className="relative pb-6 pt-8 h-[160px] flex flex-col justify-center">
                  {/* Icon with Magnetic Effect */}
                  <motion.div 
                    className="mb-6 flex justify-center"
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MagneticExplode triggerSelector={`[data-industry-card="${index}"]`}>
                      <div className="w-20 h-20 rounded-2xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors duration-300 relative overflow-hidden">
                        <IconComponent className="h-10 w-10 text-primary relative z-10" data-testid={`icon-industry-${index}`} />
                        
                        {/* Ripple Effect */}
                        <motion.div 
                          className="absolute inset-0 rounded-2xl border-2 border-primary/30"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                    </MagneticExplode>
                  </motion.div>
                  
                  <CardTitle className="text-2xl text-center text-card-foreground group-hover:text-primary transition-colors duration-300" data-testid={`text-industry-title-${index}`}>
                    {industry.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative flex-grow flex flex-col justify-between px-8 pb-8">
                  {/* Features List */}
                  <div className="space-y-4 mb-8 h-[120px] overflow-hidden">
                    {industry.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={featureIndex} 
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: (index * 0.1) + (featureIndex * 0.1),
                          duration: 0.5 
                        }}
                        data-testid={`text-industry-feature-${index}-${featureIndex}`}
                      >
                        <motion.div 
                          className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"
                          whileInView={{ scale: [0, 1.2, 1] }}
                          transition={{ delay: (index * 0.1) + (featureIndex * 0.1) }}
                        />
                        <span className="text-muted-foreground leading-relaxed text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Stats Display */}
                  <div className="mb-8 text-center">
                    <div className="text-sm text-muted-foreground mb-2">{industry.stats.metric}</div>
                    <div className="text-3xl font-bold text-primary">
                      <CountUp end={industry.stats.improvement} suffix="%" />
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <MagneticButton 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                    onClick={() => handleLearnMore(industry.title)}
                    data-testid={`button-learn-more-${index}`}
                    strength={0.2}
                  >
                    Learn More
                    <motion.div
                      className="ml-2"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </MagneticButton>
                </CardContent>

                {/* Animated Border */}
                <motion.div 
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: "linear-gradient(45deg, transparent, rgba(var(--primary), 0.1), transparent)",
                  }}
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 2, ease: "linear" }}
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