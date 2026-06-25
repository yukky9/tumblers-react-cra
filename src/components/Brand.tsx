export function Brand({ compact = false }: { compact?: boolean }) {
    return (
        <a href="#/home" className="group inline-flex items-center gap-3" aria-label="Смоленский завод радиодеталей">
      <span className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl border border-graphite-200 bg-white shadow-sm transition duration-300 group-hover:-translate-y-0.5">
        <img
            src="/images/logo-150x150.png"
            alt="Логотип Смоленского завода радиодеталей"
            className="h-full w-full object-contain p-1"
        />
      </span>
            {!compact ? (
                <span className="leading-tight">
          <span className="block max-w-[13rem] text-[11px] font-bold uppercase tracking-[0.18em] text-graphite-500">Смоленский завод радиодеталей</span>
        </span>
            ) : null}
        </a>
    );
}