import { useState } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useSiteData } from "../lib/siteDataStore";

const TEAM = [
  {
    id: 1,
    name: "Karim El-Masri",
    role: "Founder & Creative Director",
    tag: "Strategy · Vision",
    img: "https://images.unsplash.com/photo-1648929725812-e6594b5095bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBkYXJrJTIwc3R1ZGlvJTIwZHJhbWF0aWMlMjBsaWdodGluZyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTc4MzUwOHww&ixlib=rb-4.1.0&q=80&w=600",
  },
  {
    id: 2,
    name: "Lena Hoffman",
    role: "Brand Strategist",
    tag: "Identity · Positioning",
    img: "https://images.unsplash.com/photo-1695048994291-2e96839a0a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMG1hcmtldGluZyUyMHByb2Zlc3Npb25hbCUyMGRyYW1hdGljJTIwcG9ydHJhaXQlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzE3ODM1MDF8MA&ixlib=rb-4.1.0&q=80&w=600",
  },
  {
    id: 3,
    name: "Yasmine Nouri",
    role: "Head of Performance",
    tag: "Growth · Analytics",
    img: "https://images.unsplash.com/photo-1627890458144-4c0c481bf4b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjcmVhdGl2ZSUyMGRpcmVjdG9yJTIwZGFyayUyMHN0dWRpbyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTc4MzQ5N3ww&ixlib=rb-4.1.0&q=80&w=600",
  },
  {
    id: 4,
    name: "Omar Rashid",
    role: "Content & Media Lead",
    tag: "Storytelling · Video",
    img: "https://images.unsplash.com/photo-1608814352457-9a612735c0d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbGUlMjBkZXNpZ25lciUyMGRhcmslMjBtb29keSUyMHBvcnRyYWl0JTIwc3R1ZGlvfGVufDF8fHx8MTc3MTc4MzUwMXww&ixlib=rb-4.1.0&q=80&w=600",
  },
  {
    id: 5,
    name: "Sofia Andrade",
    role: "UX & Digital Designer",
    tag: "Design · Systems",
    img: "https://images.unsplash.com/photo-1603034052496-5bd9d20ad47a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHN0cmF0ZWdpc3QlMjB3b21hbiUyMGJvbGQlMjBlZGl0b3JpYWwlMjBkYXJrJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxNzgzNTA1fDA&ixlib=rb-4.1.0&q=80&w=600",
  },
];

function getCardStyle(index: number, active: number, total: number) {
  const offset = index - active;
  const absOffset = Math.abs(offset);

  const isCenter = offset === 0;
  const isAdjacent = absOffset === 1;
  const isOuter = absOffset === 2;

  // Horizontal spread
  let translateX = offset * 188;
  // Slight fan arc: outer cards pulled a bit further apart
  if (absOffset === 2) translateX = offset * 210;

  // Vertical arc: cards arc upward toward center
  const translateY = isCenter ? 0 : isAdjacent ? 18 : 38;

  // Scale
  const scale = isCenter ? 1 : isAdjacent ? 0.88 : 0.77;

  // Z-index
  const zIndex = isCenter ? 10 : isAdjacent ? 7 : 4;

  // Opacity
  const opacity = isCenter ? 1 : isAdjacent ? 0.85 : 0.55;

  // Rotation (subtle tilt for outer cards)
  const rotate = isCenter ? 0 : offset * 3.5;

  return {
    transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
    zIndex,
    opacity,
    transition: "all 0.52s cubic-bezier(0.34, 1.26, 0.64, 1)",
    cursor: isCenter ? "default" : "pointer",
  };
}

