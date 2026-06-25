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
  children
}: PropsWithChildren<{
  kicker?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}>) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {kicker ? <span className="kicker">{kicker}</span> : null}
      <h2 className="mt-5 font-display text-3xl font-black tracking-tight text-graphite-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-8 text-graphite-600 sm:text-lg">{description}</p> : null}
      {children}
    </div>
  );
}

export function PageHero({
  label,
  title,
  description,
  children
}: PropsWithChildren<{ label: string; title: string; description: string }>) {
  return (
    <section className="relative overflow-hidden bg-graphite-950 py-20 text-white sm:py-24">
      <div className="absolute inset-0 bg-mesh opacity-100" />
      <div className="absolute inset-0 bg-grid-dark technical-grid opacity-35" />
      <Container className="relative z-10">
        <div className="max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-factory-100 backdrop-blur">
            <Icon name="spark" className="h-4 w-4" />
            {label}
          </span>
          <h1 className="mt-6 font-display text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">{description}</p>
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}

export function Metric({ value, label, caption }: { value: string; label: string; caption?: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
      <div className="font-display text-3xl font-black text-white">{value}</div>
      <div className="mt-1 text-sm font-semibold text-white/80">{label}</div>
      {caption ? <div className="mt-2 text-xs leading-5 text-white/54">{caption}</div> : null}
    </div>
  );
}

export function LinkButton({
  href,
  variant = 'light',
  children,
  external = false,
  className = ''
}: PropsWithChildren<{
  href: string;
  variant?: 'primary' | 'secondary' | 'light';
  external?: boolean;
  className?: string;
}>) {
  const cls = variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : 'btn-light';
  return (
    <a href={href} className={`${cls} ${className}`} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
      {children}
      <Icon name={external ? 'external' : 'arrowRight'} className="h-4 w-4" />
    </a>
  );
}

export function ActionButton({
  children,
  onClick,
  variant = 'primary',
  className = ''
}: PropsWithChildren<{ onClick: () => void; variant?: 'primary' | 'secondary' | 'light'; className?: string }>) {
  const cls = variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : 'btn-light';
  return (
    <button type="button" onClick={onClick} className={`${cls} ${className}`}>
      {children}
      <Icon name="arrowRight" className="h-4 w-4" />
    </button>
  );
}

export function IconBadge({ icon, children }: PropsWithChildren<{ icon: ReactNode }>) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-graphite-950 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white">
      {icon}
      {children}
    </div>
  );
}
