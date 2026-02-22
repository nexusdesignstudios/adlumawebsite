import { useEffect } from "react";
import { Outlet } from "react-router";
import { useSiteData } from "../lib/siteDataStore";

export function Root() {
  const { seo } = useSiteData();

  useEffect(() => {
    // Title
    document.title = seo.siteTitle || "Adluma";

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.content = content;
    };

    setMeta("description", seo.metaDescription);
    setMeta("keywords", seo.keywords);
    setMeta("og:title", seo.ogTitle || seo.siteTitle, "property");
    setMeta("og:description", seo.ogDescription || seo.metaDescription, "property");
    if (seo.ogImage) setMeta("og:image", seo.ogImage, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", seo.ogTitle || seo.siteTitle);
    setMeta("twitter:description", seo.ogDescription || seo.metaDescription);
    setMeta("twitter:site", seo.twitterHandle);
  }, [seo]);

  return (
    <div className="min-h-screen bg-[#080808]" style={{ fontFamily: "DM Sans, sans-serif" }}>
      <Outlet />
    </div>
  );
}