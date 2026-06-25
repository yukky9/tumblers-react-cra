export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#/home" className="group flex items-center gap-3" aria-label="На главную">
      <div className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-2xl bg-graphite-950 shadow-glow">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(49,167,117,.75),transparent_40%)]" />
        <svg viewBox="0 0 44 44" className="relative h-9 w-9 text-white" aria-hidden="true">
          <path
            d="M9 24c0-7.2 5.8-13 13-13h8.5v5H22a8 8 0 1 0 0 16h8.5v5H22c-7.2 0-13-5.8-13-13Z"
            fill="currentColor"
          />
          <path d="M17 21h18v6H17z" fill="#31a775" />
          <path d="m29 16 7 8-7 8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {!compact ? (
        <div className="leading-tight">
          <div className="font-display text-sm font-black uppercase tracking-[0.12em] text-graphite-950 group-hover:text-factory-700">
            СЗР
          </div>
          <div className="max-w-[220px] text-xs font-semibold text-graphite-500">Смоленский завод радиодеталей</div>
        </div>
      ) : null}
    </a>
  );
}
