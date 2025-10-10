import Header from "@/components/Header";
import HeroScene from "@/components/HeroScene";
import VisionScene from "@/components/VisionScene";
import ServicesScene from "@/components/ServicesScene";
import IndustriesScene from "@/components/IndustriesScene";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        // delay to allow layout to render header height
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
      }
    }
  }, []);
  return (
    <div >
      <Header />
      <main>
        <HeroScene />
        <div>
          <VisionScene />
          <ServicesScene />
          <IndustriesScene />
        </div>
      </main>
      <Footer />
    </div>
  );
}