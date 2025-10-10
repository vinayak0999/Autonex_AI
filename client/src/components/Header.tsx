import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

export default function Header() {
  const [, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMenuOpen(false);
    if (window.location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    navigate(`/#${sectionId}`);
  };

  const goToTopAndClose = (path: string) => {
    setMenuOpen(false);
    if (window.location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate(path);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${scrolled ? "bg-black" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Left: empty spacer */}
          <div />

          {/* Center: Logo */}
          <div className="flex items-center justify-center">
            <img
              src="/path25.png"
              alt="Logo"
              className="h-10 w-auto object-contain cursor-pointer"
              onClick={() => handleNavClick("home")}
            />
          </div>

          {/* Right: Menu */}
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className="hover:scale-105 transition-transform duration-150"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quarter-circle Menu (top-right) */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60]">
          {/* scrim */}
          <button aria-label="Close menu overlay" onClick={() => setMenuOpen(false)} className="absolute inset-0 bg-black/30 backdrop-blur-md" />

          {/* panel */}
          <div className="pointer-events-none absolute top-0 right-0 w-[85vw] max-w-[520px] aspect-square overflow-hidden rounded-bl-[100%]">
            <div className="pointer-events-auto absolute inset-0 bg-transparent backdrop-blur-lg text-white shadow-2xl translate-x-full animate-[menuSlideIn_.35s_ease-out_forwards] flex flex-col" style={{ border: '1px solid hsl(220, 73%, 33%, 0.3)' }}>
              <div className="p-3 self-end">
                <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex-1 overflow-y-auto p-8 pt-10 pr-12 pl-32 md:pl-40 lg:pl-44">
                <ul className="space-y-3">
                  <li className="ml-0 md:ml-2">
                    <Button variant="ghost" className="justify-start w-full text-lg orange-hover" onClick={() => handleNavClick("home")}>
                      Home
                    </Button>
                  </li>
                  <li className="ml-6 md:ml-8">
                    <Button variant="ghost" className="justify-start w-full text-lg orange-hover" onClick={() => goToTopAndClose("/products")}>
                      Products
                    </Button>
                  </li>
                  <li className="ml-10 md:ml-14">
                    <Button variant="ghost" className="justify-start w-full text-lg orange-hover" onClick={() => goToTopAndClose("/data-services")}>
                      Data Services
                    </Button>
                  </li>
                  <li className="ml-14 md:ml-20">
                    <Button variant="ghost" className="justify-start w-full text-lg orange-hover" onClick={() => goToTopAndClose("/about")}>
                      About
                    </Button>
                  </li>
                  
                </ul>
              </nav>
            </div>
          </div>

          {/* keyframes for slide in and orange hover styles */}
          <style>{`
            @keyframes menuSlideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
            .orange-hover:hover {
              background-color: rgba(255,255,255,0.08) !important; /* greyish/whitish hover */
              color: #ffffff !important; /* whitish text */
            }
          `}</style>
        </div>
      )}
    </header>
  );
}
