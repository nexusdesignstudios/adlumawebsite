import { useEffect, useState } from "react";
import sevenZoneLogo from "../../assets/600227056b7527b69705be543b80a752afdf113a.png";
import geetLogo from "../../assets/f9299fee2291d2653b9ad275166146e7d0dcf969.png";
import logo3 from "../../assets/9a46bf1421ea19514e084d6f8de44420cb549f46.png";
import logo4 from "../../assets/050284a61b1befb9fd4efcb5ee28b0e8213df906.png";
import logo5 from "../../assets/be057d547073de06678a38796ebc5c25417e74df.png";
import logo6 from "../../assets/5d0ae4cf5528886a7469ba06f79edad53593e92d.png";
import nexusLogo from "../../assets/96dee2bfb9864119bd21b5369f6dbcde771d81cc.png";
import nexusDesignArabia from "../../assets/330faa420bd606ea43428f48ae75c04f6ac26483.png";

const defaultLogos = [
  { src: sevenZoneLogo, alt: "Seven Zone" },
  { src: geetLogo, alt: "Geet" },
  { src: logo3, alt: "Brand 3" },
  { src: logo4, alt: "Brand 4" },
  { src: logo5, alt: "Brand 5" },
  { src: logo6, alt: "Brand 6" },
  { src: nexusLogo, alt: "Nexus" },
  { src: nexusDesignArabia, alt: "Nexus Design Arabia" },
];

export function TrustedBrandsSection() {
  const [heading, setHeading] = useState<{ pre: string; gradient: string } | null>(null);
  const [logos, setLogos] = useState<{ src: string; alt: string }[]>(defaultLogos);

  useEffect(() => {
    const load = async () => {
      try {
        const [contentsRes, brandsRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/contents"),
          fetch("http://127.0.0.1:8000/api/trusted-brands"),
        ]);
        let newHeading = null as { pre: string; gradient: string } | null;
        if (contentsRes.ok) {
          const contents = await contentsRes.json();
          const item = contents.find((c: any) => c.key === "trusted_brands_heading");
          if (item) {
            try {
              const parsed = item.type === "json" ? JSON.parse(item.value || "{}") : null;
              if (parsed && typeof parsed.pre === "string" && typeof parsed.gradient === "string") {
                newHeading = { pre: parsed.pre, gradient: parsed.gradient };
              }
            } catch {}
          }
        }
        if (newHeading) setHeading(newHeading);
        if (brandsRes.ok) {
          const list = await brandsRes.json();
          if (Array.isArray(list) && list.length) {
            setLogos(list.map((b: any) => ({ src: b.image_url || "", alt: b.name || "Brand" })));
          }
        }
      } catch {}
    };
    load();
  }, []);

  const track = [...logos, ...logos];

  return (
    <section className="relative bg-[#080808] py-20 overflow-hidden">
      {/* Top border line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
      />

      {/* Decorative gradient blob */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 opacity-[0.03] blur-[120px] pointer-events-none"
        style={{ background: "linear-gradient(90deg, #E8632A, #9B5DE5)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        {/* Label */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #E8632A, #9B5DE5)" }} />
          <span
            className="text-xs tracking-[0.25em] uppercase text-white/30"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Our Clients
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {(heading?.pre ?? "Trusted by") + " "}
          <span
            style={{
              background: "linear-gradient(90deg, #E8632A, #F5C842)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {heading?.gradient ?? "Growing Brands."}
          </span>
        </h2>
      </div>

      {/* Logo slider */}
      <div className="relative">
        {/* Left fade mask */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #080808, transparent)" }}
        />
        {/* Right fade mask */}
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(-90deg, #080808, transparent)" }}
        />

        {/* Scrolling track */}
        <div className="overflow-hidden">
          <div
            className="flex items-center gap-16"
            style={{
              width: "max-content",
              animation: "marquee 32s linear infinite",
            }}
          >
            {track.map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: 160, height: 80 }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-full max-w-full object-contain"
                  style={{
                    filter: "grayscale(100%) brightness(10)",
                    opacity: 0.35,
                    transition: "opacity 0.3s ease, filter 0.3s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%) brightness(1)";
                    (e.currentTarget as HTMLImageElement).style.opacity = "1";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLImageElement).style.filter = "grayscale(100%) brightness(10)";
                    (e.currentTarget as HTMLImageElement).style.opacity = "0.35";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Keyframe injection */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Bottom border line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
      />
    </section>
  );
}
