"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const COUNT = 7000;
// Must match the section ids in the page, in order
const SECTION_IDS = ["hero", "projects", "gallery", "education"];
// 1 = shape on the right, -1 = shape on the left
const SIDES = [1, -1, 1, -1];

const smooth = (x) => x * x * (3 - 2 * x);
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));

/* ---------------- Palette (blue + gold, like your reference) ---------------- */
const C = {
  blue: new THREE.Color("#2f6bff"),
  sky: new THREE.Color("#4fc3ff"),
  gold: new THREE.Color("#ffb81c"),
  amber: new THREE.Color("#ff7a18"),
  white: new THREE.Color("#fff6dc"),
};

/* ---------------- Shapes ---------------- */

// 1) Hero: sphere
function sphere() {
  const p = new Float32Array(COUNT * 3);
  const golden = Math.PI * (1 + Math.sqrt(5));
  for (let i = 0; i < COUNT; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
    const theta = golden * (i + 0.5);
    const r = 2.1;
    p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    p[i * 3 + 2] = r * Math.cos(phi);
  }
  return p;
}

// 2) Projects: torus knot
function torusKnot() {
  const p = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const t = Math.random() * Math.PI * 2;
    const r = Math.cos(3 * t) + 2;
    const j = 0.18;
    p[i * 3] = r * Math.cos(2 * t) * 0.8 + (Math.random() - 0.5) * j;
    p[i * 3 + 1] = r * Math.sin(2 * t) * 0.8 + (Math.random() - 0.5) * j;
    p[i * 3 + 2] = -Math.sin(3 * t) * 0.8 * 1.4 + (Math.random() - 0.5) * j;
  }
  return p;
}

// 3) Gallery: ROCKET (body + nose, 3 fins, flame, window)
function rocket() {
  const p = new Float32Array(COUNT * 3);
  const tilt = -0.75; // tip points up-right
  const cs = Math.cos(tilt);
  const sn = Math.sin(tilt);
  const S = 0.95;
  const put = (i, x, y, z) => {
    p[i * 3] = (x * cs - y * sn) * S;
    p[i * 3 + 1] = (x * sn + y * cs) * S;
    p[i * 3 + 2] = z * S;
  };

  for (let i = 0; i < COUNT; i++) {
    const f = i / COUNT;
    let x, y, z;

    if (f < 0.5) {
      // body + rounded nose cone
      const t = Math.random();
      y = -1.8 + t * 4.4;
      const r = t < 0.62 ? 0.62 : 0.62 * Math.sqrt(Math.max(0, 1 - ((t - 0.62) / 0.38) ** 2));
      const a = Math.random() * Math.PI * 2;
      x = r * Math.cos(a);
      z = r * Math.sin(a);
    } else if (f < 0.7) {
      // three fins
      const th = Math.floor(Math.random() * 3) * ((Math.PI * 2) / 3);
      const u = Math.random();
      const v = Math.random();
      const d = 0.62 + u * 0.85;
      y = -1.8 - 0.45 * u + v * (1.4 - 1.1 * u);
      x = d * Math.cos(th);
      z = d * Math.sin(th);
    } else if (f < 0.9) {
      // flame trail
      const s = Math.pow(Math.random(), 1.4);
      y = -1.8 - s * 1.7;
      const rad = 0.5 * (1 - s) * Math.sqrt(Math.random());
      const a = Math.random() * Math.PI * 2;
      x = rad * Math.cos(a);
      z = rad * Math.sin(a);
    } else {
      // round window
      const a = Math.random() * Math.PI * 2;
      const rr = 0.3 * Math.sqrt(Math.random());
      x = rr * Math.cos(a);
      y = 0.9 + rr * Math.sin(a);
      z = 0.66;
    }
    put(i, x, y, z);
  }
  return p;
}

// 4) Education: organic BLOB (+ a small satellite blob)
function blob() {
  const p = new Float32Array(COUNT * 3);
  const golden = Math.PI * (1 + Math.sqrt(5));
  for (let i = 0; i < COUNT; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
    const theta = golden * (i + 0.5);
    const dx = Math.sin(phi) * Math.cos(theta);
    const dy = Math.sin(phi) * Math.sin(theta);
    const dz = Math.cos(phi);

    if (i % 6 === 0) {
      // small blob attached to the big one
      p[i * 3] = 1.9 + dx * 0.75;
      p[i * 3 + 1] = 1.3 + dy * 0.75;
      p[i * 3 + 2] = dz * 0.75;
    } else {
      const n = Math.sin(dx * 2.5 + 1.3) * Math.cos(dy * 2.1) + Math.sin(dz * 3.1 + 0.7) * 0.6;
      let r = 1.9 + 0.45 * n;
      if (Math.random() < 0.25) r *= 0.7 + Math.random() * 0.25; // inner depth
      p[i * 3] = dx * r;
      p[i * 3 + 1] = dy * r;
      p[i * 3 + 2] = dz * r;
    }
  }
  return p;
}

