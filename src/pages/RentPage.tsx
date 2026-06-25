import React from 'react';

import { Icon } from '../components/Icon';
import { ActionButton, IconBadge, PageHero, SectionHeader } from '../components/UI';
import { rentalInfo } from '../config/rental';

interface RentPageProps {
    onRequest?: () => void;
}

const RentPage: React.FC<RentPageProps> = ({ onRequest }) => {
    return (
        <div>
            <PageHero
                label="Арендная деятельность"
                title="Производственные, складские и офисные помещения"
                description={rentalInfo.description}
            >
                {onRequest ? <ActionButton onClick={onRequest}>Запросить аренду</ActionButton> : null}
            </PageHero>

            <section className="page-shell pt-0">
                <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
                    <div className="panel-card overflow-hidden p-6 sm:p-8">
                        <SectionHeader
                            kicker="Преимущества"
                            title="Готовая инфраструктура на территории завода"
                            description="Раздел аренды стал более визуальным, но использует прежний объект rentalInfo из конфигурации."
                        />

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            {rentalInfo.features.map((feature, index) => (
                                <div key={`${feature}-${index}`} className="rounded-2xl border border-graphite-100 bg-white/80 p-4 shadow-inner-soft">
                                    <div className="flex items-start gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-factory-50 text-factory-700">
                      <Icon name="check" className="h-4 w-4" />
                    </span>
                                        <p className="text-sm font-bold leading-6 text-graphite-700">{feature}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="relative overflow-hidden rounded-[2rem] bg-dark-surface p-6 text-white shadow-deep sm:p-8">
                        <div className="absolute inset-0 bg-grid-dark technical-grid opacity-25" />
                        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-factory-400/20 blur-3xl" />

                        <div className="relative">
                            <span className="badge-dot">Контакты для связи</span>
                            <h2 className="mt-6 font-display text-3xl font-black tracking-tight">Обсудить помещение</h2>
                            <p className="mt-4 text-sm leading-7 text-white/70">Свяжитесь с ответственным сотрудником или оставьте заявку через форму.</p>

                            <div className="mt-8 space-y-4">
                                <a href={`tel:${rentalInfo.phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 transition hover:bg-white/20">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-factory-200">
                    <Icon name="phone" className="h-5 w-5" />
                  </span>
                                    <span>
                    <span className="block text-xs font-black uppercase tracking-[0.18em] text-white/50">Телефон</span>
                    <span className="mt-1 block font-display text-xl font-black">{rentalInfo.phone}</span>
                  </span>
                                </a>

                                <a href={`mailto:${rentalInfo.email}`} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 transition hover:bg-white/20">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-factory-200">
                    <Icon name="mail" className="h-5 w-5" />
                  </span>
                                    <span>
                    <span className="block text-xs font-black uppercase tracking-[0.18em] text-white/50">Электронная почта</span>
                    <span className="mt-1 block font-display text-xl font-black">{rentalInfo.email}</span>
                  </span>
                                </a>
                            </div>

                            {onRequest ? (
                                <button type="button" onClick={onRequest} className="btn-secondary mt-8 w-full">
                                    Оставить заявку
                                    <Icon name="arrowRight" className="h-4 w-4" />
                                </button>
                            ) : null}
                        </div>
                    </aside>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                    <IconBadge icon={<Icon name="clock" className="h-4 w-4" />}>Круглосуточный доступ</IconBadge>
                    <IconBadge icon={<Icon name="shield" className="h-4 w-4" />}>Охраняемая территория</IconBadge>
                    <IconBadge icon={<Icon name="bolt" className="h-4 w-4" />}>Все коммуникации</IconBadge>
                </div>
            </section>
        </div>
    );
};

export default RentPage;
