import { useEffect, useRef } from "react";

const partners = [
  "Seven Zone", "Town Burger", "Bassthalk", "Navigate PR", "Luminar Group",
  "DreamCube", "VPW Creative", "Legear", "Intersport", "Carey Global",
  "RPM3 Agency", "Logic Partners", "BUNYIP Equipment", "Sofa & Soul",
  "Machter Auto", "SVC Media", "ADA Digital", "Dutton One", "Davies Collision", "Hometown AU",
];

export function EcosystemSection() {
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let pos1 = 0;
    let pos2 = 0;
    const speed = 0.4;

    const animate = () => {
      pos1 -= speed;
      pos2 += speed;

      const halfWidth1 = (track1Ref.current?.scrollWidth ?? 0) / 2;
      const halfWidth2 = (track2Ref.current?.scrollWidth ?? 0) / 2;

      if (Math.abs(pos1) >= halfWidth1) pos1 = 0;
      if (pos2 >= 0) pos2 = -halfWidth2;

      if (track1Ref.current) track1Ref.current.style.transform = `translateX(${pos1}px)`;
      if (track2Ref.current) track2Ref.current.style.transform = `translateX(${pos2}px)`;

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const half1 = partners.slice(0, 10);
  const half2 = partners.slice(10);

  return (
    <section className="relative bg-[#060606] py-24 md:py-32 overflow-hidden">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, #E8632A 30%, #9B5DE5 70%, transparent 100%)", opacity: 0.3 }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #E8632A, #9B5DE5)" }} />
          <span
            className="text-xs tracking-[0.25em] uppercase text-white/30"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Our Ecosystem
          </span>
        </div>

        <div className="max-w-2xl">
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            More Than a{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #E8632A, #F5C842)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Digital House.
            </span>
          </h2>
          <p
            className="mt-4 text-white/40"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "clamp(0.9rem, 1.4vw, 1rem)",
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            Adluma operates within a larger business ecosystem designed to support
            brands at every stage of growth.
          </p>
        </div>
      </div>

      {/* Scrolling marquees */}
      <div className="overflow-hidden mb-6" style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
        <div className="flex" ref={track1Ref} style={{ whiteSpace: "nowrap", width: "max-content" }}>
          {[...half1, ...half1].map((name, i) => (
            <PartnerTag key={`t1-${i}`} name={name} />
          ))}
        </div>
      </div>

      <div className="overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
        <div className="flex" ref={track2Ref} style={{ whiteSpace: "nowrap", width: "max-content", transform: "translateX(-50%)" }}>
          {[...half2, ...half2].map((name, i) => (
            <PartnerTag key={`t2-${i}`} name={name} variant="outlined" />
          ))}
        </div>
      </div>

      {/* Bottom border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(155,93,229,0.3) 50%, transparent 100%)" }} />
    </section>
  );
}

function PartnerTag({ name, variant = "filled" }: { name: string; variant?: "filled" | "outlined" }) {
  return (
    <div
      className="inline-flex items-center mx-3 px-6 py-3 rounded-full"
      style={{
        fontFamily: "DM Sans, sans-serif",
        fontSize: "0.85rem",
        letterSpacing: "0.05em",
        color: variant === "filled" ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)",
        background: variant === "filled" ? "rgba(255,255,255,0.05)" : "transparent",
        border: variant === "filled" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.06)",
        whiteSpace: "nowrap",
      }}
    >
      {name}
    </div>
  );
}