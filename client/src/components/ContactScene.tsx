// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Mail, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { Section, SectionHeader } from "./motion/Section";
// import { SlideIn, StaggerChildren } from "./motion/Motion";
// import { MagneticButton } from "./motion/MagneticButton";
// import { motion } from "framer-motion";

// export default function ContactScene() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     company: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // TODO: remove mock functionality - Replace with actual API call
//     console.log("Form submitted:", formData);
    
//     // Simulate API call
//     setTimeout(() => {
//       toast({
//         title: "Message sent successfully!",
//         description: "We'll get back to you within 24 hours.",
//       });
//       setFormData({ name: "", email: "", company: "", message: "" });
//       setIsSubmitting(false);
//     }, 1000);
//   };

//   const contactInfo = [
//     {
//       icon: Mail,
//       title: "Email Us",
//       value: "hello@xyz.com",
//       action: "mailto:hello@xyz.com"
//     },
//     {
//       icon: Phone,
//       title: "Call Us",
//       value: "+1 (555) 123-4567",
//       action: "tel:+15551234567"
//     },
//     {
//       icon: MapPin,
//       title: "Visit Us",
//       value: "123 Innovation Drive\nTech Valley, CA 94000\nUnited States",
//       action: "#"
//     },
//   ];

//   return (
//     <Section id="contact" background="gradient" padding="xl">
//       <SlideIn>
//         <SectionHeader
//           eyebrow="Get in Touch"
//           title="Ready to Transform Your Operations?"
//           subtitle="Let's discuss how XYZ can revolutionize your industrial processes with AI-powered automation"
//         />
//       </SlideIn>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
//         {/* Contact Form */}
//         <SlideIn>
//           <Card interactive={false} className="relative overflow-hidden border-card-border bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-500">
//             {/* Animated Background Pattern */}
//             <motion.div 
//               className="absolute inset-0 opacity-5"
//               style={{
//                 backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
//               }}
//               animate={{ 
//                 backgroundPosition: ["0% 0%", "100% 100%"],
//               }}
//               transition={{ 
//                 duration: 20, 
//                 repeat: Infinity, 
//                 ease: "linear" 
//               }}
//             />
            
//             <CardHeader className="relative">
//               <CardTitle className="text-3xl text-card-foreground flex items-center" data-testid="text-form-title">
//                 Send us a message
//                 <motion.div
//                   className="ml-3"
//                   animate={{ rotate: [0, 15, 0] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 >
//                   <Send className="h-6 w-6 text-primary" />
//                 </motion.div>
//               </CardTitle>
//             </CardHeader>
            
//             <CardContent className="relative">
//               <form onSubmit={handleSubmit} className="space-y-8">
//                 <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <motion.div 
//                     className="space-y-3"
//                     variants={{
//                       hidden: { opacity: 0, x: -20 },
//                       visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
//                     }}
//                   >
//                     <Label htmlFor="name" className="text-base font-medium">Name *</Label>
//                     <Input
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       required
//                       className="h-12 bg-background/50 border-muted-foreground/20 focus:border-primary transition-colors"
//                       data-testid="input-name"
//                     />
//                   </motion.div>

//                   <motion.div 
//                     className="space-y-3"
//                     variants={{
//                       hidden: { opacity: 0, x: 20 },
//                       visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
//                     }}
//                   >
//                     <Label htmlFor="email" className="text-base font-medium">Email *</Label>
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       required
//                       className="h-12 bg-background/50 border-muted-foreground/20 focus:border-primary transition-colors"
//                       data-testid="input-email"
//                     />
//                   </motion.div>
//                 </StaggerChildren>

//                 <SlideIn>
//                   <div className="space-y-3">
//                     <Label htmlFor="company" className="text-base font-medium">Company</Label>
//                     <Input
//                       id="company"
//                       name="company"
//                       value={formData.company}
//                       onChange={handleInputChange}
//                       className="h-12 bg-background/50 border-muted-foreground/20 focus:border-primary transition-colors"
//                       data-testid="input-company"
//                     />
//                   </div>
//                 </SlideIn>

//                 <SlideIn>
//                   <div className="space-y-3">
//                     <Label htmlFor="message" className="text-base font-medium">Message *</Label>
//                     <Textarea
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleInputChange}
//                       rows={6}
//                       required
//                       className="bg-background/50 border-muted-foreground/20 focus:border-primary transition-colors resize-none"
//                       data-testid="input-message"
//                     />
//                   </div>
//                 </SlideIn>

//                 <SlideIn>
//                   <MagneticButton 
//                     type="submit" 
//                     className="w-full h-14 text-lg font-semibold" 
//                     disabled={isSubmitting}
//                     data-testid="button-submit"
//                     strength={0.3}
//                   >
//                     {isSubmitting ? (
//                       <motion.div
//                         animate={{ rotate: 360 }}
//                         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                       >
//                         <Send className="mr-2 h-5 w-5" />
//                       </motion.div>
//                     ) : (
//                       <Send className="mr-2 h-5 w-5" />
//                     )}
//                     {isSubmitting ? "Sending..." : "Send Message"}
//                   </MagneticButton>
//                 </SlideIn>
//               </form>
//             </CardContent>
//           </Card>
//         </SlideIn>

