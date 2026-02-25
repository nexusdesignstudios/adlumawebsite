import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import {
  getSiteData, saveSiteData, fileToBase64, generateId,
  SiteData, TeamMember, Project, HeroContent, FooterContent, SEOContent,
} from "../lib/siteDataStore";

// ═══════════════════════════════════════════════════════
// SHARED UI PRIMITIVES
// ═══════════════════════════════════════════════════════

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block mb-1.5 text-white/50 text-xs tracking-[0.14em] uppercase"
      style={{ fontFamily: "DM Sans, sans-serif" }}>
      {children}
    </label>
  );
}

function Input({ value, onChange, placeholder, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 rounded-xl text-white/85 text-sm outline-none transition-all duration-200 placeholder-white/20"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        fontFamily: "DM Sans, sans-serif",
      }}
      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(232,99,42,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,99,42,0.08)"; }}
      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-2.5 rounded-xl text-white/85 text-sm outline-none transition-all duration-200 placeholder-white/20 resize-none"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        fontFamily: "DM Sans, sans-serif",
      }}
      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(232,99,42,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,99,42,0.08)"; }}
      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
    />
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl p-6 ${className}`}
      style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-px w-6" style={{ background: "linear-gradient(90deg,#E8632A,#F5C842)" }} />
      <h3 className="text-white/70 text-xs tracking-[0.2em] uppercase"
        style={{ fontFamily: "DM Sans, sans-serif" }}>{children}</h3>
    </div>
  );
}

function SaveBtn({ onClick, saving, label = "Save Changes" }: { onClick: () => void; saving: boolean; label?: string }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-sm border-none cursor-pointer overflow-hidden disabled:opacity-60"
      style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, letterSpacing: "0.04em" }}
    >
      <span className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(105deg,#E8632A,#F5C842 55%,#9B5DE5)" }} />
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: "linear-gradient(105deg,#F5C842,#E8632A 55%,#9B5DE5)" }} />
      <span className="relative z-10">{saving ? "Saving…" : label}</span>
    </button>
  );
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div
        onClick={() => onChange(!value)}
        className="relative w-10 h-5.5 rounded-full transition-all duration-300 flex-shrink-0"
        style={{
          background: value ? "linear-gradient(90deg,#E8632A,#F5C842)" : "rgba(255,255,255,0.1)",
          width: "40px", height: "22px",
        }}
      >
        <div
          className="absolute top-0.5 rounded-full transition-all duration-300"
          style={{
            width: "18px", height: "18px",
            background: "#fff",
            left: value ? "20px" : "2px",
          }}
        />
      </div>
      <span className="text-white/55 text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>{label}</span>
    </label>
  );
}

function ImageUploadField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState<"url" | "upload">("url");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("Image must be under 2 MB."); return; }
    const b64 = await fileToBase64(file);
    onChange(b64);
  };

  return (
    <div className="space-y-3">
      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", display: "inline-flex" }}>
        {(["url", "upload"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className="px-3 py-1 rounded-md text-xs transition-all duration-200 border-none cursor-pointer"
            style={{
              fontFamily: "DM Sans, sans-serif",
              background: tab === t ? "rgba(255,255,255,0.1)" : "transparent",
              color: tab === t ? "#fff" : "rgba(255,255,255,0.4)",
            }}>
            {t === "url" ? "URL" : "Upload File"}
          </button>
        ))}
      </div>

      {tab === "url" ? (
        <Input value={value.startsWith("data:") ? "" : value} onChange={onChange} placeholder="https://example.com/image.jpg" />
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          className="w-full rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-6 cursor-pointer transition-colors duration-200"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(232,99,42,0.4)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mb-2 opacity-40">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <polyline points="17 8 12 3 7 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="3" x2="12" y2="15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-white/35 text-xs" style={{ fontFamily: "DM Sans, sans-serif" }}>
            Click to upload · Max 2 MB
          </span>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="relative rounded-xl overflow-hidden" style={{ height: "100px" }}>
          <img src={value} alt="preview" className="w-full h-full object-cover" />
          <button
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center border-none cursor-pointer"
            style={{ background: "rgba(8,8,8,0.8)" }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1l8 8M9 1L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

// Toast
function useToast() {
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const show = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };
  return { toast, show };
}

function Toast({ toast }: { toast: { msg: string; type: "success" | "error" } | null }) {
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-2xl"
      style={{
        background: toast.type === "success" ? "rgba(16,24,8,0.95)" : "rgba(24,8,8,0.95)",
        border: `1px solid ${toast.type === "success" ? "rgba(100,200,80,0.3)" : "rgba(220,60,60,0.3)"}`,
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}>
      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: toast.type === "success" ? "rgba(100,200,80,0.2)" : "rgba(220,60,60,0.2)" }}>
        {toast.type === "success"
          ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#6DC850" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          : <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 2l6 6M8 2L2 8" stroke="#E05050" strokeWidth="1.5" strokeLinecap="round" /></svg>
        }
      </div>
      <span className="text-white/80 text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>{toast.msg}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// HERO TAB
// ═══════════════════════════════════════════════════════

function HeroTab({ data, onSave }: { data: SiteData; onSave: (d: SiteData) => void }) {
  const [hero, setHero] = useState<HeroContent>({ ...data.hero });
  const [saving, setSaving] = useState(false);
  const [newService, setNewService] = useState("");
  const { toast, show } = useToast();
  const [newMedia, setNewMedia] = useState<{ type: "image" | "video"; src: string }>({ type: "image", src: "" });

  const save = () => {
    setSaving(true);
    onSave({ ...data, hero });
    setTimeout(() => { setSaving(false); show("Hero section saved!"); }, 400);
  };

  const addService = () => {
    if (!newService.trim()) return;
    setHero(h => ({ ...h, services: [...h.services, newService.trim()] }));
    setNewService("");
  };

  const removeService = (i: number) =>
    setHero(h => ({ ...h, services: h.services.filter((_, idx) => idx !== i) }));

  const addMedia = () => {
    if (!newMedia.src.trim()) return;
    setHero(h => ({ ...h, media: [...(h.media ?? []), { type: newMedia.type, src: newMedia.src.trim() }] }));
    setNewMedia({ type: "image", src: "" });
  };
  const updateMediaType = (i: number, type: "image" | "video") =>
    setHero(h => ({
      ...h,
      media: (h.media ?? []).map((m, idx) => (idx === i ? { ...m, type } : m)),
    }));
  const updateMediaSrc = (i: number, src: string) =>
    setHero(h => ({
      ...h,
      media: (h.media ?? []).map((m, idx) => (idx === i ? { ...m, src } : m)),
    }));
  const removeMedia = (i: number) =>
    setHero(h => ({
      ...h,
      media: (h.media ?? []).filter((_, idx) => idx !== i),
    }));

  return (
    <div className="space-y-5">
      <Toast toast={toast} />

      {/* Headline */}
      <Card>
        <SectionTitle>Headline Builder</SectionTitle>
        <div className="grid md:grid-cols-2 gap-4">
          <div><Label>Pre-gradient text</Label><Input value={hero.headlinePre} onChange={v => setHero(h => ({ ...h, headlinePre: v }))} placeholder="Built to" /></div>
          <div><Label>Gradient word</Label><Input value={hero.headlineGradient} onChange={v => setHero(h => ({ ...h, headlineGradient: v }))} placeholder="Grow." /></div>
          <div><Label>Second line</Label><Input value={hero.headlinePost} onChange={v => setHero(h => ({ ...h, headlinePost: v }))} placeholder="Designed" /></div>
          <div><Label>Italic ending</Label><Input value={hero.headlineItalic} onChange={v => setHero(h => ({ ...h, headlineItalic: v }))} placeholder="to Last." /></div>
        </div>
        {/* Preview */}
        <div className="mt-5 p-4 rounded-xl" style={{ background: "rgba(0,0,0,0.3)" }}>
          <p className="text-white/30 text-xs mb-1" style={{ fontFamily: "DM Sans, sans-serif" }}>Preview</p>
          <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.5rem", lineHeight: 1.1, color: "#fff" }}>
            {hero.headlinePre}{" "}
            <span style={{ background: "linear-gradient(90deg,#E8632A,#F5C842,#9B5DE5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {hero.headlineGradient}
            </span>
            {" "}{hero.headlinePost}{" "}
            <span style={{ color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>{hero.headlineItalic}</span>
          </div>
        </div>
      </Card>

      {/* Subtext & badges */}
      <Card>
        <SectionTitle>Body Content</SectionTitle>
        <div className="space-y-4">
          <div><Label>Subtext paragraph</Label><Textarea value={hero.subtext} onChange={v => setHero(h => ({ ...h, subtext: v }))} rows={3} /></div>
          <div><Label>Year badge</Label><Input value={hero.yearBadge} onChange={v => setHero(h => ({ ...h, yearBadge: v }))} placeholder="Est. 2018" /></div>
        </div>
      </Card>

      {/* Services */}
      <Card>
        <SectionTitle>Cycling Services</SectionTitle>
        <div className="flex flex-wrap gap-2 mb-4">
          {hero.services.map((s, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(232,99,42,0.1)", border: "1px solid rgba(232,99,42,0.2)" }}>
              <span className="text-white/70 text-xs" style={{ fontFamily: "DM Sans, sans-serif" }}>{s}</span>
              <button onClick={() => removeService(i)}
                className="w-4 h-4 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 transition-colors border-none cursor-pointer bg-transparent">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="flex-1"><Input value={newService} onChange={setNewService} placeholder="Add service…" /></div>
          <button onClick={addService}
            className="px-4 py-2.5 rounded-xl text-white/60 hover:text-white text-sm border-none cursor-pointer transition-colors"
            style={{ background: "rgba(255,255,255,0.06)", fontFamily: "DM Sans, sans-serif" }}>
            + Add
          </button>
        </div>
      </Card>

      {/* Background Media */}
      <Card>
        <SectionTitle>Background Media (Image / Video)</SectionTitle>
        <div className="space-y-3">
          {(hero.media ?? []).length === 0 && (
            <p className="text-white/40 text-xs" style={{ fontFamily: "DM Sans, sans-serif" }}>
              No slides yet. Add image or video sources below.
            </p>
          )}
          {(hero.media ?? []).map((m, i) => (
            <div key={i} className="grid md:grid-cols-5 gap-3 items-end">
              <div className="md:col-span-1">
                <Label>Type</Label>
                <select
                  value={m.type}
                  onChange={(e) => updateMediaType(i, e.target.value as "image" | "video")}
                  className="w-full px-3 py-2 rounded-xl text-white text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", fontFamily: "DM Sans, sans-serif", color: "#fff" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(232,99,42,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,99,42,0.12)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <Label>Source URL</Label>
                <Input value={m.src} onChange={(v) => updateMediaSrc(i, v)} placeholder={m.type === "image" ? "https://…/image.jpg" : "https://…/video.mp4"} />
              </div>
              <div className="md:col-span-1">
                <Label>Actions</Label>
                <div className="flex gap-2">
                  <button
                    onClick={() => removeMedia(i)}
                    className="px-4 py-2.5 rounded-xl text-red-400/70 hover:text-red-400 text-sm border-none cursor-pointer transition-colors"
                    style={{ background: "rgba(255,255,255,0.06)", fontFamily: "DM Sans, sans-serif" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-5 gap-3 items-end mt-4">
          <div className="md:col-span-1">
            <Label>Type</Label>
            <select
              value={newMedia.type}
              onChange={(e) => setNewMedia({ ...newMedia, type: e.target.value as "image" | "video" })}
              className="w-full px-3 py-2 rounded-xl text-white text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", fontFamily: "DM Sans, sans-serif", color: "#fff" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(232,99,42,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,99,42,0.12)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>
          <div className="md:col-span-3">
            <Label>Source URL</Label>
            <Input value={newMedia.src} onChange={(v) => setNewMedia({ ...newMedia, src: v })} placeholder="https://…" />
          </div>
          <div className="md:col-span-1">
            <Label>&nbsp;</Label>
            <button
              onClick={addMedia}
              className="px-4 py-2.5 rounded-xl text-white/60 hover:text-white text-sm border-none cursor-pointer transition-colors w-full"
              style={{ background: "rgba(255,255,255,0.06)", fontFamily: "DM Sans, sans-serif" }}
            >
              + Add Slide
            </button>
          </div>
        </div>
        <p className="text-white/35 text-xs mt-3" style={{ fontFamily: "DM Sans, sans-serif" }}>
          Videos play muted and loop automatically.
        </p>
      </Card>

      {/* CTAs */}
      <Card>
        <SectionTitle>CTA Labels</SectionTitle>
        <div className="grid md:grid-cols-2 gap-4">
          <div><Label>Primary button</Label><Input value={hero.ctaLabel} onChange={v => setHero(h => ({ ...h, ctaLabel: v }))} /></div>
          <div><Label>Secondary button</Label><Input value={hero.secondaryCta} onChange={v => setHero(h => ({ ...h, secondaryCta: v }))} /></div>
        </div>
      </Card>

      <div className="flex justify-end"><SaveBtn onClick={save} saving={saving} /></div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// TEAM TAB
// ═══════════════════════════════════════════════════════

const EMPTY_MEMBER: Omit<TeamMember, "id"> = {
  name: "", role: "", tag: "", img: "", bio: "", since: "2024", isLeadership: false,
};

function TeamTab({ data, onSave }: { data: SiteData; onSave: (d: SiteData) => void }) {
  const [team, setTeam] = useState<TeamMember[]>(data.team);
  const [editing, setEditing] = useState<string | null>(null); // id or "new"
  const [form, setForm] = useState<Omit<TeamMember, "id">>(EMPTY_MEMBER);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const { toast, show } = useToast();
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editing !== null) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [editing]);

  const openNew = () => { setForm(EMPTY_MEMBER); setEditing("new"); };
  const openEdit = (m: TeamMember) => { setForm({ name: m.name, role: m.role, tag: m.tag, img: m.img, bio: m.bio, since: m.since, isLeadership: m.isLeadership }); setEditing(m.id); };
  const cancelEdit = () => setEditing(null);

  const saveEdit = () => {
    if (!form.name.trim()) return;
    const updated = editing === "new"
      ? [...team, { id: generateId(), ...form }]
      : team.map(m => m.id === editing ? { ...m, ...form } : m);
    setTeam(updated);
    setSaving(true);
    onSave({ ...data, team: updated });
    setTimeout(() => { setSaving(false); show("Team saved!"); setEditing(null); }, 400);
  };

  const deleteMember = (id: string) => {
    const updated = team.filter(m => m.id !== id);
    setTeam(updated);
    onSave({ ...data, team: updated });
    setDeleteConfirm(null);
    show("Member removed.");
  };

  return (
    <div className="space-y-5">
      <Toast toast={toast} />

      {/* List */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-white/40 text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>{team.length} members</p>
        <button onClick={openNew}
          className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-white text-sm border-none cursor-pointer overflow-hidden"
          style={{ fontFamily: "Syne, sans-serif", fontWeight: 600 }}>
          <span className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(105deg,#E8632A,#F5C842 55%,#9B5DE5)" }} />
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{ background: "linear-gradient(105deg,#F5C842,#E8632A 55%,#9B5DE5)" }} />
          <span className="relative z-10">+ Add Member</span>
        </button>
      </div>

      <div className="space-y-3">
        {team.map(m => (
          <div key={m.id}>
            <Card className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                {m.img
                  ? <img src={m.img} alt={m.name} className="w-full h-full object-cover object-top" />
                  : <div className="w-full h-full flex items-center justify-center text-white/20"
                    style={{ background: "rgba(255,255,255,0.04)", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1rem" }}>
                    {m.name.charAt(0)}
                  </div>
                }
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}>{m.name}</span>
                  {m.isLeadership && (
                    <span className="px-2 py-0.5 rounded-full text-xs"
                      style={{ background: "rgba(232,99,42,0.15)", color: "#E8632A", fontFamily: "DM Sans, sans-serif" }}>
                      Leadership
                    </span>
                  )}
                </div>
                <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "DM Sans, sans-serif" }}>{m.role} · {m.tag}</p>
              </div>
              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(m)}
                  className="px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white transition-colors border-none cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.06)", fontFamily: "DM Sans, sans-serif" }}>
                  Edit
                </button>
                <button onClick={() => setDeleteConfirm(m.id)}
                  className="px-3 py-1.5 rounded-lg text-xs text-red-400/60 hover:text-red-400 transition-colors border-none cursor-pointer"
                  style={{ background: "rgba(220,60,60,0.06)", fontFamily: "DM Sans, sans-serif" }}>
                  Delete
                </button>
              </div>
            </Card>

            {/* Delete confirm */}
            {deleteConfirm === m.id && (
              <div className="mx-1 px-5 py-3 rounded-b-xl flex items-center justify-between"
                style={{ background: "rgba(220,60,60,0.08)", border: "1px solid rgba(220,60,60,0.15)", borderTop: "none" }}>
                <span className="text-red-400/70 text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  Delete "{m.name}"? This cannot be undone.
                </span>
                <div className="flex gap-2">
                  <button onClick={() => setDeleteConfirm(null)}
                    className="px-3 py-1.5 rounded-lg text-xs text-white/40 hover:text-white border-none cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.06)", fontFamily: "DM Sans, sans-serif" }}>Cancel</button>
                  <button onClick={() => deleteMember(m.id)}
                    className="px-3 py-1.5 rounded-lg text-xs text-red-400 border-none cursor-pointer"
                    style={{ background: "rgba(220,60,60,0.15)", fontFamily: "DM Sans, sans-serif" }}>Confirm Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Edit / Add form */}
      {editing !== null && (
        <div ref={formRef}>
        <Card>
          <SectionTitle>{editing === "new" ? "Add New Member" : "Edit Member"}</SectionTitle>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label>Full Name *</Label><Input value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Jane Doe" /></div>
              <div><Label>Role / Title</Label><Input value={form.role} onChange={v => setForm(f => ({ ...f, role: v }))} placeholder="Brand Strategist" /></div>
              <div><Label>Specialty Tag</Label><Input value={form.tag} onChange={v => setForm(f => ({ ...f, tag: v }))} placeholder="Identity · Positioning" /></div>
              <div><Label>Member Since</Label><Input value={form.since} onChange={v => setForm(f => ({ ...f, since: v }))} placeholder="2024" /></div>
            </div>
            <div><Label>Bio</Label><Textarea value={form.bio} onChange={v => setForm(f => ({ ...f, bio: v }))} placeholder="Short bio…" rows={2} /></div>
            <div><Label>Photo</Label><ImageUploadField value={form.img} onChange={v => setForm(f => ({ ...f, img: v }))} /></div>
            <Toggle value={form.isLeadership} onChange={v => setForm(f => ({ ...f, isLeadership: v }))} label="Show in Leadership section on Team page" />
            <div className="flex gap-3 pt-2">
              <SaveBtn onClick={saveEdit} saving={saving} label={editing === "new" ? "Add Member" : "Update Member"} />
              <button onClick={cancelEdit}
                className="px-5 py-2.5 rounded-full text-white/40 hover:text-white text-sm border-none cursor-pointer transition-colors"
                style={{ background: "rgba(255,255,255,0.05)", fontFamily: "DM Sans, sans-serif" }}>
                Cancel
              </button>
            </div>
          </div>
        </Card>
        </div>
      )}
    </div>
  );
}

function BrandsTab() {
  const [headingPre, setHeadingPre] = useState("Trusted by");
  const [headingGrad, setHeadingGrad] = useState("Growing Brands.");
  const [brands, setBrands] = useState<Array<{ id?: number; name: string; image_url: string }>>([]);
  const [editing, setEditing] = useState<{ id?: number; name: string; image_url: string } | null>(null);
  const { toast, show } = useToast();
  const [loading, setLoading] = useState(false);
  const [headingId, setHeadingId] = useState<number | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [contentsRes, brandsRes] = await Promise.all([
          fetch("/api/contents"),
          fetch("/api/trusted-brands"),
        ]);
        if (contentsRes.ok) {
          const contents = await contentsRes.json();
          const item = contents.find((c: any) => c.key === "trusted_brands_heading");
          if (item) {
            setHeadingId(item.id);
            try {
              const parsed = item.type === "json" ? JSON.parse(item.value || "{}") : null;
              if (parsed) {
                if (typeof parsed.pre === "string") setHeadingPre(parsed.pre);
                if (typeof parsed.gradient === "string") setHeadingGrad(parsed.gradient);
              }
            } catch {}
          }
        }
        if (brandsRes.ok) {
          const list = await brandsRes.json();
          if (Array.isArray(list)) setBrands(list);
        }
      } catch {}
    };
    load();
  }, []);

  const token = sessionStorage.getItem("adluma_token") || "";

  const saveHeading = async () => {
    setLoading(true);
    const payload = { value: JSON.stringify({ pre: headingPre, gradient: headingGrad }), type: "json" };
    try {
      if (headingId) {
        const res = await fetch(`/api/contents/${headingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
      } else {
        const res = await fetch("/api/contents", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ key: "trusted_brands_heading", ...payload }),
        });
        if (!res.ok) throw new Error();
        const created = await res.json();
        setHeadingId(created.id);
      }
      show("Heading saved!");
    } catch {
      show("Failed to save heading", "error");
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => setEditing({ name: "", image_url: "" });
  const openEdit = (b: { id?: number; name: string; image_url: string }) => setEditing({ ...b });
  const cancelEdit = () => setEditing(null);

  const saveBrand = async () => {
    if (!editing) return;
    if (!editing.name.trim()) return;
    setLoading(true);
    try {
      if (editing.id) {
        const res = await fetch(`/api/trusted-brands/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ name: editing.name, image_url: editing.image_url }),
        });
        if (!res.ok) throw new Error();
        const updated = await res.json();
        setBrands(prev => prev.map(b => b.id === updated.id ? updated : b));
      } else {
        const res = await fetch("/api/trusted-brands", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ name: editing.name, image_url: editing.image_url }),
        });
        if (!res.ok) throw new Error();
        const created = await res.json();
        setBrands(prev => [...prev, created]);
      }
      show("Brand saved!");
      setEditing(null);
    } catch {
      show("Failed to save brand", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteBrand = async (id?: number) => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/trusted-brands/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      setBrands(prev => prev.filter(b => b.id !== id));
      show("Brand deleted");
    } catch {
      show("Failed to delete brand", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editing) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [editing]);

  return (
    <div className="space-y-5">
      <Toast toast={toast} />

      <Card>
        <SectionTitle>Heading</SectionTitle>
        <div className="grid md:grid-cols-2 gap-4">
          <div><Label>Pre-gradient</Label><Input value={headingPre} onChange={setHeadingPre} /></div>
          <div><Label>Gradient word</Label><Input value={headingGrad} onChange={setHeadingGrad} /></div>
        </div>
        <div className="flex justify-end mt-4"><SaveBtn onClick={saveHeading} saving={loading} label="Save Heading" /></div>
      </Card>

      <div className="flex items-center justify-between mb-2">
        <p className="text-white/40 text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>{brands.length} brands</p>
        <button onClick={openNew}
          className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-white text-sm border-none cursor-pointer overflow-hidden"
          style={{ fontFamily: "Syne, sans-serif", fontWeight: 600 }}>
          <span className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(105deg,#E8632A,#F5C842 55%,#9B5DE5)" }} />
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{ background: "linear-gradient(105deg,#F5C842,#E8632A 55%,#9B5DE5)" }} />
          <span className="relative z-10">+ Add Brand</span>
        </button>
      </div>

      <div className="space-y-3">
        {brands.map(b => (
          <Card key={b.id} className="flex items-center gap-4">
            <div className="w-28 h-12 rounded-xl overflow-hidden flex-shrink-0" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              {b.image_url ? <img src={b.image_url} alt={b.name} className="w-full h-full object-contain" /> : <div className="w-full h-full" />}
            </div>
            <div className="flex-1 min-w-0">
              <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}>{b.name}</span>
              <p className="text-white/30 text-xs mt-0.5" style={{ fontFamily: "DM Sans, sans-serif" }}>{b.image_url}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(b)}
                className="px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white transition-colors border-none cursor-pointer"
                style={{ background: "rgba(255,255,255,0.06)", fontFamily: "DM Sans, sans-serif" }}>
                Edit
              </button>
              <button onClick={() => deleteBrand(b.id)}
                className="px-3 py-1.5 rounded-lg text-xs text-red-400/60 hover:text-red-400 transition-colors border-none cursor-pointer">
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>

      {editing && (
        <div ref={formRef}>
        <Card>
          <SectionTitle>{editing.id ? "Edit Brand" : "New Brand"}</SectionTitle>
          <div className="grid md:grid-cols-2 gap-4">
            <div><Label>Name</Label><Input value={editing.name} onChange={v => setEditing({ ...editing, name: v })} /></div>
            <div><Label>Image URL or Data URI</Label><Input value={editing.image_url} onChange={v => setEditing({ ...editing, image_url: v })} /></div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={cancelEdit}
              className="px-4 py-2.5 rounded-xl text-white/60 hover:text-white text-sm border-none cursor-pointer transition-colors"
              style={{ background: "rgba(255,255,255,0.06)", fontFamily: "DM Sans, sans-serif" }}>
              Cancel
            </button>
            <SaveBtn onClick={saveBrand} saving={loading} label={editing.id ? "Save Changes" : "Create Brand"} />
          </div>
        </Card>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// PROJECTS TAB
// ═══════════════════════════════════════════════════════

const CATEGORIES = [
  "Social Media & Content Marketing",
  "Brand Strategy & Creative Production",
  "Social Media & Motion Graphics",
  "Performance Marketing",
  "SEO & Digital Advertising",
  "Web Design & Development",
  "Video Production",
  "Influencer Marketing",
];

const EMPTY_PROJECT: Omit<Project, "id"> = {
  client: "", category: CATEGORIES[0], description: "", image: "",
  tags: [], year: new Date().getFullYear().toString(), featured: false,
};

function ProjectsTab({ data, onSave }: { data: SiteData; onSave: (d: SiteData) => void }) {
  const [projects, setProjects] = useState<Project[]>(data.projects);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Project, "id">>(EMPTY_PROJECT);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const { toast, show } = useToast();
  const formRef = useRef<HTMLDivElement>(null);

  const openNew = () => { setForm(EMPTY_PROJECT); setTagInput(""); setEditing("new"); };
  const openEdit = (p: Project) => {
    setForm({ client: p.client, category: p.category, description: p.description, image: p.image, tags: [...p.tags], year: p.year, featured: p.featured });
    setTagInput(""); setEditing(p.id);
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    setForm(f => ({ ...f, tags: [...f.tags, tagInput.trim()] }));
    setTagInput("");
  };

  const removeTag = (i: number) => setForm(f => ({ ...f, tags: f.tags.filter((_, idx) => idx !== i) }));

  const saveProject = () => {
    if (!form.client.trim()) return;
    const updated = editing === "new"
      ? [...projects, { id: generateId(), ...form }]
      : projects.map(p => p.id === editing ? { ...p, ...form } : p);
    setProjects(updated);
    setSaving(true);
    onSave({ ...data, projects: updated });
    setTimeout(() => { setSaving(false); show("Projects saved!"); setEditing(null); }, 400);
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    onSave({ ...data, projects: updated });
    setDeleteConfirm(null);
    show("Project removed.");
  };

  useEffect(() => {
    if (editing !== null) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [editing]);

  return (
    <div className="space-y-5">
      <Toast toast={toast} />

      <div className="flex items-center justify-between mb-2">
        <p className="text-white/40 text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>{projects.length} projects</p>
        <button onClick={openNew}
          className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-white text-sm border-none cursor-pointer overflow-hidden"
          style={{ fontFamily: "Syne, sans-serif", fontWeight: 600 }}>
          <span className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(105deg,#E8632A,#F5C842 55%,#9B5DE5)" }} />
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{ background: "linear-gradient(105deg,#F5C842,#E8632A 55%,#9B5DE5)" }} />
          <span className="relative z-10">+ Add Project</span>
        </button>
      </div>

      <div className="space-y-3">
        {projects.map(p => (
          <div key={p.id}>
            <Card className="flex items-center gap-4">
              <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                {p.image
                  ? <img src={p.image} alt={p.client} className="w-full h-full object-cover" />
                  : <div className="w-full h-full" style={{ background: "rgba(255,255,255,0.04)" }} />
                }
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}>{p.client}</span>
                  {p.featured && (
                    <span className="px-2 py-0.5 rounded-full text-xs"
                      style={{ background: "rgba(245,200,66,0.15)", color: "#F5C842", fontFamily: "DM Sans, sans-serif" }}>
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "DM Sans, sans-serif" }}>{p.category} · {p.year}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(p)}
                  className="px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white transition-colors border-none cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.06)", fontFamily: "DM Sans, sans-serif" }}>Edit</button>
                <button onClick={() => setDeleteConfirm(p.id)}
                  className="px-3 py-1.5 rounded-lg text-xs text-red-400/60 hover:text-red-400 transition-colors border-none cursor-pointer"
                  style={{ background: "rgba(220,60,60,0.06)", fontFamily: "DM Sans, sans-serif" }}>Delete</button>
              </div>
            </Card>

            {deleteConfirm === p.id && (
              <div className="mx-1 px-5 py-3 rounded-b-xl flex items-center justify-between"
                style={{ background: "rgba(220,60,60,0.08)", border: "1px solid rgba(220,60,60,0.15)", borderTop: "none" }}>
                <span className="text-red-400/70 text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>Delete "{p.client}"?</span>
                <div className="flex gap-2">
                  <button onClick={() => setDeleteConfirm(null)}
                    className="px-3 py-1.5 rounded-lg text-xs text-white/40 hover:text-white border-none cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.06)", fontFamily: "DM Sans, sans-serif" }}>Cancel</button>
                  <button onClick={() => deleteProject(p.id)}
                    className="px-3 py-1.5 rounded-lg text-xs text-red-400 border-none cursor-pointer"
                    style={{ background: "rgba(220,60,60,0.15)", fontFamily: "DM Sans, sans-serif" }}>Confirm Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Edit/Add Form */}
      {editing !== null && (
        <div ref={formRef}>
        <Card>
          <SectionTitle>{editing === "new" ? "Add New Project" : "Edit Project"}</SectionTitle>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label>Client Name *</Label><Input value={form.client} onChange={v => setForm(f => ({ ...f, client: v }))} placeholder="Brand Name" /></div>
              <div><Label>Year</Label><Input value={form.year} onChange={v => setForm(f => ({ ...f, year: v }))} placeholder="2024" /></div>
            </div>
            {/* Category */}
            <div>
              <Label>Category</Label>
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl text-white/85 text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  fontFamily: "DM Sans, sans-serif", color: "rgba(255,255,255,0.85)",
                }}>
                {CATEGORIES.map(c => <option key={c} value={c} style={{ background: "#1a1a1a" }}>{c}</option>)}
                <option value="__custom__" style={{ background: "#1a1a1a" }}>Custom category…</option>
              </select>
              {form.category === "__custom__" && (
                <div className="mt-2">
                  <Input value="" onChange={v => setForm(f => ({ ...f, category: v }))} placeholder="Enter custom category" />
                </div>
              )}
            </div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} rows={3} placeholder="Brief project description…" /></div>
            <div><Label>Project Image</Label><ImageUploadField value={form.image} onChange={v => setForm(f => ({ ...f, image: v }))} /></div>

            {/* Tags */}
            <div>
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {form.tags.map((t, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                    style={{ background: "rgba(155,93,229,0.1)", border: "1px solid rgba(155,93,229,0.2)" }}>
                    <span className="text-white/70 text-xs" style={{ fontFamily: "DM Sans, sans-serif" }}>{t}</span>
                    <button onClick={() => removeTag(i)}
                      className="text-white/30 hover:text-white/70 transition-colors bg-transparent border-none cursor-pointer">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <div className="flex-1"><Input value={tagInput} onChange={setTagInput} placeholder="Add tag…" /></div>
                <button onClick={addTag}
                  className="px-4 py-2.5 rounded-xl text-white/60 hover:text-white text-sm border-none cursor-pointer transition-colors"
                  style={{ background: "rgba(255,255,255,0.06)", fontFamily: "DM Sans, sans-serif" }}>
                  + Add
                </button>
              </div>
            </div>

            <Toggle value={form.featured} onChange={v => setForm(f => ({ ...f, featured: v }))} label="Mark as Featured project" />

            <div className="flex gap-3 pt-2">
              <SaveBtn onClick={saveProject} saving={saving} label={editing === "new" ? "Add Project" : "Update Project"} />
              <button onClick={() => setEditing(null)}
                className="px-5 py-2.5 rounded-full text-white/40 hover:text-white text-sm border-none cursor-pointer transition-colors"
                style={{ background: "rgba(255,255,255,0.05)", fontFamily: "DM Sans, sans-serif" }}>
                Cancel
              </button>
            </div>
          </div>
        </Card>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// FOOTER TAB
// ═══════════════════════════════════════════════════════

function FooterTab({ data, onSave }: { data: SiteData; onSave: (d: SiteData) => void }) {
  const [footer, setFooter] = useState<FooterContent>({ ...data.footer, socialLinks: { ...data.footer.socialLinks } });
  const [saving, setSaving] = useState(false);
  const { toast, show } = useToast();

  const save = () => {
    setSaving(true);
    onSave({ ...data, footer });
    setTimeout(() => { setSaving(false); show("Footer saved!"); }, 400);
  };

  const setLink = (k: keyof FooterContent["socialLinks"], v: string) =>
    setFooter(f => ({ ...f, socialLinks: { ...f.socialLinks, [k]: v } }));

  const SOCIALS: { key: keyof FooterContent["socialLinks"]; label: string; icon: React.ReactNode }[] = [
    { key: "instagram", label: "Instagram", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg> },
    { key: "linkedin", label: "LinkedIn", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" /><path d="M7 10v7M7 7v.5M12 10v7M12 13a3 3 0 0 1 6 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg> },
    { key: "tiktok", label: "TikTok", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> },
    { key: "facebook", label: "Facebook", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> },
    { key: "twitter", label: "X / Twitter", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg> },
  ];

  return (
    <div className="space-y-5">
      <Toast toast={toast} />

      <Card>
        <SectionTitle>Brand Text</SectionTitle>
        <div className="space-y-4">
          <div><Label>Tagline</Label><Input value={footer.tagline} onChange={v => setFooter(f => ({ ...f, tagline: v }))} placeholder="Strategy. Creative. Technology." /></div>
          <div><Label>Description</Label><Textarea value={footer.description} onChange={v => setFooter(f => ({ ...f, description: v }))} rows={3} /></div>
          <div><Label>Copyright Name</Label><Input value={footer.copyrightName} onChange={v => setFooter(f => ({ ...f, copyrightName: v }))} placeholder="Adluma" /></div>
        </div>
      </Card>

      <Card>
        <SectionTitle>Contact Info</SectionTitle>
        <div className="grid md:grid-cols-3 gap-4">
          <div><Label>Email</Label><Input value={footer.email} onChange={v => setFooter(f => ({ ...f, email: v }))} placeholder="hello@adluma.com" type="email" /></div>
          <div><Label>Phone</Label><Input value={footer.phone} onChange={v => setFooter(f => ({ ...f, phone: v }))} placeholder="+20 100 000 0000" /></div>
          <div><Label>Address</Label><Input value={footer.address} onChange={v => setFooter(f => ({ ...f, address: v }))} placeholder="Cairo, Egypt" /></div>
        </div>
      </Card>

      <Card>
        <SectionTitle>Social Links</SectionTitle>
        <div className="space-y-3">
          {SOCIALS.map(s => (
            <div key={s.key} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white/50"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {s.icon}
              </div>
              <div className="flex-1">
                <Input value={footer.socialLinks[s.key]} onChange={v => setLink(s.key, v)} placeholder={`https://${s.label.toLowerCase().replace(" / ", "")}.com/adluma`} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-end"><SaveBtn onClick={save} saving={saving} /></div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// SEO TAB
// ═══════════════════════════════════════════════════════

function SEOTab({ data, onSave }: { data: SiteData; onSave: (d: SiteData) => void }) {
  const [seo, setSeo] = useState<SEOContent>({ ...data.seo });
  const [saving, setSaving] = useState(false);
  const { toast, show } = useToast();

  const save = () => {
    setSaving(true);
    onSave({ ...data, seo });
    setTimeout(() => { setSaving(false); show("SEO settings saved!"); }, 400);
  };

  const CharCount = ({ val, max }: { val: string; max: number }) => (
    <span className="text-xs ml-2" style={{ color: val.length > max ? "#E05050" : "rgba(255,255,255,0.25)", fontFamily: "DM Sans, sans-serif" }}>
      {val.length}/{max}
    </span>
  );

  return (
    <div className="space-y-5">
      <Toast toast={toast} />

      <Card>
        <SectionTitle>Basic SEO</SectionTitle>
        <div className="space-y-4">
          <div>
            <div className="flex items-center"><Label>Site Title</Label><CharCount val={seo.siteTitle} max={60} /></div>
            <Input value={seo.siteTitle} onChange={v => setSeo(s => ({ ...s, siteTitle: v }))} placeholder="Adluma — Digital Marketing Agency" />
          </div>
          <div>
            <div className="flex items-center"><Label>Meta Description</Label><CharCount val={seo.metaDescription} max={160} /></div>
            <Textarea value={seo.metaDescription} onChange={v => setSeo(s => ({ ...s, metaDescription: v }))} rows={3} />
          </div>
          <div>
            <Label>Keywords (comma-separated)</Label>
            <Input value={seo.keywords} onChange={v => setSeo(s => ({ ...s, keywords: v }))} placeholder="digital marketing, brand strategy, …" />
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle>Open Graph (Social Sharing)</SectionTitle>
        <div className="space-y-4">
          <div>
            <div className="flex items-center"><Label>OG Title</Label><CharCount val={seo.ogTitle} max={60} /></div>
            <Input value={seo.ogTitle} onChange={v => setSeo(s => ({ ...s, ogTitle: v }))} />
          </div>
          <div>
            <div className="flex items-center"><Label>OG Description</Label><CharCount val={seo.ogDescription} max={200} /></div>
            <Textarea value={seo.ogDescription} onChange={v => setSeo(s => ({ ...s, ogDescription: v }))} rows={2} />
          </div>
          <div>
            <Label>OG Image URL</Label>
            <ImageUploadField value={seo.ogImage} onChange={v => setSeo(s => ({ ...s, ogImage: v }))} />
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle>Twitter / X</SectionTitle>
        <div><Label>Twitter Handle</Label><Input value={seo.twitterHandle} onChange={v => setSeo(s => ({ ...s, twitterHandle: v }))} placeholder="@adluma" /></div>
      </Card>

      {/* Preview */}
      <Card>
        <SectionTitle>SERP Preview</SectionTitle>
        <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-green-400/70 text-xs mb-1" style={{ fontFamily: "DM Sans, sans-serif" }}>adluma.com</p>
          <p className="text-blue-400/80 text-sm mb-1.5" style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 500 }}>{seo.siteTitle || "Page Title"}</p>
          <p className="text-white/40 text-xs leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
            {seo.metaDescription || "Meta description will appear here…"}
          </p>
        </div>
      </Card>

      <div className="flex justify-end"><SaveBtn onClick={save} saving={saving} /></div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pw }),
      });
      if (!res.ok) {
        setErrorMsg("Invalid credentials");
      } else {
        const data = await res.json();
        sessionStorage.setItem("adluma_token", data.token);
        sessionStorage.setItem("adluma_user", JSON.stringify(data.user));
        sessionStorage.setItem("adluma_admin_auth", "true");
        onSuccess();
      }
    } catch {
      setErrorMsg("Network error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#070707" }}>
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
        backgroundSize: "80px 80px",
      }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(232,99,42,0.12) 0%,rgba(155,93,229,0.06) 55%,transparent 80%)", filter: "blur(30px)" }} />
      <div className="relative z-10 w-full max-w-sm mx-4">
        <form onSubmit={submit} className="rounded-2xl p-8"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#E8632A,#9B5DE5)" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.9" />
                  <rect x="8" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.6" />
                  <rect x="1" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.6" />
                  <rect x="8" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.3" />
                </svg>
              </div>
              <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#fff" }}>ADLUMA</span>
              <span className="px-2 py-0.5 rounded-md text-xs"
                style={{ background: "rgba(232,99,42,0.15)", color: "#E8632A", fontFamily: "DM Sans, sans-serif", letterSpacing: "0.1em" }}>
                CMS
              </span>
            </div>
            <p className="text-white/35 text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>Admin Access Required</p>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Email</Label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 rounded-xl text-white/85 text-sm outline-none placeholder-white/20"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontFamily: "DM Sans, sans-serif",
                }}
              />
            </div>
            <div>
              <Label>Password</Label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={pw}
                  onChange={e => setPw(e.target.value)}
                  placeholder="admin1234"
                  className="w-full px-4 py-3 rounded-xl text-white/85 text-sm outline-none pr-10 placeholder-white/20"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontFamily: "DM Sans, sans-serif",
                    transition: "border-color 0.2s",
                  }}
                />
                <button type="button" onClick={() => setShow(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors bg-transparent border-none cursor-pointer">
                  {show
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" /></svg>
                  }
                </button>
              </div>
            </div>
            {errorMsg && <p className="text-red-400 text-xs" style={{ fontFamily: "DM Sans, sans-serif" }}>{errorMsg}</p>}
            <button type="submit" disabled={loading}
              className="group relative w-full py-3 rounded-xl text-white text-sm border-none cursor-pointer overflow-hidden disabled:opacity-60"
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, letterSpacing: "0.04em" }}>
              <span className="absolute inset-0" style={{ background: "linear-gradient(105deg,#E8632A,#F5C842 55%,#9B5DE5)" }} />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: "linear-gradient(105deg,#F5C842,#E8632A 55%,#9B5DE5)" }} />
              <span className="relative z-10">{loading ? "Signing in…" : "Enter Dashboard"}</span>
            </button>
          </div>
          <p className="text-center text-white/20 text-xs mt-6" style={{ fontFamily: "DM Sans, sans-serif" }}>
            Use admin@example.com / admin1234
          </p>
        </form>
        <Link to="/" className="flex items-center justify-center gap-2 mt-5 text-white/25 hover:text-white/50 transition-colors text-xs no-underline"
          style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "0.12em" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          BACK TO SITE
        </Link>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════

