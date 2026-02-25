import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import logoImage from "../../assets/5e154046a90f5ea0433f1ff73ea3cc95d52835e5.png";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Work", id: "projects" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (!isHome) return;
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080808]/90 backdrop-blur-lg border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logoImage}
            alt="Adluma Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.label}>
              {isHome ? (
                <button
                  onClick={() => scrollTo(link.id)}
                  className="text-white/60 hover:text-white transition-colors duration-300 text-sm uppercase cursor-pointer bg-transparent border-none"
                  style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "0.1em" }}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  to={`/#${link.id}`}
                  className="text-white/60 hover:text-white transition-colors duration-300 text-sm uppercase no-underline"
                  style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "0.1em" }}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
          <li>
            <Link
              to="/portfolio"
              className={`text-sm uppercase no-underline transition-colors duration-300 ${location.pathname === "/portfolio" ? "text-white" : "text-white/60 hover:text-white"}`}
              style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "0.1em" }}
            >
              Portfolio
            </Link>
          </li>
        </ul>

        {/* CTA */}
        <Link
          to="/contact"
          className={`hidden md:block text-sm px-5 py-2 rounded-full border no-underline transition-all duration-300 ${
            location.pathname === "/contact"
              ? "border-orange-400 text-white"
              : "border-white/20 text-white/80 hover:border-orange-400 hover:text-white"
          }`}
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Let's Talk
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-none p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/5 px-6 py-6">
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <li key={link.label}>
                {isHome ? (
                  <button
                    onClick={() => { scrollTo(link.id); setMenuOpen(false); }}
                    className="text-white/70 hover:text-white text-sm uppercase cursor-pointer bg-transparent border-none"
                    style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "0.08em" }}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    to={`/#${link.id}`}
                    className="text-white/70 hover:text-white text-sm uppercase no-underline"
                    style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "0.08em" }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <Link
                to="/portfolio"
                className="text-white/70 hover:text-white text-sm uppercase no-underline"
                style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "0.08em" }}
                onClick={() => setMenuOpen(false)}
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="inline-block mt-2 text-sm px-5 py-2 rounded-full border border-orange-500/50 text-orange-400 no-underline"
                style={{ fontFamily: "DM Sans, sans-serif" }}
                onClick={() => setMenuOpen(false)}
              >
                Let's Talk
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
