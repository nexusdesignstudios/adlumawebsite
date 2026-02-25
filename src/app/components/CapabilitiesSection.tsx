import { useState } from "react";

const capabilities = [
  {
    number: "01",
    title: "Strategy & Brand Positioning",
    tags: ["Market research.", "Brand clarity.", "Go-to-market planning."],
    description: "We define direction before execution begins.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
        <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="14" cy="14" r="1.5" fill="currentColor" />
        <line x1="14" y1="2" x2="14" y2="5" stroke="currentColor" strokeWidth="1.2" />
        <line x1="14" y1="23" x2="14" y2="26" stroke="currentColor" strokeWidth="1.2" />
        <line x1="2" y1="14" x2="5" y2="14" stroke="currentColor" strokeWidth="1.2" />
        <line x1="23" y1="14" x2="26" y2="14" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Social Media & Content Marketing",
    tags: ["Content systems.", "Creative direction.", "Campaign storytelling."],
    description: "Built for visibility and consistency.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="5" width="22" height="18" rx="3" stroke="currentColor" strokeWidth="1.2" />
        <path d="M3 10h22" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="7" cy="7.5" r="1" fill="currentColor" />
        <circle cx="11" cy="7.5" r="1" fill="currentColor" />
        <path d="M8 16l3-2.5 3 2.5 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Performance Marketing (PPC & SEO)",
    tags: ["Paid media strategy.", "Search optimization.", "Data-driven growth."],
    description: "Focused on measurable results.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 28 28" fill="none">
        <polyline points="3,22 9,14 14,18 20,10 25,6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="20,6 25,6 25,11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Media Production & Advertising",
    tags: ["Video production.", "Commercial shoots.", "Campaign visuals."],
    description: "Designed to elevate perception.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="7" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M19 11l6-3v12l-6-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Graphic Design & Motion Graphics",
    tags: ["Visual identity.", "Brand assets.", "Motion content."],
    description: "Crafted with precision and clarity.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 28 28" fill="none">
        <path d="M6 22c0-2 3-3 5-5s3-5 3-5 1 3 3 5 5 3 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="14" cy="8" r="3" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="7" cy="16" r="1.5" fill="currentColor" opacity="0.4" />
        <circle cx="21" cy="16" r="1.5" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Software & Web Development",
    tags: ["Web platforms.", "Mobile Apps.", "E-commerce.", "Custom systems."],
    description: "Engineered for performance and scalability.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 28 28" fill="none">
        <polyline points="8,18 3,14 8,10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="20,10 25,14 20,18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="16" y1="7" x2="12" y2="21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function CapabilitiesSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="relative bg-[#080808] py-24 md:py-36 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-[0.04] blur-[150px] pointer-events-none"
        style={{ background: "linear-gradient(135deg, #E8632A, #9B5DE5)" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #E8632A, #9B5DE5)" }} />
          <span
            className="text-xs tracking-[0.25em] uppercase text-white/30"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            What We Do
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Our{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F5C842, #9B5DE5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Capabilities.
            </span>
          </h2>
        </div>

        {/* Capabilities grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap, i) => (
            <div
              key={cap.number}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative p-8 rounded-2xl border cursor-default transition-all duration-500 group overflow-hidden"
              style={{
                background: hovered === i ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.015)",
                borderColor: hovered === i ? "rgba(232,99,42,0.3)" : "rgba(255,255,255,0.07)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 30% 30%, rgba(232,99,42,0.06) 0%, transparent 70%)",
                }}
              />

              {/* Number */}
              <div
                className="mb-6 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  color: "#E8632A",
                }}
              >
                {cap.number}
              </div>

              {/* Icon */}
              <div
                className="mb-5 text-white/30 group-hover:text-white/60 transition-colors duration-300"
              >
                {cap.icon}
              </div>

              {/* Title */}
              <h3
                className="mb-4 text-white group-hover:text-white transition-colors duration-300"
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}
              >
                {cap.title}
              </h3>

              {/* Tags */}
              <ul className="mb-5 space-y-1">
                {cap.tags.map((tag) => (
                  <li
                    key={tag}
                    className="text-white/35 group-hover:text-white/50 transition-colors duration-300"
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "0.85rem",
                      lineHeight: 1.6,
                      fontWeight: 300,
                    }}
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div
                className="mb-4 h-px"
                style={{
                  background: hovered === i
                    ? "linear-gradient(90deg, rgba(232,99,42,0.4), transparent)"
                    : "rgba(255,255,255,0.06)",
                  transition: "background 0.4s ease",
                }}
              />

              {/* Description */}
              <p
                className="text-white/25 group-hover:text-white/50 transition-colors duration-300"
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.82rem",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}
              >
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}