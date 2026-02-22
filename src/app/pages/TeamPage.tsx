import { useState } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useSiteData } from "../lib/siteDataStore";

export function TeamPage() {
  const { team } = useSiteData();
  const LEADERSHIP = team.filter(m => m.isLeadership);
  const CREW = team.filter(m => !m.isLeadership);

  const [hoveredLeader, setHoveredLeader] = useState<string | null>(null);

  const STATS = [
    { value: `${team.length}+`, label: "Team Members" },
    { value: "6", label: "Countries" },
    { value: "200+", label: "Brands Served" },
    { value: "8", label: "Years Together" },
  ];

  return (
    <div style={{ background: "#080808", minHeight: "100vh" }}>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(232,99,42,0.13) 0%, rgba(155,93,229,0.07) 55%, transparent 80%)",
            filter: "blur(30px)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14">
          {/* Back breadcrumb */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-12 text-white/35 hover:text-white/70 transition-colors duration-300 no-underline"
            style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.8rem", letterSpacing: "0.15em" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10 7H4M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            BACK TO HOME
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10" style={{ background: "linear-gradient(90deg, #E8632A, #F5C842)" }} />
                <span className="text-xs tracking-[0.28em] uppercase text-white/35" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  The People
                </span>
              </div>
              <h1
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "clamp(3rem, 8vw, 6.5rem)",
                  fontWeight: 800,
                  lineHeight: 0.92,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                }}
              >
                THE{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #E8632A 0%, #F5C842 50%, #9B5DE5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  ADLUMA
                </span>
                <br />
                <span style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>TEAM.</span>
              </h1>
            </div>

            <p
              className="max-w-sm text-white/45 md:text-right"
              style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.95rem", lineHeight: 1.8, fontWeight: 300 }}
            >
              A collective of strategists, designers, and storytellers who believe great brands don't just get noticed — they get remembered.
            </p>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px mt-16"
            style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", overflow: "hidden" }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center py-8 px-6"
                style={{ background: "rgba(255,255,255,0.025)" }}
              >
                <div
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(2rem, 4vw, 2.8rem)",
                    lineHeight: 1,
                    background: "linear-gradient(90deg, #E8632A, #F5C842)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="mt-1.5 text-white/35 text-xs tracking-[0.15em] uppercase text-center"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          LEADERSHIP — Large portrait cards
      ══════════════════════════════════════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px w-10" style={{ background: "linear-gradient(90deg, #E8632A, #F5C842)" }} />
            <span className="text-xs tracking-[0.28em] uppercase text-white/35" style={{ fontFamily: "DM Sans, sans-serif" }}>
              Leadership
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {LEADERSHIP.map((person) => (
              <div
                key={person.id}
                className="group relative overflow-hidden"
                style={{
                  borderRadius: "20px",
                  height: "520px",
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.07)",
                  transition: "transform 0.4s cubic-bezier(0.34,1.26,0.64,1), box-shadow 0.4s ease",
                  transform: hoveredLeader === person.id ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: hoveredLeader === person.id
                    ? "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,99,42,0.2)"
                    : "0 8px 32px rgba(0,0,0,0.4)",
                }}
                onMouseEnter={() => setHoveredLeader(person.id)}
                onMouseLeave={() => setHoveredLeader(null)}
              >
                {/* Photo */}
                <ImageWithFallback
                  src={person.img}
                  alt={person.name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{
                    transition: "transform 0.6s ease",
                    transform: hoveredLeader === person.id ? "scale(1.05)" : "scale(1)",
                  }}
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to bottom, rgba(8,8,8,0.1) 0%, rgba(8,8,8,0.2) 40%, rgba(8,8,8,0.92) 100%)",
                  }}
                />

                {/* Gradient border top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    background: person.gradient,
                    opacity: hoveredLeader === person.id ? 1 : 0.4,
                    transition: "opacity 0.3s",
                  }}
                />

                {/* Since badge — top right */}
                <div className="absolute top-5 right-5">
                  <div
                    className="px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(8,8,8,0.6)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <span className="text-white/40 text-xs" style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "0.12em" }}>
                      Since {person.since}
                    </span>
                  </div>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-xs tracking-[0.18em] uppercase mb-2"
                    style={{ fontFamily: "DM Sans, sans-serif", background: "linear-gradient(135deg,#E8632A,#F5C842)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {person.tag}
                  </div>
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#fff", lineHeight: 1.2 }}>{person.name}</div>
                  <div className="text-white/45 mt-0.5 mb-3" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.82rem" }}>{person.role}</div>
                  <div className="overflow-hidden" style={{ maxHeight: hoveredLeader === person.id ? "80px" : "0px", opacity: hoveredLeader === person.id ? 1 : 0, transition: "max-height 0.4s ease, opacity 0.35s ease" }}>
                    <p className="text-white/55 pt-1" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.82rem", lineHeight: 1.7, fontWeight: 300 }}>{person.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          REST OF TEAM — Compact grid cards
      ══════════════════════════════════════ */}
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px w-10" style={{ background: "linear-gradient(90deg, #9B5DE5, #E8632A)" }} />
            <span className="text-xs tracking-[0.28em] uppercase text-white/35" style={{ fontFamily: "DM Sans, sans-serif" }}>
              The Crew
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CREW.map((person, i) => (
              <div
                key={person.id}
                className="group relative overflow-hidden"
                style={{
                  borderRadius: "16px",
                  height: "280px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "transform 0.35s cubic-bezier(0.34,1.26,0.64,1), border-color 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(232,99,42,0.3)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
              >
                <ImageWithFallback src={person.img} alt={person.name} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.0) 30%, rgba(8,8,8,0.95) 100%)" }} />
                <div className="absolute top-3 left-3 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(8,8,8,0.6)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
                  <span className="text-white/40" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "0.6rem" }}>
                    {String(i + LEADERSHIP.length + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3.5">
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#fff", lineHeight: 1.2 }}>{person.name}</div>
                  <div className="text-white/35 mt-0.5" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.7rem" }}>{person.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          JOIN CTA
      ══════════════════════════════════════ */}
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div
            className="relative overflow-hidden rounded-2xl p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Background glow */}
            <div
              className="absolute top-0 right-0 w-[400px] h-[300px] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 80% 20%, rgba(232,99,42,0.12) 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: "linear-gradient(90deg, #E8632A, #F5C842)" }} />
                <span className="text-xs tracking-[0.28em] uppercase text-white/35" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  Open Positions
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
                  lineHeight: 1.1,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                Want to Join the{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #E8632A, #F5C842, #9B5DE5)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Team?
                </span>
              </h3>
              <p
                className="mt-3 text-white/40 max-w-md"
                style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", lineHeight: 1.75, fontWeight: 300 }}
              >
                We're always looking for talented people who think differently and execute precisely.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-white no-underline overflow-hidden"
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.06em" }}
              >
                <span
                  className="absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(105deg, #E8632A 0%, #F5C842 55%, #9B5DE5 100%)" }}
                />
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(105deg, #F5C842 0%, #E8632A 55%, #9B5DE5 100%)" }}
                />
                <span className="relative z-10">Get In Touch</span>
                <span className="relative z-10">
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}