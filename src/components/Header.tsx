import { useEffect, useState } from 'react';

import { Brand } from './Brand';
import { Icon } from './Icon';

// Статическая навигация (можно вынести в отдельный файл config.ts при желании)
const mainNav = [
  { route: 'services', label: 'Услуги' },
  { route: 'rent', label: 'Аренда' },
  { route: 'vacancies', label: 'Вакансии' },
  { route: 'info', label: 'Акционерам' },
  { route: 'price', label: 'Прайс-лист' },
  { route: 'contacts', label: 'Контакты' },
];

interface HeaderProps {
  currentRoute: string; // или RouteId, если вы его определите отдельно
  onRequest: () => void;
}

export function Header({ currentRoute, onRequest }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [currentRoute]);

  const navLinkClass = (route: string) =>
      `rounded-full px-4 py-2 text-sm font-bold transition duration-300 ${
          currentRoute === route
              ? 'bg-graphite-950 text-white shadow-card'
              : 'text-graphite-700 hover:bg-white hover:text-factory-700 hover:shadow-sm'
      }`;

  return (
      <header
          className={`sticky top-0 z-50 border-b transition duration-300 ${
              scrolled
                  ? 'border-white/80 bg-white/90 shadow-card backdrop-blur-2xl'
                  : 'border-white/40 bg-white/70 backdrop-blur-2xl'
          }`}
      >
        <div className="container-page flex h-20 items-center justify-between gap-4">
          <Brand />

          <nav className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/60 p-1 shadow-inner-soft lg:flex" aria-label="Основная навигация">
            <a href="#/catalog" className={navLinkClass('catalog')}>
              Каталог
            </a>
            {mainNav.map((item) => (
                <a key={item.route} href={`#/${item.route}`} className={navLinkClass(item.route)}>
                  {item.label}
                </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="tel:+74812311192" className="rounded-full px-3 py-2 text-sm font-black text-graphite-700 transition hover:bg-white hover:text-factory-700">
              +7 (4812) 31-11-92
            </a>
            <button type="button" onClick={onRequest} className="btn-primary py-2.5">
              Запросить расчет
              <Icon name="arrowRight" className="h-4 w-4" />
            </button>
          </div>

          <button
              type="button"
              aria-label="Открыть меню"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="rounded-2xl border border-white/80 bg-white/90 p-3 text-graphite-900 shadow-card transition hover:-translate-y-0.5 hover:text-factory-700 lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
          </button>
        </div>

        {open ? (
            <div className="border-t border-white/70 bg-white/95 shadow-card backdrop-blur-2xl lg:hidden">
              <div className="container-page grid gap-2 py-4">
                <a href="#/catalog" className="rounded-2xl px-4 py-3 font-bold text-graphite-800 transition hover:bg-graphite-50 hover:text-factory-700">
                  Каталог
                </a>
                {mainNav.map((item) => (
                    <a key={item.route} href={`#/${item.route}`} className="rounded-2xl px-4 py-3 font-bold text-graphite-800 transition hover:bg-graphite-50 hover:text-factory-700">
                      {item.label}
                    </a>
                ))}
                <button type="button" onClick={onRequest} className="btn-primary mt-2">
                  Запросить расчет
                  <Icon name="arrowRight" className="h-4 w-4" />
                </button>
              </div>
            </div>
        ) : null}
      </header>
  );
}
