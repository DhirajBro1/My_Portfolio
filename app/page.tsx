import Script from "next/script";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import CurrentlySection from "./components/CurrentlySection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Dhiraj Pandit",
      alternateName: ["Dhiraj", "Dhiraj Pandit Portfolio"],
      url: "https://dhirojpandit.com.np/",
    },
    {
      "@type": "Person",
      name: "Dhiraj Pandit",
      url: "https://dhirojpandit.com.np/",
      jobTitle: "Full-Stack Developer",
      email: "panditdhiraj296@gmail.com",
      sameAs: [
        "https://github.com/DhirajBro1",
        "https://www.linkedin.com/in/dhiroj-kr-pandit-2539b9347",
        "https://www.facebook.com/panditdhiraj296",
      ],
    },
  ],
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Script
        id="home-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <CurrentlySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
