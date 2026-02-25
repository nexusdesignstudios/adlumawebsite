import { useState, useEffect } from "react";

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  tag: string;
  img: string;
  bio: string;
  since: string;
  isLeadership: boolean;
}

export interface HeroContent {
  headlinePre: string;
  headlineGradient: string;
  headlinePost: string;
  headlineItalic: string;
  subtext: string;
  services: string[];
  ctaLabel: string;
  secondaryCta: string;
  yearBadge: string;
  media?: { type: "image" | "video"; src: string }[];
}

export interface FooterContent {
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  copyrightName: string;
  socialLinks: {
    instagram: string;
    linkedin: string;
    tiktok: string;
    facebook: string;
    twitter: string;
  };
}

export interface SEOContent {
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterHandle: string;
}

export interface Project {
  id: string;
  client: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
  featured: boolean;
}

export interface SiteData {
  team: TeamMember[];
  hero: HeroContent;
  footer: FooterContent;
  seo: SEOContent;
  projects: Project[];
}

// ─────────────────────────────────────────
// DEFAULTS
// ─────────────────────────────────────────

export const DEFAULT_DATA: SiteData = {
  team: [
    {
      id: "1", name: "Karim El-Masri", role: "Founder & Creative Director",
      tag: "Strategy · Vision", since: "2018", isLeadership: true,
      bio: "The architect behind Adluma. Karim blends brand philosophy with growth mechanics — turning ideas into market-defining moves.",
      img: "https://images.unsplash.com/photo-1648929725812-e6594b5095bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    },
    {
      id: "2", name: "Lena Hoffman", role: "Brand Strategist",
      tag: "Identity · Positioning", since: "2019", isLeadership: true,
      bio: "Lena decodes the invisible — understanding what makes a brand magnetic and building systems that sustain that pull over time.",
      img: "https://images.unsplash.com/photo-1695048994291-2e96839a0a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    },
    {
      id: "3", name: "Yasmine Nouri", role: "Head of Performance",
      tag: "Growth · Analytics", since: "2020", isLeadership: true,
      bio: "Data doesn't lie — Yasmine listens to it. She engineers performance strategies that compound: every campaign smarter than the last.",
      img: "https://images.unsplash.com/photo-1627890458144-4c0c481bf4b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    },
    {
      id: "4", name: "Omar Rashid", role: "Content & Media Lead",
      tag: "Storytelling · Video", since: "2020", isLeadership: false,
      bio: "Omar crafts content that moves people — literally and emotionally.",
      img: "https://images.unsplash.com/photo-1608814352457-9a612735c0d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    },
    {
      id: "5", name: "Sofia Andrade", role: "UX & Digital Designer",
      tag: "Design · Systems", since: "2021", isLeadership: false,
      bio: "Sofia transforms complex ideas into intuitive digital experiences.",
      img: "https://images.unsplash.com/photo-1603034052496-5bd9d20ad47a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    },
    {
      id: "6", name: "Nadia Saleh", role: "Social Media Strategist",
      tag: "Community · Trends", since: "2021", isLeadership: false,
      bio: "Nadia lives where culture and strategy intersect.",
      img: "https://images.unsplash.com/photo-1761001311910-7b29541488f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    },
    {
      id: "7", name: "Tariq Mansour", role: "Paid Media Specialist",
      tag: "PPC · Conversion", since: "2022", isLeadership: false,
      bio: "Tariq turns ad budgets into revenue engines.",
      img: "https://images.unsplash.com/photo-1738750908048-14200459c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    },
    {
      id: "8", name: "Isabelle Moreau", role: "Copywriter & Narrative Lead",
      tag: "Words · Persuasion", since: "2022", isLeadership: false,
      bio: "Isabelle writes words that sell without feeling like they're selling.",
      img: "https://images.unsplash.com/photo-1604247203891-ae01b7b2f1bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    },
    {
      id: "9", name: "Darius Cole", role: "Motion & Video Director",
      tag: "Film · Production", since: "2022", isLeadership: false,
      bio: "Darius gives brands a cinematic presence.",
      img: "https://images.unsplash.com/photo-1620938289449-98879e017b06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    },
  ],

  hero: {
    headlinePre: "Built to",
    headlineGradient: "Grow.",
    headlinePost: "Designed",
    headlineItalic: "to Last.",
    subtext: "We build structured digital systems that help ambitious brands move forward — clearly and confidently.",
    services: ["Brand Strategy", "Performance Marketing", "Content Creation", "Social Media"],
    ctaLabel: "Discover Adluma",
    secondaryCta: "VIEW WORK",
    yearBadge: "Est. 2018",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1701365516650-06e030f81613?q=80&w=1920&auto=format&fit=crop" },
      { type: "image", src: "https://images.unsplash.com/photo-1764347295958-6a729b1fdf7e?q=80&w=1920&auto=format&fit=crop" },
      { type: "video", src: "https://cdn.coverr.co/videos/coverr-creative-studio-1624/1080p.mp4" },
    ],
  },

  footer: {
    tagline: "Strategy. Creative. Technology.",
    description: "A modern digital house built on clarity, structure, and intention — built to grow brands that matter.",
    email: "hello@adluma.com",
    phone: "+20 100 000 0000",
    address: "Cairo, Egypt",
    copyrightName: "Adluma",
    socialLinks: {
      instagram: "https://instagram.com/adluma",
      linkedin: "https://linkedin.com/company/adluma",
      tiktok: "https://tiktok.com/@adluma",
      facebook: "https://facebook.com/adluma",
      twitter: "https://twitter.com/adluma",
    },
  },

  seo: {
    siteTitle: "Adluma — Digital Marketing Agency",
    metaDescription: "Adluma is a premium digital marketing agency specializing in brand strategy, performance marketing, and creative production.",
    keywords: "digital marketing, brand strategy, performance marketing, content creation, social media",
    ogTitle: "Adluma — Built to Grow. Designed to Last.",
    ogDescription: "Premium digital marketing agency for ambitious brands.",
    ogImage: "",
    twitterHandle: "@adluma",
  },

  projects: [
    {
      id: "1", client: "Seven Zone", category: "Social Media & Content Marketing",
      description: "Event-driven content systems, speaker campaign visuals, and community storytelling for Seven Zone's growing creator hub.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      tags: ["Social Media", "Content", "Campaign"], year: "2024", featured: true,
    },
    {
      id: "2", client: "Town Burger", category: "Brand Strategy & Creative Production",
      description: "Seasonal campaigns, product launch visuals, and celebrity-driven brand moments that positioned Town Burger as a cultural staple.",
      image: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      tags: ["Brand Strategy", "Production", "Advertising"], year: "2024", featured: false,
    },
    {
      id: "3", client: "Bassthalk", category: "Social Media & Motion Graphics",
      description: "High-impact educational content and course promotion visuals that elevated Bassthalk's platform authority and student enrollment.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      tags: ["Motion Graphics", "Social Media", "Education"], year: "2024", featured: false,
    },
  ],
};

// ─────────────────────────────────────────
// STORAGE
// ─────────────────────────────────────────

const STORAGE_KEY = "adluma_cms_v1";

export function getSiteData(): SiteData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const p = JSON.parse(raw) as Partial<SiteData>;
      return {
        team: p.team ?? DEFAULT_DATA.team,
        hero: { ...DEFAULT_DATA.hero, ...p.hero },
        footer: {
          ...DEFAULT_DATA.footer,
          ...p.footer,
          socialLinks: { ...DEFAULT_DATA.footer.socialLinks, ...(p.footer?.socialLinks ?? {}) },
        },
        seo: { ...DEFAULT_DATA.seo, ...p.seo },
        projects: p.projects ?? DEFAULT_DATA.projects,
      };
    }
  } catch { /* ignore */ }
  return DEFAULT_DATA;
}

export function saveSiteData(data: SiteData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent("adluma_cms_update"));
}

export function useSiteData(): SiteData {
  const [data, setData] = useState<SiteData>(getSiteData);
  useEffect(() => {
    const handle = () => setData(getSiteData());
    window.addEventListener("adluma_cms_update", handle);
    return () => window.removeEventListener("adluma_cms_update", handle);
  }, []);
  return data;
}

// ─────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
