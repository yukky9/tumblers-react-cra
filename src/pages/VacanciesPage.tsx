import { useState } from 'react';
import { vacancies } from '../data';
import { Icon } from '../components/Icon';
import { Container, PageHero, SectionHeader } from '../components/UI';

export function VacanciesPage({ onRequest }: { onRequest: () => void }) {
  const [active, setActive] = useState<string>(vacancies[0]?.title ?? '');

  return (
    <>
      <PageHero
        label="Вакансии"
        title="Открытые позиции завода"
        description="Раздел вакансий превращен в адаптивные карточки с тегами, раскрывающимися требованиями, обязанностями и быстрым откликом."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a className="btn-primary" href="mailto:ok@tumblers.ru">
            Написать в отдел кадров
            <Icon name="mail" className="h-4 w-4" />
          </a>
          <button type="button" onClick={onRequest} className="btn-secondary">
            Откликнуться через форму
            <Icon name="arrowRight" className="h-4 w-4" />
          </button>
        </div>
      </PageHero>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                kicker="Карьера"
                title="Выберите вакансию"
                description="В исходном разделе вакансии идут длинным списком. Здесь они сгруппированы, чтобы кандидат быстрее понял требования и обязанности."
              />
              <div className="mt-8 rounded-[2rem] border border-factory-200 bg-factory-50 p-5">
                <div className="flex gap-3">
                  <Icon name="phone" className="h-5 w-5 shrink-0 text-factory-700" />
                  <div className="text-sm leading-7 text-graphite-700">
                    По вопросам вакансий: <a className="font-bold text-factory-800" href="tel:+74812299150">+7 (4812) 29-91-50</a>,{' '}
                    <a className="font-bold text-factory-800" href="mailto:ok@tumblers.ru">ok@tumblers.ru</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {vacancies.map((vacancy) => {
                const opened = vacancy.title === active;
                return (
                  <article key={vacancy.title} className="overflow-hidden rounded-[2rem] border border-graphite-200 bg-white shadow-sm">
                    <button
                      type="button"
                      onClick={() => setActive(opened ? '' : vacancy.title)}
                      className="flex w-full items-start justify-between gap-4 p-6 text-left"
                    >
                      <div>
                        <h3 className="font-display text-xl font-black text-graphite-950">{vacancy.title}</h3>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {vacancy.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-graphite-50 px-3 py-1 text-xs font-semibold text-graphite-600">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-graphite-950 text-white transition ${opened ? 'rotate-180' : ''}`}>
                        <Icon name="chevronDown" className="h-5 w-5" />
                      </span>
                    </button>
                    {opened ? (
                      <div className="grid gap-6 border-t border-graphite-100 px-6 pb-6 pt-2 md:grid-cols-2">
                        <List title="Требования" items={vacancy.requirements} />
                        <List title="Обязанности" items={vacancy.duties} />
                        <div className="md:col-span-2">
                          <button type="button" onClick={onRequest} className="btn-primary">
                            Откликнуться на вакансию
                            <Icon name="arrowRight" className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-xs font-black uppercase tracking-[0.18em] text-factory-700">{title}</h4>
      <ul className="mt-3 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-7 text-graphite-600">
            <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-factory-700" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
