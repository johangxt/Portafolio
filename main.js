/* =========================================================
   ✏️ AQUÍ EDITAS TU CONTENIDO
   - type: "image" o "video"   - thumb: miniatura / poster   - src: archivo al hacer clic
   - shape: forma de la pieza → "torn" (papel rasgado), "burst" (sticker), "blob", "arch", "pill"
   - sticker: garabato que se pega en la esquina → flower, star, sparkle, asterisk, daisy, spiral
   ========================================================= */
const WORKS = [
  { type: "image", title: "City Limpiadas", desc: "Afiche para el evento.", thumb: "media/imagen-1-thumb.jpg", src: "media/imagen-1.jpg", accent: "#ffe433", tilt: -3, shape: "torn", sticker: "flower" },
  { type: "image", title: "Terrarium", desc: "Afiche del taller de terrarios.", thumb: "media/imagen-2-thumb.jpg", src: "media/imagen-2.jpg", accent: "#35c24a", tilt: 2, shape: "blob", sticker: "star" },
  { type: "image", title: "Foto", desc: "", thumb: "media/imagen-3-thumb.jpg", src: "media/imagen-3.jpg", accent: "#ff1f8f", tilt: -1.5, shape: "arch", sticker: "sparkle" },
  { type: "video", title: "Video 1", desc: "", thumb: "media/video-1-thumb.jpg", src: "media/video-1.mp4", accent: "#1fb6ff", tilt: 2, shape: "pill", sticker: "asterisk" },
  { type: "video", title: "Video 2", desc: "", thumb: "media/video-2-thumb.jpg", src: "media/video-2.mp4", accent: "#a24bd8", tilt: -2.5, shape: "torn", sticker: "daisy" },
  { type: "video", title: "Video 3", desc: "", thumb: "media/video-3-thumb.jpg", src: "media/video-3.mp4", accent: "#ff8a1f", tilt: 1.5, shape: "blob", sticker: "star" },
];

/* ---------- Garabatos grandes por sección (s = velocidad de parallax) ---------- */
const DOODLES = {
  hero: [
    { id: "sun", c: "#1fb6ff", w: "clamp(150px,26vw,380px)", top: "6%", left: "-3%", r: -8, s: .12 },
    { id: "flower", c: "#ffffff", w: "clamp(130px,22vw,320px)", top: "8%", right: "-3%", r: 12, s: .2 },
    { id: "asterisk", c: "#ff1f8f", w: "clamp(70px,11vw,160px)", bottom: "10%", right: "12%", r: 0, s: .08 },
    { id: "star", c: "#ffe433", w: "clamp(90px,14vw,210px)", top: "26%", left: "20%", r: 14, s: .15 },
    { id: "spiral", c: "#a24bd8", w: "clamp(80px,12vw,180px)", bottom: "6%", left: "6%", r: 0, s: .1, spin: 1 },
    { id: "squiggle", c: "#35c24a", w: "clamp(160px,26vw,380px)", ar: 5, bottom: "22%", right: "24%", r: -6, s: .06 },
  ],
  lib: [
    { id: "flower", c: "#ff1f8f", w: "clamp(110px,18vw,260px)", top: "1%", left: "-5%", r: -10, s: .15 },
    { id: "star", c: "#ffe433", w: "clamp(90px,13vw,190px)", top: "6%", right: "-3%", r: 12, s: .1 },
    { id: "sun", c: "#ff8a1f", w: "clamp(130px,20vw,300px)", top: "48%", right: "-7%", r: 6, s: .18 },
    { id: "daisy", c: "#ffffff", w: "clamp(90px,13vw,200px)", top: "42%", left: "-4%", r: 0, s: .12 },
    { id: "sparkle", c: "#1fb6ff", w: "clamp(60px,8vw,120px)", bottom: "6%", left: "4%", r: 0, s: .08 },
  ],
  about: [
    { id: "spiral", c: "#1fb6ff", w: "clamp(120px,18vw,260px)", top: "-2%", right: "-3%", r: 0, s: .1, spin: 1 },
    { id: "asterisk", c: "#ff1f8f", w: "clamp(70px,9vw,130px)", bottom: "4%", right: "6%", r: 0, s: .12 },
    { id: "squiggle", c: "#ffe433", w: "clamp(150px,22vw,320px)", ar: 5, bottom: "-1%", left: "2%", r: -5, s: .07 },
  ],
  contact: [
    { id: "flower", c: "#ffffff", w: "clamp(140px,22vw,320px)", bottom: "2%", left: "-4%", r: -8, s: .16 },
    { id: "sun", c: "#35c24a", w: "clamp(130px,20vw,300px)", top: "4%", right: "-5%", r: 8, s: .12 },
    { id: "star", c: "#ff1f8f", w: "clamp(80px,12vw,170px)", bottom: "8%", right: "10%", r: 14, s: .1 },
  ],
};

