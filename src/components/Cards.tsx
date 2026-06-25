import type { ProductGroup, ServiceItem } from '../types';
import { Icon } from './Icon';

export function ProductCard({ item }: { item: ProductGroup }) {
  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-graphite-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="absolute right-5 top-5 font-display text-6xl font-black text-graphite-100 transition group-hover:text-factory-100">
        {item.accent}
      </div>
      <div className="relative z-10">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-graphite-950 text-factory-300 shadow-sm">
          <Icon name={item.category === 'services' ? 'settings' : item.category === 'auto' ? 'bolt' : 'factory'} className="h-6 w-6" />
        </div>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-factory-700">{item.subtitle}</p>
        <h3 className="mt-2 font-display text-2xl font-black text-graphite-950">{item.title}</h3>
        <p className="mt-3 text-sm leading-7 text-graphite-600">{item.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {item.codes.slice(0, 5).map((code) => (
            <span key={code} className="rounded-full bg-graphite-50 px-3 py-1 text-xs font-semibold text-graphite-600">
              {code}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function ServiceCard({ item, onRequest }: { item: ServiceItem; onRequest: () => void }) {
  return (
    <article className="group flex min-h-full flex-col rounded-[2rem] border border-graphite-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full bg-factory-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-factory-700">{item.badge}</span>
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-graphite-950 text-factory-300 transition group-hover:rotate-6 group-hover:bg-factory-700 group-hover:text-white">
          <Icon name="settings" className="h-5 w-5" />
        </div>
      </div>
      <h3 className="mt-6 font-display text-xl font-black text-graphite-950">{item.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-graphite-600">{item.description}</p>
      <button type="button" onClick={onRequest} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-factory-700 transition hover:text-factory-900">
        Заказать услугу
        <Icon name="arrowRight" className="h-4 w-4" />
      </button>
    </article>
  );
}
