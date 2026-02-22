import { useState, useRef } from "react";
import { Link } from "react-router";

const locations = [
  { name: "Egypt", x: 535, y: 228, desc: "Cairo HQ" },
  { name: "UAE", x: 630, y: 262, desc: "Dubai" },
  { name: "KSA", x: 604, y: 255, desc: "Riyadh" },
  { name: "Bahrain", x: 623, y: 250, desc: "Manama" },
  { name: "Brazil", x: 268, y: 325, desc: "São Paulo" },
  { name: "Germany", x: 490, y: 163, desc: "Berlin" },
];

export function ContactSection() {
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
    <section id="contact" className="relative bg-[#080808] py-24 md:py-36 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[160px] opacity-[0.04] pointer-events-none"
        style={{ background: "linear-gradient(135deg, #E8632A, #9B5DE5)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #E8632A, #9B5DE5)" }} />
          <span className="text-xs tracking-[0.25em] uppercase text-white/30" style={{ fontFamily: "DM Sans, sans-serif" }}>
            Get in Touch
          </span>
        </div>

        <div className="mb-16">
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Ready When{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #E8632A, #F5C842 50%, #9B5DE5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              You Are.
            </span>
          </h2>
          <p
            className="mt-4 text-white/40 max-w-lg"
            style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8 }}
          >
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          {/* — Form — */}
          <div>
            {submitted ? (
              <div
                className="flex flex-col items-start justify-center py-16 px-8 rounded-2xl border border-white/6"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                  style={{ background: "rgba(232,99,42,0.15)", border: "1px solid rgba(232,99,42,0.3)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10l5 5 7-7" stroke="#E8632A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-white mb-2" style={{ fontFamily: "Syne, sans-serif", fontSize: "1.3rem", fontWeight: 700 }}>
                  Message received.
                </h3>
                <p className="text-white/40 text-sm" style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, lineHeight: 1.7 }}>
                  We'll review your brief and get back to you within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
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
                    className="w-full px-4 py-3.5 rounded-xl bg-white/3 border border-white/8 text-white placeholder-white/20 focus:outline-none focus:border-orange-500/40 transition-colors duration-200 text-sm"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs text-white/30 mb-2 tracking-wider uppercase" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Your company or brand"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/3 border border-white/8 text-white placeholder-white/20 focus:outline-none focus:border-orange-500/40 transition-colors duration-200 text-sm"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  />
                </div>

                {/* Email / Phone */}
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
                    className="w-full px-4 py-3.5 rounded-xl bg-white/3 border border-white/8 text-white placeholder-white/20 focus:outline-none focus:border-orange-500/40 transition-colors duration-200 text-sm"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  />
                </div>

                {/* Message */}
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
                    className="w-full px-4 py-3.5 rounded-xl bg-white/3 border border-white/8 text-white placeholder-white/20 focus:outline-none focus:border-orange-500/40 transition-colors duration-200 text-sm resize-none"
                    style={{ fontFamily: "DM Sans, sans-serif", lineHeight: 1.7 }}
                  />
                </div>

                {/* Submit */}
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
            )}
          </div>

          {/* — Map — */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-white/25 mb-5" style={{ fontFamily: "DM Sans, sans-serif" }}>
              Our Presence
            </p>

            {/* World Map SVG */}
            <div
              className="relative rounded-2xl overflow-hidden border border-white/6"
              style={{ background: "rgba(255,255,255,0.015)" }}
            >
              <svg
                viewBox="0 0 1000 500"
                className="w-full"
                style={{ display: "block" }}
              >
                {/* Continent fills */}
                <g fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8">
                  {/* North America */}
                  <path d="M 95 92 L 168 78 L 238 86 L 288 112 L 310 148 L 300 192 L 276 238 L 248 268 L 215 272 L 185 248 L 145 220 L 108 188 L 82 155 Z" />
                  {/* Greenland */}
                  <path d="M 302 48 L 368 38 L 408 55 L 415 82 L 390 105 L 348 112 L 310 95 Z" />
                  {/* South America */}
                  <path d="M 218 272 L 268 262 L 312 278 L 325 322 L 318 372 L 296 412 L 265 422 L 238 410 L 218 378 L 210 335 Z" />
                  {/* Europe */}
                  <path d="M 445 115 L 488 106 L 533 114 L 558 132 L 552 168 L 526 190 L 488 195 L 456 180 L 442 150 Z" />
                  {/* Africa */}
                  <path d="M 452 198 L 498 188 L 548 196 L 572 220 L 578 258 L 568 305 L 550 352 L 524 388 L 496 402 L 468 392 L 450 360 L 442 308 L 446 252 Z" />
                  {/* Asia */}
                  <path d="M 555 108 L 648 95 L 752 98 L 852 120 L 928 152 L 958 192 L 950 242 L 915 278 L 858 300 L 788 312 L 718 308 L 650 318 L 598 310 L 564 288 L 550 258 L 547 210 L 550 158 Z" />
                  {/* Australia */}
                  <path d="M 778 322 L 862 310 L 916 328 L 930 368 L 908 405 L 860 418 L 808 410 L 778 382 L 776 348 Z" />
                </g>

                {/* Grid lines */}
                <g stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" fill="none">
                  <line x1="0" y1="165" x2="1000" y2="165" />
                  <line x1="0" y1="250" x2="1000" y2="250" />
                  <line x1="0" y1="335" x2="1000" y2="335" />
                  <line x1="250" y1="0" x2="250" y2="500" />
                  <line x1="500" y1="0" x2="500" y2="500" />
                  <line x1="750" y1="0" x2="750" y2="500" />
                </g>

                {/* Location Pins */}
                {locations.map((loc, i) => (
                  <g
                    key={loc.name}
                    transform={`translate(${loc.x}, ${loc.y})`}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setActivePin(i)}
                    onMouseLeave={() => setActivePin(null)}
                  >
                    {/* Pulse ring */}
                    <circle cx="0" cy="0" r="12" fill="rgba(232,99,42,0.1)" stroke="rgba(232,99,42,0.2)" strokeWidth="1">
                      <animate attributeName="r" values="10;16;10" dur="2.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    {/* Pin dot */}
                    <circle cx="0" cy="0" r="5" fill="#E8632A" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="2" fill="white" />
                    {/* Label */}
                    {activePin === i && (
                      <g transform="translate(8, -18)">
                        <rect x="-2" y="-12" width={loc.name.length * 7 + 12} height="18" rx="4" fill="rgba(8,8,8,0.92)" stroke="rgba(232,99,42,0.4)" strokeWidth="1" />
                        <text x="4" y="-1" fill="white" fontSize="9" fontFamily="DM Sans, sans-serif" fontWeight="500">{loc.name}</text>
                      </g>
                    )}
                    {/* Always-visible name for larger pins */}
                    {activePin !== i && (
                      <text x="9" y="4" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="DM Sans, sans-serif">{loc.name}</text>
                    )}
                  </g>
                ))}
              </svg>

              {/* Location tags below map */}
              <div className="px-5 pb-5 pt-1 flex flex-wrap gap-2">
                {locations.map((loc) => (
                  <div
                    key={loc.name}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(232,99,42,0.06)", border: "1px solid rgba(232,99,42,0.15)" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#E8632A" }} />
                    <span className="text-xs text-white/50" style={{ fontFamily: "DM Sans, sans-serif" }}>
                      {loc.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { icon: "✉", label: "Email", value: "hello@adluma.com" },
                { icon: "☎", label: "Phone", value: "+20 100 000 0000" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="px-4 py-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="text-xs text-white/25 mb-1" style={{ fontFamily: "DM Sans, sans-serif" }}>{item.label}</div>
                  <div className="text-sm text-white/60" style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 400 }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Link to full contact page */}
            <div className="mt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-300 no-underline"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                View our full global outreach
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 4l4 3-4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
