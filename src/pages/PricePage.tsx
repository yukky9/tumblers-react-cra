import { priceRows, sourceLinks } from '../data';
import { Icon } from '../components/Icon';
import { Container, LinkButton, PageHero, SectionHeader } from '../components/UI';

export function PricePage() {
  return (
    <>
      <PageHero
        label="Прайс лист"
        title="Актуальный прайс с быстрым просмотром"
        description="Страница сохраняет оригинальный PDF-прайс, но добавляет предпросмотр ключевых позиций и аккуратные действия для отдела закупок."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton href={sourceLinks.pricePdf} variant="primary" external>
            Скачать PDF прайс
          </LinkButton>
          <LinkButton href="#/contacts" variant="secondary">
            Связаться с продажами
          </LinkButton>
        </div>
      </PageHero>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
            <div>
              <SectionHeader
                kicker="Предпросмотр"
                title="Таблица цен в интерфейсе"
                description="Ниже — пример первых позиций из прайс-листа. Для реального сайта таблицу можно загрузить из CSV, CMS или API, добавить поиск, сортировку и фильтры по группам."
              />
              <div className="mt-8 rounded-[2rem] border border-factory-200 bg-factory-50 p-6">
                <div className="flex gap-3">
                  <Icon name="clock" className="h-6 w-6 shrink-0 text-factory-700" />
                  <div>
                    <h3 className="font-display text-lg font-black text-graphite-950">Прайс с приемкой ОТК</h3>
                    <p className="mt-2 text-sm leading-7 text-graphite-600">В оригинальном файле указаны отпускные цены за штуку без учета НДС, отдельно для партий более и менее 100 шт.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="surface-card overflow-hidden">
              <div className="border-b border-graphite-200 bg-white p-5 sm:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-display text-xl font-black text-graphite-950">Позиции прайса</h3>
                    <p className="mt-1 text-sm text-graphite-500">Демо-таблица: 10 строк</p>
                  </div>
                  <span className="rounded-full bg-graphite-950 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white">ОТК</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-graphite-50 text-xs uppercase tracking-[0.12em] text-graphite-500">
                    <tr>
                      <th className="px-5 py-4 font-black">Изделие</th>
                      <th className="px-5 py-4 font-black">Группа</th>
                      <th className="px-5 py-4 font-black">&gt; 100 шт.</th>
                      <th className="px-5 py-4 font-black">&lt; 100 шт.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-graphite-100">
                    {priceRows.map((row) => (
                      <tr key={row.name} className="bg-white transition hover:bg-factory-50/70">
                        <td className="px-5 py-4 font-black text-graphite-950">{row.name}</td>
                        <td className="px-5 py-4 text-graphite-600">{row.group}</td>
                        <td className="px-5 py-4 font-semibold text-graphite-800">{row.bulk}</td>
                        <td className="px-5 py-4 font-semibold text-graphite-800">{row.retail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
