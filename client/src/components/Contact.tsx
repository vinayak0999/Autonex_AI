// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Mail, Phone, MapPin, Send } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// export default function Contact() {
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

//   return (
//     <section id="contact" className="py-24">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-contact-title">
//             Get in Touch
//           </h2>
//           <p className="text-xl text-muted-foreground" data-testid="text-contact-subtitle">
//             Ready to transform your industrial operations?
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Contact Form */}
//           <Card className="border-card-border bg-card/50 backdrop-blur-sm">
//             <CardHeader>
//               <CardTitle className="text-2xl text-card-foreground" data-testid="text-form-title">
//                 Send us a message
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Name *</Label>
//                   <Input
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                     data-testid="input-name"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email *</Label>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     required
//                     data-testid="input-email"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="company">Company</Label>
//                   <Input
//                     id="company"
//                     name="company"
//                     value={formData.company}
//                     onChange={handleInputChange}
//                     data-testid="input-company"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="message">Message *</Label>
//                   <Textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     rows={4}
//                     required
//                     data-testid="input-message"
//                   />
//                 </div>

//                 <Button 
//                   type="submit" 
//                   className="w-full" 
//                   disabled={isSubmitting}
//                   data-testid="button-submit"
//                 >
//                   {isSubmitting ? "Sending..." : "Send Message"}
//                   <Send className="ml-2 h-4 w-4" />
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>

//           {/* Contact Information */}
//           <div className="space-y-8">
//             <Card className="border-card-border bg-card/50 backdrop-blur-sm">
//               <CardContent className="p-8">
//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
//                     <Mail className="h-6 w-6 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-card-foreground mb-2" data-testid="text-email-title">
//                       Email Us
//                     </h3>
//                     <p className="text-muted-foreground" data-testid="text-email-address">
//                       hello@xyz.com
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="border-card-border bg-card/50 backdrop-blur-sm">
//               <CardContent className="p-8">
//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
//                     <Phone className="h-6 w-6 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-card-foreground mb-2" data-testid="text-phone-title">
//                       Call Us
//                     </h3>
//                     <p className="text-muted-foreground" data-testid="text-phone-number">
//                       +1 (555) 123-4567
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="border-card-border bg-card/50 backdrop-blur-sm">
//               <CardContent className="p-8">
//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
//                     <MapPin className="h-6 w-6 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-card-foreground mb-2" data-testid="text-address-title">
//                       Visit Us
//                     </h3>
//                     <p className="text-muted-foreground" data-testid="text-address">
//                       123 Innovation Drive<br />
//                       Tech Valley, CA 94000<br />
//                       United States
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
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
    
    // TODO: remove mock functionality - Replace with actual API call
    console.log("Form submitted:", formData);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", company: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-contact-title">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="text-contact-subtitle">
            Ready to transform your industrial operations?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-card-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground" data-testid="text-form-title">
                Send us a message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    data-testid="input-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    data-testid="input-email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    data-testid="input-company"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    data-testid="input-message"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                  data-testid="button-submit"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2" data-testid="text-email-title">
                      Email Us
                    </h3>
                    <p className="text-muted-foreground" data-testid="text-email-address">
                      hello@xyz.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2" data-testid="text-phone-title">
                      Call Us
                    </h3>
                    <p className="text-muted-foreground" data-testid="text-phone-number">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2" data-testid="text-address-title">
                      Visit Us
                    </h3>
                    <p className="text-muted-foreground" data-testid="text-address">
                      123 Innovation Drive<br />
                      Tech Valley, CA 94000<br />
                      United States
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}