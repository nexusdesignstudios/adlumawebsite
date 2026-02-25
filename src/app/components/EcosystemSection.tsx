import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "./ui/carousel";
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

export function EcosystemSection() {
  const [logos, setLogos] = useState<{ src: string; alt: string }[]>(defaultLogos);
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/trusted-brands");
        if (res.ok) {
          const list = await res.json();
          if (Array.isArray(list) && list.length) {
            setLogos(list.map((b: any) => ({ src: b.image_url || "", alt: b.name || "Brand" })));
          }
        }
      } catch {
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!api) return;
    const id = setInterval(() => {
      api.scrollNext();
    }, 2500);
    return () => clearInterval(id);
  }, [api]);

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

      {/* Logo slider (editable via Admin → Trusted Brands) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative">
          <Carousel
            opts={{ loop: true, align: "start" }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent className="gap-6">
              {logos.map((logo, i) => (
                <CarouselItem key={i} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                  <div
                    className="flex items-center justify-center rounded-xl"
                    style={{ height: 80, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-h-full max-w-full object-contain"
                      style={{ filter: "grayscale(100%) brightness(10)", opacity: 0.35 }}
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Bottom border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(155,93,229,0.3) 50%, transparent 100%)" }} />
    </section>
  );
}
