import { serviceItems } from '../data';
import { ServiceCard } from '../components/Cards';
import { Container, LinkButton, PageHero, SectionHeader } from '../components/UI';
import { Icon } from '../components/Icon';

export function ServicesPage({ onRequest }: { onRequest: () => void }) {
  return (
    <>
      <PageHero
        label="Продукция и услуги"
        title="Производственные услуги и направления завода"
        description="Раздел объединяет каталог продукции, прайс-лист, сервисные операции и аренду помещений в понятную современную структуру."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton href="#/catalog" variant="primary">
            Каталог изделий
          </LinkButton>
          <LinkButton href="#/rent" variant="secondary">
            Арендная деятельность
          </LinkButton>
        </div>
      </PageHero>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeader
            kicker="Услуги производства"
            title="Карточки услуг с быстрым заказом"
            description="Список перенесен из исходного раздела и оформлен как карточки для заявок, лендингов и дальнейшей SEO-структуры."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {serviceItems.map((item) => (
              <ServiceCard key={item.title} item={item} onRequest={onRequest} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            <Feature title="Разработка и проектирование" text="Можно расширить раздел отдельными страницами услуг, технологическими ограничениями и формой ТЗ." />
            <Feature title="Изготовление и тестирование" text="Карточка заявки подходит для прикрепления чертежей и отправки параметров партии." />
            <Feature title="Интеграция с отделом продаж" text="Форму можно подключить к e-mail, CRM, Telegram-боту или backend API." />
          </div>
        </Container>
      </section>
    </>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-[2rem] border border-graphite-200 bg-graphite-50 p-6">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-graphite-950 text-factory-300">
        <Icon name="check" className="h-6 w-6" />
      </div>
      <h3 className="mt-6 font-display text-xl font-black text-graphite-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-graphite-600">{text}</p>
    </article>
  );
}
