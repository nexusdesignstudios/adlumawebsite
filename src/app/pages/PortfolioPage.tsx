import { useState } from "react";
import { Link } from "react-router";
import logoImage from "../../assets/5e154046a90f5ea0433f1ff73ea3cc95d52835e5.png";
import sevenZoneImage from "../../assets/4b815b9b548941073e0d8842d8dbf5d94778e98c.png";
import townBurgerImage from "../../assets/d1a2a4e8b558bc26136e92b07a134fc520fd1ac2.png";
import bassthalkImage from "../../assets/a3cb4c4c2ae77e698a15dab4ee50fb97b42ecf09.png";

const categories = ["All", "Social Media", "Brand Strategy", "Web Development", "Motion Graphics", "Performance", "Production"];

const projects = [
  {
    id: 1,
    client: "Seven Zone",
    category: "Social Media",
    subcategory: "Content Marketing",
    description: "End-to-end content ecosystem for a growing creator hub — from speaker campaign visuals to event storytelling that scaled community engagement by 3x.",
    image: sevenZoneImage,
    tags: ["Social Media", "Content Systems", "Campaign Design"],
    year: "2024",
    result: "+320% Engagement",
    featured: true,
  },
  {
    id: 2,
    client: "Town Burger",
    category: "Brand Strategy",
    subcategory: "Creative Production",
    description: "A full brand refresh anchored in cultural relevance — seasonal campaign visuals, celebrity collaborations, and product storytelling that built lasting equity.",
    image: townBurgerImage,
    tags: ["Brand Strategy", "Production", "Advertising"],
    year: "2024",
    result: "+180% Brand Recall",
    featured: true,
  },
  {
    id: 3,
    client: "Bassthalk",
    category: "Motion Graphics",
    subcategory: "Social Media",
    description: "Motion-led educational content and a full platform promotion system that drove a 312% surge in course enrollments within one quarter.",
    image: bassthalkImage,
    tags: ["Motion Graphics", "Social Media", "Education"],
    year: "2024",
    result: "+312% Enrollments",
    featured: true,
  },
  {
    id: 4,
    client: "Navigate PR",
    category: "Brand Strategy",
    subcategory: "Brand Positioning",
    description: "Strategic repositioning from regional agency to nationally recognized communications brand, with new identity, messaging, and launch campaign.",
    image: "https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWduJTIwY3JlYXRpdmUlMjBhZ2VuY3klMjBwb3J0Zm9saW98ZW58MXx8fHwxNzcxNzcxMTk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Brand Identity", "Positioning", "PR"],
    year: "2024",
    result: "+240% Market Reach",
    featured: false,
  },
  {
    id: 5,
    client: "DreamCube",
    category: "Web Development",
    subcategory: "Software",
    description: "High-performance web platform engineered for 50K+ monthly users — scalable architecture, seamless UX, and custom CMS tailored to the team's workflow.",
    image: "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGUtY29tbWVyY2UlMjBtb2Rlcm4lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzcxNzcxMTk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Web Platform", "Custom Dev", "UX"],
    year: "2023",
    result: "50K+ Monthly Users",
    featured: false,
  },
  {
    id: 6,
    client: "Luminar Group",
    category: "Performance",
    subcategory: "PPC & SEO",
    description: "Integrated performance strategy combining paid media and organic search to drive 248% average growth across a portfolio of six subsidiary brands.",
    image: "https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmb3JtYW5jZSUyMGFuYWx5dGljcyUyMGRhdGElMjBtYXJrZXRpbmclMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzcxNzcxMjAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["PPC", "SEO", "Growth Strategy"],
    year: "2023",
    result: "+248% Avg. Growth",
    featured: false,
  },
  {
    id: 7,
    client: "VPW Creative",
    category: "Production",
    subcategory: "Media Production",
    description: "Full commercial video production cycle — concept, scripting, on-set direction, and post-production for a high-impact national advertising campaign.",
    image: "https://images.unsplash.com/photo-1654723011674-13e99382511d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBjb21tZXJjaWFsJTIwc2hvb3QlMjBhZHZlcnRpc2luZ3xlbnwxfHx8fDE3NzE3NzExOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Video Production", "Commercial", "Direction"],
    year: "2023",
    result: "5M+ Views",
    featured: false,
  },
  {
    id: 8,
    client: "ADA Digital",
    category: "Motion Graphics",
    subcategory: "Brand Assets",
    description: "Complete motion identity system — animated logos, transition templates, social motion kits, and brand guidelines for digital-first rollout.",
    image: "https://images.unsplash.com/photo-1691251209241-d57bbd50dddb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3Rpb24lMjBncmFwaGljcyUyMGFic3RyYWN0JTIwZGVzaWduJTIwYW5pbWF0aW9ufGVufDF8fHx8MTc3MTc3MTIwMXww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Motion Graphics", "Brand Identity", "Animation"],
    year: "2024",
    result: "Full Brand Rollout",
    featured: false,
  },
  {
    id: 9,
    client: "Machter Auto",
    category: "Social Media",
    subcategory: "Campaign",
    description: "Social-first product launch strategy with influencer integrations, real-time campaign management, and performance-optimized creative for automotive retail.",
    image: "https://images.unsplash.com/photo-1759393851741-674ee71fb498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwY2FtcGFpZ24lMjBzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZyUyMHZpc3VhbHxlbnwxfHx8fDE3NzE3NzExOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Social Media", "Influencer", "Automotive"],
    year: "2024",
    result: "+190% Sales Leads",
    featured: false,
  },
];

