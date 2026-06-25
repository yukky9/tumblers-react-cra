import { Brand } from './Brand';
import { Icon } from './Icon';
import { sourceLinks } from '../config/links'; // Новый импорт

// Статические ссылки, использующие sourceLinks
const aboutLinks = [
  ['Лицензия и сертификаты', '#/info'],
  ['Нормативные документы', sourceLinks.eDisclosure],
  ['Социальная ответственность', '#/info'],
  ['Портал закупок', '#/procurement'],
  ['Наши партнеры', '#/partners'],
  ['Справочная информация', '#/details'],
  ['Реквизиты', '#/details']
];

const shareholderLinks = [
  ['Годовые отчеты', '#/years'],
  ['Финансовые отчеты', '#/finance'],
  ['Раскрытие информации', sourceLinks.eDisclosure],
  ['Специальная оценка труда', '#/sout'],
  ['Соглашение о конфиденциальности', '#/confidentiality']
];

export function Footer({ onRequest }: { onRequest: () => void }) {
  return (
      <footer className="relative overflow-hidden bg-graphite-950 text-white">
        <div className="absolute inset-0 bg-mesh opacity-60" />
        <div className="absolute inset-0 bg-grid-dark technical-grid opacity-30" />
        <div className="container-page relative z-10 py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <Brand />
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/62">
                Российский производитель и разработчик коммутационных изделий для цепей управления, контроля, сигнализации и диагностики.
              </p>
              <button type="button" onClick={onRequest} className="btn-primary mt-6">
                Отправить запрос
                <Icon name="arrowRight" className="h-4 w-4" />
              </button>
            </div>

            <FooterColumn title="Про нас" links={aboutLinks} />
            <FooterColumn title="Информация для акционеров" links={shareholderLinks} />

            <div>
              <h3 className="font-display text-base font-black">Контактная информация</h3>
              <div className="mt-4 space-y-3 text-sm text-white/68">
                <p className="flex gap-3">
                  <Icon name="map" className="mt-0.5 h-4 w-4 shrink-0 text-factory-300" />
                  г. Смоленск, ул. Бабушкина, д. 7
                </p>
                <a href="tel:+74812310957" className="flex gap-3 transition hover:text-white">
                  <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-factory-300" />
                  +7 (4812) 31-09-57
                </a>
                <a href="mailto:szr@tumblers.ru" className="flex gap-3 transition hover:text-white">
                  <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-factory-300" />
                  szr@tumblers.ru
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <a
                    href={sourceLinks.vk}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white"
                >
                  Вконтакте
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/44 sm:flex-row sm:items-center sm:justify-between">
            <span>© ОАО «Смоленский завод радиодеталей».</span>
          </div>
        </div>
      </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return (
      <div>
        <h3 className="font-display text-base font-black">{title}</h3>
        <ul className="mt-4 space-y-3">
          {links.map(([label, href]) => {
            const external = href.startsWith('http');
            return (
                <li key={label}>
                  <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      className="text-sm text-white/62 transition hover:text-white"
                  >
                    {label}
                  </a>
                </li>
            );
          })}
        </ul>
      </div>
  );
}