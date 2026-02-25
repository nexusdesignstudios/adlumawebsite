import { useState } from "react";
import { Link } from "react-router";
import logoImage from "../../assets/5e154046a90f5ea0433f1ff73ea3cc95d52835e5.png";
import { MiniMap } from "../components/MiniMap";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const reachLocations = [
  { name: "Egypt",   city: "Cairo",     x: 562, y: 222 },
  { name: "UAE",     city: "Dubai",     x: 647, y: 240 },
  { name: "KSA",     city: "Riyadh",    x: 617, y: 242 },
  { name: "Bahrain", city: "Manama",    x: 632, y: 237 },
  { name: "Brazil",  city: "São Paulo", x: 289, y: 362 },
  { name: "Germany", city: "Berlin",    x: 501, y: 158 },
];

// Geographically accurate simplified country outlines (normalized to 110×110 viewBox)
const countries = [
  {
    name: "Egypt",
    city: "Cairo",
    center: [26.8206, 30.8025] as [number, number],
    pin: [30.0444, 31.2357] as [number, number],
    zoom: 5,
    color: "#E8632A",
  },
  {
    name: "UAE",
    city: "Dubai",
    center: [23.4241, 53.8478] as [number, number],
    pin: [25.2048, 55.2708] as [number, number],
    zoom: 7,
    color: "#F5C842",
  },
  {
    name: "KSA",
    city: "Riyadh",
    center: [23.8859, 45.0792] as [number, number],
    pin: [24.7136, 46.6753] as [number, number],
    zoom: 4,
    color: "#E8632A",
  },
  {
    name: "Bahrain",
    city: "Manama",
    center: [26.0667, 50.5577] as [number, number],
    pin: [26.2235, 50.5876] as [number, number],
    zoom: 10,
    color: "#9B5DE5",
  },
  {
    name: "Brazil",
    city: "São Paulo",
    center: [-14.235, -51.9253] as [number, number],
    pin: [-23.5505, -46.6333] as [number, number],
    zoom: 3,
    color: "#F5C842",
  },
  {
    name: "Germany",
    city: "Berlin",
    center: [51.1657, 10.4515] as [number, number],
    pin: [52.52, 13.405] as [number, number],
    zoom: 5,
    color: "#E8632A",
  },
];

