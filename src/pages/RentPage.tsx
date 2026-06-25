import { Icon } from '../components/Icon';
import { Container, LinkButton, PageHero, SectionHeader } from '../components/UI';

export function RentPage({ onRequest }: { onRequest: () => void }) {
  return (
    <>
      <PageHero
        label="Арендная деятельность"
        title="Производственные, складские и офисные помещения"
        description="Современная страница аренды с преимуществами, контактами и заявкой для арендаторов."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={onRequest} className="btn-primary">
            Оставить заявку
            <Icon name="arrowRight" className="h-4 w-4" />
          </button>
          <LinkButton href="#/contacts" variant="secondary">
            Контакты
          </LinkButton>
        </div>
      </PageHero>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
            <SectionHeader
              kicker="Помещения от 10 м²"
              title="Аренда на охраняемой территории завода"
              description="Предлагаются производственные, складские, офисные и другие нежилые помещения от 10 кв. м с возможностью круглосуточного доступа сотрудников и автотранспорта."
            >
              <div className="mt-8 rounded-[2rem] border border-factory-200 bg-factory-50 p-6">
                <h3 className="font-display text-xl font-black text-graphite-950">Контакты для связи</h3>
                <div className="mt-4 space-y-3 text-sm font-semibold text-graphite-700">
                  <a href="tel:+79043630009" className="flex gap-3 transition hover:text-factory-700">
                    <Icon name="phone" className="h-5 w-5 text-factory-700" />
                    +7 904 363-00-09
                  </a>
                  <a href="mailto:referent@tumblers.ru" className="flex gap-3 transition hover:text-factory-700">
                    <Icon name="mail" className="h-5 w-5 text-factory-700" />
                    referent@tumblers.ru
                  </a>
                </div>
              </div>
            </SectionHeader>
            <div className="grid gap-5 sm:grid-cols-2">
              <Benefit title="Охраняемая территория" text="Контроль доступа и возможность круглосуточной работы." />
              <Benefit title="Все коммуникации" text="Инфраструктура производственной площадки уже на месте." />
              <Benefit title="Гибкие площади" text="Помещения от 10 кв. м для разных задач бизнеса." />
              <Benefit title="Дифференцированная ставка" text="Расчет арендной платы под тип помещения и условия использования." />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Benefit({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-[2rem] border border-graphite-200 bg-white p-6 shadow-sm">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-graphite-950 text-factory-300">
        <Icon name="check" className="h-6 w-6" />
      </div>
      <h3 className="mt-6 font-display text-xl font-black text-graphite-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-graphite-600">{text}</p>
    </article>
  );
}
