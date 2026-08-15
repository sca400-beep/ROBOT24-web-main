import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, Menu, X, Sun, Moon, Mail, ArrowRight,
  ChevronRight, Zap, Globe, Cpu, Bot, Eye, Clock,
  TrendingUp, ExternalLink, ChevronLeft, Play, Pause,
  Sparkles, ShieldCheck, Award, Target, CheckCircle2
} from "lucide-react";
import heroRobotImg from "../assets/futuristic_humanoid_robot_hero.png";
import robot24Logo from "../images/robot24-logo.svg";

// ── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "About Us", "News", "Technology", "Events", "Press Releases", "Contact Us"];

const TICKER_ITEMS = [
  "Humanoid Robots Breaking Accessibility Barriers — August 11, 2026",
  "Robots-as-a-Service (RaaS) vs. Buying: Which Is Right for Your Business?",
  "Tesla Optimus Gen 3 Ships to First Enterprise Customers Worldwide",
  "Can You Buy a Humanoid Robot Today? A Complete Buyer's Guide",
  "Boston Dynamics Atlas Achieves New Dexterity Milestone",
  "RoboWorld 2026: 40+ Companies Unveil Next-Gen Robotics Platforms",
];

const SLIDES = [
  {
    id: 0,
    category: "INSIGHTS",
    tag: "Cover Story",
    title: "How Humanoid Robots Can Help People with Disabilities",
    excerpt: "Over a billion people cannot perform basic daily tasks without assistance. Humanoid robots are emerging as a transformative solution — promising both independence and dignity.",
    author: "Carl Alex",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
    date: "August 11, 2026",
    readTime: "8 min read",
    views: "12.4K",
    image: heroRobotImg,
    accentColor: "#5078B6",
  },
  {
    id: 1,
    category: "TECHNOLOGY",
    tag: "Deep Dive",
    title: "Robots-as-a-Service: The Business Model Reshaping Industry",
    excerpt: "Should your enterprise buy robots or subscribe to them? We dissect the economics, risk profiles, and long-term ROI of RaaS versus outright ownership.",
    author: "Siyanne Mekonnen",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
    date: "August 11, 2026",
    readTime: "6 min read",
    views: "9.1K",
    image: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=1600&h=900&fit=crop&auto=format",
    accentColor: "#3D6DB8",
  },
  {
    id: 2,
    category: "INDUSTRY",
    tag: "Analysis",
    title: "Industrial Automation Reshaping Global Supply Chains",
    excerpt: "Factory robots are no longer optional — they are the backbone of competitive 21st-century manufacturing. Here is what the data says about the next decade.",
    author: "Suman Singh",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format",
    date: "August 9, 2026",
    readTime: "7 min read",
    views: "7.8K",
    image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=1600&h=900&fit=crop&auto=format",
    accentColor: "#2A5CA8",
  },
  {
    id: 3,
    category: "EVENTS",
    tag: "Breaking",
    title: "RoboWorld 2026: The Announcements That Changed Everything",
    excerpt: "Boston Dynamics, Tesla, and 40 other industry leaders unveiled next-generation platforms at the biggest robotics event of the year. Here are the highlights.",
    author: "Carl Alex",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
    date: "August 8, 2026",
    readTime: "10 min read",
    views: "15.2K",
    image: "https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?w=1600&h=900&fit=crop&auto=format",
    accentColor: "#1A4E9A",
  },
];

const ARTICLES = [
  {
    id: 1,
    category: "INSIGHTS",
    title: "Robots-as-a-Service (RaaS) or Buying Robots: The Better Option?",
    excerpt: "Should your business buy robots or choose Robots-as-a-Service? We break down the economics, risks, and long-term value of each model.",
    author: "Carl Alex",
    date: "August 11, 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1737644467636-6b0053476bb2?w=700&h=420&fit=crop&auto=format",
  },
  {
    id: 2,
    category: "TECHNOLOGY",
    title: "Can You Buy a Humanoid Robot Today?",
    excerpt: "A comprehensive guide to humanoid robots currently available for purchase — and a realistic look at what they can actually do in 2026.",
    author: "Siyanne Mekonnen",
    date: "August 10, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=700&h=420&fit=crop&auto=format",
  },
  {
    id: 3,
    category: "INDUSTRY",
    title: "Industrial Automation Reshaping Global Supply Chains",
    excerpt: "Factory robots are no longer optional — they're the backbone of competitive manufacturing in the post-pandemic era.",
    author: "Suman Singh",
    date: "August 9, 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=700&h=420&fit=crop&auto=format",
  },
  {
    id: 4,
    category: "EVENTS",
    title: "RoboWorld 2026: Key Announcements From the Floor",
    excerpt: "Boston Dynamics, Tesla, and 40 other companies unveiled next-generation robotics platforms at the industry's biggest annual event.",
    author: "Carl Alex",
    date: "August 8, 2026",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?w=700&h=420&fit=crop&auto=format",
  },
];

