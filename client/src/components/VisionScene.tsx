// import { Card, CardContent } from "@/components/ui/card";
// import { Eye, AlertTriangle, Zap } from "lucide-react";
// import { Section, SectionHeader } from "./motion/Section";
// import { StaggerChildren, SlideIn, ScaleIn } from "./motion/Motion";
// import { motion } from "framer-motion";
// import MagneticExplode from "./motion/MagneticExplode";

// const visionCards = [
//   {
//     icon: Eye,
//     title: "100% Transparency",
//     description: "Build AI-native digital twins to unlock 100% transparency and intelligent, real-time decisions across industrial operations.",
//     gradient: "from-blue-500/20 to-cyan-500/20"
//   },
//   {
//     icon: AlertTriangle,
//     title: "Predictive Intelligence",
//     description: "Predict failures before they happen and eliminate blind spots across machines and processes.",
//     gradient: "from-amber-500/20 to-orange-500/20"
//   },
//   {
//     icon: Zap,
//     title: "Optimized Operations",
//     description: "Optimize quality, uptime, and sustainability - so every factory can think and act with the intelligence of the human mind.",
//     gradient: "from-emerald-500/20 to-green-500/20"
//   },
// ];

// export default function VisionScene() {
//   return (
//     <Section id="vision" background="gradient" padding="md" className="pt-4 sm:pt-5">
//       <SlideIn>
//         <SectionHeader
//           eyebrow="Our Vision"
//           title="The Future of Industrial Intelligence"
//           subtitle="Transforming manufacturing through AI-powered insights and automation"
//           className="mb-10"
//         />
//       </SlideIn>

//       <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {visionCards.map((card, index) => {
//           const IconComponent = card.icon;
//           return (
//             <motion.div
//               key={index}
//               variants={{
//                 hidden: { opacity: 0, y: 40 },
//                 visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
//               }}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: false, amount: 0.2, margin: "0px 0px -10% 0px" }}
//               data-testid={`card-vision-${index}`}
//               className="h-full"
//               data-vision-card={index}
//             >
//               <div className="relative h-full min-h-[22rem] md:min-h-[24rem]">
//                 <Card className="group relative h-full overflow-hidden border-card-border bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-500">
//                   {/* Gradient Background */}
//                   <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
//                   <CardContent className="relative p-10 text-center h-full flex flex-col">
//                     {/* Icon */}
//                     <div className="mb-8 flex justify-center">
//                       <MagneticExplode triggerSelector={`[data-vision-card="${index}"]`}>
//                         <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 relative overflow-hidden">
//                           <IconComponent className="h-10 w-10 text-primary relative z-10" data-testid={`icon-vision-${index}`} />
//                         </div>
//                       </MagneticExplode>
//                     </div>

//                     <h3 className="text-2xl font-bold text-card-foreground mb-6 group-hover:text-primary transition-colors duration-300" data-testid={`text-vision-title-${index}`}>
//                       {card.title}
//                     </h3>
                    
//                     <p className="text-muted-foreground leading-relaxed text-lg flex-grow" data-testid={`text-vision-description-${index}`}>
//                       {card.description}
//                     </p>

//                     {/* Bottom Border */}
//                     <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
//                   </CardContent>
//                 </Card>
//               </div>
//             </motion.div>
//           );
//         })}
//       </StaggerChildren>
//     </Section>
//   );
// }

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, AlertTriangle, Zap } from "lucide-react";
import { StaggerChildren, SlideIn, serviceCardHover } from "./motion/Motion";
import MagneticExplode from "./motion/MagneticExplode";
import { Section, SectionHeader } from "./motion/Section";
import { Card, CardContent } from "@/components/ui/card";

const visionCards = [
  {
    icon: Eye,
    title: "100% Transparency",
    description:
      "Build AI-native digital twins to unlock 100% transparency and intelligent, real-time decisions across industrial operations.",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: AlertTriangle,
    title: "Predictive Intelligence",
    description:
      "Predict failures before they happen and eliminate blind spots across machines and processes.",
    gradient: "from-blue-500/20 to-indigo-500/20",
  },
  {
    icon: Zap,
    title: "Optimized Operations",
    description:
      "Optimize quality, uptime, and sustainability - so every factory can think and act with the intelligence of the human mind.",
    gradient: "from-emerald-500/20 to-green-500/20",
  },
];

export default function VisionScene() {
  const total = visionCards.length;
  const middleIndex = Math.floor(total / 2);

  // Detect when the grid is in the viewport
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, {
    amount: 0.35,
    margin: "0px 0px -10% 0px",
  });

  return (
    <Section
      id="vision"
      background="gradient"
      padding="md"
      className="pt-4 sm:pt-5 mt-8 sm:mt-10"
    >
      <SlideIn>
        <SectionHeader
          eyebrow="Our Vision"
          title="The Future of Industrial Intelligence"
          subtitle="Transforming manufacturing through AI-powered insights and automation"
          className="mb-10"
        />
      </SlideIn>

      <div ref={gridRef}>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visionCards.map((card, index) => {
            const IconComponent = card.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={gridInView ? { opacity: 1 } : { opacity: 0 }}
                data-testid={`card-vision-${index}`}
                className="h-full"
                data-vision-card={index}
                style={{ perspective: 1000 }}
              >
                <motion.div
                  className="relative h-full min-h-[22rem] md:min-h-[24rem]"
                  whileHover={serviceCardHover}
                >
                  <Card className="group relative h-full overflow-hidden border-card-border bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-500">
                    {/* Animated Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    <CardContent className="relative p-10 text-center h-full flex flex-col">
                      {/* Icon */}
                      <div className="mb-8 flex justify-center">
                        <MagneticExplode
                          triggerSelector={`[data-vision-card="${index}"]`}
                        >
                          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 relative overflow-hidden">
                            <IconComponent
                              className="h-10 w-10 text-primary relative z-10"
                              data-testid={`icon-vision-${index}`}
                            />
                          </div>
                        </MagneticExplode>
                      </div>

                      {/* Title */}
                      <h3
                        className="text-2xl font-bold text-card-foreground mb-6 group-hover:text-primary transition-colors duration-300"
                        data-testid={`text-vision-title-${index}`}
                      >
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-muted-foreground leading-relaxed text-lg flex-grow"
                        data-testid={`text-vision-description-${index}`}
                      >
                        {card.description}
                      </p>

                      {/* Bottom Glow Line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
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
