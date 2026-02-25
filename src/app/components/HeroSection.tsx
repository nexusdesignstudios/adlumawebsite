import { useEffect, useRef, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import heroBg from "../../assets/8e2fbefb90f223baa265fe240c29d1a1121ce1fb.png";
import { useSiteData } from "../lib/siteDataStore";

export function HeroSection() {
  const { hero } = useSiteData();
  const gradientRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [serviceIdx, setServiceIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const slides: Array<{ type: "image" | "video"; src: string }> =
    hero.media && hero.media.length
      ? hero.media
      : [
          { type: "image", src: heroBg },
          { type: "image", src: "https://images.unsplash.com/photo-1701365516650-06e030f81613?q=80&w=1920&auto=format&fit=crop" },
          { type: "video", src: "https://cdn.coverr.co/videos/coverr-creative-studio-1624/1080p.mp4" },
        ];

  /* ── Mouse-tracking tint on the photo ── */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gradientRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      gradientRef.current.style.background = `radial-gradient(ellipse at ${x}% ${y}%, rgba(232,99,42,0.18) 0%, rgba(155,93,229,0.09) 38%, transparent 65%)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* ── Cycling service label ── */
  useEffect(() => {
    const services = hero.services.length ? hero.services : ["Digital Marketing"];
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setServiceIdx((i) => (i + 1) % services.length);
        setFading(false);
      }, 350);
    }, 2600);
    return () => clearInterval(id);
  }, [hero.services]);

  const services = hero.services.length ? hero.services : ["Digital Marketing"];

  const scrollDown = () =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIdx((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", minHeight: "680px" }}
    >
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: slideIdx === i ? 1 : 0 }}
          >
            {s.type === "video" ? (
              <video
                src={s.src}
                muted
                playsInline
                autoPlay
                loop
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <ImageWithFallback
                src={s.src}
                alt=""
                className="w-full h-full object-cover object-center"
              />
            )}
          </div>
        ))}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.20) 0%, rgba(8,8,8,0.15) 30%, rgba(8,8,8,0.70) 65%, rgba(8,8,8,0.98) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.55) 40%, rgba(8,8,8,0.15) 72%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.70) 0%, transparent 28%)" }} />
      </div>

      {/* ════════ Mouse-tracking brand tint ════════ */}
      <div ref={gradientRef} className="absolute inset-0 transition-all duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 38% 60%, rgba(232,99,42,0.14) 0%, rgba(155,93,229,0.07) 42%, transparent 68%)", mixBlendMode: "screen" }} />

      {/* ════════ Year badge — top-right ════════ */}
      <div className="absolute top-28 right-6 md:right-14 z-20">
        <span className="text-white/20 text-xs tracking-[0.22em] uppercase" style={{ fontFamily: "DM Sans, sans-serif" }}>
          {hero.yearBadge}
        </span>
      </div>

      {/* ════════ Main content — bottom-left ════════ */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 md:px-14 flex flex-col justify-end pb-16 md:pb-24">
        <div className="max-w-2xl">
          {/* Eyebrow with cycling service */}
          <div className="flex items-center gap-3 mb-7">
            <div className="h-px w-10 flex-shrink-0" style={{ background: "linear-gradient(90deg, #E8632A, #F5C842)" }} />
            <span className="text-xs tracking-[0.24em] uppercase overflow-hidden"
              style={{ fontFamily: "DM Sans, sans-serif", color: "rgba(255,255,255,0.45)", transition: "opacity 0.35s ease", opacity: fading ? 0 : 1 }}>
              {services[serviceIdx]}
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(3.2rem, 9vw, 7.5rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.03em", color: "#ffffff" }}>
            {hero.headlinePre}{" "}
            <span style={{ background: "linear-gradient(90deg, #E8632A 0%, #F5C842 50%, #9B5DE5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {hero.headlineGradient}
            </span>
            <br />
            {hero.headlinePost}{" "}
            <span style={{ color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>{hero.headlineItalic}</span>
          </h1>

          {/* Sub-copy */}
          <p className="mt-7 text-white/45 max-w-md"
            style={{ fontFamily: "DM Sans, sans-serif", fontSize: "clamp(0.88rem, 1.4vw, 1rem)", lineHeight: 1.85, fontWeight: 300 }}>
            {hero.subtext}
          </p>

          {/* CTA row */}
          <div className="flex items-center gap-6 mt-10">
            <button onClick={scrollDown}
              className="group relative flex items-center gap-3 px-8 py-4 rounded-full text-white cursor-pointer border-none overflow-hidden"
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.06em" }}>
              <span className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(105deg, #E8632A 0%, #F5C842 55%, #9B5DE5 100%)", transition: "opacity 0.35s" }} />
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(105deg, #F5C842 0%, #E8632A 55%, #9B5DE5 100%)" }} />
              <span className="relative z-10 tracking-[0.08em]">{hero.ctaLabel}</span>
              <span className="relative z-10">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </button>

            <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-2.5 bg-transparent border-none cursor-pointer text-white/40 hover:text-white/80 transition-colors duration-300"
              style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.82rem", letterSpacing: "0.12em" }}>
              <span className="w-8 h-px group-hover:w-12 transition-all duration-400" style={{ background: "currentColor", display: "block" }} />
              {hero.secondaryCta}
            </button>
          </div>
        </div>
      </div>

      {/* ════════ Floating featured card — bottom-right ════════ */}
      <div className="absolute bottom-16 right-6 md:right-14 z-20 hidden md:block">
        <div className="rounded-2xl overflow-hidden" style={{ width: "220px", background: "rgba(8,8,8,0.65)", border: "1px solid rgba(255,255,255,0.09)", backdropFilter: "blur(24px)", boxShadow: "0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset" }}>
          <div className="relative h-28 overflow-hidden">
            <ImageWithFallback src="https://images.unsplash.com/photo-1768479619271-e0ff666a14f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9vZHklMjBzdHVkaW8lMjBwb3J0cmFpdCUyMHdvbWFuJTIwZmFjZSUyMGRyYW1hdGljJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzcxNzgyODYyfDA&ixlib=rb-4.1.0&q=80&w=400" alt="Featured project" className="w-full h-full object-cover object-center scale-105" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(8,8,8,0.7) 100%)" }} />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full" style={{ background: "rgba(232,99,42,0.85)", backdropFilter: "blur(8px)" }}>
              <span className="text-white text-xs" style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, letterSpacing: "0.04em" }}>Featured</span>
            </div>
          </div>
          <div className="px-4 py-4">
            <div className="text-white/35 text-xs mb-1 tracking-[0.15em] uppercase" style={{ fontFamily: "DM Sans, sans-serif" }}>Latest Campaign</div>
            <div className="text-white mb-3" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.25 }}>
              Brand Relaunch<br />
              <span style={{ background: "linear-gradient(90deg, #E8632A, #F5C842)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>× 340% Growth</span>
            </div>
            <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <div><div className="text-white/25 text-xs" style={{ fontFamily: "DM Sans, sans-serif" }}>ROI</div><div className="text-white" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "0.85rem" }}>12×</div></div>
              <div><div className="text-white/25 text-xs" style={{ fontFamily: "DM Sans, sans-serif" }}>Market</div><div className="text-white" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "0.85rem" }}>MENA</div></div>
              <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer border-none transition-opacity duration-300 hover:opacity-80"
                style={{ background: "linear-gradient(135deg, #E8632A, #9B5DE5)" }}>
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ════════ Vertical scroll label ════════ */}
      <div className="absolute right-6 md:right-14 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3">
        <div className="w-px flex-1" style={{ height: "60px", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.2))" }} />
        <span className="text-white/25 text-xs tracking-[0.28em]" style={{ fontFamily: "DM Sans, sans-serif", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>SCROLL</span>
        <div className="w-px" style={{ height: "60px", background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)" }} />
      </div>

      {/* ══════���═ Bottom fade ════════ */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, #080808, transparent)" }} />
    </section>
  );
}