const TABS = [
  {
    id: "hero", label: "Hero Section",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    id: "team", label: "Team Members",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  },
  {
    id: "projects", label: "Projects",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  },
  {
    id: "brands", label: "Trusted Brands",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  },
  {
    id: "footer", label: "Footer",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" /><line x1="3" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="1.5" /></svg>,
  },
  {
    id: "seo", label: "SEO",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" /><path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  },
];

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("hero");
  const [siteData, setSiteData] = useState<SiteData>(getSiteData);

  // Keep in sync with localStorage
  useEffect(() => {
    const handle = () => setSiteData(getSiteData());
    window.addEventListener("adluma_cms_update", handle);
    return () => window.removeEventListener("adluma_cms_update", handle);
  }, []);

  const handleSave = (newData: SiteData) => {
    saveSiteData(newData);
    setSiteData(newData);
  };

  const active = TABS.find(t => t.id === activeTab)!;

  return (
    <div className="flex min-h-screen" style={{ background: "#070707", fontFamily: "DM Sans, sans-serif" }}>

      {/* ── SIDEBAR ── */}
      <aside className="w-64 flex-shrink-0 flex flex-col"
        style={{ background: "#0B0B0B", borderRight: "1px solid rgba(255,255,255,0.05)", position: "sticky", top: 0, height: "100vh" }}>

        {/* Logo */}
        <div className="px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#E8632A,#9B5DE5)" }}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.9" />
                <rect x="8" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.6" />
                <rect x="1" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.6" />
                <rect x="8" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.3" />
              </svg>
            </div>
            <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "0.95rem", color: "#fff" }}>ADLUMA</span>
            <span className="px-1.5 py-0.5 rounded-md text-xs ml-auto"
              style={{ background: "rgba(232,99,42,0.12)", color: "#E8632A", letterSpacing: "0.08em" }}>CMS</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {TABS.map(t => {
            const isActive = activeTab === t.id;
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 border-none cursor-pointer text-left"
                style={{
                  background: isActive ? "rgba(232,99,42,0.1)" : "transparent",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.4)",
                  borderLeft: isActive ? "2px solid #E8632A" : "2px solid transparent",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: isActive ? 500 : 400,
                }}>
                <span style={{ color: isActive ? "#E8632A" : "rgba(255,255,255,0.3)" }}>{t.icon}</span>
                {t.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 pb-5 space-y-1" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "12px" }}>
          <Link to="/" target="_blank"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/35 hover:text-white/60 transition-colors no-underline"
            style={{ fontFamily: "DM Sans, sans-serif" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><polyline points="15 3 21 3 21 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            View Site
          </Link>
          <button onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/35 hover:text-red-400/60 transition-colors border-none cursor-pointer bg-transparent"
            style={{ fontFamily: "DM Sans, sans-serif" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="px-8 py-5 flex items-center justify-between flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(11,11,11,0.8)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#fff", letterSpacing: "-0.01em" }}>
              {active.label}
            </h1>
            <p className="text-white/30 text-xs mt-0.5" style={{ fontFamily: "DM Sans, sans-serif" }}>
              Changes save to browser storage and update the live site instantly
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(100,200,80,0.08)", border: "1px solid rgba(100,200,80,0.15)" }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#6DC850" }} />
              <span className="text-green-400/60 text-xs" style={{ fontFamily: "DM Sans, sans-serif" }}>Live</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          {activeTab === "hero" && <HeroTab data={siteData} onSave={handleSave} />}
          {activeTab === "team" && <TeamTab data={siteData} onSave={handleSave} />}
          {activeTab === "projects" && <ProjectsTab data={siteData} onSave={handleSave} />}
          {activeTab === "brands" && <BrandsTab />}
          {activeTab === "footer" && <FooterTab data={siteData} onSave={handleSave} />}
          {activeTab === "seo" && <SEOTab data={siteData} onSave={handleSave} />}
        </div>
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════

export function AdminPage() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem("adluma_admin_auth") === "true"
  );

  const handleLogin = () => {
    sessionStorage.setItem("adluma_admin_auth", "true");
    setAuthenticated(true);
  };

  const handleLogout = async () => {
    const token = sessionStorage.getItem("adluma_token");
    try {
      if (token) {
        await fetch("http://127.0.0.1:8000/api/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch {}
    sessionStorage.removeItem("adluma_admin_auth");
    sessionStorage.removeItem("adluma_token");
    sessionStorage.removeItem("adluma_user");
    setAuthenticated(false);
  };

  if (!authenticated) return <AdminLogin onSuccess={handleLogin} />;
  return <AdminDashboard onLogout={handleLogout} />;
}
