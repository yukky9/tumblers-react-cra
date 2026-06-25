import { Brand } from './Brand';
import { Icon } from './Icon';
import { sourceLinks } from '../config/links';

const aboutLinks: Array<[string, string]> = [
  ['Лицензия и сертификаты', '#/info'],
  ['Нормативные документы', sourceLinks.eDisclosure],
  ['Социальная ответственность', '#/info'],
  ['Портал закупок', '#/procurement'],
  ['Наши партнеры', '#/partners'],
  ['Справочная информация', '#/details'],
  ['Реквизиты', '#/details'],
];

const shareholderLinks: Array<[string, string]> = [
  ['Годовые отчеты', '#/years'],
  ['Финансовые отчеты', '#/finance'],
  ['Раскрытие информации', sourceLinks.eDisclosure],
  ['Специальная оценка труда', '#/sout'],
  ['Соглашение о конфиденциальности', '#/confidentiality'],
];

export function Footer({ onRequest }: { onRequest: () => void }) {
  return (
      <footer className="relative overflow-hidden bg-graphite-950 text-white">
        <div className="absolute inset-0 bg-mesh opacity-40" />
        <div className="absolute inset-0 bg-grid-dark technical-grid opacity-25" />

        <div className="container-page relative z-10 py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr_.9fr_.9fr]">
            <div>
              <div className="inline-flex items-center gap-3">
                <Brand compact />
                <span className="leading-tight">
                <span className="block font-display text-xl font-black tracking-tight text-white">СЗР</span>
                <span className="block max-w-[13rem] text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">Смоленский завод радиодеталей</span>
              </span>
              </div>
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
                Российский производитель и разработчик коммутационных изделий для цепей управления, контроля, сигнализации и диагностики.
              </p>
              <button type="button" onClick={onRequest} className="btn-secondary mt-6 py-2.5">
                Отправить запрос
                <Icon name="arrowRight" className="h-4 w-4" />
              </button>
            </div>

            <FooterColumn title="О предприятии" links={aboutLinks} />
            <FooterColumn title="Акционерам" links={shareholderLinks} />

            <div>
              <h3 className="font-display text-lg font-black">Контактная информация</h3>
              <div className="mt-5 space-y-4 text-sm text-white/60">
                <p className="flex gap-3 leading-6">
                  <Icon name="map" className="mt-0.5 h-4 w-4 shrink-0 text-factory-300" />
                  <span>г. Смоленск, ул. Бабушкина, д. 7</span>
                </p>
                <p className="flex gap-3 leading-6">
                  <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-factory-300" />
                  <a href="tel:+74812310957" className="transition hover:text-white">+7 (4812) 31-09-57</a>
                </p>
                <p className="flex gap-3 leading-6">
                  <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-factory-300" />
                  <a href="mailto:szr@tumblers.ru" className="transition hover:text-white">szr@tumblers.ru</a>
                </p>
                <a
                    href={sourceLinks.vk}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/70 transition hover:bg-white/20 hover:text-white"
                >
                  Вконтакте
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs font-semibold text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <span>© ОАО «Смоленский завод радиодеталей».</span>
            <span>Производство • испытания • контроль качества</span>
          </div>
        </div>
      </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<[string, string]> }) {
  return (
      <div>
        <h3 className="font-display text-lg font-black">{title}</h3>
        <ul className="mt-5 space-y-3 text-sm text-white/60">
          {links.map(([label, href]) => {
            const external = href.startsWith('http');

            return (
                <li key={`${label}-${href}`}>
                  <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-2 transition hover:translate-x-1 hover:text-white"
                  >
                    <span>{label}</span>
                    {external ? <Icon name="external" className="h-3.5 w-3.5" /> : null}
                  </a>
                </li>
            );
          })}
        </ul>
      </div>
  );
}
