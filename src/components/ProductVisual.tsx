export function ProductVisual({ className = '' }: { className?: string }) {
  return (
    <div className={`relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/12 bg-white/10 p-6 backdrop-blur ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(49,167,117,.35),transparent_34%)]" />
      <div className="absolute inset-x-6 top-6 flex items-center justify-between rounded-2xl border border-white/10 bg-graphite-950/70 px-4 py-3 text-xs text-white/70">
        <span>Control panel</span>
        <span className="rounded-full bg-factory-400/20 px-2 py-1 text-factory-100">ONLINE</span>
      </div>
      <svg viewBox="0 0 460 320" className="relative z-10 mt-10 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="panel" x1="0" x2="1">
            <stop stopColor="#334155" />
            <stop offset="1" stopColor="#111827" />
          </linearGradient>
          <linearGradient id="metal" x1="0" x2="1">
            <stop stopColor="#E5E7EB" />
            <stop offset=".5" stopColor="#94A3B8" />
            <stop offset="1" stopColor="#F8FAFC" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodOpacity="0.28" />
          </filter>
        </defs>
        <rect x="42" y="138" width="376" height="122" rx="30" fill="url(#panel)" filter="url(#shadow)" />
        <rect x="80" y="169" width="90" height="54" rx="16" fill="#0F172A" stroke="#64748B" />
        <rect x="285" y="169" width="90" height="54" rx="16" fill="#0F172A" stroke="#64748B" />
        <circle cx="125" cy="197" r="17" fill="#31A775" />
        <circle cx="330" cy="197" r="17" fill="#94A3B8" />
        <g transform="translate(210 66)" filter="url(#shadow)">
          <path d="M39 142h-78l11-74h56l11 74Z" fill="#0F172A" />
          <ellipse cx="0" cy="68" rx="45" ry="16" fill="url(#metal)" />
          <rect x="-24" y="24" width="48" height="52" rx="13" fill="url(#metal)" />
          <path d="M-4 28 34-42" stroke="#F8FAFC" strokeWidth="18" strokeLinecap="round" />
          <path d="M-4 28 34-42" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />
          <circle cx="0" cy="80" r="8" fill="#31A775" />
        </g>
        <path d="M74 281h312" stroke="#31A775" strokeWidth="4" strokeLinecap="round" opacity=".65" />
      </svg>
    </div>
  );
}
