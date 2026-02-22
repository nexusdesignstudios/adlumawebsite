import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MiniMapProps {
  center: [number, number];
  pin: [number, number];
  zoom: number;
  color?: string;
}

export function MiniMap({ center, pin, zoom, color = "#E8632A" }: MiniMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center,
      zoom,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      keyboard: false,
      boxZoom: false,
    });

    // Carto Dark Matter — no API key needed
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      { maxZoom: 19, subdomains: "abcd" }
    ).addTo(map);

    // Custom teardrop pin
    const icon = L.divIcon({
      html: `
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="30" viewBox="0 0 22 30">
          <defs>
            <filter id="ps" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="${color}" flood-opacity="0.55"/>
            </filter>
          </defs>
          <path d="M11 0C4.925 0 0 4.925 0 11c0 7.778 9.625 17.89 10.518 18.806a.694.694 0 0 0 .964 0C12.375 28.89 22 18.778 22 11 22 4.925 17.075 0 11 0z"
                fill="${color}" stroke="rgba(255,255,255,0.7)" stroke-width="1.2" filter="url(#ps)"/>
          <circle cx="11" cy="11" r="4.5" fill="white" opacity="0.95"/>
          <circle cx="11" cy="11" r="2" fill="${color}"/>
        </svg>`,
      className: "",
      iconSize: [22, 30],
      iconAnchor: [11, 30],
    });

    L.marker(pin, { icon }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", borderRadius: "inherit" }}
    />
  );
}
