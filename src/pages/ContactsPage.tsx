import { contacts } from '../config/contacts';
import { Icon } from '../components/Icon';
import { IconBadge, PageHero, SectionHeader } from '../components/UI';

export function ContactsPage() {
  return (
      <div>
        <PageHero
            label="Контакты"
            title="Связь с подразделениями завода"
            description="Контактная страница получила современную сетку карточек и быстрые ссылки на телефон и почту, сохранив прежние данные из конфигурации."
        />

        <section className="page-shell pt-0">
          <SectionHeader
              kicker="Подразделения"
              title="Выберите нужный отдел"
              description="Телефоны и email остались прежними, изменена только визуальная подача."
              align="center"
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {contacts.map((contact, index) => (
                <article key={contact.title} className="industrial-card p-6">
                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-graphite-950 text-factory-200 shadow-card">
                        <Icon name={index % 2 === 0 ? 'phone' : 'mail'} className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-black text-graphite-400 shadow-inner-soft">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                    </div>

                    <h3 className="mt-6 font-display text-2xl font-black text-graphite-950">{contact.title}</h3>

                    <div className="mt-5 space-y-3 text-sm text-graphite-600">
                      {contact.phone.map((phone) => (
                          <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-3 rounded-2xl bg-white/75 p-3 transition hover:bg-factory-50 hover:text-factory-800">
                            <Icon name="phone" className="h-4 w-4 shrink-0 text-factory-600" />
                            <span className="font-bold">{phone}</span>
                          </a>
                      ))}

                      {contact.email.map((email) => (
                          <a key={email} href={`mailto:${email}`} className="flex items-center gap-3 rounded-2xl bg-white/75 p-3 transition hover:bg-factory-50 hover:text-factory-800">
                            <Icon name="mail" className="h-4 w-4 shrink-0 text-factory-600" />
                            <span className="font-bold">{email}</span>
                          </a>
                      ))}
                    </div>
                  </div>
                </article>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] bg-dark-surface p-6 text-white shadow-deep sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="badge-dot">Адрес</span>
                <h2 className="mt-5 font-display text-3xl font-black tracking-tight">ОАО «Смоленский завод радиодеталей»</h2>
                <p className="mt-3 text-white/70">214031, г. Смоленск, ул. Бабушкина, д. 7</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <IconBadge icon={<Icon name="map" className="h-4 w-4" />}>Смоленск</IconBadge>
                <IconBadge icon={<Icon name="factory" className="h-4 w-4" />}>Производство</IconBadge>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
