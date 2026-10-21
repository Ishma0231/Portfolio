import { education, profile } from "@/data/content";

export default function Education() {
  return (
    <section id="education" className="section education">
      <p className="eyebrow">03 — Education</p>
      <h2 className="section-title">Qualifications</h2>

      <div className="timeline">
        {education.map((e) => (
          <div className="tl-item" key={e.degree}>
            <span className="tl-period">{e.period}</span>
            <h3>{e.degree}</h3>
            <p className="tl-inst">{e.institution}</p>
            <p className="tl-details">{e.details}</p>
          </div>
        ))}
      </div>

      <footer className="footer">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <div>
          {profile.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
          ))}
        </div>
      </footer>
    </section>
  );
}