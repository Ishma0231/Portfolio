import ParticleBackground from "@/components/ParticleBackground";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import Education from "@/components/Education";
import { profile } from "@/data/content";

export default function Home() {
  return (
    <>
      <ParticleBackground />

      <nav className="nav">
        <a href="#hero" className="logo">{profile.name}</a>
        <div>
          <a href="#projects">Projects</a>
          <a href="#gallery">Gallery</a>
          <a href="#education">Education</a>
        </div>
      </nav>

      <main>
        <Hero />
        <Projects />
        <Gallery />
        <Education />
      </main>
    </>
  );
}