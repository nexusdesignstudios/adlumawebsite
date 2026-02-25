import { Link } from "react-router";
import logoImage from "../../assets/5e154046a90f5ea0433f1ff73ea3cc95d52835e5.png";
import { useSiteData } from "../lib/siteDataStore";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#capabilities" },
  { label: "Work", href: "/#projects" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  instagram: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>,
  linkedin: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" /><path d="M7 10v7M7 7v.5M12 10v7M12 13a3 3 0 0 1 6 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  tiktok: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  facebook: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  twitter: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
};

export function Footer() {
  const { footer } = useSiteData();
  const year = new Date().getFullYear();

  const socialEntries = Object.entries(footer.socialLinks).filter(([, url]) => url);

  return (
    <footer className="relative bg-[#050505] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, #E8632A 30%, #9B5DE5 70%, transparent 100%)", opacity: 0.35 }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] blur-[140px] opacity-[0.04] pointer-events-none" style={{ background: "linear-gradient(135deg, #E8632A, #9B5DE5)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="py-16 grid md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {/* ─ Brand ─ */}
          <div className="space-y-5">
            <img src={logoImage} alt="Adluma" className="h-10 w-auto object-contain" />
            <p className="text-white/40" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.85rem", lineHeight: 1.7, fontWeight: 300 }}>
              {footer.tagline}
            </p>
            <p className="text-white/25" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.82rem", lineHeight: 1.8, fontWeight: 300 }}>
              {footer.description}
            </p>
          </div>

          {/* ─ Quick Links ─ */}
          <div>
            <h4 className="text-white/50 mb-6 text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "DM Sans, sans-serif" }}>Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/") && !link.href.includes("#") ? (
                    <Link to={link.href} className="text-white/35 hover:text-white transition-colors duration-200 text-sm no-underline flex items-center gap-2 group" style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300 }}>
                      <span className="h-px w-4 opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ background: "linear-gradient(90deg, #E8632A, #9B5DE5)" }} />
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-white/35 hover:text-white transition-colors duration-200 text-sm no-underline flex items-center gap-2 group" style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300 }}>
                      <span className="h-px w-4 opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ background: "linear-gradient(90deg, #E8632A, #9B5DE5)" }} />
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ─ Contact + Social ─ */}
          <div>
            <h4 className="text-white/50 mb-6 text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "DM Sans, sans-serif" }}>Contact</h4>
            <div className="space-y-3 mb-8">
              {footer.email && (
                <a href={`mailto:${footer.email}`} className="flex items-center gap-3 text-white/35 hover:text-white/70 transition-colors duration-200 no-underline group">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(232,99,42,0.08)", border: "1px solid rgba(232,99,42,0.15)" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="#E8632A" strokeWidth="1.5" /><path d="M2 8l10 6 10-6" stroke="#E8632A" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </div>
                  <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.85rem", fontWeight: 300 }}>{footer.email}</span>
                </a>
              )}
              {footer.phone && (
                <a href={`tel:${footer.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-white/35 hover:text-white/70 transition-colors duration-200 no-underline group">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(232,99,42,0.08)", border: "1px solid rgba(232,99,42,0.15)" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6 2h4l2 5-2.5 1.5A11 11 0 0 0 15.5 14.5L17 12l5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 4 4a2 2 0 0 1 2-2" stroke="#E8632A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.85rem", fontWeight: 300 }}>{footer.phone}</span>
                </a>
              )}
              {footer.address && (
                <div className="flex items-center gap-3 text-white/35">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(232,99,42,0.08)", border: "1px solid rgba(232,99,42,0.15)" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#E8632A" strokeWidth="1.5" /><circle cx="12" cy="10" r="3" stroke="#E8632A" strokeWidth="1.5" /></svg>
                  </div>
                  <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.85rem", fontWeight: 300 }}>Dubai</span>
                </div>
              )}
            </div>

            {socialEntries.length > 0 && (
              <div>
                <p className="text-white/25 text-xs mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "DM Sans, sans-serif" }}>Follow Us</p>
                <div className="flex gap-2.5 flex-wrap">
                  {socialEntries.map(([key, url]) => (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" title={key}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white/30 hover:text-white hover:border-white/25 transition-all duration-300 no-underline"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      {SOCIAL_ICONS[key]}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs" style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300 }}>
            © {year} {footer.copyrightName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a key={item} href="#" className="text-white/20 hover:text-white/40 transition-colors text-xs no-underline" style={{ fontFamily: "DM Sans, sans-serif" }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