function doodle(d) {
  const el = document.createElement("div");
  el.className = "dz" + (d.spin ? " spin" : "");
  el.dataset.s = d.s || .1;
  el.style.cssText = `--w:${d.w};--ar:${d.ar || 1};--r:${d.r || 0}deg;color:${d.c};` +
    ["top", "left", "right", "bottom"].filter(k => d[k]).map(k => `${k}:${d[k]}`).join(";");
  el.innerHTML = `<svg style="animation-delay:${(-Math.random() * 8).toFixed(1)}s"><use href="#${d.id}"/></svg>`;
  return el;
}
document.querySelectorAll("[data-doodles]").forEach(host => {
  (DOODLES[host.dataset.doodles] || []).forEach(d => host.appendChild(doodle(d)));
});


/* Garabatos que cruzan la foto: el sol sale por detrás, la flor y la estrella montan sobre las esquinas */
const photo = document.getElementById("photo");
const sunBack = doodle({ id: "sun", c: "#ff8a1f", w: "62%", top: "-16%", right: "-26%", r: 8, s: .1 });
sunBack.style.zIndex = 0;
photo.prepend(sunBack);
[
  { id: "flower", c: "#ffffff", w: "48%", bottom: "-9%", right: "-17%", r: 12, s: .06 },
  { id: "star", c: "#ffe433", w: "26%", top: "-4%", left: "-10%", r: -14, s: .05 },
  { id: "sparkle", c: "#ff1f8f", w: "15%", bottom: "20%", left: "-9%", r: 0, s: .04 },
].forEach(d => photo.appendChild(doodle(d)));

/* ---------- Letras con texturas distintas ---------- */
const FONTS = ["Rubik Mono One", "Permanent Marker", "Bungee", "Shrikhand", "Rubik Wet Paint", "Caveat Brush"];
const COLORS = ["#ffffff", "#ffe433", "#ff1f8f", "#1fb6ff", "#35c24a", "#ff3b30", "#a24bd8", "#ff8a1f"];
document.querySelectorAll("[data-crayon]").forEach((el, idx) => {
  const text = el.dataset.crayon;
  el.textContent = "";
  el.setAttribute("aria-label", text);
  [...text].forEach((ch, i) => {
    if (ch === " ") { el.appendChild(document.createTextNode("\u00A0")); return; }
    const s = document.createElement("span");
    s.textContent = ch;
    s.setAttribute("aria-hidden", "true");
    const k = i + idx * 2;
    s.className = "t" + ((i * 5 + idx * 3) % 7);
    s.style.fontFamily = `"${FONTS[k % FONTS.length]}", sans-serif`;
    s.style.setProperty("--c", COLORS[(i * 3 + idx) % COLORS.length]);
    s.style.setProperty("--c2", COLORS[(i * 3 + idx + 3) % COLORS.length]);
    s.style.transform = `rotate(${((i * 7 + idx * 3) % 11) - 5}deg) translateY(${((i * 5) % 9) - 4}px)`;
    el.appendChild(s);
  });
});

/* ---------- Formas irregulares (papel rasgado, sticker) ---------- */
function rng(seed) { let a = seed * 9301 + 49297; return () => ((a = (a * 1664525 + 1013904223) % 4294967296) / 4294967296); }
function tornPath(seed, amp = 2.6, per = 16) {
  const r = rng(seed), p = [], j = () => (r() * amp).toFixed(1);
  for (let i = 0; i < per; i++) p.push(`${(i / per * 100).toFixed(1)}% ${j()}%`);
  for (let i = 0; i < per; i++) p.push(`${(100 - j()).toFixed(1)}% ${(i / per * 100).toFixed(1)}%`);
  for (let i = 0; i < per; i++) p.push(`${(100 - i / per * 100).toFixed(1)}% ${(100 - j()).toFixed(1)}%`);
  for (let i = 0; i < per; i++) p.push(`${j()}% ${(100 - i / per * 100).toFixed(1)}%`);
  return `polygon(${p.join(",")})`;
}
function burstPath(seed, n = 18) {
  const r = rng(seed), p = [];
  for (let i = 0; i < n * 2; i++) {
    const a = i / (n * 2) * Math.PI * 2, d = i % 2 ? 41 + r() * 3 : 49;
    p.push(`${(50 + Math.cos(a) * d).toFixed(1)}% ${(50 + Math.sin(a) * d).toFixed(1)}%`);
  }
  return `polygon(${p.join(",")})`;
}
document.querySelectorAll("[data-shape]").forEach(el => {
  const [kind, seed] = el.dataset.shape.split(":");
  el.style.clipPath = kind === "burst" ? burstPath(+seed) : tornPath(+seed);
});

