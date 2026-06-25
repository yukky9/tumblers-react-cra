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

  return (
      <header
          className={`sticky top-0 z-50 border-b transition ${
              scrolled ? 'border-graphite-200/80 bg-white/90 shadow-sm backdrop-blur-xl' : 'border-transparent bg-white/75 backdrop-blur-xl'
          }`}
      >
        <div className="container-page flex h-20 items-center justify-between gap-4">
          <Brand />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
            <a
                href="#/catalog"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-graphite-100 hover:text-factory-700 ${
                    currentRoute === 'catalog' ? 'bg-factory-50 text-factory-700' : 'text-graphite-700'
                }`}
            >
              Каталог
            </a>
            {mainNav.map((item) => (
                <a
                    key={item.route}
                    href={`#/${item.route}`}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-graphite-100 hover:text-factory-700 ${
                        currentRoute === item.route ? 'bg-factory-50 text-factory-700' : 'text-graphite-700'
                    }`}
                >
                  {item.label}
                </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="tel:+74812311192" className="text-sm font-bold text-graphite-700 transition hover:text-factory-700">
              +7 (4812) 31-11-92
            </a>
            <button type="button" onClick={onRequest} className="btn-light py-2.5">
              Запросить расчет
              <Icon name="arrowRight" className="h-4 w-4" />
            </button>
          </div>

          <button
              type="button"
              aria-label="Открыть меню"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="rounded-2xl border border-graphite-200 bg-white p-3 text-graphite-900 shadow-sm lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
          </button>
        </div>

        {open ? (
            <div className="border-t border-graphite-200 bg-white lg:hidden">
              <div className="container-page grid gap-2 py-4">
                <a href="#/catalog" className="rounded-2xl px-4 py-3 font-semibold text-graphite-800 hover:bg-graphite-50">
                  Каталог
                </a>
                {mainNav.map((item) => (
                    <a key={item.route} href={`#/${item.route}`} className="rounded-2xl px-4 py-3 font-semibold text-graphite-800 hover:bg-graphite-50">
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