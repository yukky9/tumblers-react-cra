import { useMemo, useState } from 'react';
import { productGroups, sourceLinks } from '../data';
import type { ProductGroup } from '../types';
import { ProductCard } from '../components/Cards';
import { Icon } from '../components/Icon';
import { Container, LinkButton, PageHero, SectionHeader } from '../components/UI';

const filters = [
  { id: 'all', label: 'Все изделия' },
  { id: 'civil', label: 'Гражданское назначение' },
  { id: 'home', label: 'Бытовая техника' },
  { id: 'auto', label: 'Автомобильная промышленность' }
] as const;

type FilterId = (typeof filters)[number]['id'];

export function CatalogPage() {
  const [filter, setFilter] = useState<FilterId>('all');
  const visible = useMemo(
    () => (filter === 'all' ? productGroups : productGroups.filter((item) => item.category === filter)),
    [filter]
  );

  return (
    <>
      <PageHero
        label="Каталог"
        title="Интерактивная структура каталога продукции"
        description="Раздел повторяет смысл исходного каталога, но переводит его в быстрые карточки, фильтры и CTA вместо длинной PDF-навигации."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton href={sourceLinks.catalogPdf} variant="primary" external>
            Скачать PDF каталог
          </LinkButton>
          <LinkButton href="#/price" variant="secondary">
            Перейти к прайсу
          </LinkButton>
        </div>
      </PageHero>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              kicker="Номенклатура"
              title="Категории продукции"
              description="Фильтры помогают быстро найти группу изделий, а карточки показывают серии и назначение."
            />
            <div className="flex flex-wrap gap-2">
              {filters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    filter === item.id ? 'bg-graphite-950 text-white' : 'bg-white text-graphite-600 shadow-sm hover:bg-graphite-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </Container>
      </section>

      <SpecsShowcase />
    </>
  );
}

function SpecsShowcase() {
  const groups: ProductGroup[] = productGroups.slice(0, 3);
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <SectionHeader
            kicker="Карточка изделия"
            title="Так может выглядеть страница серии"
            description="Для полноценной интеграции можно заменить демо-данные на JSON/API и открыть отдельные страницы серий с чертежами, характеристиками, схемами и вариантами заказа."
          />
          <div className="space-y-5">
            {groups.map((item) => (
              <article key={item.id} className="rounded-[2rem] border border-graphite-200 bg-graphite-50 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-factory-700">{item.subtitle}</p>
                    <h3 className="mt-2 font-display text-2xl font-black text-graphite-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-graphite-600">{item.description}</p>
                  </div>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-factory-700 shadow-sm">
                    <Icon name="bolt" className="h-6 w-6" />
                  </span>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <Spec title="Серии" value={item.codes.slice(0, 2).join(' · ')} />
                  <Spec title="Назначение" value={item.category === 'auto' ? 'Авто' : item.category === 'home' ? 'Бытовая техника' : 'Приборы'} />
                  <Spec title="Документы" value="ТУ / PDF" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Spec({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="text-xs font-bold uppercase tracking-[0.16em] text-graphite-500">{title}</div>
      <div className="mt-2 text-sm font-black text-graphite-950">{value}</div>
    </div>
  );
}