/* ---------- Cinta de texto ---------- */
const bandText = "DISEÑO ✿ VIDEO ✿ CÓDIGO ✿ UI/UX ✿ COMUNIDAD ✿ ";
document.getElementById("band").textContent = bandText.repeat(8);

/* ---------- Biblioteca ---------- */
const shelfImages = document.getElementById("shelf-images");
const shelfVideos = document.getElementById("shelf-videos");
const videoEls = [];

WORKS.forEach((w, i) => {
  const btn = document.createElement("button");
  btn.className = `item ${w.type}`;
  btn.style.setProperty("--tilt", `${w.tilt || 0}deg`);
  btn.style.setProperty("--accent", w.accent || "#ff1f8f");
  btn.setAttribute("aria-label", `Abrir ${w.type === "video" ? "video" : "imagen"}: ${w.title}`);
  const side = i % 2 ? "left:-22px;--sxr:auto" : "";
  btn.innerHTML = `
    <span class="frame s-${w.shape}">
      <span class="back"></span>
      <span class="cover">
        ${w.type === "video"
          ? `<video muted loop playsinline preload="none" poster="${w.thumb}" data-src="${w.src}"></video>`
          : `<img src="${w.thumb}" alt="${w.title}" loading="lazy" />`}
      </span>
    </span>
    <span class="sticker" style="${side};--sr:${i % 2 ? -14 : 14}deg"><svg style="color:${w.accent}"><use href="#${w.sticker || "flower"}"/></svg></span>
    ${w.type === "video" ? '<span class="badge">▶ VIDEO</span>' : ""}
    <span class="caption">${w.title}</span>`;
  if (w.shape === "torn" || w.shape === "burst") {
    btn.querySelectorAll(".back,.cover").forEach(el => (el.style.clipPath = w.shape === "burst" ? burstPath(i + 4) : tornPath(i + 4)));
  }
  btn.addEventListener("click", () => openLightbox(i));
  (w.type === "video" ? shelfVideos : shelfImages).appendChild(btn);
  if (w.type === "video") videoEls.push(btn.querySelector("video"));
});

/* Previsualización: el video se reproduce mudo mientras está a la vista */
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    const v = e.target;
    if (e.isIntersecting) {
      if (!v.src) v.src = v.dataset.src;
      v.play().catch(() => {});
    } else v.pause();
  }), { threshold: .5 });
  videoEls.forEach(v => io.observe(v));
}

/* ---------- Parallax de garabatos ---------- */
const dz = [...document.querySelectorAll(".dz")];
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
let tick = false;
function parallax() {
  tick = false;
  const vh = innerHeight;
  dz.forEach(d => {
    const r = d.parentElement.getBoundingClientRect();
    if (r.bottom < -200 || r.top > vh + 200) return;
    d.style.setProperty("--py", `${-(r.top + r.height / 2 - vh / 2) * d.dataset.s}px`);
  });
}
if (!calm) {
  addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(parallax); } }, { passive: true });
  parallax();
}

/* ---------- Lightbox ---------- */
const lb = document.getElementById("lightbox");
const stage = document.getElementById("stage");
let current = 0, lastFocus = null;

function render(i) {
  current = (i + WORKS.length) % WORKS.length;
  const w = WORKS[current];
  stage.innerHTML = "";
  stage.style.setProperty("--accent", w.accent || "#ff1f8f");
  const wrap = document.createElement("div");
  wrap.className = "media";
  let media;
  if (w.type === "video") {
    media = document.createElement("video");
    media.src = w.src; media.poster = w.thumb; media.controls = true; media.autoplay = true; media.playsInline = true;
  } else {
    media = document.createElement("img");
    media.src = w.src; media.alt = w.title;
  }
  wrap.appendChild(media);
  const st = document.createElement("span");
  st.className = "sticker";
  st.innerHTML = `<svg style="color:${w.accent}"><use href="#${w.sticker || "flower"}"/></svg>`;
  wrap.appendChild(st);
  stage.appendChild(wrap);
  const t = document.createElement("div");
  t.className = "lb-title"; t.textContent = w.title;
  stage.appendChild(t);
  if (w.desc) {
    const d = document.createElement("div");
    d.className = "lb-desc"; d.textContent = w.desc;
    stage.appendChild(d);
  }
}
function openLightbox(i) {
  lastFocus = document.activeElement;
  render(i);
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
  document.getElementById("lb-close").focus();
}
function closeLightbox() {
  const v = stage.querySelector("video");
  if (v) v.pause();
  stage.innerHTML = "";
  lb.classList.remove("open");
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}
document.getElementById("lb-close").addEventListener("click", closeLightbox);
document.getElementById("lb-prev").addEventListener("click", () => render(current - 1));
document.getElementById("lb-next").addEventListener("click", () => render(current + 1));
lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
document.addEventListener("keydown", e => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") render(current - 1);
  if (e.key === "ArrowRight") render(current + 1);
});
