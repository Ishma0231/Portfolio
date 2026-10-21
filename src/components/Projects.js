import { projects } from "@/data/content";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <p className="eyebrow">01 — Projects</p>
      <h2 className="section-title">Selected work</h2>

      <div className="project-list">
        {projects.map((p, i) => (
          <article className="project-card" key={p.title}>
            <div className="pc-num">{String(i + 1).padStart(2, "0")}</div>

            <div className="pc-main">
              <h3>{p.title}</h3>
              <p className="pc-tagline">{p.tagline}</p>
              <p className="pc-desc">{p.description}</p>
              <div className="chips">
                {p.tech.map((t) => (
                  <span className="chip" key={t}>{t}</span>
                ))}
              </div>
            </div>

            <div className="pc-side">
              <div>
                <span className="label">Role</span>
                <p>{p.role}</p>
              </div>
              <div>
                <span className="label">Year</span>
                <p>{p.year}</p>
              </div>
              <a className="btn" href={p.link} target="_blank" rel="noreferrer">
                View project ↗
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}