//         {/* Contact Information */}
//         <div className="space-y-8">
//           <StaggerChildren className="space-y-6">
//             {contactInfo.map((info, index) => {
//               const IconComponent = info.icon;
//               return (
//                 <motion.div
//                   key={index}
//                   variants={{
//                     hidden: { opacity: 0, x: 50 },
//                     visible: { 
//                       opacity: 1, 
//                       x: 0, 
//                       transition: { duration: 0.6, ease: "easeOut" } 
//                     }
//                   }}
//                   whileHover={{ x: 5 }}
//                 >
//                   <Card interactive={false} className="group border-card-border bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 cursor-pointer">
//                     <CardContent className="p-8">
//                       <div className="flex items-start space-x-6">
//                         <motion.div 
//                           className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300"
//                           whileHover={{ scale: 1.1, rotate: 5 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <IconComponent className="h-8 w-8 text-primary" />
//                         </motion.div>
                        
//                         <div className="flex-grow">
//                           <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-300" data-testid={`text-${info.title.toLowerCase().replace(' ', '-')}-title`}>
//                             {info.title}
//                           </h3>
//                           <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line" data-testid={`text-${info.title.toLowerCase().replace(' ', '-')}-value`}>
//                             {info.value}
//                           </p>
//                         </div>
                        
//                         <motion.div
//                           className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                           whileHover={{ x: 5, y: -5 }}
//                         >
//                           <ArrowUpRight className="h-6 w-6 text-muted-foreground" />
//                         </motion.div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               );
//             })}
//           </StaggerChildren>

//           {/* Removed CTA card as requested */}
//         </div>
//       </div>
//     </Section>
//   );
// }


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Section, SectionHeader } from "./motion/Section";
import { SlideIn, StaggerChildren } from "./motion/Motion";
import { MagneticButton } from "./motion/MagneticButton";
import { motion } from "framer-motion";
import { buildApiUrl } from "@/lib/apiConfig";

export default function ContactScene() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(buildApiUrl("/api/send-email"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "hello@xyz.com",
      action: "mailto:hello@xyz.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "123 Innovation Drive\nTech Valley, CA 94000\nUnited States",
      action: "#"
    },
  ];

  return (
    <Section id="contact" background="gradient" padding="xl">
      <SlideIn>
        <SectionHeader
          eyebrow="Get in Touch"
          title="Ready to Transform Your Operations?"
          subtitle="Let's discuss how XYZ can revolutionize your industrial processes with AI-powered automation"
        />
      </SlideIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <SlideIn>
          <Card interactive={false} className="relative overflow-hidden border-card-border bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-500">
            {/* Animated Background Pattern */}
            <motion.div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
              }}
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
            
            <CardHeader className="relative">
              <CardTitle className="text-3xl text-card-foreground flex items-center" data-testid="text-form-title">
                Send us a message
                <motion.div
                  className="ml-3"
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Send className="h-6 w-6 text-primary" />
                </motion.div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="relative">
              <form onSubmit={handleSubmit} className="space-y-8">
                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    className="space-y-3"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                    }}
                  >
                    <Label htmlFor="name" className="text-base font-medium">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="h-12 bg-background/50 border-muted-foreground/20 focus:border-primary transition-colors"
                      data-testid="input-name"
                    />
                  </motion.div>

                  <motion.div 
                    className="space-y-3"
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                    }}
                  >
                    <Label htmlFor="email" className="text-base font-medium">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-12 bg-background/50 border-muted-foreground/20 focus:border-primary transition-colors"
                      data-testid="input-email"
                    />
                  </motion.div>
                </StaggerChildren>

                <SlideIn>
                  <div className="space-y-3">
                    <Label htmlFor="company" className="text-base font-medium">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="h-12 bg-background/50 border-muted-foreground/20 focus:border-primary transition-colors"
                      data-testid="input-company"
                    />
                  </div>
                </SlideIn>

                <SlideIn>
                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-base font-medium">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      required
                      className="bg-background/50 border-muted-foreground/20 focus:border-primary transition-colors resize-none"
                      data-testid="input-message"
                    />
                  </div>
                </SlideIn>

                <SlideIn>
                  <MagneticButton 
                    type="submit" 
                    className="w-full h-14 text-lg font-semibold" 
                    disabled={isSubmitting}
                    data-testid="button-submit"
                    strength={0.3}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Send className="mr-2 h-5 w-5" />
                      </motion.div>
                    ) : (
                      <Send className="mr-2 h-5 w-5" />
                    )}
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </MagneticButton>
                </SlideIn>
              </form>
            </CardContent>
          </Card>
        </SlideIn>

        {/* Contact Information */}
        <div className="space-y-8">
          <StaggerChildren className="space-y-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: 50 },
                    visible: { 
                      opacity: 1, 
                      x: 0, 
                      transition: { duration: 0.6, ease: "easeOut" } 
                    }
                  }}
                  whileHover={{ x: 5 }}
                >
                  <Card interactive={false} className="group border-card-border bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 cursor-pointer">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-6">
                        <motion.div 
                          className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <IconComponent className="h-8 w-8 text-primary" />
                        </motion.div>
                        
                        <div className="flex-grow">
                          <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-300" data-testid={`text-${info.title.toLowerCase().replace(' ', '-')}-title`}>
                            {info.title}
                          </h3>
                          <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line" data-testid={`text-${info.title.toLowerCase().replace(' ', '-')}-value`}>
                            {info.value}
                          </p>
                        </div>
                        
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ x: 5, y: -5 }}
                        >
                          <ArrowUpRight className="h-6 w-6 text-muted-foreground" />
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </StaggerChildren>

          {/* Removed CTA card as requested */}
        </div>
      </div>
    </Section>
  );
}