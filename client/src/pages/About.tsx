import Header from "@/components/Header";
import AboutComponent from "@/components/aboutComponent.tsx";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div>
      <Header />
      <main>
        <div>
          <AboutComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
}


