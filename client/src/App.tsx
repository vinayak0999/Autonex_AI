// Your imports remain the same
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import DataServices from "@/pages/DataServices";
import About from "@/pages/About";
import NewContact from"@/pages/NewContact";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";
import { initLenis } from "./lib/lenis";
import { validateApiConfig } from "./lib/apiConfig";
// import Preloader from "@/components/Preloader";
import { ParticleBackground } from "@/components/ParticleBackground";
import { createRoot } from "react-dom/client";
import "./index.css";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/data-services" component={DataServices} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={NewContact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    initLenis();
    validateApiConfig();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ParticleBackground />
      {/* 👇 Wrap all content in a main tag for proper layering */}
      <main className="relative z-0 overflow-x-hidden w-full">
        <ThemeProvider defaultTheme="light" storageKey="xyz-ui-theme">
          <TooltipProvider>
            <Toaster />
            {/* <Preloader /> */}
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </main>
    </QueryClientProvider>
  );
}

export default App;

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}