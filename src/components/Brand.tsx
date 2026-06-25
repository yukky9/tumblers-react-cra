export function Brand({ compact = false }: { compact?: boolean }) {
  return (
      <a href="#/home" className="group inline-flex items-center gap-3" aria-label="Смоленский завод радиодеталей">
      <span className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-graphite-950 via-graphite-900 to-factory-800 text-white shadow-glow transition duration-300 group-hover:-translate-y-0.5">
        <span className="absolute inset-0 bg-grid-dark technical-grid opacity-30" />
        <svg viewBox="0 0 48 48" className="relative h-8 w-8" fill="none" aria-hidden="true">
          <path d="M12 32.5V15.5C12 13.567 13.567 12 15.5 12H32.5C34.433 12 36 13.567 36 15.5V32.5C36 34.433 34.433 36 32.5 36H15.5C13.567 36 12 34.433 12 32.5Z" stroke="currentColor" strokeWidth="2.4" />
          <path d="M18 18H30M18 24H30M18 30H25" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M34 14L40 8M14 34L8 40" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </span>

        {!compact ? (
            <span className="leading-tight">
          <span className="block font-display text-xl font-black tracking-tight text-graphite-950 transition group-hover:text-factory-700">СЗР</span>
          <span className="block max-w-[13rem] text-[11px] font-bold uppercase tracking-[0.18em] text-graphite-500">Смоленский завод радиодеталей</span>
        </span>
        ) : null}
      </a>
  );
}
