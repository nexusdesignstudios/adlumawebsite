import { useRef, useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    quote: "Adluma didn't just deliver campaigns — they built a content system that runs itself. Our engagement tripled in the first 90 days.",
    name: "Omar Hassan",
    title: "Founder, Seven Zone",
    initials: "OH",
    color: "#E8632A",
  },
  {
    id: 2,
    quote: "The strategic clarity they brought was unlike anything we'd experienced. Every decision was intentional, every visual told our story.",
    name: "Mariam Khalil",
    title: "Marketing Director, Town Burger",
    initials: "MK",
    color: "#F5C842",
  },
  {
    id: 3,
    quote: "Our course enrollments grew by 312% after Adluma took over our content strategy. The results speak for themselves.",
    name: "Ahmed Saber",
    title: "CEO, Bassthalk",
    initials: "AS",
    color: "#9B5DE5",
  },
  {
    id: 4,
    quote: "They understand brand positioning at a deep level. We went from being another agency to being the agency in our market.",
    name: "Sara El-Masry",
    title: "Brand Manager, Navigate PR",
    initials: "SE",
    color: "#E8632A",
  },
  {
    id: 5,
    quote: "The web platform Adluma built for us handles over 50K monthly users with zero issues. The engineering quality is exceptional.",
    name: "Karim Naguib",
    title: "CTO, DreamCube",
    initials: "KN",
    color: "#F5C842",
  },
  {
    id: 6,
    quote: "From strategy to execution, Adluma was always two steps ahead. They feel more like a growth partner than an agency.",
    name: "Nour Abdallah",
    title: "Director, Luminar Group",
    initials: "NA",
    color: "#9B5DE5",
  },
];

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft ?? 0));
    setScrollLeft(scrollRef.current?.scrollLeft ?? 0);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.pageX - (scrollRef.current.offsetLeft ?? 0);
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const onMouseUp = () => setIsDragging(false);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let rafId: number;
    const scroll = () => {
      if (!isDragging) {
        el.scrollLeft += 0.5;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      }
      rafId = requestAnimationFrame(scroll);
    };
    rafId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(rafId);
  }, [isDragging]);

  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="relative bg-[#080808] py-24 md:py-32 overflow-hidden">
      {/* Gradient line top */}
      <div className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{ background: "linear-gradient(90deg, transparent, #E8632A 30%, #9B5DE5 70%, transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-14">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #E8632A, #9B5DE5)" }} />
          <span
            className="text-xs tracking-[0.25em] uppercase text-white/30"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Client Stories
          </span>
        </div>

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
          What Clients{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #F5C842, #9B5DE5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Say.
          </span>
        </h2>
      </div>

      {/* Scrollable testimonials */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-2 select-none"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: isDragging ? "grabbing" : "grab",
          maskImage: "linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)",
          paddingLeft: "max(24px, calc((100vw - 1280px) / 2 + 48px))",
          paddingRight: "max(24px, calc((100vw - 1280px) / 2 + 48px))",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`t-${i}`} testimonial={t} />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div
      className="flex-shrink-0 w-80 md:w-96 p-7 rounded-2xl border border-white/7 relative overflow-hidden"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      {/* Quote mark */}
      <div
        className="absolute top-5 right-6 text-5xl leading-none opacity-10"
        style={{
          fontFamily: "Georgia, serif",
          color: testimonial.color,
          lineHeight: 1,
        }}
      >
        "
      </div>

      {/* Quote */}
      <p
        className="text-white/60 mb-8 relative z-10"
        style={{
          fontFamily: "DM Sans, sans-serif",
          fontSize: "0.92rem",
          lineHeight: 1.8,
          fontWeight: 300,
        }}
      >
        "{testimonial.quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${testimonial.color}40, ${testimonial.color}20)`,
            border: `1px solid ${testimonial.color}40`,
          }}
        >
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: testimonial.color,
            }}
          >
            {testimonial.initials}
          </span>
        </div>
        <div>
          <div
            className="text-white"
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            {testimonial.name}
          </div>
          <div
            className="text-white/30"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 300,
            }}
          >
            {testimonial.title}
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, ${testimonial.color}40, transparent)` }}
      />
    </div>
  );
}