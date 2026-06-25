import { documents, productGroups, serviceItems, sourceLinks } from '../data';
import { ProductCard, ServiceCard } from '../components/Cards';
import { Icon } from '../components/Icon';
import { ProductVisual } from '../components/ProductVisual';
import { ActionButton, Container, LinkButton, Metric, SectionHeader } from '../components/UI';

export function HomePage({ onRequest }: { onRequest: () => void }) {
  return (
    <>
      <Hero onRequest={onRequest} />
      <CatalogSection />
      <AboutSection />
      <ProductsAndServicesSection onRequest={onRequest} />
      <ShareholdersSection />
      <BottomCta onRequest={onRequest} />
    </>
  );
}

function Hero({ onRequest }: { onRequest: () => void }) {
  return (
    <section className="relative isolate overflow-hidden bg-graphite-950 pb-20 pt-16 text-white sm:pb-24 sm:pt-20 lg:pb-28">
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute inset-0 bg-grid-dark technical-grid opacity-35" />
      <div className="absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-factory-500/20 blur-3xl" />
      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-factory-100 backdrop-blur">
            <Icon name="factory" className="h-4 w-4" />
            Производство с 1961 года
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            Коммутационные изделия для промышленности и приборостроения
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Современная витрина для ОАО «Смоленский завод радиодеталей»: каталог изделий, производственные услуги, документы для акционеров, вакансии и быстрый запрос в отдел продаж.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="#/catalog" variant="primary">
              Смотреть каталог
            </LinkButton>
            <ActionButton onClick={onRequest} variant="secondary">
              Получить консультацию
            </ActionButton>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Metric value="1961" label="год запуска" caption="история предприятия" />
            <Metric value="60+" label="лет опыта" caption="коммутационные изделия" />
            <Metric value="152" label="страницы каталога" caption="широкая номенклатура" />
          </div>
        </div>
        <div className="relative">
          <ProductVisual />
          <div className="absolute -bottom-6 left-4 right-4 rounded-[1.5rem] border border-white/12 bg-white/10 p-4 backdrop-blur-xl sm:left-auto sm:right-8 sm:w-72">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-factory-500 text-white">
                <Icon name="shield" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-black">Строгий контроль качества</p>
                <p className="mt-1 text-xs leading-5 text-white/60">Карточки, документы и прайсы собраны в понятную навигацию.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CatalogSection() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[.95fr_1.05fr] lg:items-end">
          <SectionHeader
            kicker="Каталог продукции"
            title="Быстрый вход в номенклатуру вместо тяжелого PDF"
            description="Сохранили логику каталога: тумблеры, микропереключатели, кнопочные выключатели, изделия для бытовой техники и автомобильной промышленности."
          />
          <div className="surface-card p-5 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-3">
              <InfoCell icon="file" title="PDF каталог" value="152 страницы" />
              <InfoCell icon="settings" title="Группы изделий" value="6 разделов" />
              <InfoCell icon="download" title="Прайс" value="отдельный файл" />
            </div>
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {productGroups.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <LinkButton href="#/catalog">Открыть интерактивный каталог</LinkButton>
          <LinkButton href={sourceLinks.catalogPdf} external>
            Скачать оригинальный PDF
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}

function InfoCell({ icon, title, value }: { icon: 'file' | 'settings' | 'download'; title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-graphite-50 p-4">
      <Icon name={icon} className="h-5 w-5 text-factory-700" />
      <div className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-graphite-500">{title}</div>
      <div className="mt-1 font-display text-xl font-black text-graphite-950">{value}</div>
    </div>
  );
}

function AboutSection() {
  const timeline = [
    ['1959', 'начало строительства завода радиодеталей в Смоленске'],
    ['1961', 'завод вступил в строй действующих предприятий'],
    ['1994', 'реорганизация в акционерное общество открытого типа'],
    ['2002', 'переименование в ОАО «Смоленский завод радиодеталей»']
  ];

  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <SectionHeader
            kicker="О нас"
            title="Завод с промышленной историей и современной витриной"
            description="Дизайн переводит старую Elementor-структуру в интерфейс с крупной типографикой, карточками, быстрыми CTA и адаптивной навигацией."
          />
          <div className="relative">
            <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-factory-300 via-graphite-200 to-transparent" />
            <div className="space-y-5">
              {timeline.map(([year, text]) => (
                <div key={year} className="relative rounded-[1.5rem] border border-graphite-200 bg-graphite-50 p-5 pl-16">
                  <span className="absolute left-0 top-5 grid h-10 w-10 -translate-x-0 place-items-center rounded-full border-4 border-white bg-factory-500 text-xs font-black text-white">
                    {year.slice(2)}
                  </span>
                  <div className="font-display text-2xl font-black text-graphite-950">{year}</div>
                  <p className="mt-1 text-sm leading-7 text-graphite-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProductsAndServicesSection({ onRequest }: { onRequest: () => void }) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeader
          kicker="Продукция и услуги"
          title="Все ключевые направления на одном экране"
          description="Вместо разрозненных страниц — единая карточная система с быстрым переходом в каталог, прайс, производственные услуги и аренду."
          align="center"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <QuickCard icon="factory" title="Продукция производства" text="Каталог коммутационных изделий, группировка по назначению и сериям." href="#/catalog" />
          <QuickCard icon="file" title="Прайс лист" text="Отдельный раздел с таблицей цен и кнопкой скачивания оригинального PDF." href="#/price" />
          <QuickCard icon="settings" title="Услуги производства" text="Гальваника, термообработка, оснастка, пластмассы и электроэрозия." href="#/services" />
          <QuickCard icon="briefcase" title="Арендная деятельность" text="Производственные, складские и офисные помещения на территории завода." href="#/rent" />
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {serviceItems.slice(0, 6).map((item) => (
            <ServiceCard key={item.title} item={item} onRequest={onRequest} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function QuickCard({ icon, title, text, href }: { icon: 'factory' | 'file' | 'settings' | 'briefcase'; title: string; text: string; href: string }) {
  return (
    <a href={href} className="group rounded-[2rem] bg-graphite-950 p-6 text-white shadow-soft transition hover:-translate-y-1 hover:bg-factory-800">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-factory-200">
        <Icon name={icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-6 font-display text-xl font-black">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/62">{text}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-factory-200">
        Перейти
        <Icon name="arrowRight" className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </a>
  );
}

function ShareholdersSection() {
  const reportsCount = documents.filter((item) => item.type === 'Годовой отчет').length;
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <SectionHeader
            kicker="Информация для акционеров"
            title="Отчетность и раскрытие информации без визуального шума"
            description="Отчеты за 2020–2024 годы, финансовые документы, СOУТ и ссылка на раскрытие информации вынесены в отдельный понятный раздел."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <ReportCard title="Годовые отчеты" value={`${reportsCount} файлов`} href="#/years" />
            <ReportCard title="Финансовые отчеты" value="2020–2024" href="#/finance" />
            <ReportCard title="Раскрытие информации" value="e-disclosure" href={sourceLinks.eDisclosure} external />
            <ReportCard title="Специальная оценка труда" value="СОУТ" href="#/sout" />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ReportCard({ title, value, href, external = false }: { title: string; value: string; href: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="group rounded-[2rem] border border-graphite-200 bg-graphite-50 p-6 transition hover:-translate-y-1 hover:border-factory-200 hover:bg-factory-50"
    >
      <Icon name="file" className="h-6 w-6 text-factory-700" />
      <h3 className="mt-5 font-display text-xl font-black text-graphite-950">{title}</h3>
      <p className="mt-2 text-sm font-semibold text-graphite-500">{value}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-factory-700">
        Открыть
        <Icon name={external ? 'external' : 'arrowRight'} className="h-4 w-4" />
      </span>
    </a>
  );
}

function BottomCta({ onRequest }: { onRequest: () => void }) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-graphite-950 p-8 text-white shadow-soft sm:p-12 lg:p-16">
          <div className="absolute inset-0 bg-mesh opacity-80" />
          <div className="absolute inset-0 bg-grid-dark technical-grid opacity-30" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-factory-100">
                Не нашли нужное?
              </span>
              <h2 className="mt-5 font-display text-3xl font-black tracking-tight sm:text-5xl">Запросите консультацию по изделию, прайсу или услуге</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/66">
                Фиксированная кнопка консультанта, модальное окно заявки и контакты отделов подготовлены для подключения к backend или CRM.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <ActionButton onClick={onRequest} variant="primary">
                Отправить запрос
              </ActionButton>
              <LinkButton href="#/contacts" variant="secondary">
                Контакты
              </LinkButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
