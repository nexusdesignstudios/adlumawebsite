import { Link } from "react-router";
import { useSiteData } from "../lib/siteDataStore";

export function ProjectsSection() {
  const { projects } = useSiteData();

  return (
    <section id="projects" className="relative bg-[#060606] py-24 md:py-36 overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #E8632A, #9B5DE5)" }} />
          <span
            className="text-xs tracking-[0.25em] uppercase text-white/30"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Our Work
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Selected{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #E8632A, #9B5DE5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Work.
            </span>
          </h2>

          <Link
            to="/portfolio"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-orange-500/50 transition-all duration-300 text-sm no-underline"
            style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "0.05em" }}
          >
            View Full Portfolio
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 4l4 3-4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Projects */}
        <div className="space-y-6">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="group relative rounded-2xl border border-white/6 overflow-hidden hover:border-white/12 transition-all duration-500"
              style={{ background: "rgba(255,255,255,0.015)" }}
            >
              <div className="grid md:grid-cols-5 gap-0">
                {/* Image */}
                <div
                  className={`relative overflow-hidden ${i % 2 === 0 ? "md:col-span-3" : "md:col-span-3 md:order-last"}`}
                  style={{ aspectRatio: "16/7" }}
                >
                  <img
                    src={project.image}
                    alt={project.client}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    style={{ filter: "brightness(0.9)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: i % 2 === 0
                        ? "linear-gradient(90deg, transparent 60%, rgba(6,6,6,0.8) 100%)"
                        : "linear-gradient(90deg, rgba(6,6,6,0.8) 0%, transparent 40%)",
                    }}
                  />
                </div>

                {/* Content */}
                <div className={`md:col-span-2 flex flex-col justify-center p-8 md:p-12 ${i % 2 !== 0 ? "md:order-first" : ""}`}>
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="text-xs text-white/25"
                      style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "0.1em" }}
                    >
                      {project.year}
                    </span>
                    <div className="h-px w-8 bg-white/15" />
                    <span
                      className="text-xs text-white/35"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {project.category}
                    </span>
                  </div>

                  <h3
                    className="mb-4 text-white"
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {project.client}
                  </h3>

                  <p
                    className="text-white/40 mb-6"
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "0.9rem",
                      lineHeight: 1.8,
                      fontWeight: 300,
                    }}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs text-white/40 border border-white/8"
                        style={{ fontFamily: "DM Sans, sans-serif" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}