export function TeamSection() {
  const { team } = useSiteData();
  // Use first 5 members for the carousel
  const CAROUSEL = team.slice(0, 5);
  const [active, setActive] = useState(2); // center index

  const prev = () => setActive((a) => Math.max(0, a - 1));
  const next = () => setActive((a) => Math.min(CAROUSEL.length - 1, a + 1));

  const member = CAROUSEL[active];

  return (
    <section
      id="team"
      className="relative w-full overflow-hidden py-24 md:py-32"
      style={{ background: "#080808" }}
    >
      {/* ── Ambient glow ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(232,99,42,0.10) 0%, rgba(155,93,229,0.06) 50%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14">
        {/* ── Header row ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          {/* Left: eyebrow + tagline */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-px w-10"
                style={{ background: "linear-gradient(90deg, #E8632A, #F5C842)" }}
              />
              <span
                className="text-xs tracking-[0.28em] uppercase text-white/35"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                The Minds Behind It
              </span>
            </div>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(2.2rem, 5vw, 4.2rem)",
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
                color: "#fff",
              }}
            >
              MEET THE{" "}
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
              TEAM
            </h2>
          </div>

          {/* Right: active member detail */}
          <div className="md:text-right max-w-xs">
            <div
              className="text-white/25 text-xs tracking-[0.18em] uppercase mb-1"
              style={{ fontFamily: "DM Sans, sans-serif", transition: "all 0.3s" }}
            >
              {member.tag}
            </div>
            <div
              className="text-white/70"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.88rem",
                lineHeight: 1.6,
                transition: "all 0.3s",
              }}
            >
              Driving Adluma's mission to build brands that outlast trends — with clarity, craft, and conviction.
            </div>
          </div>
        </div>

        {/* ── Cards stage ── */}
        <div
          className="relative flex items-center justify-center"
          style={{ height: "420px" }}
        >
          {CAROUSEL.map((member, i) => (
            <div
              key={member.id}
              className="absolute"
              style={getCardStyle(i, active, CAROUSEL.length)}
              onClick={() => i !== active && setActive(i)}
            >
              {/* Card */}
              <div
                className="relative overflow-hidden"
                style={{
                  width: "200px",
                  height: "300px",
                  borderRadius: "18px",
                  // Gradient border on active card
                  padding: i === active ? "2px" : "0",
                  background:
                    i === active
                      ? "linear-gradient(135deg, #E8632A, #F5C842, #9B5DE5)"
                      : "transparent",
                  boxShadow:
                    i === active
                      ? "0 24px 80px rgba(232,99,42,0.25), 0 8px 32px rgba(0,0,0,0.6)"
                      : "0 8px 32px rgba(0,0,0,0.5)",
                }}
              >
                <div
                  className="relative w-full h-full overflow-hidden"
                  style={{ borderRadius: i === active ? "16px" : "18px" }}
                >
                  {/* Photo */}
                  <ImageWithFallback
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                    style={{ transition: "transform 0.6s ease" }}
                  />

                  {/* Dark gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.05) 40%, rgba(8,8,8,0.92) 100%)",
                    }}
                  />

                  {/* Top-right badge */}
                  <div className="absolute top-3 right-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{
                        background: i === active
                          ? "linear-gradient(135deg, #E8632A, #9B5DE5)"
                          : "rgba(255,255,255,0.08)",
                        border: i !== active ? "1px solid rgba(255,255,255,0.12)" : "none",
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="2.5" fill="white" fillOpacity="0.9" />
                        <circle cx="10" cy="2" r="1.5" fill="white" fillOpacity="0.6" />
                        <circle cx="2" cy="10" r="1.5" fill="white" fillOpacity="0.6" />
                        <line x1="6" y1="6" x2="10" y2="2" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
                        <line x1="6" y1="6" x2="2" y2="10" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom text */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
                    <div
                      className="mb-0.5"
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: "#fff",
                        lineHeight: 1.2,
                      }}
                    >
                      «{member.name}»
                    </div>
                    <div
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.72rem",
                        color: "rgba(255,255,255,0.45)",
                        lineHeight: 1.5,
                      }}
                    >
                      {member.role}
                      <br />
                      <span style={{ color: "rgba(255,255,255,0.25)" }}>
                        {member.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom controls ── */}
        <div className="relative z-10 flex items-center justify-center gap-6 mt-10">
          {/* Prev arrow */}
          <button
            onClick={prev}
            disabled={active === 0}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-none cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* View More CTA */}
          <Link
            to="/team"
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-white no-underline overflow-hidden"
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
            <span className="relative z-10">View Full Team</span>
            <span className="relative z-10">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>

          {/* Next arrow */}
          <button
            onClick={next}
            disabled={active === CAROUSEL.length - 1}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-none cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {CAROUSEL.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="border-none cursor-pointer p-0 transition-all duration-300"
              style={{
                width: i === active ? "24px" : "6px",
                height: "6px",
                borderRadius: "99px",
                background: i === active
                  ? "linear-gradient(90deg, #E8632A, #F5C842)"
                  : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Bottom divider ── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
      />
    </section>
  );
}