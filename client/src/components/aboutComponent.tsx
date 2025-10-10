import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Activity, Package, ArrowUpRight, MessageSquare, Brain, Users, Wrench, Shield, Clock, DollarSign, Image, Layers, Eye, Settings, Linkedin, Award } from "lucide-react";
import { Section, SectionHeader } from "./motion/Section";
import { StaggerChildren, SlideIn, serviceCardHover, splitEntry } from "./motion/Motion";
import MagneticExplode from "./motion/MagneticExplode";
import { motion } from "framer-motion";
import academicAdvisorsImg from "@assets/generated_images/caplogo.png";

const keyframesCSS = `
  @keyframes rotateAurora { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
  @keyframes spin-horizontal { from { transform: rotateX(75deg) rotateZ(0deg); } to { transform: rotateX(75deg) rotateZ(360deg); } }
  @keyframes spin-vertical { from { transform: rotateY(75deg) rotateZ(0deg); } to { transform: rotateY(75deg) rotateZ(-360deg); } }
  @keyframes pulse-out { 0% { transform: scale(0.3); opacity: 0.8; } 100% { transform: scale(1.2); opacity: 0; } }
`;

const services = [
  {
    name: "Nikhil Gawade",
    role: "Co-founder & CEO",
    imageSrc: "/nikhil.jpg",
    description:"Worked as a strategy & AI consultant, delivering operational efficiencies and designing AI investments for several marquee companies in the UK and Middle East.",
    educationLines: [
      "Mechanical BTech, IIT Bombay",
      "MIM, London Business School",
    ],
    linkedin: "https://www.linkedin.com/in/nikhil-gawade-7b20a2102/",
  },
  {
    name: "Jaideep Singh",
    role: "Co-founder & CTO",
    imageSrc: "/jaideep.jpg",
    description:
      "Built scalable AI platforms and deployed edge intelligence across manufacturing sites with strong focus on reliability and safety.",
    educationLines: [
      "PhD, IIT Bombay",
      "MTech, IIT Indore",
    ],
    linkedin: "https://www.linkedin.com/404/",
  },
];

const additionalServices = [
  {
    icon: Eye,
    title: "100% Transparency",
    description:
      "Build AI-native digital twins to unlock 100% transparency and intelligent, real-time decisions across industrial operations.",
  },
  {
    icon: Shield,
    title: "Predictive Intelligence",
    description:
      "Predict failures before they happen and eliminate blind spots across machines and processes.",
  },
  {
    icon: Settings,
    title: "Optimized Operations",
    description:
      "Optimize quality, uptime, and sustainability - so every factory can think and act with the intelligence of the human mind.",
  },
];

// Duplicate of additional services for Advisors section
const anotherServices = [
    {
      icon: Award,
      title: "Academic Excellence",
      description:"Our advisory board comprises distinguished professors from IIT Bombay, bringing decades of research experience in industrial automation, artificial intelligence, and advanced manufacturing systems to guide our innovation.",
      imageSrc: academicAdvisorsImg,
    },
];

