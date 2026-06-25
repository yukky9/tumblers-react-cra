import { documents, sourceLinks } from '../data';
import type { DocumentItem } from '../types';
import { Icon } from '../components/Icon';
import { Container, LinkButton, PageHero, SectionHeader } from '../components/UI';

export function InfoPage() {
  return (
    <>
      <PageHero
        label="Информация"
        title="Документы, партнеры, закупки и сведения о компании"
        description="Страница собирает блоки футера исходного сайта в одну навигационную панель: отчеты, раскрытие информации, справочные сведения, реквизиты и партнеры."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton href="#/years" variant="primary">
            Годовые отчеты
          </LinkButton>
          <LinkButton href={sourceLinks.eDisclosure} variant="secondary" external>
            Раскрытие информации
          </LinkButton>
        </div>
      </PageHero>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeader
            kicker="Навигация"
            title="Информационные разделы"
            description="Вместо ссылок в футере — полноценные карточки с понятным назначением каждого раздела."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <InfoCard icon="file" title="Годовые отчеты" text="Отчеты за 2020–2024 годы." href="#/years" />
            <InfoCard icon="file" title="Финансовые отчеты" text="Финансовая отчетность по годам." href="#/finance" />
            <InfoCard icon="shield" title="Специальная оценка труда" text="Документы СОУТ за 2020–2024 годы." href="#/sout" />
            <InfoCard icon="external" title="Раскрытие информации" text="Переход на внешний портал e-disclosure." href={sourceLinks.eDisclosure} external />
            <InfoCard icon="factory" title="Партнеры" text="Ростех, Концерн Автоматика и ЭК ЗИП." href="#/partners" />
            <InfoCard icon="briefcase" title="Реквизиты" text="Юридические, регистрационные и банковские данные." href="#/details" />
          </div>
        </Container>
      </section>
    </>
  );
}

export function DocumentPage({ type }: { type: DocumentItem['type'] }) {
  const title = type === 'Годовой отчет' ? 'Годовые отчеты' : type === 'Финансовый отчет' ? 'Финансовые отчеты' : 'Специальная оценка труда';
  const items = documents.filter((item) => item.type === type);

  return (
    <>
      <PageHero
        label="Документы"
        title={title}
        description="Карточная сетка документов с годами. В демо-файле кнопки подготовлены под реальные PDF-ссылки из CMS или медиатеки сайта."
      />
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {items.map((item) => (
              <article key={item.title} className="rounded-[2rem] border border-graphite-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-graphite-950 text-factory-300">
                  <Icon name="file" className="h-6 w-6" />
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-factory-700">{item.type}</p>
                <h3 className="mt-2 font-display text-xl font-black text-graphite-950">{item.year}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-graphite-600">{item.title}</p>
                <button type="button" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-factory-700">
                  Открыть файл
                  <Icon name="download" className="h-4 w-4" />
                </button>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export function PartnersPage() {
  const partners = [
    {
      title: 'Госкорпорация Ростех',
      text: 'Высокотехнологичные продукты и промышленные решения.',
      href: 'https://rostec.ru'
    },
    {
      title: 'Концерн Автоматика',
      text: 'Комплексные конкурентные решения с высокой степенью защиты информации.',
      href: 'https://www.ao-avtomatika.ru'
    },
    {
      title: 'Электронные комплектующие «ЗИП»',
      text: 'Электронные компоненты для комплектации промышленного и бытового оборудования.',
      href: 'https://www.zip-2002.ru'
    }
  ];

  return (
    <>
      <PageHero label="Партнеры" title="Наши партнеры" description="Отдельная страница партнеров с крупными карточками и ссылками на внешние сайты." />
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {partners.map((partner) => (
              <a key={partner.title} href={partner.href} target="_blank" rel="noreferrer" className="group rounded-[2rem] border border-graphite-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-graphite-950 text-factory-300">
                  <Icon name="factory" className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-xl font-black text-graphite-950">{partner.title}</h3>
                <p className="mt-3 text-sm leading-7 text-graphite-600">{partner.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-factory-700">
                  Подробнее
                  <Icon name="external" className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export function DetailsPage() {
  const rows = [
    ['Полное наименование', 'Открытое акционерное общество «Смоленский завод радиодеталей»'],
    ['Сокращенное наименование', 'ОАО «Смоленский завод радиодеталей»'],
    ['Юридический адрес', '214031, г. Смоленск, ул. Бабушкина, д. 7'],
    ['ИНН', '6731017748'],
    ['КПП', '673101001'],
    ['ОГРН', '1026701430238'],
    ['БИК', '046614776'],
    ['Р/с', '40702810143000000848']
  ];

  return (
    <>
      <PageHero label="Реквизиты" title="Справочная информация и реквизиты" description="Юридические, регистрационные и банковские данные в виде удобной таблицы." />
      <section className="py-20 sm:py-24">
        <Container>
          <div className="surface-card overflow-hidden">
            <div className="divide-y divide-graphite-100">
              {rows.map(([label, value]) => (
                <div key={label} className="grid gap-2 p-5 sm:grid-cols-[260px_1fr] sm:p-6">
                  <div className="text-xs font-black uppercase tracking-[0.16em] text-graphite-500">{label}</div>
                  <div className="font-semibold text-graphite-900">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export function ProcurementPage() {
  return (
    <>
      <PageHero
        label="Закупки"
        title="Закупочная деятельность"
        description="Закупочная деятельность оформлена отдельным разделом с пояснением и кнопкой перехода на портал закупок."
      >
        <LinkButton href={sourceLinks.procurement} variant="primary" external>
          Портал закупок
        </LinkButton>
      </PageHero>
      <section className="py-20 sm:py-24">
        <Container>
          <div className="rounded-[2rem] border border-graphite-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-3xl font-black text-graphite-950">Единая карточка раздела</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-graphite-600">
              Для production-версии сюда можно добавить список актуальных закупок через API или RSS, фильтрацию по статусу и архив документации.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

function InfoCard({ icon, title, text, href, external = false }: { icon: 'file' | 'shield' | 'external' | 'factory' | 'briefcase'; title: string; text: string; href: string; external?: boolean }) {
  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="group rounded-[2rem] border border-graphite-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-graphite-950 text-factory-300">
        <Icon name={icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-6 font-display text-xl font-black text-graphite-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-graphite-600">{text}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-factory-700">
        Открыть
        <Icon name={external ? 'external' : 'arrowRight'} className="h-4 w-4" />
      </span>
    </a>
  );
}
