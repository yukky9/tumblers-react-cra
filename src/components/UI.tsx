import type { PropsWithChildren, ReactNode } from 'react';

import { Icon } from './Icon';

export function Container({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <div className={`container-page ${className}`}>{children}</div>;
}

export function SectionHeader({
                                kicker,
                                title,
                                description,
                                align = 'left',
                                children,
                              }: PropsWithChildren<{
  kicker?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}>) {
  const centered = align === 'center';

  return (
      <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
        {kicker ? <span className="kicker">{kicker}</span> : null}
        <h2 className="mt-5 font-display text-3xl font-black tracking-tight text-graphite-950 text-balance sm:text-5xl">
          {title}
        </h2>
        {description ? <p className="page-subtitle">{description}</p> : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
  );
}

export function PageHero({
                           label,
                           title,
                           description,
                           children,
                         }: PropsWithChildren<{ label: string; title: string; description: string }>) {
  return (
      <section className="page-shell pb-8 sm:pb-10 lg:pb-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-dark-surface p-6 text-white shadow-deep sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-mesh opacity-80" />
          <div className="absolute inset-0 bg-grid-dark technical-grid opacity-30" />
          <div className="relative z-10 max-w-4xl">
            <span className="badge-dot">{label}</span>
            <h1 className="mt-6 font-display text-4xl font-black tracking-tight text-balance sm:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">{description}</p>
            {children ? <div className="mt-7 flex flex-wrap gap-3">{children}</div> : null}
          </div>
        </div>
      </section>
  );
}

export function Metric({ value, label, caption }: { value: string; label: string; caption?: string }) {
  return (
      <div className="surface-card p-5">
        <div className="font-display text-3xl font-black text-gradient">{value}</div>
        <div className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-graphite-500">{label}</div>
        {caption ? <p className="mt-2 text-sm leading-6 text-graphite-500">{caption}</p> : null}
      </div>
  );
}

export function LinkButton({
                             href,
                             variant = 'light',
                             children,
                             external = false,
                             className = '',
                           }: PropsWithChildren<{
  href: string;
  variant?: 'primary' | 'secondary' | 'light';
  external?: boolean;
  className?: string;
}>) {
  const cls = variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : 'btn-light';

  return (
      <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={`${cls} ${className}`}
      >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        <Icon name={external ? 'external' : 'arrowRight'} className="h-4 w-4" />
      </span>
      </a>
  );
}

export function ActionButton({
                               children,
                               onClick,
                               variant = 'primary',
                               className = '',
                             }: PropsWithChildren<{ onClick: () => void; variant?: 'primary' | 'secondary' | 'light'; className?: string }>) {
  const cls = variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : 'btn-light';

  return (
      <button type="button" onClick={onClick} className={`${cls} ${className}`}>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        <Icon name="arrowRight" className="h-4 w-4" />
      </span>
      </button>
  );
}

export function IconBadge({ icon, children }: PropsWithChildren<{ icon: ReactNode }>) {
  return (
      <div className="inline-flex items-center gap-3 rounded-full border border-graphite-200 bg-white/80 px-4 py-2 text-sm font-black text-graphite-700 shadow-inner-soft backdrop-blur">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-factory-50 text-factory-700">{icon}</span>
        {children}
      </div>
  );
}