export function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const featured = projects.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/90 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link to="/">
            <img src={logoImage} alt="Adluma" className="h-10 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-white/50 hover:text-white text-sm transition-colors duration-300 no-underline flex items-center gap-2"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M12 7H2M6 4L2 7l4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Home
            </Link>
            <button
              className="text-sm px-5 py-2 rounded-full border border-white/20 text-white/80 hover:border-orange-400 hover:text-white transition-all duration-300 cursor-pointer bg-transparent"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Let's Talk
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[140px] opacity-[0.06] pointer-events-none"
          style={{ background: "linear-gradient(135deg, #E8632A, #9B5DE5)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #E8632A, #9B5DE5)" }} />
            <span
              className="text-xs tracking-[0.25em] uppercase text-white/30"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Full Portfolio
            </span>
          </div>

          <div className="max-w-3xl">
            <h1
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              Work That{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #E8632A 0%, #F5C842 50%, #9B5DE5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Speaks.
              </span>
            </h1>
            <p
              className="mt-5 text-white/45 max-w-xl"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >
              Every project here is the result of deliberate strategy, creative direction,
              and precise execution. No filler — only work that moved the needle.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-12 pt-10 border-t border-white/6">
            {[
              { value: "+972", label: "Projects Delivered" },
              { value: "+324", label: "Brands Partnered" },
              { value: "+248%", label: "Avg. Campaign Growth" },
              { value: "9+", label: "Years of Practice" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-white"
                  style={{ fontFamily: "Syne, sans-serif", fontSize: "1.6rem", fontWeight: 700, lineHeight: 1 }}
                >
                  {s.value}
                </div>
                <div
                  className="text-white/30 mt-1"
                  style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.8rem", fontWeight: 300 }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-12 pb-4">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p
            className="text-xs tracking-[0.25em] uppercase text-white/25 mb-8"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Featured
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {featured.map((project) => (
              <FeaturedCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Filter + All Projects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Divider */}
          <div className="flex items-center gap-6 mb-12">
            <div className="h-px flex-1 bg-white/6" />
            <p
              className="text-xs tracking-[0.25em] uppercase text-white/25"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              All Projects
            </p>
            <div className="h-px flex-1 bg-white/6" />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="px-4 py-2 rounded-full text-xs transition-all duration-300 cursor-pointer border"
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  letterSpacing: "0.04em",
                  background: activeFilter === cat ? "rgba(232,99,42,0.15)" : "rgba(255,255,255,0.03)",
                  borderColor: activeFilter === cat ? "rgba(232,99,42,0.5)" : "rgba(255,255,255,0.08)",
                  color: activeFilter === cat ? "#E8632A" : "rgba(255,255,255,0.4)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div
            className="rounded-2xl p-10 md:p-16 text-center relative overflow-hidden"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(232,99,42,0.08) 0%, transparent 60%)" }} />
            <div className="relative z-10">
              <h2
                className="text-white mb-4"
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                Your brand could be{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #E8632A, #F5C842, #9B5DE5)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  next.
                </span>
              </h2>
              <p
                className="text-white/40 max-w-lg mx-auto mb-8"
                style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8 }}
              >
                Let's build something together. Reach out and we'll take it from strategy to execution.
              </p>
              <button
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white text-sm cursor-pointer border-none transition-all duration-300 hover:opacity-90 hover:scale-105"
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  background: "linear-gradient(90deg, #E8632A, #F5C842 50%, #9B5DE5)",
                }}
              >
                Start a Project
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 4l4 3-4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer mini */}
      <div className="border-t border-white/5 py-6 text-center">
        <p
          className="text-white/20 text-xs"
          style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300 }}
        >
          © {new Date().getFullYear()} Adluma. All rights reserved.
        </p>
      </div>
    </div>
  );
}

function FeaturedCard({ project }: { project: typeof projects[0] }) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden border border-white/6 hover:border-white/14 transition-all duration-500"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img
          src={project.image}
          alt={project.client}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "brightness(0.75)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 40%, rgba(8,8,8,0.95) 100%)" }}
        />

        {/* Result badge */}
        <div
          className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs"
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 600,
            background: "rgba(232,99,42,0.2)",
            border: "1px solid rgba(232,99,42,0.4)",
            color: "#E8632A",
          }}
        >
          {project.result}
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-xs text-white/35"
              style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "0.05em" }}
            >
              {project.year}
            </span>
            <div className="h-px w-5 bg-white/20" />
            <span
              className="text-xs text-white/35"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {project.subcategory}
            </span>
          </div>
          <h3
            className="text-white"
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "1.3rem",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            {project.client}
          </h3>
        </div>
      </div>

      {/* Description */}
      <div className="p-6 pt-4">
        <p
          className="text-white/40"
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.85rem",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs text-white/30 border border-white/7"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden border border-white/6 hover:border-white/14 transition-all duration-500"
      style={{ background: "rgba(255,255,255,0.015)" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img
          src={project.image}
          alt={project.client}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "brightness(0.7)" }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "linear-gradient(135deg, rgba(232,99,42,0.15) 0%, rgba(155,93,229,0.1) 100%)" }}
        />

        {/* Result badge */}
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs"
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 600,
            background: "rgba(8,8,8,0.8)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(4px)",
          }}
        >
          {project.result}
        </div>

        {/* Category chip */}
        <div
          className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs"
          style={{
            fontFamily: "DM Sans, sans-serif",
            background: "rgba(8,8,8,0.7)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(4px)",
          }}
        >
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3
            className="text-white"
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "1.05rem",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            {project.client}
          </h3>
          <span
            className="text-white/25 text-xs"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            {project.year}
          </span>
        </div>

        <p
          className="text-white/35 mb-4"
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.82rem",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs text-white/25 border border-white/6"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent line on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(90deg, #E8632A, #9B5DE5)" }}
      />
    </div>
  );
}
