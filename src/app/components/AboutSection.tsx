import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 9, prefix: "+", suffix: "", label: "Years of Experience" },
  { value: 324, prefix: "+", suffix: "", label: "Businesses Partnered With" },
  { value: 972, prefix: "+", suffix: "", label: "Projects Delivered" },
  { value: 248, prefix: "+", suffix: "%", label: "Average Growth Across Campaigns" },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ stat, animate }: { stat: typeof stats[0]; animate: boolean }) {
  const count = useCountUp(stat.value, 2200, animate);
  return (
    <div
      className="relative p-8 border border-white/8 rounded-2xl overflow-hidden group hover:border-white/15 transition-all duration-500"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 left-0 w-12 h-12 opacity-40"
        style={{
          background: "linear-gradient(135deg, rgba(232,99,42,0.4) 0%, transparent 60%)",
          borderRadius: "0 0 100% 0",
        }}
      />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/10 rounded-tl-none" />

      <div
        className="mb-2"
        style={{
          fontFamily: "Syne, sans-serif",
          fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
          fontWeight: 700,
          lineHeight: 1,
          background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {stat.prefix}{count}{stat.suffix}
      </div>
      <p
        className="text-white/40 text-sm"
        style={{ fontFamily: "DM Sans, sans-serif", lineHeight: 1.5 }}
      >
        {stat.label}
      </p>
    </div>
  );
}

export function AboutSection() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative bg-[#080808] py-28 md:py-36 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #E8632A, #9B5DE5)" }} />
          <span
            className="text-xs tracking-[0.25em] uppercase text-white/30"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            About Adluma
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 mb-20 items-start">
          {/* Left: Headline */}
          <div>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              Crafted with{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #E8632A, #F5C842, #9B5DE5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Purpose.
              </span>
            </h2>
          </div>

          {/* Right: Body */}
          <div>
            <p
              className="text-white/50 mb-4"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
                lineHeight: 1.9,
                fontWeight: 300,
              }}
            >
              Adluma is a modern digital house built on clarity, structure, and intention.
              We don't believe in noise. We believe in direction.
            </p>
            <p
              className="text-white/40"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(0.9rem, 1.4vw, 1rem)",
                lineHeight: 1.9,
                fontWeight: 300,
              }}
            >
              Our work is guided by strategy, shaped by creativity, and supported by
              technology — all aligned to help brands grow with confidence.
              We focus on long-term impact, not short-term impressions.
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div ref={sectionRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
}