/* ---------------- Colors for each shape ---------------- */
function paint(kind, pos) {
  const col = new Float32Array(COUNT * 3);
  const c = new THREE.Color();
  for (let i = 0; i < COUNT; i++) {
    const f = i / COUNT;
    const x = pos[i * 3];
    const y = pos[i * 3 + 1];

    if (kind === "rocket") {
      if (f < 0.5) c.copy(C.gold).lerp(C.amber, Math.random() * 0.6); // body
      else if (f < 0.7) c.copy(C.blue).lerp(C.sky, Math.random()); // fins
      else if (f < 0.9) c.copy(C.amber).lerp(C.gold, Math.random()); // flame
      else c.copy(C.sky).lerp(C.white, Math.random()); // window
    } else {
      // speckled two-tone: blue side + golden side
      const m = clamp(0.5 + x * 0.22 + y * 0.12 + (Math.random() - 0.5) * 0.5, 0, 1);
      if (m > 0.5) c.copy(C.gold).lerp(C.amber, Math.random() * 0.7);
      else c.copy(C.blue).lerp(C.sky, Math.random() * 0.6);
    }
    if (Math.random() < 0.06) c.copy(C.white); // sparkles
    col.set([c.r, c.g, c.b], i * 3);
  }
  return col;
}

function makeDotTexture() {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 64;
  const g = cv.getContext("2d");
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, "rgba(255,255,255,1)");
  gr.addColorStop(0.4, "rgba(255,255,255,0.7)");
  gr.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = gr;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(cv);
}

export default function ParticleBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const shapes = [sphere(), torusKnot(), rocket(), blob()];
    const kinds = ["sphere", "knot", "rocket", "blob"];
    const colorSets = shapes.map((s, i) => paint(kinds[i], s));

    const delay = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) delay[i] = Math.random();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(shapes[0]), 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(colorSets[0]), 3));

    const dot = makeDotTexture();
    const material = new THREE.PointsMaterial({
      size: 0.06,
      map: dot,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    // Background stars
    const starGeo = new THREE.BufferGeometry();
    const stars = new Float32Array(700 * 3);
    for (let i = 0; i < stars.length; i++) stars[i] = (Math.random() - 0.5) * 40;
    starGeo.setAttribute("position", new THREE.BufferAttribute(stars, 3));
    const starMat = new THREE.PointsMaterial({ size: 0.07, map: dot, color: "#cfe3ff", transparent: true, opacity: 0.6, depthWrite: false });
    scene.add(new THREE.Points(starGeo, starMat));

    let target = 0;
    let current = 0;
    const mouse = { x: 0, y: 0 };
    let raf;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    const onScroll = () => {
      const mid = window.innerHeight * 0.5;
      let idx = 0;
      SECTION_IDS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) idx = i;
      });
      target = idx;
    };
    const onMouse = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse);
    onScroll();

    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      current += (target - current) * 0.035;
      const a = clamp(Math.floor(current), 0, shapes.length - 1);
      const b = clamp(a + 1, 0, shapes.length - 1);
      const f = current - a;

      const A = shapes[a];
      const B = shapes[b];
      const CA = colorSets[a];
      const CB = colorSets[b];
      const pos = geometry.attributes.position.array;
      const col = geometry.attributes.color.array;

      for (let i = 0; i < COUNT; i++) {
        const fi = smooth(clamp(f * 1.6 - delay[i] * 0.6, 0, 1));
        const i3 = i * 3;
        const wob = Math.sin(time * 1.2 + i) * 0.008;
        pos[i3] = A[i3] + (B[i3] - A[i3]) * fi + wob;
        pos[i3 + 1] = A[i3 + 1] + (B[i3 + 1] - A[i3 + 1]) * fi + wob;
        pos[i3 + 2] = A[i3 + 2] + (B[i3 + 2] - A[i3 + 2]) * fi + wob;
        col[i3] = CA[i3] + (CB[i3] - CA[i3]) * fi;
        col[i3 + 1] = CA[i3 + 1] + (CB[i3 + 1] - CA[i3 + 1]) * fi;
        col[i3 + 2] = CA[i3 + 2] + (CB[i3 + 2] - CA[i3 + 2]) * fi;
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;

      const desktop = window.innerWidth > 900;
      const offset = desktop ? 3.1 : 0;
      const side = SIDES[a] + (SIDES[b] - SIDES[a]) * smooth(clamp(f, 0, 1));
      group.position.x += (side * offset - group.position.x) * 0.08;
      group.position.y = desktop ? 0 : 1.6;

      material.opacity = desktop ? 0.95 : 0.5;

      group.rotation.y = time * 0.12 + mouse.x * 0.3;
      group.rotation.x = mouse.y * 0.2 + Math.sin(time * 0.3) * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      geometry.dispose();
      material.dispose();
      starGeo.dispose();
      starMat.dispose();
      dot.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="webgl" aria-hidden="true" />;
}