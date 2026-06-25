export function ProductVisual({ className = '' }: { className?: string }) {
  return (
      <div className={`glass-card relative min-h-[390px] overflow-hidden p-5 sm:p-6 ${className}`}>
        <div className="absolute inset-0 bg-grid-dark technical-grid opacity-30" />
        <div className="absolute -right-14 -top-14 h-52 w-52 rounded-full bg-factory-400/20 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-signal-400/10 blur-3xl" />

        <div className="relative z-10 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-white/70 backdrop-blur">
          <span>Control panel</span>
          <span className="rounded-full bg-factory-400/20 px-2.5 py-1 text-factory-100">Online</span>
        </div>

        <div className="relative z-10 mt-9 grid place-items-center">
          <div className="absolute top-0 h-32 w-24 rounded-b-[2rem] rounded-t-xl bg-gradient-to-br from-white via-graphite-100 to-graphite-300 shadow-soft" />
          <div className="relative mt-12 h-56 w-full max-w-[25rem] rounded-[2rem] border border-white/10 bg-gradient-to-br from-graphite-800 via-graphite-950 to-factory-950 shadow-deep">
            <div className="absolute inset-4 rounded-[1.5rem] border border-white/10 bg-black/20" />
            <div className="absolute left-8 top-9 h-16 w-24 rounded-2xl border border-white/10 bg-black/30 shadow-inner-soft" />
            <div className="absolute right-8 top-9 h-16 w-24 rounded-2xl border border-white/10 bg-black/30 shadow-inner-soft" />
            <div className="absolute left-12 top-14 h-5 w-14 rounded-full bg-factory-400/30" />
            <div className="absolute right-12 top-14 h-5 w-14 rounded-full bg-signal-400/25" />
            <div className="absolute bottom-10 left-9 right-9 h-1.5 rounded-full bg-gradient-to-r from-factory-400 via-signal-300 to-white/70" />
            <div className="absolute left-16 top-32 h-10 w-10 rounded-full bg-factory-400 shadow-glow" />
            <div className="absolute left-32 top-32 h-10 w-10 rounded-full border border-white/20 bg-white/30" />
            <div className="absolute right-16 top-32 h-10 w-10 rounded-full border border-white/20 bg-white/20" />
          </div>
        </div>

        <div className="relative z-10 mt-8 grid grid-cols-3 gap-3 text-center text-xs font-bold text-white/70">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur">
            <span className="block text-base font-black text-white">ОТК</span>
            контроль
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur">
            <span className="block text-base font-black text-white">60+</span>
            лет опыта
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur">
            <span className="block text-base font-black text-white">ГОСТ</span>
            выпуск
          </div>
        </div>
      </div>
  );
}
