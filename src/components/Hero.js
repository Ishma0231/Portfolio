import { profile } from "@/data/content";

export default function Hero() {
  return (
    <section id="hero" className="section hero">
      <div className="hero-text">
        <p className="eyebrow">Portfolio</p>
        <h1>
          Hi, I'm <span className="grad">{profile.name}</span>
        </h1>
        <h2>{profile.role}</h2>
        <p className="lead">{profile.intro}</p>
        <div className="hero-actions">
          <a href="#projects" className="btn">View my work</a>
        <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn ghost"
            >
            Contact
            </a>
        </div>
      </div>
      <div className="scroll-hint">Scroll ↓</div>
    </section>
  );
}