export default function AboutComponent() {
  return (
    <Section id="about" padding="xl">
      <style>{keyframesCSS}</style>
      <div className="mb-12 md:mb-16">
        <SlideIn>
          <SectionHeader
            eyebrow="About Us"
            title="Meet Autonex"
            subtitle="We are a team of engineers, AI researchers, and industrial experts from IIT Bombay, LBS, and leading OEMs."
            centered
          />
        </SlideIn>
        {/* AI Animation directly under the subtitle */}
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

      <div className="mb-24 md:mb-32">
        <SlideIn>
          <SectionHeader
            title="Our Team"
            subtitle="Passionate innovators driving the future of industrial intelligence"
            titleClassName="text-3xl md:text-4xl"
            subtitleClassName="text-base md:text-lg"
          />
        </SlideIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          {services.map((member, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
              <motion.div
                  className="group"
                >
                  <Card className="group relative h-full overflow-hidden border-card-border bg-card/50 backdrop-blur-0 hover:bg-card/60 transition-all duration-500 max-w-xl w-full">
                    <CardContent className="p-0">
                      <div className="p-8 text-center">
                          <div className="flex justify-center mb-6">
                            <img 
                              src={member.imageSrc} 
                              alt={member.name} 
                              className={`${(member.name === "Jaideep Singh" || member.name === "Nikhil Gawade") ? "w-56 h-56 rounded-xl" : "w-40 h-40 rounded-full"} object-cover shadow-md grayscale hover:grayscale-0 group-hover:grayscale-0 transition-[filter,transform] duration-500 ease-out will-change-transform group-hover:scale-105`}
                            />
                          </div>
                          <h3 className="text-3xl font-bold text-foreground mb-2">{member.name}</h3>
                          <div className="text-primary font-semibold mb-6">{member.role}</div>
                          <p className="text-muted-foreground text-lg leading-relaxed mb-6">{member.description}</p>
                          {member.educationLines && (
                            <div className="italic text-muted-foreground mb-8">
                              {member.educationLines.map((line, i) => (
                                <div key={i}>{line}</div>
                              ))}
                            </div>
                          )}
                          <Button asChild className="px-6">
                            <a href={member.linkedin} target="_blank" rel="noreferrer">
                              <div className="inline-flex items-center gap-2">
                                <Linkedin className="h-5 w-5" />
                                LinkedIn Profile
                              </div>
                            </a>
                          </Button>
                        </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
              </motion.div>
            );
          })}
        </StaggerChildren>
      </div>

      <div className="mt-16 md:mt-20 mb-24 md:mb-32" id="about-vision">
        <SlideIn>
          <SectionHeader
            title="Our Vision"
            //subtitle="Battle-tested workflows, experienced engineers, and rigorous QA."
            titleClassName="text-3xl md:text-4xl"
            subtitleClassName="text-base md:text-lg"
          />
        </SlideIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {additionalServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ willChange: 'transform' }}
                >
                  <Card className="group relative h-full overflow-hidden border-card-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-500">
                    <CardHeader className="pb-6 relative">
                      <div className="flex items-center justify-between mb-4">
                        <motion.div
                          className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300"
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <MagneticExplode>
                            <Icon className="h-8 w-8 text-primary" />
                          </MagneticExplode>
                        </motion.div>
                        <motion.div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" whileHover={{ x: 5, y: -5 }}>
                          <ArrowUpRight className="h-6 w-6 text-muted-foreground" />
                        </motion.div>
                      </div>
                      <CardTitle className="text-xl text-card-foreground group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-6">
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </StaggerChildren>
      </div>

      {/* Advisors Section */}
      <div className="mt-24 md:mt-32">
        <SlideIn>
          <SectionHeader
            title="Our Advisors"
            subtitle="Guided by distinguished professors of IIT Bombay"
            titleClassName="text-3xl md:text-4xl"
            subtitleClassName="text-base md:text-lg"
          />
        </SlideIn>

        <StaggerChildren className="grid grid-cols-1 place-items-center">
          {anotherServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div whileHover={serviceCardHover}>
                  <Card className="group relative h-full overflow-hidden border-card-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-500 max-w-xl w-full">
                    <CardHeader className="pb-6 relative">
                      <div className="flex items-center justify-center mb-4">
                        <motion.div
                          className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden"
                          whileHover={{ rotate: 5, scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          {service.imageSrc ? (
                            <img
                              src={service.imageSrc}
                              alt={service.title}
                              className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-[filter] duration-500 ease-out"
                              draggable={false}
                              loading="lazy"
                              decoding="async"
                              onError={(e) => {
                                if (e.currentTarget.src.indexOf("/attached_assets/generated_images/caplogo.png") === -1) {
                                  e.currentTarget.src = "/attached_assets/generated_images/caplogo.png";
                                }
                              }}
                            />
                          ) : (
                            <MagneticExplode>
                              <Icon className="h-8 w-8 text-primary" />
                            </MagneticExplode>
                          )}
                        </motion.div>
                      </div>
                      <CardTitle className="text-xl text-card-foreground group-hover:text-primary transition-colors duration-300 text-center">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-6">
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
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