export function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    contact: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activePin, setActivePin] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
    setFormData({ fullName: "", companyName: "", contact: "", message: "" });
  };

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
            <Link
              to="/portfolio"
              className="text-white/50 hover:text-white text-sm transition-colors duration-300 no-underline"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Portfolio
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative w-full overflow-hidden" style={{ height: "100vh", minHeight: "640px" }}>

        {/* Background image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1764347295958-6a729b1fdf7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYWJzdHJhY3QlMjBnbG93aW5nJTIwb3JhbmdlJTIwcHVycGxlJTIwbGlnaHQlMjBkaWdpdGFsfGVufDF8fHx8MTc3MTc4MjUwOXww&ixlib=rb-4.1.0&q=80&w=1920"
            alt="Hero background"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark vignette — bottom */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(8,8,8,0.18) 0%, rgba(8,8,8,0.05) 35%, rgba(8,8,8,0.62) 72%, rgba(8,8,8,0.98) 100%)",
            }}
          />
          {/* Dark vignette — left */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(8,8,8,0.72) 0%, rgba(8,8,8,0.2) 55%, transparent 100%)",
            }}
          />
          {/* Brand colour tint — subtle right-side glow */}
          <div
            className="absolute top-0 right-0 w-[55%] h-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 80% 30%, rgba(232,99,42,0.08) 0%, rgba(155,93,229,0.06) 45%, transparent 75%)",
            }}
          />
        </div>

        {/* ── Floating badge — top left ── */}
        <div className="absolute top-32 left-6 md:left-12 z-20 flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#E8632A", boxShadow: "0 0 8px #E8632A" }}
            />
            <span
              className="text-white/70 text-xs tracking-[0.18em] uppercase"
              style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 500 }}
            >
              Available for projects
            </span>
          </div>
        </div>

        {/* ── Main text — bottom left ── */}
        <div className="relative z-20 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-14 md:pb-20">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="h-px w-10"
                style={{ background: "linear-gradient(90deg, #E8632A, #9B5DE5)" }}
              />
              <span
                className="text-white/40 text-xs tracking-[0.28em] uppercase"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                Get in Touch
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(3rem, 8.5vw, 7rem)",
                fontWeight: 800,
                lineHeight: 0.97,
                color: "#fff",
                letterSpacing: "-0.03em",
              }}
            >
              Ready When{" "}
              <br className="hidden sm:block" />
              <span
                style={{
                  background: "linear-gradient(90deg, #E8632A 0%, #F5C842 48%, #9B5DE5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                You Are.
              </span>
            </h1>

            {/* Sub-copy */}
            <p
              className="mt-6 text-white/50 max-w-lg"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >
              Whether you're launching a brand, scaling a campaign, or rethinking your digital presence — let's start the conversation.
            </p>

            {/* CTA row */}
            <div className="flex items-center gap-5 mt-10">
              <a
                href="#contact-form"
                className="flex items-center gap-3 px-7 py-4 rounded-full text-white text-sm no-underline transition-all duration-300 hover:scale-[1.03] hover:opacity-90"
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  background: "linear-gradient(90deg, #E8632A, #F5C842 60%, #9B5DE5)",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Start a Project
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href="tel:+201000000000"
                className="flex items-center gap-2 text-white/50 text-sm no-underline hover:text-white/80 transition-colors duration-300"
                style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 400 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M6 2h4l2 5-2.5 1.5A11 11 0 0015.5 14.5L17 12l5 2v4a2 2 0 01-2 2A18 18 0 014 4a2 2 0 012-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Call directly
              </a>
            </div>
          </div>
        </div>

        {/* ── Floating stats card — bottom right ── */}
        <div
          className="absolute bottom-14 right-6 md:right-12 z-20 hidden sm:flex flex-col gap-3"
          style={{ minWidth: "200px" }}
        >
          <div
            className="rounded-2xl px-5 py-4"
            style={{
              background: "rgba(8,8,8,0.72)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex items-center gap-3 mb-3 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(232,99,42,0.15)", border: "1px solid rgba(232,99,42,0.25)" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#E8632A" strokeWidth="1.5"/>
                  <path d="M12 6v6l4 2" stroke="#E8632A" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className="text-white/30 text-xs" style={{ fontFamily: "DM Sans, sans-serif" }}>Response time</div>
                <div className="text-white text-sm" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>&lt; 24 hours</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(155,93,229,0.15)", border: "1px solid rgba(155,93,229,0.25)" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 14 6 14s6-8.75 6-14c0-3.314-2.686-6-6-6z" stroke="#9B5DE5" strokeWidth="1.5"/>
                  <circle cx="12" cy="8" r="2" stroke="#9B5DE5" strokeWidth="1.5"/>
                </svg>
              </div>
              <div>
                <div className="text-white/30 text-xs" style={{ fontFamily: "DM Sans, sans-serif" }}>Active markets</div>
                <div className="text-white text-sm" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>6 Countries</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <div
            className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: "1.5px solid rgba(255,255,255,0.18)" }}
          >
            <div
              className="w-1 h-2 rounded-full"
              style={{
                background: "rgba(255,255,255,0.5)",
                animation: "scrollDot 1.8s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        <style>{`
          @keyframes scrollDot {
            0%   { transform: translateY(0);   opacity: 1; }
            80%  { transform: translateY(10px); opacity: 0; }
            100% { transform: translateY(0);   opacity: 0; }
          }
        `}</style>
      </section>

      {/* Contact Form + Map */}
      <section id="contact-form" className="pb-20 pt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">
            {/* Form */}
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                    style={{ background: "rgba(232,99,42,0.15)", border: "1px solid rgba(232,99,42,0.3)" }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l5 5 9-9" stroke="#E8632A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-white mb-3" style={{ fontFamily: "Syne, sans-serif", fontSize: "1.4rem", fontWeight: 700 }}>
                    Message received.
                  </h3>
                  <p className="text-white/40 text-sm max-w-xs" style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, lineHeight: 1.7 }}>
                    We'll review your brief and get back to you within one business day.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-white mb-8" style={{ fontFamily: "Syne, sans-serif", fontSize: "1.4rem", fontWeight: 700, lineHeight: 1.3 }}>
                    Tell us about your project
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs text-white/30 mb-2 tracking-wider uppercase" style={{ fontFamily: "DM Sans, sans-serif" }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Your full name"
                        required
                        className="w-full px-4 py-3.5 rounded-xl text-white placeholder-white/20 focus:outline-none transition-colors duration-200 text-sm"
                        style={{ fontFamily: "DM Sans, sans-serif", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/30 mb-2 tracking-wider uppercase" style={{ fontFamily: "DM Sans, sans-serif" }}>
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Your company or brand"
                        className="w-full px-4 py-3.5 rounded-xl text-white placeholder-white/20 focus:outline-none transition-colors duration-200 text-sm"
                        style={{ fontFamily: "DM Sans, sans-serif", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/30 mb-2 tracking-wider uppercase" style={{ fontFamily: "DM Sans, sans-serif" }}>
                        Email / Phone Numbers
                      </label>
                      <input
                        type="text"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder="hello@company.com  or  +1 234 567 890"
                        required
                        className="w-full px-4 py-3.5 rounded-xl text-white placeholder-white/20 focus:outline-none transition-colors duration-200 text-sm"
                        style={{ fontFamily: "DM Sans, sans-serif", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/30 mb-2 tracking-wider uppercase" style={{ fontFamily: "DM Sans, sans-serif" }}>
                        Message
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your project, goals, and timeline…"
                        rows={5}
                        required
                        className="w-full px-4 py-3.5 rounded-xl text-white placeholder-white/20 focus:outline-none transition-colors duration-200 text-sm resize-none"
                        style={{ fontFamily: "DM Sans, sans-serif", lineHeight: 1.7, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl text-white text-sm cursor-pointer border-none transition-all duration-300 hover:opacity-90 hover:scale-[1.01]"
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        background: "linear-gradient(90deg, #E8632A, #F5C842 50%, #9B5DE5)",
                      }}
                    >
                      Send Message →
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Info + Social */}
            <div className="space-y-6">
              {/* Contact details */}
              <div
                className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <h3 className="text-white mb-5" style={{ fontFamily: "Syne, sans-serif", fontSize: "1rem", fontWeight: 600 }}>
                  Direct Contact
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: <EmailIcon />, label: "Email", value: "hello@adluma.com" },
                    { icon: <PhoneIcon />, label: "Phone", value: "+20 100 000 0000" },
                    { icon: <LocationIcon />, label: "HQ", value: "Cairo, Egypt" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(232,99,42,0.08)", border: "1px solid rgba(232,99,42,0.15)" }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs text-white/30" style={{ fontFamily: "DM Sans, sans-serif" }}>{item.label}</div>
                        <div className="text-sm text-white/70" style={{ fontFamily: "DM Sans, sans-serif" }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div
                className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <h3 className="text-white mb-5" style={{ fontFamily: "Syne, sans-serif", fontSize: "1rem", fontWeight: 600 }}>
                  Follow Adluma
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { name: "Instagram", icon: <InstagramIcon /> },
                    { name: "LinkedIn", icon: <LinkedInIcon /> },
                    { name: "TikTok", icon: <TikTokIcon /> },
                    { name: "Facebook", icon: <FacebookIcon /> },
                    { name: "X / Twitter", icon: <XIcon /> },
                  ].map((s) => (
                    <button
                      key={s.name}
                      title={s.name}
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 cursor-pointer group"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      {s.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Office hours */}
              <div
                className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <h3 className="text-white mb-4" style={{ fontFamily: "Syne, sans-serif", fontSize: "1rem", fontWeight: 600 }}>
                  Response Time
                </h3>
                <p className="text-white/35 text-sm" style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, lineHeight: 1.7 }}>
                  We respond to all inquiries within <span className="text-orange-400/80">24 business hours</span>. For urgent matters, reach us directly by phone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Our Outreach Section ═══ */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #E8632A, #9B5DE5)" }} />
            <span className="text-xs tracking-[0.25em] uppercase text-white/30" style={{ fontFamily: "DM Sans, sans-serif" }}>
              Global Presence
            </span>
          </div>
          <h2
            className="mb-3"
            style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            Our Outreach
          </h2>
          <p
            className="text-white/40 max-w-xl mb-10"
            style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8 }}
          >
            Adluma operates across 6 markets — bridging strategy and creativity for brands in the Arab World, South America, and Europe.
          </p>

          {/* World Map */}
          <div
            className="relative rounded-2xl overflow-hidden mb-12"
            style={{ background: "#060d18", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <svg viewBox="0 0 1000 480" className="w-full" style={{ display: "block" }}>
              <defs>
                {/* Ocean gradient */}
                <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%"   stopColor="#060d18" />
                  <stop offset="100%" stopColor="#040810" />
                </linearGradient>
                {/* Land gradient */}
                <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#1a2535" />
                  <stop offset="100%" stopColor="#131d2c" />
                </linearGradient>
                {/* Active land highlight */}
                <linearGradient id="activeLand" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#2a3a50" />
                  <stop offset="100%" stopColor="#1e2e42" />
                </linearGradient>
                {/* Pin glow filter */}
                <filter id="pinGlow" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="3" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                {/* Subtle drop shadow for continents */}
                <filter id="landShadow">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.5"/>
                </filter>
                {/* Lat/lon grid pattern */}
                <pattern id="gridPat" x="0" y="0" width="55.55" height="48" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="55.55" y2="0" stroke="rgba(255,255,255,0.028)" strokeWidth="0.5"/>
                  <line x1="0" y1="0" x2="0" y2="48" stroke="rgba(255,255,255,0.028)" strokeWidth="0.5"/>
                </pattern>
              </defs>

              {/* Ocean background */}
              <rect width="1000" height="480" fill="url(#oceanGrad)"/>

              {/* Equator line */}
              <line x1="0" y1="315" x2="1000" y2="315" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6" strokeDasharray="6 6"/>
              {/* Tropic of Cancer */}
              <line x1="0" y1="275" x2="1000" y2="275" stroke="rgba(255,255,255,0.025)" strokeWidth="0.4" strokeDasharray="3 8"/>
              {/* Tropic of Capricorn */}
              <line x1="0" y1="355" x2="1000" y2="355" stroke="rgba(255,255,255,0.025)" strokeWidth="0.4" strokeDasharray="3 8"/>
              {/* Lat/lon grid */}
              <rect width="1000" height="480" fill="url(#gridPat)"/>

              {/* ── Continent fills ── */}
              <g filter="url(#landShadow)">

                {/* Greenland */}
                <path fill="url(#landGrad)" stroke="rgba(100,140,180,0.18)" strokeWidth="0.6"
                  d="M 308 40 L 348 28 L 385 24 L 415 36 L 425 58 L 420 80 L 405 98 L 375 108 L 345 108 L 315 98 L 306 76 Z"/>

                {/* North America — more detailed coastline */}
                <path fill="url(#landGrad)" stroke="rgba(100,140,180,0.18)" strokeWidth="0.6"
                  d="M 90 88 L 115 74 L 145 66 L 175 64 L 202 70 L 228 80 L 252 92 L 270 108 L 282 124 L 292 142 L 295 162 L 288 182 L 276 198 L 268 218 L 258 238 L 244 255 L 230 268 L 215 272 L 200 264 L 185 252 L 165 240 L 145 228 L 122 214 L 102 198 L 86 180 L 79 160 L 78 138 L 82 116 Z"/>
                {/* Florida peninsula */}
                <path fill="url(#landGrad)" stroke="rgba(100,140,180,0.18)" strokeWidth="0.5"
                  d="M 218 240 L 228 245 L 232 258 L 225 268 L 215 272 L 208 262 L 212 250 Z"/>

                {/* Cuba */}
                <path fill="url(#landGrad)" stroke="rgba(100,140,180,0.18)" strokeWidth="0.4"
                  d="M 190 272 L 208 268 L 222 272 L 224 278 L 210 282 L 194 278 Z"/>

                {/* South America — with NE bulge */}
                <path fill="url(#landGrad)" stroke="rgba(100,140,180,0.18)" strokeWidth="0.6"
                  d="M 216 270 L 238 262 L 260 258 L 284 264 L 304 278 L 318 298 L 324 322 L 320 348 L 312 372 L 298 394 L 278 412 L 258 420 L 238 416 L 220 404 L 208 384 L 200 360 L 198 336 L 200 312 L 205 290 Z"/>

                {/* Europe — with Iberian + Italian + Scandinavian hints */}
                <path fill="url(#landGrad)" stroke="rgba(100,140,180,0.18)" strokeWidth="0.6"
                  d="M 440 190 L 442 180 L 440 166 L 440 152 L 444 138 L 450 126 L 456 116 L 468 109 L 480 105 L 487 95 L 491 82 L 500 75 L 512 74 L 524 80 L 527 93 L 520 108 L 530 108 L 542 116 L 551 128 L 555 144 L 551 158 L 544 170 L 535 182 L 528 194 L 522 206 L 516 218 L 513 228 L 518 234 L 512 224 L 507 215 L 514 204 L 519 194 L 512 188 L 502 190 L 490 193 L 478 197 L 466 200 L 454 200 L 444 195 Z"/>
                {/* Iberian Peninsula */}
                <path fill="url(#landGrad)" stroke="rgba(100,140,180,0.18)" strokeWidth="0.5"
                  d="M 440 190 L 444 195 L 438 202 L 432 208 L 428 200 L 432 192 Z"/>
                {/* UK island hint */}
                <path fill="url(#landGrad)" stroke="rgba(100,140,180,0.18)" strokeWidth="0.4"
                  d="M 448 104 L 460 98 L 468 102 L 466 115 L 456 118 L 447 112 Z"/>

                {/* Africa — with Horn + Gulf of Guinea */}
                <path fill="url(#landGrad)" stroke="rgba(100,140,180,0.18)" strokeWidth="0.6"
                  d="M 440 205 L 478 196 L 515 193 L 550 197 L 570 210 L 586 228 L 594 250 L 598 264 L 636 280 L 625 295 L 608 318 L 590 342 L 568 368 L 542 392 L 517 408 L 492 415 L 466 406 L 445 390 L 434 363 L 426 333 L 424 302 L 425 280 L 412 278 L 404 273 L 416 260 L 422 242 L 428 220 Z"/>
                {/* Madagascar */}
                <path fill="url(#landGrad)" stroke="rgba(100,140,180,0.18)" strokeWidth="0.4"
                  d="M 592 338 L 598 330 L 605 338 L 602 356 L 594 358 Z"/>

                {/* Asia — main body with Arabian Peninsula indent */}
                <path fill="url(#landGrad)" stroke="rgba(100,140,180,0.18)" strokeWidth="0.6"
                  d="M 555 108 L 595 98 L 645 90 L 700 88 L 755 90 L 808 100 L 858 115 L 905 138 L 938 162 L 956 192 L 952 225 L 940 250 L 918 270 L 892 285 L 858 298 L 815 310 L 770 316 L 730 318 L 692 320 L 658 320 L 625 316 L 598 310 L 574 302 L 560 288 L 550 270 L 548 252
                  L 556 250 L 562 262 L 570 270 L 582 268 L 594 258 L 610 248 L 625 238 L 638 240 L 646 252 L 640 268 L 628 278 L 616 286 L 608 295 L 612 305 L 625 316
                  L 598 310 L 560 288 L 550 265 L 547 240 L 546 215 L 548 188 L 550 160 L 552 132 Z"/>
                {/* Arabian Peninsula (cleaner separate path) */}
                <path fill="url(#activeLand)" stroke="rgba(100,140,180,0.22)" strokeWidth="0.6"
                  d="M 548 210 L 560 208 L 572 214 L 580 228 L 578 248 L 568 262 L 556 268 L 548 258 L 546 240 Z M 580 230 L 598 225 L 620 232 L 640 240 L 648 254 L 645 270 L 632 282 L 618 288 L 600 282 L 588 268 L 580 252 Z"/>
                {/* Indian Subcontinent */}
                <path fill="url(#activeLand)" stroke="rgba(100,140,180,0.22)" strokeWidth="0.6"
                  d="M 680 218 L 720 210 L 760 208 L 788 218 L 782 242 L 770 265 L 755 285 L 742 308 L 728 322 L 710 305 L 698 280 L 685 252 L 680 232 Z"/>
                {/* Japan islands */}
                <path fill="url(#landGrad)" stroke="rgba(100,140,180,0.18)" strokeWidth="0.4"
                  d="M 880 148 L 892 142 L 900 150 L 896 162 L 886 165 L 880 158 Z"/>
                <path fill="url(#landGrad)" stroke="rgba(100,140,180,0.18)" strokeWidth="0.4"
                  d="M 896 162 L 910 158 L 918 168 L 912 180 L 900 182 L 895 172 Z"/>
                {/* Sri Lanka */}
                <path fill="url(#landGrad)" stroke="rgba(100,140,180,0.18)" strokeWidth="0.3"
                  d="M 730 326 L 736 322 L 740 330 L 735 338 L 729 336 Z"/>

                {/* Australia — detailed */}
                <path fill="url(#landGrad)" stroke="rgba(100,140,180,0.18)" strokeWidth="0.6"
                  d="M 778 325 L 810 312 L 845 308 L 878 315 L 905 328 L 920 345 L 928 365 L 920 385 L 905 400 L 882 412 L 854 418 L 826 415 L 800 408 L 780 394 L 772 375 L 772 352 L 775 338 Z"/>
                {/* Tasmania */}
                <path fill="url(#landGrad)" stroke="rgba(100,140,180,0.18)" strokeWidth="0.3"
                  d="M 860 422 L 870 418 L 876 428 L 868 434 L 858 430 Z"/>
                {/* New Zealand hint */}
                <path fill="url(#landGrad)" stroke="rgba(100,140,180,0.18)" strokeWidth="0.3"
                  d="M 952 378 L 960 368 L 966 375 L 960 390 L 952 388 Z"/>
              </g>

              {/* ── Curved animated connection lines from Cairo ── */}
              <g fill="none" strokeLinecap="round">
                {/* Cairo → Berlin */}
                <path d="M 562 222 Q 510 145 501 158" stroke="rgba(232,99,42,0.25)" strokeWidth="1.2" strokeDasharray="5 5">
                  <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.8s" repeatCount="indefinite"/>
                </path>
                {/* Cairo → Riyadh */}
                <path d="M 562 222 Q 590 210 617 242" stroke="rgba(232,99,42,0.25)" strokeWidth="1.2" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" values="0;-16" dur="1.5s" repeatCount="indefinite"/>
                </path>
                {/* Cairo → Dubai */}
                <path d="M 562 222 Q 604 205 647 240" stroke="rgba(232,99,42,0.25)" strokeWidth="1.2" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" values="0;-16" dur="1.5s" repeatCount="indefinite"/>
                </path>
                {/* Cairo → Bahrain */}
                <path d="M 562 222 Q 596 208 632 237" stroke="rgba(232,99,42,0.25)" strokeWidth="1.2" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" values="0;-16" dur="1.6s" repeatCount="indefinite"/>
                </path>
                {/* Cairo → São Paulo (long arc over Atlantic) */}
                <path d="M 562 222 Q 400 160 289 362" stroke="rgba(232,99,42,0.15)" strokeWidth="1" strokeDasharray="6 6">
                  <animate attributeName="stroke-dashoffset" values="0;-24" dur="2.2s" repeatCount="indefinite"/>
                </path>
              </g>

              {/* ── Location pins (teardrop style) ── */}
              {reachLocations.map((loc, i) => {
                const isActive = activePin === i;
                const isCairo  = loc.name === "Egypt";
                return (
                  <g
                    key={loc.name}
                    transform={`translate(${loc.x}, ${loc.y})`}
                    onMouseEnter={() => setActivePin(i)}
                    onMouseLeave={() => setActivePin(null)}
                    style={{ cursor: "pointer" }}
                    filter={isActive ? "url(#pinGlow)" : undefined}
                  >
                    {/* Pulse ring (larger for Cairo HQ) */}
                    <circle cx="0" cy="0" r={isCairo ? 20 : 14} fill="rgba(232,99,42,0.0)" stroke={isCairo ? "rgba(232,99,42,0.35)" : "rgba(232,99,42,0.25)"} strokeWidth="1">
                      <animate attributeName="r"       values={isCairo ? "14;22;14" : "10;17;10"} dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.5;0;0.5" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite"/>
                    </circle>

                    {/* Teardrop pin shape */}
                    <path
                      d={`M 0 -17 C -7 -17 -7 -9 -7 -9 C -7 -3 0 6 0 6 C 0 6 7 -3 7 -9 C 7 -9 7 -17 0 -17 Z`}
                      fill={isCairo ? "#F5C842" : "#E8632A"}
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="1"
                    />
                    {/* Pin inner dot */}
                    <circle cx="0" cy="-9" r="3" fill="white" opacity="0.9"/>
                    {/* Pin shadow/ground dot */}
                    <ellipse cx="0" cy="8" rx="4" ry="1.5" fill="rgba(0,0,0,0.4)"/>

                    {/* Hover tooltip */}
                    {isActive && (
                      <g transform="translate(10, -32)">
                        <rect x="0" y="0" width={(loc.name.length + loc.city.length) * 5.5 + 22} height="26" rx="6"
                          fill="rgba(6,13,24,0.96)" stroke={isCairo ? "rgba(245,200,66,0.5)" : "rgba(232,99,42,0.5)"} strokeWidth="1"/>
                        <text x="10" y="11" fill={isCairo ? "#F5C842" : "#E8632A"} fontSize="9" fontFamily="Syne, sans-serif" fontWeight="700">{loc.name}</text>
                        <text x="10" y="21" fill="rgba(255,255,255,0.55)" fontSize="8" fontFamily="DM Sans, sans-serif">{loc.city}</text>
                      </g>
                    )}

                    {/* Persistent small label */}
                    {!isActive && (
                      <text x="10" y="-9" fill="rgba(255,255,255,0.38)" fontSize="8" fontFamily="DM Sans, sans-serif" fontWeight="500">{loc.name}</text>
                    )}
                  </g>
                );
              })}

              {/* Equator label */}
              <text x="12" y="312" fill="rgba(255,255,255,0.12)" fontSize="7" fontFamily="DM Sans, sans-serif">Equator</text>
            </svg>
          </div>

          {/* Country Map Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
            {countries.map((country) => (
              <div key={country.name} className="flex flex-col items-center gap-3 group cursor-pointer">
                {/* Map card */}
                <div
                  className="relative w-full rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-[1.04]"
                  style={{
                    height: "140px",
                    border: `1px solid ${country.color}30`,
                    boxShadow: `0 0 0 0 ${country.color}00`,
                    transition: "transform 0.4s ease, box-shadow 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px 2px ${country.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${country.color}00`;
                  }}
                >
                  <MiniMap
                    center={country.center}
                    pin={country.pin}
                    zoom={country.zoom}
                    color={country.color}
                  />

                  {/* Branded overlay — country name badge */}
                  <div
                    className="absolute bottom-0 left-0 right-0 px-3 py-1.5 flex items-center gap-1.5"
                    style={{ background: "linear-gradient(to top, rgba(6,13,24,0.9) 60%, transparent)" }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: country.color, boxShadow: `0 0 5px ${country.color}` }}
                    />
                    <span
                      className="text-white/80 text-xs"
                      style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 500, letterSpacing: "0.06em" }}
                    >
                      {country.city}
                    </span>
                  </div>
                </div>

                {/* Label */}
                <span
                  className="text-white/40 text-xs tracking-[0.18em] uppercase text-center group-hover:text-white/75 transition-colors duration-300"
                  style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 500 }}
                >
                  {country.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Footer */}
      <div className="border-t border-white/5 py-6 text-center">
        <p className="text-white/20 text-xs" style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300 }}>
          © {new Date().getFullYear()} Adluma. All rights reserved.
        </p>
      </div>
    </div>
  );
}

// Icon components
function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="#E8632A" strokeWidth="1.5" />
      <path d="M2 8l10 6 10-6" stroke="#E8632A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M6 2h4l2 5-2.5 1.5A11 11 0 0 0 15.5 14.5L17 12l5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 4 4a2 2 0 0 1 2-2" stroke="#E8632A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 14 6 14s6-8.75 6-14c0-3.314-2.686-6-6-6z" stroke="#E8632A" strokeWidth="1.5" />
      <circle cx="12" cy="8" r="2" stroke="#E8632A" strokeWidth="1.5" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 10v7M7 7v.5M12 10v7M12 13a3 3 0 0 1 6 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
