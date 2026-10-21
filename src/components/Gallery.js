"use client";

import { useEffect, useRef, useState } from "react";
import { gallery } from "@/data/content";

export default function Gallery() {
  const [active, setActive] = useState(null); // index of opened project
  const [hovering, setHovering] = useState(false); // cursor inside a thumbnail?
  const sliderRef = useRef(null);
  const cursorRef = useRef(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  /* ---------- Floating cursor button (smooth follow) ---------- */
  useEffect(() => {
    let raf;
    const loop = () => {
      const p = pos.current;
      p.x += (p.tx - p.x) * 0.18;
      p.y += (p.ty - p.y) * 0.18;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  const moveCursor = (e) => {
    pos.current.tx = e.clientX;
    pos.current.ty = e.clientY;
  };

  const enterThumb = (e) => {
    // jump to the entry point so the button doesn't fly in from the corner
    pos.current.x = pos.current.tx = e.clientX;
    pos.current.y = pos.current.ty = e.clientY;
    setHovering(true);
  };

  const openProject = (i) => {
    setHovering(false);
    setActive(i);
  };

  /* ---------- Modal: Esc closes, arrows scroll, lock page scroll ---------- */
  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") scrollSlider(1);
      if (e.key === "ArrowLeft") scrollSlider(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const scrollSlider = (dir) => {
    const el = sliderRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const current = active !== null ? gallery[active] : null;
  const shots = current ? (current.screenshots.length ? current.screenshots : [null, null, null]) : [];

  return (
    <section id="gallery" className="section">
      <p className="eyebrow">02 — Interfaces</p>
      <h2 className="section-title">Project gallery</h2>

      <div className="thumb-grid">
        {gallery.map((g, i) => (
          <button
            className="thumb"
            key={g.title}
            onClick={() => openProject(i)}
            onMouseEnter={enterThumb}
            onMouseMove={moveCursor}
            onMouseLeave={() => setHovering(false)}
          >
            {g.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={g.thumbnail} alt={g.title} />
            ) : (
              <div className="placeholder">Thumbnail</div>
            )}
            <span className="thumb-title">{g.title}</span>
          </button>
        ))}
      </div>

      {/* Button that replaces the mouse cursor */}
      <div ref={cursorRef} className={`cursor-btn ${hovering ? "show" : ""}`} aria-hidden="true">
        <span className="cursor-inner">See the UI↗</span>
      </div>

      {current && (
        <div className="modal" onClick={() => setActive(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>{current.title}</h3>
              <button className="close" onClick={() => setActive(null)} aria-label="Close">✕</button>
            </div>

            <div className="slider-wrap">
              <button className="arrow left" onClick={() => scrollSlider(-1)} aria-label="Previous">‹</button>
              <div className="slider" ref={sliderRef}>
                {shots.map((src, i) => (
                  <div className="slide" key={i}>
                    {src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt={`${current.title} screenshot ${i + 1}`} />
                    ) : (
                      <div className="placeholder big">Screenshot {i + 1}</div>
                    )}
                  </div>
                ))}
              </div>
              <button className="arrow right" onClick={() => scrollSlider(1)} aria-label="Next">›</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

