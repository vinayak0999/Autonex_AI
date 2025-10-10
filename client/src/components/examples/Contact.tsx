import Contact from '../Contact';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

export default function ContactExample() {
  return (
    <TooltipProvider>
      <Contact />
      <Toaster />
    </TooltipProvider>
  );
}