import { contacts } from '../config/contacts'; // новый путь
import { Icon } from '../components/Icon';
import { Container, PageHero, SectionHeader } from '../components/UI';

export function ContactsPage() {
  return (
      <>
        <PageHero
            label="Контакты"
            title="Контактная информация и отделы"
            description="Юридический и почтовый адрес: 214031, Смоленская область, г. Смоленск, ул. Бабушкина, д. 7."
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <a className="btn-primary" href="tel:+74812310957">
              Позвонить
              <Icon name="phone" className="h-4 w-4" />
            </a>
            <a className="btn-secondary" href="mailto:szr@tumblers.ru">
              Написать письмо
              <Icon name="mail" className="h-4 w-4" />
            </a>
          </div>
        </PageHero>

        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeader
                kicker="Отделы"
                title="Быстрый выбор нужного контакта"
                description="Контакты сгруппированы карточками, чтобы посетитель не искал номера в длинном тексте футера."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {contacts.map((item) => (
                  <article key={item.title} className="rounded-[2rem] border border-graphite-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-xl font-black text-graphite-950">{item.title}</h3>
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-graphite-950 text-factory-300">
                        <Icon name="phone" className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="mt-5 space-y-3 text-sm">
                      {item.phone.map((phone) => (
                          <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-3 font-semibold text-graphite-700 transition hover:text-factory-700">
                            <Icon name="phone" className="h-4 w-4 text-factory-700" />
                            {phone}
                          </a>
                      ))}
                      {item.email.map((email) => (
                          <a key={email} href={`mailto:${email}`} className="flex items-center gap-3 font-semibold text-graphite-700 transition hover:text-factory-700">
                            <Icon name="mail" className="h-4 w-4 text-factory-700" />
                            {email}
                          </a>
                      ))}
                    </div>
                  </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-stretch">
              <div className="rounded-[2rem] border border-graphite-200 bg-graphite-50 p-6">
                <span className="kicker">Адрес</span>
                <h2 className="mt-5 font-display text-3xl font-black text-graphite-950">г. Смоленск, ул. Бабушкина, д. 7</h2>
                <p className="mt-4 text-sm leading-7 text-graphite-600">Блок карты оставлен как готовое место под Яндекс.Карты, 2ГИС или iframe с выбранным провайдером.</p>
              </div>
              <div className="relative min-h-80 overflow-hidden rounded-[2rem] bg-graphite-950 p-6 text-white">
                <div className="absolute inset-0 bg-grid-dark technical-grid opacity-35" />
                <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-factory-300/30" />
                <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-factory-500/20 blur-2xl" />
                <div className="relative z-10 flex h-full min-h-80 items-center justify-center text-center">
                  <div>
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-factory-500 shadow-glow">
                      <Icon name="map" className="h-8 w-8" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-black">Здесь будет интерактивная карта</h3>
                    <p className="mt-2 text-sm text-white/60">Подключается отдельным компонентом без изменения структуры страницы.</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </>
  );
}