const JOURNALISTS = [
  { name: "Carl Alex", role: "Senior Journalist", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format", articles: 48 },
  { name: "Siyanne Mekonnen", role: "Tech Correspondent", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format", articles: 32 },
  { name: "Suman Singh", role: "Industry Analyst", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format", articles: 27 },
];

const POPULAR = [
  { date: "Aug 11, 2026", title: "How Humanoid Robots Can Help People with Disabilities", views: "12.4K" },
  { date: "Aug 11, 2026", title: "RaaS or Buying Robots: The Better Option?", views: "9.1K" },
  { date: "Aug 10, 2026", title: "Can You Buy a Humanoid Robot Today?", views: "7.8K" },
  { date: "Aug 9, 2026", title: "Industrial Automation Reshaping Supply Chains", views: "6.2K" },
];

const MOST_VIEWED = [
  { title: "Atlas Robot Breaks Speed Record in Warehouse Test", category: "TECHNOLOGY", image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=280&fit=crop&auto=format" },
  { title: "The $20K Humanoid: Who Can Afford It?", category: "INSIGHTS", image: "https://images.unsplash.com/photo-1654009603731-20b6d7536002?w=400&h=280&fit=crop&auto=format" },
  { title: "Robots in Restaurants: The New Front of House", category: "INDUSTRY", image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=280&fit=crop&auto=format" },
];

const STATS = [
  { label: "Articles Published", value: "2,400+", icon: Globe },
  { label: "Monthly Readers", value: "180K", icon: Eye },
  { label: "Robot Models Covered", value: "340+", icon: Bot },
  { label: "Expert Contributors", value: "60+", icon: Cpu },
];

const CATEGORY_COLORS: Record<string, string> = {
  INSIGHTS: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  TECHNOLOGY: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  INDUSTRY: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  EVENTS: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

const CATEGORY_COLORS_LIGHT: Record<string, string> = {
  INSIGHTS: "bg-blue-100 text-blue-700 border-blue-200",
  TECHNOLOGY: "bg-cyan-100 text-cyan-700 border-cyan-200",
  INDUSTRY: "bg-violet-100 text-violet-700 border-violet-200",
  EVENTS: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

// ── Animation variants ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
};

// ── Sub-components ────────────────────────────────────────────────────────────

// ── Sub-components ────────────────────────────────────────────────────────────

function CategoryBadge({ cat, dark }: { cat: string; dark: boolean }) {
  const cls = dark ? (CATEGORY_COLORS[cat] ?? "bg-blue-500/10 text-blue-400 border-blue-500/20")
    : (CATEGORY_COLORS_LIGHT[cat] ?? "bg-blue-100 text-blue-700 border-blue-200");
  return (
    <span className={`r24-category-badge inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-widest border font-mono ${cls}`}>
      <span className="r24-category-badge-dot w-1 h-1 rounded-full bg-current" />
      <span className="r24-category-badge-text">{cat}</span>
    </span>
  );
}

function InViewSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={`r24-inview-section ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

function useInView(ref: React.RefObject<HTMLElement | null>, options: { once?: boolean; amount?: number }) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options.once) obs.disconnect();
        }
      },
      { threshold: options.amount ?? 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, options.once, options.amount]);
  return inView;
}

// ── Hero Slider ───────────────────────────────────────────────────────────────

function HeroSlider({ dark }: { dark: boolean }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (i: number) => {
    if (transitioning || i === active) return;
    setTransitioning(true);
    setActive(i);
    setTimeout(() => setTransitioning(false), 900);
  };
  const next = () => goTo((active + 1) % SLIDES.length);
  const prev = () => goTo((active - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    if (!playing) { timerRef.current && clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(next, 6500);
    return () => { timerRef.current && clearInterval(timerRef.current); };
  }, [playing, active, transitioning]);

  const slide = SLIDES[active];

  return (
    <section className="r24-section r24-hero-section relative z-10 w-full overflow-hidden select-none"
      style={{ height: "calc(100dvh - 63px)", minHeight: 560 }}>

      {/* ══ TICKER — FLOATING AT TOP OF BANNER ══════════════════════════════════ */}
      <div className="r24-ticker-wrapper absolute top-4 left-0 right-0 z-40 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full pointer-events-auto">
        <div className={`r24-ticker-container relative flex items-center h-11 px-3 rounded-full border shadow-sm transition-colors overflow-hidden backdrop-blur-md ${dark
          ? "bg-[#0A162D]/90 border-[#1E2E4A] shadow-black/30"
          : "bg-white/95 border-slate-200/90 shadow-slate-200/60"
          }`}>

          <div className="r24-ticker-inner relative flex items-center h-full w-full justify-between overflow-hidden">

            {/* ── BREAKING NEWS badge ── */}
            <div className="r24-ticker-badge flex-shrink-0 flex items-center gap-2.5 pl-1.5 pr-4 h-full relative z-20">
              <div className="r24-ticker-badge-icon flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                <span className="r24-ticker-pulse-container relative flex h-2.5 w-2.5">
                  <span className="r24-ticker-pulse-ping animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="r24-ticker-pulse-dot relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
              </div>
              <div className="r24-ticker-badge-text-box flex flex-col leading-none">
                <span className="r24-ticker-badge-label text-[8px] font-black tracking-[0.25em] text-[#2563EB]" style={{ fontFamily: "sans-serif" }}>BREAKING</span>
                <span className="r24-ticker-badge-title text-[11px] font-black tracking-[0.18em] text-slate-900 dark:text-white mt-0.5" style={{ fontFamily: "'Rajdhani', sans-serif" }}>NEWS</span>
              </div>
            </div>

            {/* ── Scrolling headlines ── */}
            <div className="r24-ticker-scroll-area overflow-hidden flex-1 relative mx-2 h-full flex items-center">
              {/* Left mask */}
              <div className="r24-ticker-mask-left absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
                style={{ background: dark ? "linear-gradient(90deg, #0A162D 0%, transparent 100%)" : "linear-gradient(90deg, #FFFFFF 0%, transparent 100%)" }} />
              {/* Right mask */}
              <div className="r24-ticker-mask-right absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
                style={{ background: dark ? "linear-gradient(270deg, #0A162D 0%, transparent 100%)" : "linear-gradient(270deg, #FFFFFF 0%, transparent 100%)" }} />

              <div className="r24-ticker-track flex whitespace-nowrap items-center" style={{ animation: "ticker 50s linear infinite" }}>
                {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                  <div key={i} className="r24-ticker-item-wrap inline-flex items-center mr-3 cursor-pointer group/tick">
                    <div className={`r24-ticker-item-badge px-4 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 border whitespace-nowrap ${dark
                      ? "bg-[#162744] border-[#243A5E] text-slate-200 group-hover/tick:bg-[#1D355C] group-hover/tick:border-[#3B82F6] group-hover/tick:text-white"
                      : "bg-[#5078B6]/12 border-[#5078B6]/35 text-[#071F5A] group-hover/tick:bg-[#5078B6]/25 group-hover/tick:border-[#5078B6] group-hover/tick:text-[#05153E]"
                      }`}>
                      <span className="r24-ticker-item-text">{item}</span>
                    </div>
                    <span className="r24-ticker-item-dot text-[#3B82F6] font-extrabold text-sm ml-3 select-none">•</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: date + signal indicator ── */}
            <div className="r24-ticker-sysfeed flex-shrink-0 flex items-center gap-3 pr-1.5 pl-4 h-full relative z-20">
              <div className="r24-ticker-sysfeed-bars flex items-end gap-[3px] h-3.5">
                <span className="r24-ticker-sysfeed-bar w-1 h-1.5 rounded-full bg-[#2563EB]" />
                <span className="r24-ticker-sysfeed-bar w-1 h-2.5 rounded-full bg-[#2563EB]" />
                <span className="r24-ticker-sysfeed-bar w-1 h-3.5 rounded-full bg-[#2563EB]" />
                <span className="r24-ticker-sysfeed-bar w-1 h-2 rounded-full bg-[#2563EB]/40" />
              </div>
              <div className="r24-ticker-sysfeed-text-box flex flex-col leading-none items-end">
                <span className="r24-ticker-sysfeed-label text-[8px] font-bold tracking-[0.2em] text-[#2563EB]" style={{ fontFamily: "sans-serif" }}>SYS/FEED</span>
                <span className="r24-ticker-sysfeed-date text-[10px] font-bold tracking-wider text-slate-900 dark:text-white mt-0.5" style={{ fontFamily: "sans-serif" }}>
                  {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase()}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ══ SLIDE IMAGES ══ */}
      {SLIDES.map((s, i) => (
        <div key={s.id} className="r24-hero-slide-bg absolute inset-0"
          style={{ opacity: i === active ? 1 : 0, transition: "opacity 0.9s ease", zIndex: i === active ? 2 : 1 }}>
          <img src={s.image} alt={s.title} className="r24-hero-slide-image w-full h-full object-cover"
            style={{
              filter: "brightness(1.08) saturate(0.6) contrast(0.88)",
              transform: i === active ? "scale(1.07)" : "scale(1)",
              transition: "transform 8s ease-out",
            }} />
          {/* Main white left gradient */}
          <div className="r24-hero-slide-gradient-left absolute inset-0" style={{ background: "linear-gradient(110deg, rgba(255,255,255,0.97) 0%, rgba(232,240,255,0.93) 32%, rgba(208,224,250,0.55) 55%, rgba(180,210,248,0.1) 75%, transparent 100%)" }} />
          {/* Bottom fade */}
          <div className="r24-hero-slide-gradient-bottom absolute inset-0" style={{ background: "linear-gradient(to top, rgba(235,242,255,0.82) 0%, transparent 42%)" }} />
        </div>
      ))}

      {/* ══ DESIGN ELEMENTS ══════════════════════════════════════════════════════ */}

      {/* Dot grid */}
      <div className="r24-hero-dot-grid absolute inset-0 pointer-events-none z-10 opacity-[0.055]"
        style={{ backgroundImage: "radial-gradient(circle, #5078B6 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      {/* Diagonal stripe accent — geometric slash (hidden when thumbnail panel is visible) */}
      <div className="r24-hero-diagonal-accent absolute top-0 bottom-0 z-10 pointer-events-none hidden lg:hidden xl:block"
        style={{ left: "46%", width: "2px", background: "linear-gradient(to bottom, transparent 5%, rgba(80,120,182,0.15) 30%, rgba(80,120,182,0.28) 50%, rgba(80,120,182,0.15) 70%, transparent 95%)", transform: "skewX(-8deg)" }} />

      {/* Horizontal rule accents — top */}
      <div className="r24-hero-horizontal-rule absolute top-0 left-0 right-0 h-px z-20 pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(80,120,182,0.3) 20%, rgba(7,31,90,0.2) 50%, rgba(80,120,182,0.3) 80%, transparent)" }} />

      {/* Corner brackets — all 4 */}
      {[
        { pos: "top-6 left-6", path: "M0 20 L0 0 L20 0" },
        { pos: "top-6 right-6", path: "M48 20 L48 0 L28 0" },
        { pos: "bottom-[72px] left-6", path: "M0 28 L0 48 L20 48" },
        { pos: "bottom-[72px] right-6", path: "M48 28 L48 48 L28 48" },
      ].map(({ pos, path }) => (
        <svg key={path} className={`r24-hero-corner-bracket absolute ${pos} z-20 opacity-25`} width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d={path} stroke="#5078B6" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ))}

      {/* Crosshair centre-right */}
      <svg className="r24-hero-crosshair absolute z-10 pointer-events-none hidden xl:block opacity-[0.12]"
        style={{ right: "28%", top: "50%", transform: "translate(50%, -50%)" }}
        width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#5078B6" strokeWidth="1" />
        <line x1="12" y1="2" x2="12" y2="7" stroke="#5078B6" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="12" y1="17" x2="12" y2="22" stroke="#5078B6" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="2" y1="12" x2="7" y2="12" stroke="#5078B6" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="17" y1="12" x2="22" y2="12" stroke="#5078B6" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2" fill="#5078B6" />
      </svg>

      {/* ── HUD rings ── */}
      <div className="r24-hero-hud-rings absolute pointer-events-none z-10 hidden xl:block"
        style={{ right: "calc(220px + 6%)", top: "50%", transform: "translateY(-50%)" }}>
        {/* Outer dashed rings */}
        <svg width="420" height="420" viewBox="0 0 420 420" fill="none"
          style={{ animation: "spinSlow 40s linear infinite", opacity: 0.1 }}>
          <circle cx="210" cy="210" r="200" stroke="#5078B6" strokeWidth="0.5" strokeDasharray="4 10" />
          <circle cx="210" cy="210" r="168" stroke="#5078B6" strokeWidth="0.5" strokeDasharray="2 14" />
          <circle cx="210" cy="210" r="132" stroke="#5078B6" strokeWidth="0.8" strokeDasharray="6 8" />
        </svg>
        {/* Tick marks ring */}
        <svg width="420" height="420" viewBox="0 0 420 420" fill="none" className="absolute inset-0"
          style={{ animation: "spinSlow 25s linear infinite reverse", opacity: 0.15 }}>
          <circle cx="210" cy="210" r="182" stroke="#071F5A" strokeWidth="0.4" strokeDasharray="1 24" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
            const rad = a * Math.PI / 180;
            const r = 182;
            return <line key={a}
              x1={210 + (r - 6) * Math.cos(rad)} y1={210 + (r - 6) * Math.sin(rad)}
              x2={210 + (r + 6) * Math.cos(rad)} y2={210 + (r + 6) * Math.sin(rad)}
              stroke="#5078B6" strokeWidth={a % 90 === 0 ? 2.5 : 1.2} strokeLinecap="round" />;
          })}
        </svg>
        {/* Glow centre */}
        <div className="r24-hero-hud-glow-centre absolute inset-0 flex items-center justify-center">
          <div className="r24-hero-hud-glow-outer relative">
            <div className="r24-hero-hud-glow-circle w-16 h-16 rounded-full" style={{ background: "radial-gradient(circle, rgba(80,120,182,0.25) 0%, transparent 70%)" }} />
            <div className="r24-hero-hud-glow-inner absolute inset-0 flex items-center justify-center">
              <div className="r24-hero-hud-glow-dot w-3 h-3 rounded-full bg-[#5078B6] opacity-50"
                style={{ boxShadow: "0 0 18px 8px rgba(80,120,182,0.25)", animation: "pulse 2.5s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
      </div>

      {/* ══ THUMBNAIL PANEL — right side, aligned with main container on lg+ ══════════════════ */}
      <div className="r24-hero-thumbnails-container absolute inset-x-0 top-0 bottom-[56px] z-30 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none flex justify-end">
        <div
          className="r24-hero-thumbnails-panel relative hidden lg:flex flex-col justify-center gap-0 pointer-events-auto h-full"
          style={{ width: 220, paddingTop: 24, paddingBottom: 24 }}
        >

          {/* Thumbnail cards */}
          <div className="r24-hero-thumbnails-list relative flex flex-col gap-2.5 px-4 flex-1 justify-center">
            {SLIDES.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  className="r24-hero-thumbnail-card-btn relative group/th w-full cursor-pointer p-[2px]"
                  style={{
                    borderRadius: 12,
                    height: isActive ? 96 : 72,
                    transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                    boxShadow: isActive
                      ? "0 8px 28px rgba(7,31,90,0.3), 0 0 20px rgba(37,99,235,0.35)"
                      : "0 2px 10px rgba(7,31,90,0.08)",
                  }}
                >
                  {/* Animated Glowing Gradient Border Beam for Active Card */}
                  {isActive ? (
                    <div
                      className="r24-hero-thumbnail-beam absolute inset-0 rounded-[12px] pointer-events-none"
                      style={{
                        background: "linear-gradient(110deg, #2563EB 0%, #60A5FA 45%, #93C5FD 55%, #1D4ED8 100%)",
                        backgroundSize: "200% 200%",
                        animation: "shimmer 3s linear infinite",
                      }}
                    />
                  ) : (
                    <div className="r24-hero-thumbnail-border absolute inset-0 rounded-[12px] border border-[#5078B6]/20 group-hover/th:border-[#5078B6]/50 transition-colors pointer-events-none" />
                  )}

                  {/* Inner card container */}
                  <div className="r24-hero-thumbnail-inner relative w-full h-full rounded-[10px] overflow-hidden">
                    <img src={s.image} alt={s.title} className="r24-hero-thumbnail-img w-full h-full object-cover transition-transform duration-500 group-hover/th:scale-105" />
                    <div className="r24-hero-thumbnail-overlay absolute inset-0"
                      style={{
                        background: isActive
                          ? "linear-gradient(to top, rgba(7,31,90,0.88) 0%, rgba(7,31,90,0.25) 60%, transparent 100%)"
                          : "linear-gradient(to top, rgba(7,31,90,0.72) 0%, rgba(7,31,90,0.25) 100%)",
                      }}
                    />

                    {/* Slide number badge */}
                    <div className="r24-hero-thumbnail-badge-row absolute top-2 left-2 flex items-center gap-1.5">
                      <span
                        className="r24-hero-thumbnail-num-badge text-[9px] font-bold font-mono px-1.5 py-0.5 rounded flex items-center gap-1"
                        style={{
                          background: isActive ? "#071F5A" : "rgba(7,31,90,0.6)",
                          color: isActive ? "#93C5FD" : "rgba(255,255,255,0.7)",
                          border: isActive ? "1px solid #5078B6" : "1px solid rgba(255,255,255,0.15)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {isActive && (
                        <span className="r24-hero-thumbnail-pulse relative flex h-1.5 w-1.5">
                          <span className="r24-hero-thumbnail-pulse-ping animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                          <span className="r24-hero-thumbnail-pulse-dot relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
                        </span>
                      )}
                    </div>

                    {/* Category tag */}
                    <div className="r24-hero-thumbnail-cat-box absolute top-2 right-2">
                      <span className="r24-hero-thumbnail-cat-badge text-[7px] font-bold tracking-widest font-mono px-1.5 py-0.5 rounded"
                        style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)" }}>
                        {s.category}
                      </span>
                    </div>

                    {/* Title — only on active */}
                    <div className="r24-hero-thumbnail-title-box absolute bottom-0 left-0 right-0 px-2.5 pb-2 pt-4"
                      style={{ background: "linear-gradient(to top, rgba(7,31,90,0.75) 0%, transparent 100%)" }}>
                      <p className="r24-hero-thumbnail-title-text text-white leading-tight font-semibold"
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontSize: isActive ? 11 : 9,
                          display: "-webkit-box",
                          WebkitLineClamp: isActive ? 2 : 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}>
                        {s.title}
                      </p>
                    </div>

                    {/* Active progress bar */}
                    {isActive && (
                      <div className="r24-hero-thumbnail-progress-bar absolute bottom-0 left-0 right-0 h-[2.5px]" style={{ background: "rgba(80,120,182,0.3)" }}>
                        <div
                          key={`prog-${active}`}
                          className="r24-hero-thumbnail-progress-fill h-full origin-left"
                          style={{
                            background: "linear-gradient(90deg, #3B82F6, #60A5FA, #93C5FD)",
                            animation: "slideProgress 6.5s linear forwards",
                          }}
                        />
                      </div>
                    )}

                    {/* Hover right-arrow indicator */}
                    <div className="r24-hero-thumbnail-arrow-box absolute right-2 bottom-2 opacity-0 group-hover/th:opacity-100 transition-opacity duration-200">
                      <div className="r24-hero-thumbnail-arrow-circle w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(37,99,235,0.9)" }}>
                        <ArrowRight size={9} className="text-white" />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══ CONTENT ══════════════════════════════════════════════════════════════ */}
      <div className="r24-hero-content-container relative z-20 h-full flex flex-col justify-center pt-16 sm:pt-14 px-4 sm:px-6 lg:px-8 lg:pr-[248px] max-w-[1440px] mx-auto w-full">
        <div className="r24-hero-content-inner max-w-[600px]">

          {/* Tag + meta row */}
          <motion.div key={`meta-${active}`} initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }} className="r24-hero-meta-row flex items-center gap-3 mb-5 flex-wrap">
            <div className="r24-hero-tag-badge flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ border: "1px solid rgba(7,31,90,0.16)", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", boxShadow: "0 2px 12px rgba(7,31,90,0.07)" }}>
              <span className="r24-hero-tag-pulse relative flex h-1.5 w-1.5">
                <span className="r24-hero-tag-pulse-ping animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5078B6] opacity-60" />
                <span className="r24-hero-tag-pulse-dot relative inline-flex rounded-full h-1.5 w-1.5 bg-[#071F5A]" />
              </span>
              <span className="r24-hero-tag-text text-[10px] font-bold tracking-[0.2em] text-[#071F5A]" style={{ fontFamily: "sans-serif" }}>
                {slide.tag.toUpperCase()}
              </span>
            </div>
            <div className="r24-hero-meta-divider h-px w-10" style={{ background: "linear-gradient(90deg, rgba(7,31,90,0.25), transparent)" }} />
            <span className="r24-hero-meta-views text-[10px] font-mono flex items-center gap-1.5" style={{ color: "#5078B6" }}>
              <Eye size={9} /> {slide.views}
            </span>
            <span className="r24-hero-meta-readtime text-[10px] font-mono flex items-center gap-1.5" style={{ color: "#5078B6" }}>
              <Clock size={9} /> {slide.readTime}
            </span>
          </motion.div>

          {/* Category code-label */}
          <motion.div key={`cat-${active}`} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }} className="r24-hero-category-row flex items-center gap-3 mb-3">
            <span className="r24-hero-category-label text-[11px] font-bold tracking-[0.28em]" style={{ color: "#5078B6", fontFamily: "sans-serif" }}>
              // {slide.category}
            </span>
            <div className="r24-hero-category-divider flex-1 h-px max-w-[40px]" style={{ background: "rgba(80,120,182,0.3)" }} />
          </motion.div>

          {/* Headline with animated gradient typography */}
          <motion.div key={`h1wrap-${active}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="r24-hero-headline-wrap mb-5 relative">
            <h1 className="r24-hero-headline-title font-black leading-[1.04] tracking-[-0.025em]"
              style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "clamp(2rem, 4.4vw, 3.8rem)", color: "#061A48" }}>
              <span className="r24-hero-headline-text bg-clip-text text-transparent bg-gradient-to-r from-[#071F5A] via-[#0D3080] to-[#2563EB]">
                {slide.title}
              </span>
            </h1>
            {/* Multi-layered accent beam */}
            <div className="r24-hero-headline-beam-container mt-3.5 flex items-center gap-2">
              <div className="r24-hero-headline-beam-track h-1 rounded-full overflow-hidden flex-1 max-w-[280px]" style={{ background: "rgba(80,120,182,0.15)" }}>
                <div className="r24-hero-headline-beam-fill h-full rounded-full origin-left" style={{ background: "linear-gradient(90deg, #071F5A, #2563EB, #60A5FA)", animation: "slideProgress 0.8s ease-out forwards" }} />
              </div>
              <span className="r24-hero-headline-beam-dot w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
            </div>
          </motion.div>

          {/* Excerpt with left accent border */}
          <motion.div key={`ex-${active}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="r24-hero-excerpt-box relative pl-4 mb-8 border-l-2 border-[#2563EB]/40 max-w-[500px]">
            <p className="r24-hero-excerpt-text leading-relaxed font-medium text-[#1E3A70]/90 text-[14px] sm:text-[15.5px]">
              {slide.excerpt}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div key={`cta-${active}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }} className="r24-hero-cta-group flex flex-wrap items-center gap-4 mb-10">
            <button className="r24-btn r24-btn-primary r24-hero-btn-primary relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-xs font-bold tracking-[0.15em] uppercase text-white transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] group/cta"
              style={{
                background: "linear-gradient(135deg, #071F5A 0%, #2563EB 100%)",
                boxShadow: "0 4px 20px rgba(7,31,90,0.3)"
              }}>
              <span className="r24-btn-text">READ FULL STORY</span>
              <ArrowRight size={15} className="r24-btn-icon transition-transform duration-300 group-hover/cta:translate-x-1" />
            </button>

            <button className="r24-btn r24-btn-secondary r24-hero-btn-secondary inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 border border-[#071F5A]/20 text-[#071F5A] dark:text-white bg-white/90 dark:bg-slate-900/90 backdrop-blur-md hover:bg-[#071F5A] hover:text-white dark:hover:bg-blue-600 dark:hover:border-blue-600 cursor-pointer shadow-sm active:scale-[0.98]">
              <Globe size={15} className="r24-btn-icon" />
              <span className="r24-btn-text">BROWSE ALL</span>
            </button>
          </motion.div>

          {/* Author strip */}
          <motion.div key={`author-${active}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="r24-hero-author-strip flex items-center gap-3 pt-4"
            style={{ borderTop: "1px solid rgba(7,31,90,0.09)" }}>
            <div className="r24-hero-author-avatar-box relative">
              <img src={slide.authorAvatar} alt={slide.author}
                className="r24-hero-author-avatar-img w-9 h-9 rounded-full object-cover ring-2 ring-[#5078B6]/30" />
              <div className="r24-hero-author-status-dot absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#5078B6] border-2 border-white" />
            </div>
            <div className="r24-hero-author-text-box">
              <p className="r24-hero-author-name-text text-xs font-semibold" style={{ color: "#071F5A" }}>{slide.author}</p>
              <p className="r24-hero-author-date-text text-[10px] font-mono" style={{ color: "#5078B6" }}>{slide.date}</p>
            </div>

          </motion.div>
        </div>
      </div>

      {/* ══ BOTTOM HUD BAR ═══════════════════════════════════════════════════════ */}
      <div className="r24-hero-hud-bar absolute bottom-0 left-0 right-0 z-30"
        style={{ borderTop: "1px solid rgba(7,31,90,0.09)", background: "rgba(240,246,255,0.78)", backdropFilter: "blur(18px)" }}>
        <div className="r24-hero-hud-bar-container max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between w-full">

          {/* Left: label + pill dots */}
          <div className="r24-hero-hud-left flex items-center gap-4">
            <div className="r24-hero-hud-tag-box hidden sm:flex items-center gap-1.5">
              <span className="r24-hero-hud-tag-pulse w-1 h-1 rounded-full bg-[#5078B6]" style={{ animation: "pulse 2s ease-in-out infinite" }} />
              <span className="r24-hero-hud-tag-text text-[9px] font-mono tracking-[0.2em]" style={{ color: "#5078B6" }}>SYS/HERO</span>
            </div>
            <div className="r24-hero-hud-divider w-px h-4 hidden sm:block" style={{ background: "rgba(80,120,182,0.2)" }} />
            <div className="r24-hero-hud-dots flex items-center gap-2">
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => goTo(i)}
                  className="r24-hero-hud-dot-btn relative rounded-full overflow-hidden transition-all duration-300"
                  style={{ height: 3, width: i === active ? 32 : 8, background: i === active ? "transparent" : "rgba(80,120,182,0.25)" }}>
                  {i === active && (
                    <div className="r24-hero-hud-dot-fill absolute inset-0 rounded-full origin-left"
                      style={{ background: "linear-gradient(90deg, #071F5A, #5078B6)", animation: "slideProgress 6.5s linear forwards" }} />
                  )}
                </button>
              ))}
            </div>
            <span className="r24-hero-hud-counter text-[10px] font-mono" style={{ color: "#5078B6" }}>
              <span className="r24-hero-hud-counter-active" style={{ color: "#071F5A", fontWeight: 700 }}>0{active + 1}</span>
              <span className="r24-hero-hud-counter-total" style={{ color: "rgba(80,120,182,0.45)" }}> / 04</span>
            </span>
          </div>

          {/* Right: controls */}
          <div className="r24-hero-hud-controls flex items-center gap-1.5">
            <button onClick={prev}
              className="r24-btn r24-btn-icon r24-hero-hud-btn-prev w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-[#5078B6]/10"
              style={{ border: "1px solid rgba(7,31,90,0.1)", color: "#5078B6" }}>
              <ChevronLeft size={14} />
            </button>
            <button onClick={() => setPlaying(p => !p)}
              className="r24-btn r24-btn-icon r24-hero-hud-btn-play w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              style={{ border: "1px solid rgba(7,31,90,0.1)", color: "#071F5A", background: playing ? "rgba(7,31,90,0.06)" : "transparent" }}>
              {playing ? <Pause size={10} /> : <Play size={10} />}
            </button>
            <button onClick={next}
              className="r24-btn r24-btn-icon r24-hero-hud-btn-next w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-[#5078B6]/10"
              style={{ border: "1px solid rgba(7,31,90,0.1)", color: "#5078B6" }}>
              <ChevronRight size={14} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Featured Story & About Section ────────────────────────────────────────────

const FEATURED_STORIES = [
  {
    id: 1,
    tag: "CLASSIFIED BRIEFING",
    title: "Figure AI Unveils Its Most Advanced Humanoid Yet — And It Can Work Alongside You",
    description: "The San Jose company's third-generation robot combines dexterous manipulation with high-speed locomotion across complex terrain.",
    author: "JAMES WHITFIELD",
    location: "SAN JOSE, CA",
    date: "AUG 11, 2026",
    image: heroRobotImg,
    fallbackImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=1200&fit=crop&auto=format",
    badgeColor: "bg-blue-400"
  },
  {
    id: 2,
    tag: "AUTONOMOUS FRONTIER",
    title: "Tesla Optimus Gen-3 Achieves Autonomous Factory Operations at Scale",
    description: "New neural vision networks allow Optimus to execute complex sub-millimeter precision assembly tasks without human intervention.",
    author: "DR. ELENA ROSTOVA",
    location: "AUSTIN, TX",
    date: "AUG 10, 2026",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=1200&fit=crop&auto=format",
    fallbackImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=1200&fit=crop&auto=format",
    badgeColor: "bg-emerald-400"
  },
  {
    id: 3,
    tag: "NEXT-GEN ROBOTICS",
    title: "Boston Dynamics Atlas 2.0 Mastering Precision in Hazardous Zones",
    description: "Deploying fully electric hydraulic-free humanoids with tactile quantum feedback into extreme industrial repair environments.",
    author: "MARCUS VANCE",
    location: "BOSTON, MA",
    date: "AUG 09, 2026",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&h=1200&fit=crop&auto=format",
    fallbackImage: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=1200&h=1200&fit=crop&auto=format",
    badgeColor: "bg-amber-400"
  }
];

function FeaturedStoryAndAboutSection({ dark }: { dark: boolean }) {
  const [videoOpen, setVideoOpen] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const cardBgStory = dark ? "bg-[#061539] border-slate-800" : "bg-white border-slate-200";
  const cardBgAbout = dark ? "bg-[#040C24] border-slate-800" : "bg-white border-slate-200";

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setStoryIndex((prev) => (prev + 1) % FEATURED_STORIES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const currentStory = FEATURED_STORIES[storyIndex];

  const nextStory = () => {
    setStoryIndex((prev) => (prev + 1) % FEATURED_STORIES.length);
  };

  const prevStory = () => {
    setStoryIndex((prev) => (prev - 1 + FEATURED_STORIES.length) % FEATURED_STORIES.length);
  };

  return (
    <section className="r24-section r24-featured-about-section relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-3">
      <InViewSection>
        <div className="r24-featured-about-grid grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

          {/* ════ LEFT COLUMN: ABOUT ROBOT24 ════ */}
          <motion.div
            variants={fadeUp}
            className={`r24-about-card relative rounded-2xl border overflow-hidden flex flex-col justify-between shadow-sm transition-all duration-500 group/card ${cardBgAbout}`}
          >
            {/* Top Video Showcase Banner - Made Bigger */}
            <div className="r24-about-video-banner relative h-[230px] sm:h-[260px] w-full overflow-hidden bg-slate-950 flex items-center justify-center flex-shrink-0 group/video">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=1200&fit=crop&auto=format"
                alt="ROBOT24 Industrial Laboratory"
                className="r24-about-banner-img w-full h-full object-cover object-center transition-transform duration-1000 group-hover/video:scale-105"
              />
              <div className="r24-about-banner-overlay-dark absolute inset-0 bg-[#071F5A]/80 mix-blend-multiply" />
              <div className="r24-about-banner-overlay-grad absolute inset-0 bg-gradient-to-t from-[#071F5A] via-[#071F5A]/40 to-transparent" />

              {/* Top Video Badge */}
              <div className="r24-about-video-badge-box absolute top-3 left-3.5 z-20">
                <span className="r24-about-video-badge h-6 inline-flex items-center px-2.5 rounded-lg text-[9px] font-mono font-bold tracking-[0.18em] text-white bg-slate-950/80 border border-white/20 backdrop-blur-md uppercase gap-1.5 leading-none">
                  <span className="r24-about-badge-dot w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span className="r24-about-badge-text">VIDEO FEED</span>
                </span>
              </div>

              {/* Centered Simple Frosted Glossy Play Button */}
              <div className="r24-about-play-overlay absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none p-4">
                <button
                  onClick={() => setVideoOpen(true)}
                  className="r24-btn r24-btn-play r24-about-play-btn pointer-events-auto relative group/play cursor-pointer flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/50 backdrop-blur-md transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.37)] hover:scale-110 active:scale-95 hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                  style={{
                    background: "radial-gradient(100% 100% at 30% 20%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.12) 100%)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.7)"
                  }}
                >
                  {/* Glossy Top Reflection Highlight */}
                  <div
                    className="r24-about-play-gloss absolute inset-0 rounded-full bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none"
                    style={{ clipPath: "ellipse(75% 45% at 50% 0%)" }}
                  />

                  {/* Play Icon */}
                  <Play size={28} fill="white" className="r24-about-play-icon ml-1 text-white drop-shadow-md transition-transform duration-300 group-hover/play:scale-110" />
                </button>

                {/* Minimal Text Label below button */}
                <span
                  className="r24-about-play-label mt-2.5 text-[11px] sm:text-xs font-bold tracking-[0.2em] text-white uppercase drop-shadow-md pointer-events-none"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  Play ROBOT24 Story
                </span>
              </div>

              {/* Bottom Right Duration Badge */}
              <span
                className="r24-about-duration-badge absolute bottom-3 right-3.5 z-20 px-2 py-0.5 rounded-md bg-black/70 border border-white/20 text-[10px] font-mono font-bold tracking-widest text-white"
                style={{ fontFamily: "sans-serif" }}
              >
                0:30 MIN
              </span>
            </div>

            {/* Bottom Content Body - Reduced Content */}
            <div className="r24-about-content-body p-4 sm:p-5 flex-1 flex flex-col justify-between relative z-10">
              <div className="r24-about-text-content">
                <div className="r24-about-tag-row flex items-center gap-2 mb-1.5">
                  <span
                    className="r24-about-tag-text text-[10px] font-mono font-bold tracking-[0.2em] text-[#5078B6] uppercase"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    ABOUT
                  </span>
                  <div className="r24-about-tag-divider h-px flex-1 bg-[#5078B6]/20" />
                </div>

                <div className="r24-about-title-row flex items-baseline gap-3 mb-1.5">
                  <h3
                    className={`r24-about-title text-2xl sm:text-3xl font-extrabold tracking-wider ${dark ? "text-white" : "text-slate-900"
                      }`}
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    ROBOT<span className="text-[#5078B6]">24</span>
                  </h3>
                </div>

                <div className="r24-about-accent-bar w-12 h-[2.5px] bg-[#5078B6] mb-2.5 rounded-full" />

                <p
                  className={`r24-about-description-text text-xs sm:text-sm leading-relaxed font-medium ${dark ? "text-slate-200" : "text-slate-700"
                    }`}
                >
                  ROBOT24 is the premier robotics intelligence platform — combining original field reporting, market analysis, and industry data into an authoritative destination for robotics professionals.
                </p>
              </div>

              {/* Action & Stats Row */}
              <div className="r24-about-actions-row flex items-center justify-between gap-3 flex-wrap pt-3 border-t border-slate-200 dark:border-slate-800/80 mt-3">
                {/* Modern LEARN MORE Button */}
                <button
                  className={`r24-btn r24-about-learn-btn h-10 px-4 rounded-xl text-[11px] font-mono font-bold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer group/learn active:scale-[0.98] inline-flex items-center gap-2 ${dark
                    ? "text-blue-300 border border-blue-500/30 hover:bg-blue-500/15"
                    : "text-slate-900 border border-slate-300 hover:bg-slate-100"
                    }`}
                  style={{ fontFamily: "sans-serif" }}
                >
                  <span className="r24-btn-text">LEARN MORE</span>
                  <ArrowRight size={13} className="r24-btn-icon transition-transform duration-300 group-hover/learn:translate-x-1 text-[#5078B6]" />
                </button>

                {/* Stats Containers */}
                <div className="r24-about-stats-container flex items-center gap-2.5">
                  <div className="r24-about-stat-box h-10 px-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex flex-col items-center justify-center min-w-[64px]">
                    <span
                      className="r24-about-stat-value text-sm font-black tracking-tight text-[#5078B6] leading-none"
                      style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    >
                      28
                    </span>
                    <span
                      className="r24-about-stat-label text-[7px] font-mono font-bold tracking-[0.16em] text-slate-500 dark:text-slate-400 uppercase mt-0.5 leading-none block"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      COUNTRIES
                    </span>
                  </div>

                  <div className="r24-about-stat-box h-10 px-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex flex-col items-center justify-center min-w-[64px]">
                    <span
                      className="r24-about-stat-value text-sm font-black tracking-tight text-[#5078B6] leading-none"
                      style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    >
                      47
                    </span>
                    <span
                      className="r24-about-stat-label text-[7px] font-mono font-bold tracking-[0.16em] text-slate-500 dark:text-slate-400 uppercase mt-0.5 leading-none block"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      REPORTERS
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* ════ RIGHT COLUMN: FEATURED STORY CAROUSEL ════ */}
          <motion.div
            variants={fadeUp}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className={`r24-featured-story-card relative rounded-2xl border overflow-hidden flex flex-col justify-between shadow-sm transition-all duration-500 group/card ${cardBgStory}`}
          >
            {/* Top Media Banner */}
            <div className="r24-featured-media-banner relative h-[230px] sm:h-[260px] w-full overflow-hidden bg-slate-950 flex-shrink-0 group/media">
              <img
                key={currentStory.id}
                src={currentStory.image}
                alt={currentStory.title}
                className="r24-featured-media-img w-full h-full object-cover object-center transition-all duration-700 group-hover/media:scale-105"
                onError={(e) => {
                  e.currentTarget.src = currentStory.fallbackImage;
                }}
              />
              <div className="r24-featured-media-overlay absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/20 pointer-events-none" />

              {/* Top-Left Badge with Slide Counter */}
              <div className="r24-featured-badge-row absolute top-3 left-3.5 z-20 flex items-center gap-2">
                <span className="r24-featured-badge h-6 inline-flex items-center px-2.5 rounded-lg text-[9px] font-mono font-bold tracking-[0.18em] text-white bg-slate-950/80 border border-white/20 backdrop-blur-md uppercase gap-1.5 leading-none shadow-md">
                  <span className={`r24-featured-badge-pulse w-1.5 h-1.5 rounded-full ${currentStory.badgeColor} animate-pulse`} />
                  <span className="r24-featured-badge-text">FEATURED STORY</span>
                </span>
                <span className="r24-featured-counter-badge h-6 inline-flex items-center px-2 rounded-lg text-[9px] font-mono font-bold tracking-wider text-slate-300 bg-slate-950/80 border border-white/10 backdrop-blur-md shadow-md">
                  0{storyIndex + 1} / 0{FEATURED_STORIES.length}
                </span>
              </div>

              {/* Quick Image Navigation Overlay Controls */}
              <div className="r24-featured-nav-overlay absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-3 pointer-events-none opacity-0 group-hover/media:opacity-100 transition-opacity duration-300">
                <button
                  onClick={prevStory}
                  aria-label="Previous Story"
                  className="r24-btn r24-btn-icon r24-featured-prev-media-btn pointer-events-auto w-8 h-8 rounded-full bg-slate-950/70 border border-white/20 text-white flex items-center justify-center backdrop-blur-md hover:bg-[#5078B6] hover:border-[#5078B6] transition-all transform hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextStory}
                  aria-label="Next Story"
                  className="r24-btn r24-btn-icon r24-featured-next-media-btn pointer-events-auto w-8 h-8 rounded-full bg-slate-950/70 border border-white/20 text-white flex items-center justify-center backdrop-blur-md hover:bg-[#5078B6] hover:border-[#5078B6] transition-all transform hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Bottom Content Body */}
            <div className="r24-featured-content-body p-4 sm:p-5 flex-1 flex flex-col justify-between relative z-10">
              <div className="r24-featured-text-container">
                <div className="r24-featured-tag-row flex items-center gap-2 mb-1.5">
                  <span className="r24-featured-tag-text text-[10px] font-mono font-bold tracking-[0.2em] text-[#5078B6] uppercase">
                    {currentStory.tag}
                  </span>
                  <div className="r24-featured-tag-divider h-px flex-1 bg-[#5078B6]/20" />
                </div>

                <h3
                  className={`r24-featured-title text-xl sm:text-2xl font-extrabold leading-[1.25] tracking-tight mb-2 max-w-[460px] line-clamp-2 transition-colors ${dark ? "text-white" : "text-slate-900"
                    }`}
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {currentStory.title}
                </h3>

                <p
                  className={`r24-featured-description-text text-xs sm:text-sm leading-relaxed mb-3 ${dark ? "text-slate-300" : "text-slate-600"
                    }`}
                >
                  {currentStory.description}
                </p>

                <div
                  className="r24-featured-author-meta-box text-[9px] sm:text-[10px] font-mono tracking-[0.16em] text-slate-400 uppercase mb-2 flex items-center gap-2 flex-wrap p-1.5 px-2 rounded-lg border border-slate-200/50 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/50"
                  style={{ fontFamily: "sans-serif" }}
                >
                  <span className="r24-featured-author-label text-[#5078B6] font-bold">AUTHOR:</span>
                  <span className="r24-featured-author-name text-slate-700 dark:text-slate-200">{currentStory.author}</span>
                  <span className="r24-featured-meta-divider text-slate-400">|</span>
                  <span className="r24-featured-location text-slate-400">{currentStory.location}</span>
                  <span className="r24-featured-meta-divider text-slate-400">|</span>
                  <span className="r24-featured-date text-blue-500 dark:text-blue-400">{currentStory.date}</span>
                </div>
              </div>

              {/* Action Button & Carousel Pagination Row */}
              <div className="r24-featured-actions-row pt-3 flex items-center justify-between gap-3 flex-wrap border-t border-slate-200 dark:border-slate-800/80 mt-3">
                {/* Modern Read Story Button */}
                <button
                  className={`r24-btn r24-featured-read-btn h-10 px-4 rounded-xl text-[11px] font-mono font-bold tracking-[0.16em] uppercase transition-all duration-300 cursor-pointer group/btn active:scale-[0.98] inline-flex items-center gap-2 ${dark
                    ? "bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-md"
                    : "bg-[#071F5A] text-white hover:bg-[#0D2E78] shadow-md hover:shadow-lg"
                    }`}
                  style={{ fontFamily: "sans-serif" }}
                >
                  <span className="r24-btn-content relative z-10 flex items-center gap-2">
                    <span className="r24-btn-text">READ FULL STORY</span>
                    <ArrowRight size={14} className="r24-btn-icon transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </span>
                </button>

                {/* ══ CAROUSEL PAGINATION & CONTROLS ══ */}
                <div className="r24-featured-pagination-controls h-10 px-3 rounded-xl flex items-center gap-2.5 bg-slate-100 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
                  {/* Prev Button */}
                  <button
                    onClick={prevStory}
                    aria-label="Previous Slide"
                    className="r24-btn r24-btn-icon r24-featured-prev-btn w-6 h-6 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-all active:scale-95 cursor-pointer"
                  >
                    <ChevronLeft size={14} />
                  </button>

                  {/* 3 Slide Pagination Dots */}
                  <div className="r24-featured-dots-group flex items-center gap-1.5">
                    {FEATURED_STORIES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setStoryIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`r24-featured-dot-btn transition-all duration-300 rounded-full cursor-pointer ${idx === storyIndex
                          ? "w-6 h-2 bg-[#5078B6] shadow-[0_0_8px_rgba(80,120,182,0.6)]"
                          : "w-2 h-2 bg-slate-300 dark:bg-slate-700 hover:bg-[#5078B6]/60"
                          }`}
                      />
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={nextStory}
                    aria-label="Next Slide"
                    className="r24-btn r24-btn-icon r24-featured-next-btn w-6 h-6 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-all active:scale-95 cursor-pointer"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </InViewSection>

      {/* ══ VIDEO MODAL ══ */}
      {videoOpen && (
        <div className="r24-video-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
          <div className="r24-video-modal-card relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="r24-video-modal-header flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/60">
              <div className="r24-video-modal-title-box flex items-center gap-2">
                <span className="r24-video-modal-pulse w-2 h-2 rounded-full bg-[#5078B6] animate-pulse" />
                <span className="r24-video-modal-title text-xs font-mono font-bold text-slate-300 tracking-widest uppercase">
                  ROBOT24 BRAND STORY — 30 SECONDS
                </span>
              </div>
              <button
                onClick={() => setVideoOpen(false)}
                className="r24-btn r24-btn-icon r24-video-modal-close-btn w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="r24-video-modal-frame-box aspect-video w-full bg-black relative flex items-center justify-center">
              <iframe
                className="r24-video-modal-iframe w-full h-full"
                src="https://www.youtube-nocookie.com/embed/29ECw6fWp1R0?autoplay=1"
                title="ROBOT24 Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

// ── Reporter Videos Section (Curved Design) ───────────────────────────────────

const REPORTER_VIDEOS = [
  {
    id: "v1",
    category: "INDUSTRY",
    title: "Inside Figure AI's Third-Generation Humanoid",
    reporter: "James Whitfield",
    location: "San Jose, CA",
    duration: "12:34",
    views: "42.8K",
    date: "Aug 11, 2026",
    image: heroRobotImg,
    fallbackImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=1200&fit=crop&auto=format",
    videoUrl: "https://www.youtube-nocookie.com/embed/29ECw6fWp1R0?autoplay=1",
    badgeBg: "bg-[#2563EB]/20 text-[#60A5FA] border-[#2563EB]/40",
  },
  {
    id: "v2",
    category: "LOGISTICS",
    title: "Amazon's Fulfilment Revolution",
    reporter: "Sofia Reyes",
    location: "Seattle, WA",
    duration: "8:15",
    views: "28.4K",
    date: "Aug 10, 2026",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop&auto=format",
    fallbackImage: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=800&h=500&fit=crop&auto=format",
    videoUrl: "https://www.youtube-nocookie.com/embed/29ECw6fWp1R0?autoplay=1",
    badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40",
  },
  {
    id: "v3",
    category: "RESEARCH",
    title: "The Electric Atlas: A Closer Look",
    reporter: "Oliver Kent",
    location: "Boston, MA",
    duration: "10:22",
    views: "35.1K",
    date: "Aug 09, 2026",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&h=500&fit=crop&auto=format",
    fallbackImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=500&fit=crop&auto=format",
    videoUrl: "https://www.youtube-nocookie.com/embed/29ECw6fWp1R0?autoplay=1",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-400/40",
  },
  {
    id: "v4",
    category: "TECHNOLOGY",
    title: "NVIDIA and the Future of Robot Learning",
    reporter: "Yuki Tanaka",
    location: "Santa Clara, CA",
    duration: "7:48",
    views: "19.6K",
    date: "Aug 08, 2026",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop&auto=format",
    fallbackImage: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=800&h=500&fit=crop&auto=format",
    videoUrl: "https://www.youtube-nocookie.com/embed/29ECw6fWp1R0?autoplay=1",
    badgeBg: "bg-violet-500/20 text-violet-300 border-violet-400/40",
  },
  {
    id: "v5",
    category: "INNOVATION",
    title: "Autonomous Swarms in Extreme Environments",
    reporter: "Elena Rostova",
    location: "Chernobyl, UA",
    duration: "9:05",
    views: "22.3K",
    date: "Aug 07, 2026",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop&auto=format",
    fallbackImage: "https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?w=800&h=500&fit=crop&auto=format",
    videoUrl: "https://www.youtube-nocookie.com/embed/29ECw6fWp1R0?autoplay=1",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
  },
];

function ReporterVideosSection({ dark }: { dark: boolean }) {
  const [activeVideo, setActiveVideo] = useState<typeof REPORTER_VIDEOS[0] | null>(null);

  const containerBg = dark
    ? "bg-[#040C24]/90 border-[#1E2E4A] shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
    : "bg-[#F3F6FA] border-slate-200/90 shadow-[0_12px_36px_rgba(7,31,90,0.06)]";

  const featured = REPORTER_VIDEOS[0];
  const gridVideos = REPORTER_VIDEOS.slice(1, 5);

  return (
    <section className="r24-section r24-reporter-videos-section relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <InViewSection>
        {/* ══ CURVED CONTAINER SHELL ══ */}
        <div className={`r24-reporter-videos-shell relative rounded-2xl border p-4 sm:p-5 lg:p-6 transition-all duration-500 overflow-hidden backdrop-blur-md ${containerBg}`}>

          {/* Ambient Curved Decorative Glow Arc */}
          <div
            className="r24-reporter-glow-arc-top absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[120px] opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)" }}
          />
          <div
            className="r24-reporter-glow-arc-bottom absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #5078B6 0%, transparent 70%)" }}
          />

          {/* ── SECTION HEADER ── */}
          <div className="r24-reporter-header flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5 relative z-10">
            <div className="r24-reporter-header-text">
              {/* Category Pill Tag */}
              <div className="r24-reporter-badge-row flex items-center gap-2 mb-2">
                <span className="r24-reporter-badge h-6 inline-flex items-center px-3 rounded-lg text-[10px] font-mono font-bold tracking-[0.2em] text-[#3B82F6] dark:text-[#60A5FA] bg-[#3B82F6]/10 border border-[#3B82F6]/30 uppercase gap-1.5">
                  <span className="r24-reporter-badge-dot w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="r24-reporter-badge-text">VIDEO</span>
                </span>
              </div>

              {/* Title with Curved Accent */}
              <h2
                className={`r24-reporter-title text-xl sm:text-2xl font-extrabold tracking-wide uppercase leading-tight ${dark ? "text-white" : "text-[#05153E]"
                  }`}
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                LATEST VIDEOS FROM OUR REPORTERS
              </h2>

              <div className="r24-reporter-accent-line w-16 h-[3px] bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full mt-2.5" />
            </div>

            {/* VIEW ALL Curved Pill Button */}
            <button
              className={`r24-btn r24-reporter-viewall-btn inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-mono font-bold tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer shadow-sm group/viewall active:scale-[0.98] ${dark
                ? "bg-slate-900/90 text-white border border-slate-700/80 hover:bg-[#2563EB] hover:border-[#2563EB]"
                : "bg-white text-[#05153E] border border-slate-300 hover:bg-[#071F5A] hover:text-white hover:border-[#071F5A]"
                }`}
              style={{ fontFamily: "sans-serif" }}
            >
              <span className="r24-btn-text">VIEW ALL</span>
              <ArrowRight size={14} className="r24-btn-icon transition-transform duration-300 group-hover/viewall:translate-x-1" />
            </button>
          </div>

          {/* ── 2-COLUMN CURVED GRID ── */}
          <div className="r24-reporter-grid grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">

            {/* ════ LEFT COLUMN: MAIN FEATURED LARGE CURVED VIDEO CARD ════ */}
            <div
              onClick={() => setActiveVideo(featured)}
              className="r24-reporter-featured-card lg:col-span-6 relative rounded-2xl overflow-hidden group/feat cursor-pointer border border-slate-700/30 shadow-xl transition-all duration-500 hover:shadow-2xl flex flex-col justify-end min-h-[420px] sm:min-h-[480px] lg:min-h-[510px]"
            >
              {/* Image */}
              <img
                src={featured.image}
                alt={featured.title}
                className="r24-reporter-featured-img absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/feat:scale-105"
                onError={(e) => { e.currentTarget.src = featured.fallbackImage; }}
              />

              {/* Gradient Mask */}
              <div className="r24-reporter-featured-overlay absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-black/20 transition-opacity duration-300 group-hover/feat:opacity-90" />

              {/* Centered Curved Glossy Play Overlay */}
              <div className="r24-reporter-featured-play-box absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div
                  className="r24-reporter-featured-play-btn w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/50 backdrop-blur-md flex items-center justify-center transition-all duration-500 shadow-[0_12px_40px_rgba(0,0,0,0.5)] group-hover/feat:scale-110 group-hover/feat:border-white"
                  style={{
                    background: "radial-gradient(100% 100% at 30% 20%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.15) 100%)",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.8)"
                  }}
                >
                  <Play size={32} fill="white" className="r24-reporter-featured-play-icon ml-1 text-white drop-shadow-lg transition-transform duration-300 group-hover/feat:scale-110" />
                </div>
              </div>

              {/* Top-Right Duration Pill Badge */}
              <div className="r24-reporter-featured-duration-box absolute top-4 right-4 z-20">
                <span className="r24-reporter-featured-duration-badge px-3 py-1 rounded-lg bg-slate-950/80 border border-white/20 backdrop-blur-md text-[10px] font-mono font-bold tracking-widest text-white shadow-md">
                  ⏱ {featured.duration}
                </span>
              </div>

              {/* Bottom Card Meta Details */}
              <div className="r24-reporter-featured-meta-content relative z-20 p-6 sm:p-7">
                {/* Category Pill Tag */}
                <div className="r24-reporter-featured-cat-row mb-3">
                  <span className="r24-reporter-featured-cat-badge px-3 py-1 rounded-lg text-[10px] font-mono font-bold tracking-[0.2em] text-cyan-300 bg-blue-600/40 border border-cyan-400/40 backdrop-blur-md uppercase">
                    {featured.category}
                  </span>
                </div>

                {/* Main Title */}
                <h3
                  className="r24-reporter-featured-title text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight mb-3 transition-colors group-hover/feat:text-blue-300"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {featured.title}
                </h3>

                {/* Subtitle / Reporter Info */}
                <div
                  className="r24-reporter-featured-info text-xs sm:text-sm font-mono tracking-wide text-slate-300 flex items-center gap-2 flex-wrap"
                  style={{ fontFamily: "sans-serif" }}
                >
                  <span className="r24-reporter-featured-name font-semibold text-white">{featured.reporter}</span>
                  <span className="r24-reporter-featured-divider text-slate-500">|</span>
                  <span className="r24-reporter-featured-location">{featured.location}</span>
                  <span className="r24-reporter-featured-divider text-slate-500">|</span>
                  <span className="r24-reporter-featured-duration text-blue-400 font-semibold">{featured.duration}</span>
                </div>
              </div>
            </div>

            {/* ════ RIGHT COLUMN: 4 SMALLER CURVED VIDEO CARDS ════ */}
            <div className="r24-reporter-small-cards-grid lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {gridVideos.map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => setActiveVideo(vid)}
                  className="r24-reporter-small-card relative rounded-2xl overflow-hidden group/vid cursor-pointer border border-slate-700/30 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col justify-end h-[220px] sm:h-[245px]"
                >
                  {/* Image */}
                  <img
                    src={vid.image}
                    alt={vid.title}
                    className="r24-reporter-small-img absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/vid:scale-108"
                    onError={(e) => { e.currentTarget.src = vid.fallbackImage; }}
                  />

                  {/* Gradient Mask */}
                  <div className="r24-reporter-small-overlay absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent transition-opacity duration-300 group-hover/vid:opacity-90" />

                  {/* Top-Left Category Pill Tag */}
                  <div className="r24-reporter-small-cat-box absolute top-3 left-3 z-20">
                    <span className="r24-reporter-small-cat-badge px-2.5 py-0.5 rounded-lg text-[9px] font-mono font-bold tracking-widest text-cyan-200 bg-slate-950/70 border border-white/20 backdrop-blur-md uppercase">
                      {vid.category}
                    </span>
                  </div>

                  {/* Hover Play Button Overlay */}
                  <div className="r24-reporter-small-play-box absolute top-3 right-3 z-20">
                    <div className="r24-reporter-small-play-btn w-8 h-8 rounded-full bg-slate-950/70 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group-hover/vid:scale-110 group-hover/vid:bg-[#2563EB] group-hover/vid:border-[#2563EB]">
                      <Play size={12} fill="white" className="ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Text Content */}
                  <div className="r24-reporter-small-content relative z-20 p-4 sm:p-4.5">
                    <h4
                      className="r24-reporter-small-title text-base sm:text-lg font-bold text-white leading-snug tracking-tight mb-1.5 line-clamp-2 transition-colors group-hover/vid:text-blue-300"
                      style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    >
                      {vid.title}
                    </h4>

                    <div
                      className="r24-reporter-small-info text-[10px] sm:text-[11px] font-mono text-slate-300 flex items-center gap-1.5 flex-wrap"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      <span className="r24-reporter-small-name font-semibold text-white truncate max-w-[110px]">{vid.reporter}</span>
                      <span className="r24-reporter-small-divider text-slate-500">|</span>
                      <span className="r24-reporter-small-location text-slate-300 truncate max-w-[90px]">{vid.location}</span>
                      <span className="r24-reporter-small-divider text-slate-500">|</span>
                      <span className="r24-reporter-small-duration text-blue-400 font-semibold">{vid.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </InViewSection>

      {/* ══ INTERACTIVE VIDEO MODAL ══ */}
      {activeVideo && (
        <div className="r24-reporter-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
          <div className="r24-reporter-modal-card relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="r24-reporter-modal-header flex items-center justify-between p-4 px-6 border-b border-slate-800 bg-slate-900/80">
              <div className="r24-reporter-modal-title-box flex items-center gap-3">
                <span className="r24-reporter-modal-cat-badge px-2.5 py-0.5 rounded-lg text-[9px] font-mono font-bold tracking-widest text-cyan-300 bg-blue-500/20 border border-blue-400/30 uppercase">
                  {activeVideo.category}
                </span>
                <span className="r24-reporter-modal-title text-sm font-bold text-white tracking-wide" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  {activeVideo.title}
                </span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="r24-btn r24-btn-icon r24-reporter-modal-close-btn w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="r24-reporter-modal-frame-box aspect-video w-full bg-black relative flex items-center justify-center">
              <iframe
                className="r24-reporter-modal-iframe w-full h-full"
                src={activeVideo.videoUrl}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ── TOP ROBOTICS STORIES & TODAY IN ROBOTICS DATA ────────────────────────────

const TOP_ROBOTICS_STORIES = [
  {
    id: "01",
    category: "INDUSTRY",
    title: "Figure AI Unveils Next-Gen Humanoid Robot",
    timeAgo: "2h ago",
    image: heroRobotImg,
    fallbackImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&h=1200&fit=crop&auto=format",
    summary: "Figure AI introduces its flagship humanoid model with 24-DOF hand dexterity, real-time neural vision, and high-precision torque feedback.",
  },
  {
    id: "02",
    category: "LOGISTICS",
    title: "Amazon Expands Warehouse Robot Fleet to 45,000 Units",
    timeAgo: "4h ago",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&h=1200&fit=crop&auto=format",
    fallbackImage: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=1000&h=1200&fit=crop&auto=format",
    summary: "Massive fleet deployment across North American logistics hubs optimizes sorting speed and order fulfillment throughput.",
  },
  {
    id: "03",
    category: "INDUSTRY",
    title: "Tesla Optimus Production Ramp Development Update",
    timeAgo: "6h ago",
    image: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=1000&h=1200&fit=crop&auto=format",
    fallbackImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1000&h=1200&fit=crop&auto=format",
    summary: "Optimus Gen 3 assembly line achieves 99.4% autonomous cell assembly precision during factory trials.",
  },
  {
    id: "04",
    category: "RESEARCH",
    title: "Boston Dynamics Electric Atlas Sets New Mobility Record",
    timeAgo: "8h ago",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1000&h=1200&fit=crop&auto=format",
    fallbackImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000&h=1200&fit=crop&auto=format",
    summary: "Electric actuators deliver 360° range of motion and ultra-fluid dynamic balancing across rough terrain.",
  },
];

const TODAY_IN_ROBOTICS_TIMELINE = [
  {
    id: "t1",
    time: "10:00 AM",
    category: "INDUSTRY",
    title: "Figure AI press conference livestream begins",
    expandedCard: {
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=280&fit=crop&auto=format",
      fallbackThumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=280&fit=crop&auto=format",
      description: "Figure AI demonstrates their flagship humanoid robot with real-time neural vision and high-precision task execution.",
    },
  },
  {
    id: "t2",
    time: "10:30 AM",
    category: "LOGISTICS",
    title: "Amazon announces expanded Proteus deployment",
    expandedCard: {
      thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=280&fit=crop&auto=format",
      fallbackThumbnail: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=400&h=280&fit=crop&auto=format",
      description: "The next wave of 15,000 autonomous mobile robots will be deployed across North American fulfilment centres.",
    },
  },
  {
    id: "t3",
    time: "11:00 AM",
    category: "INDUSTRY",
    title: "Tesla Optimus achieves new assembly benchmark",
    expandedCard: {
      thumbnail: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=400&h=280&fit=crop&auto=format",
      fallbackThumbnail: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=280&fit=crop&auto=format",
      description: "Tesla's Optimus humanoid cell assembly line achieves a record 99.4% autonomous precision rate during factory trials.",
    },
  },
  {
    id: "t4",
    time: "12:30 PM",
    category: "TECHNOLOGY",
    title: "NVIDIA Cosmos platform opens to robotics startups",
    expandedCard: {
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=280&fit=crop&auto=format",
      fallbackThumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=280&fit=crop&auto=format",
      description: "Robotics developers get instant access to physical AI world models and synthetic physics simulation infrastructure.",
    },
  },
];

function TopStoriesAndLiveTimelineSection({ dark }: { dark: boolean }) {
  const [selectedStoryId, setSelectedStoryId] = useState("01");
  const [activeTimelineId, setActiveTimelineId] = useState<string>("t2");
  const activeStory = TOP_ROBOTICS_STORIES.find((s) => s.id === selectedStoryId) || TOP_ROBOTICS_STORIES[0];

  const containerBg = dark
    ? "bg-[#040C24]/90 border-[#1E2E4A] shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
    : "bg-[#F3F6FA] border-slate-200/90 shadow-[0_12px_36px_rgba(7,31,90,0.06)]";

  return (
    <section className="r24-section r24-top-stories-timeline-section relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <InViewSection>
        {/* ══ CURVED CONTAINER SHELL ══ */}
        <div className={`r24-top-stories-timeline-shell relative rounded-2xl border p-4 sm:p-6 lg:p-7 transition-all duration-500 overflow-hidden backdrop-blur-md ${containerBg}`}>

          {/* Ambient Curved Decorative Glow Arcs */}
          <div
            className="r24-top-stories-glow-arc-top absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[120px] opacity-25 pointer-events-none"
            style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 70%)" }}
          />
          <div
            className="r24-top-stories-glow-arc-bottom absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #5078B6 0%, transparent 70%)" }}
          />

          {/* ── 2-MAIN COLUMN GRID ── */}
          <div className="r24-top-stories-timeline-grid grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">

            {/* ════════════════════════════════════════════════════════════════
                LEFT MAIN COLUMN: TOP ROBOTICS STORIES (7 Cols)
               ════════════════════════════════════════════════════════════════ */}
            <div className="r24-top-stories-col lg:col-span-7 flex flex-col justify-between space-y-5">

              {/* Section Header */}
              <div className="r24-top-stories-header">
                <h2
                  className={`r24-top-stories-title text-xl sm:text-2xl font-extrabold tracking-wide uppercase leading-tight ${dark ? "text-white" : "text-[#05153E]"
                    }`}
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  TOP ROBOTICS STORIES
                </h2>

                <div className="r24-top-stories-accent-line w-16 h-[3px] bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full mt-2.5" />
              </div>

              {/* Sub-grid: 4 Numbered Items (Left 7 cols) + Curved Featured Image Card (Right 5 cols) */}
              <div className="r24-top-stories-subgrid grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">

                {/* Numbered Stories List (7 Sub-Cols on md+) */}
                <div className="r24-top-stories-list md:col-span-7 flex flex-col justify-between space-y-2">
                  {TOP_ROBOTICS_STORIES.map((story) => {
                    const isActive = story.id === selectedStoryId;
                    return (
                      <div
                        key={story.id}
                        onClick={() => setSelectedStoryId(story.id)}
                        className={`r24-top-story-item group cursor-pointer p-3 rounded-xl transition-all duration-300 border ${isActive
                          ? dark
                            ? "bg-slate-900/90 border-[#2563EB]/50 shadow-md"
                            : "bg-white border-[#2563EB]/40 shadow-sm"
                          : dark
                            ? "bg-transparent border-transparent hover:bg-slate-900/40"
                            : "bg-transparent border-transparent hover:bg-white/60"
                          }`}
                      >
                        <div className="r24-top-story-item-inner flex items-start gap-3.5">
                          {/* Big Number */}
                          <span
                            className={`r24-top-story-number text-3xl sm:text-4xl font-extrabold font-mono leading-none transition-colors duration-300 flex-shrink-0 ${isActive
                              ? "text-[#2563EB] dark:text-[#60A5FA]"
                              : "text-slate-300 dark:text-slate-700 group-hover:text-slate-400"
                              }`}
                            style={{ fontFamily: "'Rajdhani', sans-serif" }}
                          >
                            {story.id}
                          </span>

                          {/* Story Details */}
                          <div className="r24-top-story-details flex-1 min-w-0">
                            <span className="r24-top-story-category text-[10px] font-mono font-bold tracking-[0.2em] text-[#3B82F6] dark:text-[#60A5FA] uppercase block mb-1">
                              {story.category}
                            </span>

                            <h3
                              className={`r24-top-story-title text-base sm:text-lg font-bold leading-tight transition-colors duration-200 ${isActive
                                ? dark
                                  ? "text-white"
                                  : "text-[#05153E]"
                                : dark
                                  ? "text-slate-300 group-hover:text-white"
                                  : "text-slate-700 group-hover:text-[#05153E]"
                                }`}
                              style={{ fontFamily: "'Rajdhani', sans-serif" }}
                            >
                              {story.title}
                            </h3>

                            {/* Active Blue Underline Bar beneath Title */}
                            {isActive ? (
                              <div className="r24-top-story-underline w-full h-[2px] bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-transparent rounded-full mt-2" />
                            ) : (
                              <div className="r24-top-story-divider w-full h-[1px] bg-slate-200/50 dark:bg-slate-800/50 mt-2" />
                            )}

                            <span className="r24-top-story-timeago text-[11px] font-mono text-slate-400 mt-1.5 block">
                              {story.timeAgo}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Featured Image Card (5 Sub-Cols on md+) */}
                <div className="r24-top-stories-featured-card md:col-span-5 relative rounded-2xl overflow-hidden border border-slate-700/30 shadow-xl group/card min-h-[320px] sm:min-h-[380px] flex flex-col justify-end">
                  <img
                    src={activeStory.image}
                    alt={activeStory.title}
                    className="r24-top-stories-featured-img absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover/card:scale-105"
                    onError={(e) => { e.currentTarget.src = activeStory.fallbackImage; }}
                  />

                  {/* Gradient Mask Overlay */}
                  <div className="r24-top-stories-featured-overlay absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Overlay Meta Content at Bottom */}
                  <div className="r24-top-stories-featured-meta relative z-10 p-5">
                    <span className="r24-top-stories-featured-category px-2.5 py-0.5 rounded-lg text-[9px] font-mono font-bold tracking-widest text-cyan-300 bg-blue-600/40 border border-cyan-400/40 backdrop-blur-md uppercase inline-block mb-2">
                      {activeStory.category}
                    </span>

                    <h4
                      className="r24-top-stories-featured-title text-lg sm:text-xl font-bold text-white leading-tight drop-shadow-md"
                      style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    >
                      {activeStory.title}
                    </h4>
                  </div>
                </div>

              </div>
            </div>


            {/* ════════════════════════════════════════════════════════════════
                RIGHT MAIN COLUMN: TODAY IN ROBOTICS TIMELINE (5 Cols)
               ════════════════════════════════════════════════════════════════ */}
            <div className="r24-timeline-col lg:col-span-5 flex flex-col justify-between space-y-5 lg:border-l lg:border-slate-200 lg:dark:border-slate-800/80 lg:pl-8">

              {/* Timeline Header */}
              <div className="r24-timeline-header">
                {/* LIVE Badge Tag */}
                <div className="r24-timeline-live-badge flex items-center gap-1.5 mb-2">
                  <span className="r24-timeline-live-pulse relative flex h-2 w-2">
                    <span className="r24-timeline-live-ping animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="r24-timeline-live-dot relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  <span className="r24-timeline-live-text text-[10px] font-mono font-bold tracking-[0.25em] text-[#3B82F6] dark:text-[#60A5FA] uppercase">
                    LIVE
                  </span>
                </div>

                <h2
                  className={`r24-timeline-title text-xl sm:text-2xl font-extrabold tracking-wide uppercase leading-tight ${dark ? "text-white" : "text-[#05153E]"
                    }`}
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  TODAY IN ROBOTICS
                </h2>

                <div className="r24-timeline-accent-line w-16 h-[3px] bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full mt-2.5" />
              </div>

              {/* Vertical Timeline Container */}
              <div className="r24-timeline-container relative pt-1 flex-1 flex flex-col justify-around">
                {/* Timeline Items */}
                <div className="r24-timeline-list flex flex-col">
                  {TODAY_IN_ROBOTICS_TIMELINE.map((item, index) => {
                    const isActive = activeTimelineId === item.id;
                    const isFirst = index === 0;
                    const isLast = index === TODAY_IN_ROBOTICS_TIMELINE.length - 1;

                    return (
                      <div
                        key={item.id}
                        onClick={() => setActiveTimelineId(item.id)}
                        className={`r24-timeline-item relative flex items-stretch gap-3 sm:gap-4 group/item cursor-pointer select-none ${isLast ? "pb-0" : "pb-4 sm:pb-5"
                          }`}
                      >

                        {/* Left Time Stamp */}
                        <div className={`r24-timeline-timestamp w-[58px] sm:w-[66px] text-right text-[11px] sm:text-xs font-mono font-bold pt-0.5 flex-shrink-0 transition-colors ${isActive
                            ? "text-slate-900 dark:text-white font-extrabold"
                            : "text-slate-500 dark:text-slate-400 group-hover/item:text-slate-700 dark:group-hover/item:text-slate-300"
                          }`}>
                          {item.time}
                        </div>

                        {/* Node Dot + Vertical Line Column (Guaranteed Center-Aligned) */}
                        <div className="r24-timeline-node-col relative w-6 flex flex-col items-center justify-start flex-shrink-0 pt-0.5 self-stretch">
                          {/* Vertical Line Segment passing behind circle */}
                          <div
                            className={`r24-timeline-node-line absolute w-[2px] bg-slate-300 dark:bg-slate-700/80 left-1/2 -translate-x-1/2 ${isFirst
                                ? "top-2.5 bottom-0"
                                : isLast
                                  ? "top-0 h-3.5"
                                  : "top-0 bottom-0"
                              }`}
                          />

                          {/* Node Circle Dot */}
                          <div
                            className={`r24-timeline-node-circle relative w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 flex-shrink-0 z-10 ${isActive
                                ? "bg-[#2563EB] border-white dark:border-slate-900 ring-4 ring-[#2563EB]/25 dark:ring-[#3B82F6]/30 shadow-sm scale-110"
                                : "bg-slate-400 dark:bg-slate-600 border-white dark:border-slate-900 group-hover/item:bg-blue-400 group-hover/item:scale-110"
                              }`}
                          />
                        </div>

                        {/* Right Item Info */}
                        <div className="r24-timeline-content flex-1 min-w-0 pt-0.5">
                          <span className="r24-timeline-category text-[10px] font-mono font-bold tracking-[0.2em] text-[#3B82F6] dark:text-[#60A5FA] uppercase block mb-0.5">
                            {item.category}
                          </span>

                          <h3
                            className={`r24-timeline-item-title text-base sm:text-lg font-bold leading-snug transition-colors ${isActive
                                ? dark ? "text-white" : "text-[#05153E]"
                                : dark ? "text-white/80 group-hover/item:text-white" : "text-slate-700 group-hover/item:text-[#2563EB]"
                              }`}
                            style={{ fontFamily: "'Rajdhani', sans-serif" }}
                          >
                            {item.title}
                          </h3>

                          {/* Expanded Thumbnail Card */}
                          <AnimatePresence initial={false}>
                            {isActive && item.expandedCard && (
                              <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="r24-timeline-expanded-wrapper overflow-hidden"
                              >
                                <div
                                  className={`r24-timeline-expanded-card p-3 sm:p-3.5 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row gap-3 sm:gap-3.5 items-center ${dark
                                      ? "bg-slate-900/90 border-slate-800 shadow-lg shadow-black/20"
                                      : "bg-white border-slate-200/90 shadow-[0_4px_20px_rgba(7,31,90,0.06)]"
                                    }`}
                                >
                                  <img
                                    src={item.expandedCard.thumbnail}
                                    alt={item.title}
                                    onError={(e) => {
                                      if (item.expandedCard?.fallbackThumbnail) {
                                        e.currentTarget.src = item.expandedCard.fallbackThumbnail;
                                      }
                                    }}
                                    className="r24-timeline-expanded-thumbnail w-full sm:w-28 h-20 sm:h-16 rounded-xl object-cover flex-shrink-0 border border-slate-200/60 dark:border-slate-800"
                                  />
                                  <p className="r24-timeline-expanded-description text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-normal">
                                    {item.expandedCard.description}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

        </div>
      </InViewSection>
    </section>
  );
}

// ── MOST VIEWED & POPULAR POSTS DATA ──────────────────────────────────────────

const MOST_VIEWED_ITEMS = [
  {
    id: "mv1",
    category: "TECHNOLOGY",
    pillBgLight: "bg-[#E0F7FA]",
    pillTextLight: "text-[#00838F]",
    pillBgDark: "bg-[#004D40]/50",
    pillTextDark: "text-[#80DEEA]",
    title: "Atlas Robot Breaks Speed Record in Warehouse Test",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&auto=format",
    fallbackImage: heroRobotImg,
  },
  {
    id: "mv2",
    category: "INSIGHTS",
    pillBgLight: "bg-[#E0F2FE]",
    pillTextLight: "text-[#2563EB]",
    pillBgDark: "bg-[#1E3A8A]/50",
    pillTextDark: "text-[#93C5FD]",
    title: "The $20K Humanoid: Who Can Afford It?",
    image: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=600&h=400&fit=crop&auto=format",
    fallbackImage: heroRobotImg,
  },
  {
    id: "mv3",
    category: "INDUSTRY",
    pillBgLight: "bg-[#F3E8FF]",
    pillTextLight: "text-[#7C3AED]",
    pillBgDark: "bg-[#581C87]/50",
    pillTextDark: "text-[#C084FC]",
    title: "Robots in Restaurants: The New Front of House",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop&auto=format",
    fallbackImage: heroRobotImg,
  },
];

const POPULAR_POSTS_SECTION_ITEMS = [
  {
    id: "pp1",
    number: 1,
    date: "Aug 11, 2026",
    title: "How Humanoid Robots Can Help People with Disabilities",
    views: "12.4K views",
  },
  {
    id: "pp2",
    number: 2,
    date: "Aug 11, 2026",
    title: "RaaS or Buying Robots: The Better Option?",
    views: "9.1K views",
  },
  {
    id: "pp3",
    number: 3,
    date: "Aug 10, 2026",
    title: "Can You Buy a Humanoid Robot Today?",
    views: "7.8K views",
  },
  {
    id: "pp4",
    number: 4,
    date: "Aug 9, 2026",
    title: "Industrial Automation Reshaping Supply Chains",
    views: "6.2K views",
  },
];

function MostViewedAndPopularSection({ dark }: { dark: boolean }) {
  const cardBg = dark
    ? "bg-[#040C24] border-slate-800 text-white"
    : "bg-white border-slate-200/90 shadow-[0_4px_24px_rgba(7,31,90,0.04)]";

  return (
    <section className="r24-section r24-most-viewed-popular-section relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <InViewSection>
        <div className="r24-most-viewed-popular-grid grid grid-cols-1 lg:grid-cols-2 gap-7 items-stretch">

          {/* ════════════════════════════════════════════════════════════════
              LEFT SECTION: MOST VIEWED
             ════════════════════════════════════════════════════════════════ */}
          <div className={`r24-most-viewed-card rounded-3xl border p-6 sm:p-7 transition-all duration-500 flex flex-col justify-between ${cardBg}`}>
            {/* Header with Site Typography & Accent Line */}
            <div className="r24-most-viewed-header flex items-center gap-3 mb-6">
              <div className="r24-most-viewed-accent-bar w-1.5 h-6 bg-gradient-to-b from-[#2563EB] to-[#60A5FA] rounded-full flex-shrink-0" />
              <h2
                className={`r24-most-viewed-title text-xl sm:text-2xl font-extrabold tracking-wider uppercase leading-tight ${dark ? "text-white" : "text-[#05153E]"
                  }`}
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                MOST VIEWED
              </h2>
            </div>

            {/* List Items */}
            <div className="r24-most-viewed-list space-y-5 flex-1 flex flex-col justify-between">
              {MOST_VIEWED_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="r24-most-viewed-item flex items-center gap-4 sm:gap-5 group cursor-pointer p-1.5 rounded-2xl transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  {/* Thumbnail Image */}
                  <div className="r24-most-viewed-thumb-box relative overflow-hidden rounded-2xl w-32 h-24 sm:w-36 sm:h-24 flex-shrink-0 border border-slate-100 dark:border-slate-800 shadow-sm">
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={(e) => {
                        e.currentTarget.src = item.fallbackImage;
                      }}
                      className="r24-most-viewed-thumb-img w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="r24-most-viewed-content-box flex-1 min-w-0 space-y-1.5">
                    {/* Category Pill Tag with Rajdhani font */}
                    <div className="r24-most-viewed-category-row">
                      <span
                        className={`r24-most-viewed-category-badge inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-mono font-bold tracking-wider uppercase ${dark ? `${item.pillBgDark} ${item.pillTextDark}` : `${item.pillBgLight} ${item.pillTextLight}`
                          }`}
                        style={{ fontFamily: "'Rajdhani', sans-serif" }}
                      >
                        • {item.category}
                      </span>
                    </div>

                    {/* Title with Rajdhani Heading Font */}
                    <h3
                      className={`r24-most-viewed-item-title text-base sm:text-lg font-bold leading-snug transition-colors line-clamp-2 ${dark
                          ? "text-slate-100 group-hover:text-[#60A5FA]"
                          : "text-[#05153E] group-hover:text-[#2563EB]"
                        }`}
                      style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════════
              RIGHT SECTION: POPULAR POSTS
             ════════════════════════════════════════════════════════════════ */}
          <div className={`r24-popular-posts-card rounded-3xl border p-6 sm:p-7 transition-all duration-500 flex flex-col justify-between ${cardBg}`}>
            {/* Header with Site Typography & Accent Line */}
            <div className="r24-popular-posts-header flex items-center gap-3 mb-6">
              <div className="r24-popular-posts-accent-bar w-1.5 h-6 bg-gradient-to-b from-[#2563EB] to-[#60A5FA] rounded-full flex-shrink-0" />
              <h2
                className={`r24-popular-posts-title text-xl sm:text-2xl font-extrabold tracking-wider uppercase leading-tight ${dark ? "text-white" : "text-[#05153E]"
                  }`}
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                POPULAR POSTS
              </h2>
            </div>

            {/* List Items */}
            <div className="r24-popular-posts-list space-y-4 flex-1 flex flex-col justify-between">
              {POPULAR_POSTS_SECTION_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="r24-popular-posts-item flex items-start gap-4 group cursor-pointer p-2 rounded-2xl transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  {/* Number Badge with Rajdhani font */}
                  <div
                    className={`r24-popular-posts-number-badge w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-extrabold text-sm sm:text-base flex items-center justify-center flex-shrink-0 transition-colors ${dark
                        ? "bg-[#1E293B] text-[#60A5FA] group-hover:bg-[#3B82F6] group-hover:text-white"
                        : "bg-[#EBF3FE] text-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:text-white"
                      }`}
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    {item.number}
                  </div>

                  {/* Right Content */}
                  <div className="r24-popular-posts-content-box flex-1 min-w-0">
                    <p
                      className="r24-popular-posts-date-text text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mb-0.5"
                      style={{ fontFamily: "'VogueAvantGarde', 'Rajdhani', sans-serif" }}
                    >
                      {item.date}
                    </p>

                    <h3
                      className={`r24-popular-posts-item-title text-base sm:text-lg font-bold leading-snug transition-colors line-clamp-2 ${dark
                          ? "text-slate-100 group-hover:text-[#60A5FA]"
                          : "text-[#05153E] group-hover:text-[#2563EB]"
                        }`}
                      style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    >
                      {item.title}
                    </h3>

                    {/* Views Count with Vogue/Rajdhani Font */}
                    <div
                      className="r24-popular-posts-views-box flex items-center gap-1.5 mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium"
                      style={{ fontFamily: "'VogueAvantGarde', 'Rajdhani', sans-serif" }}
                    >
                      <Eye size={14} className="r24-popular-posts-eye-icon text-[#3B82F6] dark:text-[#60A5FA]" />
                      <span className="r24-popular-posts-views-text">{item.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </InViewSection>
    </section>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");

  const bg = dark ? "bg-[#071F5A]" : "bg-white";
  const fg = dark ? "text-[#E8EFFE]" : "text-[#071F5A]";
  const card = dark ? "bg-[#0D2E78]/70 border-[#5078B6]/15 backdrop-blur-sm" : "bg-white border-[#071F5A]/8";
  const cardHover = dark ? "hover:border-[#5078B6]/40 hover:bg-[#0D2E78]" : "hover:border-[#5078B6]/25 hover:shadow-md";
  const muted = dark ? "text-[#8AACD8]" : "text-[#5078B6]";
  const border = dark ? "border-[#5078B6]/15" : "border-[#071F5A]/8";
  const navBg = dark ? "bg-[#050F2E]/95 border-[#5078B6]/15" : "bg-white border-[#071F5A]/8";
  const tickerBg = dark ? "bg-[#5078B6]/15 border-[#5078B6]/25" : "bg-[#F5F7FC] border-[#071F5A]/8";
  const accent = "#5078B6";
  const accentText = dark ? "text-[#5078B6]" : "text-[#5078B6]";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div className={`r24-app-root min-h-screen ${bg} ${fg} transition-colors duration-500`} style={{ fontFamily: "sans-serif" }}>

      {/* ── Grid texture overlay ── */}
      {dark && (
        <div
          className="r24-app-grid-texture pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(80,120,182,1) 1px, transparent 1px), linear-gradient(90deg, rgba(80,120,182,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      )}

      {/* ── Glow blobs ── */}
      {dark && (
        <>
          <div className="r24-app-glow-blob-top pointer-events-none fixed top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#5078B6]/8 blur-[120px] z-0" />
          <div className="r24-app-glow-blob-bottom pointer-events-none fixed bottom-[20%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#071F5A]/50 blur-[100px] z-0" />
        </>
      )}

      {/* ══ NAVBAR ══════════════════════════════════════════════════════════════ */}
      <header className="r24-header r24-navbar sticky top-0 z-50 transition-colors duration-500"
        style={{
          background: dark
            ? "rgba(5,15,46,0.97)"
            : "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
          borderBottom: dark
            ? "1px solid rgba(80,120,182,0.18)"
            : "1px solid rgba(7,31,90,0.07)",
          boxShadow: dark
            ? "0 1px 0 rgba(80,120,182,0.1), 0 4px 24px rgba(7,31,90,0.3)"
            : "0 1px 0 rgba(7,31,90,0.06), 0 4px 20px rgba(7,31,90,0.04)",
        }}
      >
        {/* Top accent line — animated gradient */}
        <div
          className="r24-navbar-line absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #5078B6 30%, #071F5A 60%, #5078B6 80%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 4s linear infinite",
          }}
        />

        <div className="r24-navbar-container max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="r24-navbar-row flex items-center justify-between h-[62px] gap-6">

            {/* Logo */}
            <a href="#" className="r24-link r24-nav-logo-link flex-shrink-0 group">
              <img
                src={robot24Logo}
                alt="ROBOT24 Logo"
                className="r24-nav-logo-img h-9 object-contain transition-opacity duration-300 group-hover:opacity-80"
                style={{ width: "50%" }}
              />
            </a>

            {/* Desktop Nav */}
            <nav className="r24-nav-desktop-menu hidden lg:flex items-center">
              {NAV_LINKS.map((link) => {
                const isActive = activeNav === link;
                return (
                  <button
                    key={link}
                    onClick={() => setActiveNav(link)}
                    className="r24-btn r24-nav-link-btn relative px-3.5 py-2 text-[13px] font-medium transition-all duration-200 group/nav"
                    style={{
                      color: isActive ? "#5078B6" : dark ? "#8AACD8" : "#3D5A9A",
                      fontFamily: "sans-serif",
                    }}
                  >
                    <span className="r24-nav-link-text">{link}</span>
                    {/* Active underline */}
                    <span
                      className="r24-nav-link-active-line absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300"
                      style={{
                        width: isActive ? "80%" : "0%",
                        background: "linear-gradient(90deg, #071F5A, #5078B6)",
                        opacity: isActive ? 1 : 0,
                      }}
                    />
                    {/* Hover glow bg */}
                    <span
                      className="r24-nav-link-hover-bg absolute inset-0 rounded-lg opacity-0 group-hover/nav:opacity-100 transition-opacity duration-200"
                      style={{ background: "rgba(80,120,182,0.07)" }}
                    />
                  </button>
                );
              })}
            </nav>

            {/* Right controls */}
            <div className="r24-nav-actions flex items-center gap-1.5">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="r24-btn r24-btn-icon r24-nav-search-btn relative w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200 group/btn"
                style={{ color: dark ? "#8AACD8" : "#5078B6" }}
              >
                <span className="r24-nav-search-btn-bg absolute inset-0 rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity" style={{ background: "rgba(80,120,182,0.1)" }} />
                <Search size={17} className="r24-nav-search-btn-icon" />
              </button>

              {/* Divider */}
              <div className="r24-nav-divider w-px h-5 mx-1" style={{ background: dark ? "rgba(80,120,182,0.2)" : "rgba(7,31,90,0.1)" }} />

              {/* Subscribe CTA */}
              <a
                href="#newsletter"
                className="r24-link r24-nav-subscribe-link hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #071F5A 0%, #5078B6 100%)",
                  boxShadow: dark
                    ? "0 0 20px rgba(80,120,182,0.35), inset 0 1px 0 rgba(255,255,255,0.1)"
                    : "0 2px 12px rgba(7,31,90,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                <Mail size={13} className="r24-nav-subscribe-icon" />
                <span className="r24-nav-subscribe-text">Subscribe</span>
                <span
                  className="r24-nav-subscribe-dot w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "#93C5FD" }}
                />
              </a>

              {/* Mobile hamburger */}
              <button
                className="r24-btn r24-btn-icon r24-nav-mobile-toggle-btn relative lg:hidden w-9 h-9 flex items-center justify-center rounded-lg"
                style={{ color: dark ? "#8AACD8" : "#5078B6" }}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={20} className="r24-nav-mobile-toggle-icon" /> : <Menu size={20} className="r24-nav-mobile-toggle-icon" />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                key="search-bar"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="r24-nav-search-modal overflow-hidden"
                style={{ borderTop: `1px solid ${dark ? "rgba(80,120,182,0.15)" : "rgba(7,31,90,0.08)"}` }}
              >
                <div className="r24-nav-search-input-wrap relative py-3">
                  <Search size={15} className="r24-nav-search-icon absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#5078B6", top: "calc(50% + 6px)" }} />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search articles, robots, journalists…"
                    className="r24-nav-search-input w-full pl-10 pr-10 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2"
                    style={{
                      background: dark ? "rgba(10,37,96,0.8)" : "rgba(245,247,252,1)",
                      border: "1.5px solid",
                      borderColor: dark ? "rgba(80,120,182,0.35)" : "rgba(80,120,182,0.25)",
                      color: dark ? "#E8EFFE" : "#071F5A",
                      boxShadow: dark ? "0 2px 12px rgba(7,31,90,0.4)" : "0 2px 12px rgba(7,31,90,0.08)",
                      outline: "none",
                    }}
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="r24-btn absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg opacity-50 hover:opacity-100 transition-opacity"
                    style={{ color: dark ? "#8AACD8" : "#5078B6", top: "calc(50% + 6px)" }}
                    aria-label="Close search"
                  >
                    <X size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="r24-nav-mobile-menu lg:hidden px-4 pb-4 pt-2 space-y-0.5"
            style={{ borderTop: "1px solid", borderColor: dark ? "rgba(80,120,182,0.15)" : "rgba(7,31,90,0.07)" }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => { setActiveNav(link); setMenuOpen(false); }}
                className="r24-btn r24-nav-mobile-link-btn block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{
                  color: activeNav === link ? "#5078B6" : dark ? "#8AACD8" : "#3D5A9A",
                  background: activeNav === link ? "rgba(80,120,182,0.1)" : "transparent",
                }}
              >
                <span className="r24-nav-mobile-link-text">{link}</span>
              </button>
            ))}
          </motion.div>
        )}
      </header>

      {/* ══ HERO SLIDER — FULL SCREEN ═══════════════════════════════════════════ */}
      <HeroSlider dark={dark} />

      {/* ══ FEATURED STORY & ABOUT SECTION ══════════════════════════════════════ */}
      <FeaturedStoryAndAboutSection dark={dark} />

      {/* ══ LATEST VIDEOS FROM OUR REPORTERS (CURVED DESIGN SECTION) ════════════ */}
      <ReporterVideosSection dark={dark} />

      {/* ══ TOP ROBOTICS STORIES & TODAY IN ROBOTICS TIMELINE ═══════════════════ */}
      <TopStoriesAndLiveTimelineSection dark={dark} />

      {/* ══ MOST VIEWED & POPULAR POSTS (NEW SECTION WITHOUT BACKGROUND) ═════════ */}
      <MostViewedAndPopularSection dark={dark} />



      {/* ══ NEWSLETTER CTA ══════════════════════════════════════════════════════ */}
      <section id="newsletter" className="r24-section r24-newsletter-section relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <InViewSection>
          <motion.div
            variants={fadeUp}
            className="r24-newsletter-card relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            style={{ background: dark ? "linear-gradient(135deg, #050E28 0%, #071F5A 50%, #06153B 100%)" : "linear-gradient(135deg, #040D26 0%, #071F5A 60%, #0E358A 100%)" }}
          >
            {/* Ambient background light */}
            <div className="r24-newsletter-glow-bg absolute top-[-50%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/15 blur-[120px] pointer-events-none" />

            <div className="r24-newsletter-container relative px-8 sm:px-12 py-12 sm:py-16 flex flex-col sm:flex-row items-center gap-8 z-10">
              <div className="r24-newsletter-info-col flex-1 text-center sm:text-left">
                <div className="r24-newsletter-badge inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-md mb-4">
                  <Zap size={12} className="r24-newsletter-badge-icon text-blue-400 animate-pulse" />
                  <span className="r24-newsletter-badge-text text-[10px] font-bold text-blue-200 tracking-[0.2em] font-mono uppercase">ROBOT24 WEEKLY DISPATCH</span>
                </div>
                <h2
                  className="r24-newsletter-title text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-3 tracking-tight"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  Stay ahead of the <span className="r24-newsletter-title-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-sky-300">machines.</span>
                </h2>
                <p className="r24-newsletter-description-text text-[#B8CCF0] text-sm sm:text-base max-w-md leading-relaxed">
                  Join 180,000+ readers receiving weekly robotics intelligence — breakthrough research, market moves, and machine learning updates.
                </p>
              </div>

              <div className="r24-newsletter-action-col w-full sm:w-auto flex-shrink-0 sm:min-w-[360px]">
                {subscribed ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="r24-newsletter-subscribed-card text-center py-6 p-6 rounded-xl border border-blue-400/30 bg-blue-500/10 backdrop-blur-md shadow-xl"
                  >
                    <div className="r24-newsletter-subscribed-icon w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center mx-auto mb-3 text-white shadow-md">
                      <Zap size={22} className="fill-current" />
                    </div>
                    <p className="r24-newsletter-subscribed-title text-white font-extrabold text-xl tracking-wide" style={{ fontFamily: "'Rajdhani', sans-serif" }}>YOU'RE SUBSCRIBED!</p>
                    <p className="r24-newsletter-subscribed-text text-blue-200 text-xs mt-1 font-mono">First intelligence dispatch arrives this week.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="r24-newsletter-form space-y-3">
                    <div className="r24-newsletter-input-box relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@company.com"
                        className="r24-newsletter-input w-full px-5 py-3.5 rounded-xl text-xs font-mono tracking-wider border border-white/20 bg-slate-950/70 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400/70 focus:border-blue-400 backdrop-blur-md"
                        required
                        style={{ fontFamily: "sans-serif" }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="r24-btn r24-btn-primary r24-newsletter-submit-btn relative w-full py-3.5 px-6 rounded-xl text-xs font-bold tracking-[0.18em] uppercase text-white transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] group/sub"
                      style={{
                        background: "linear-gradient(135deg, #071F5A 0%, #2563EB 100%)",
                        boxShadow: "0 4px 20px rgba(7,31,90,0.3)"
                      }}
                    >
                      <Mail size={15} className="r24-btn-icon group-hover/sub:scale-110 transition-transform" />
                      <span className="r24-btn-text">SUBSCRIBE TO DISPATCH</span>
                      <ArrowRight size={14} className="r24-btn-icon group-hover/sub:translate-x-1 transition-transform" />
                    </button>
                    <p className="r24-newsletter-disclaimer-text text-slate-400 text-[10px] text-center font-mono tracking-wider uppercase">NO SPAM • UNSUBSCRIBE ANYTIME</p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </InViewSection>
      </section>

      {/* ══ STATS STRIP ═════════════════════════════════════════════════════════ */}
      <section className="r24-section r24-stats-section relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <InViewSection className={`r24-stats-grid grid grid-cols-2 sm:grid-cols-4 gap-px rounded-xl overflow-hidden border ${border}`}>
          {STATS.map(({ label, value, icon: Icon }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className={`r24-stats-card flex flex-col items-center justify-center gap-2 py-6 ${card} transition-colors duration-500 ${cardHover}`}
            >
              <div className="r24-stats-icon-box w-8 h-8 rounded-lg bg-[#5078B6]/15 flex items-center justify-center">
                <Icon size={16} className="r24-stats-icon text-[#5078B6]" />
              </div>
              <p
                className={`r24-stats-value-text text-2xl font-bold ${fg}`}
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                {value}
              </p>
              <p className={`r24-stats-label-text text-xs ${muted} text-center`}>{label}</p>
            </motion.div>
          ))}
        </InViewSection>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════════ */}
      <footer className={`r24-footer r24-footer-section relative z-10 border-t ${border} transition-colors duration-500`}>
        <div className="r24-footer-container max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="r24-footer-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="r24-footer-brand-col">
              <a href="#" className="r24-link r24-footer-logo-link inline-block mb-3 group">
                <img
                  src={robot24Logo}
                  alt="ROBOT24 Logo"
                  className="r24-footer-logo-img h-5 sm:h-6 object-contain transition-opacity duration-300 group-hover:opacity-80"
                  style={{ maxHeight: "24px", width: "auto" }}
                />
              </a>
              <p className={`r24-footer-brand-desc text-xs leading-relaxed ${muted} mb-4 max-w-[220px]`}>
                The world's leading robotics intelligence platform. Trusted by engineers, investors, and policy makers.
              </p>
              <div className="r24-footer-social-row flex items-center gap-2">
                {["𝕏", "in", "YT"].map((s) => (
                  <button key={s} className={`r24-btn r24-btn-icon r24-footer-social-btn w-7 h-7 rounded-md border ${border} text-xs font-bold ${muted} hover:text-[#5078B6] hover:border-[#5078B6]/40 transition-colors`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { heading: "Coverage", items: ["Humanoids", "Industrial", "AI & Software", "Healthcare", "Defense", "Agriculture"] },
              { heading: "Company", items: ["About Us", "Our Team", "Press Releases", "Events", "Advertise", "Contact"] },
              { heading: "Resources", items: ["Newsletter", "Podcast", "Research Reports", "Robot Database", "Careers", "RSS Feed"] },
            ].map((col) => (
              <div key={col.heading} className="r24-footer-links-col">
                <h3 className={`r24-footer-col-title text-[10px] font-bold tracking-widest ${accentText} font-mono uppercase mb-3`}>{col.heading}</h3>
                <ul className="r24-footer-links-list space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="r24-footer-link-item">
                      <a href="#" className={`r24-link r24-footer-link-anchor text-xs ${muted} hover:text-[#5078B6] transition-colors`}>{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={`r24-footer-bottom-bar pt-6 border-t ${border} flex flex-col sm:flex-row items-center justify-between gap-3`}>
            <p className={`r24-footer-copyright-text text-[11px] ${muted}`}>© 2026 Robot24.com. All rights reserved.</p>
            <div className="r24-footer-legal-links flex items-center gap-4">
              {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((link) => (
                <a key={link} href="#" className={`r24-link r24-footer-legal-anchor text-[11px] ${muted} hover:text-[#5078B6] transition-colors`}>{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── CSS keyframe for ticker ── */}
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes scan {
          0% { left: -10%; }
          50% { left: 110%; }
          100% { left: 110%; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scrollDot {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.3; transform: translateY(6px); }
        }
        @keyframes slideProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.5); opacity: 0.7; }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(80,120,182,0.3); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(80,120,182,0.6); }
      `}</style>
    </div>
  );
}
