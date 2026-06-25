import React from 'react';

import { Icon } from '../components/Icon';
import { ActionButton, PageHero, SectionHeader } from '../components/UI';
import { services } from '../config/services';

interface ServicesPageProps {
    onRequest?: () => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onRequest }) => {
    return (
        <div>
            <PageHero
                label="Услуги производства"
                title="Производственные услуги с аккуратной современной подачей"
                description="Гарантированное качество продукции, услуг и сервиса. Блоки услуг оформлены как технологические карточки, при этом используются те же данные из конфигурации."
            >
                {onRequest ? <ActionButton onClick={onRequest}>Заказать услугу</ActionButton> : null}
            </PageHero>

            <section className="page-shell pt-0">
                <SectionHeader
                    kicker="Направления"
                    title="Покрытия, обработка и изготовление деталей"
                    description="Каждая услуга получила контрастную иконку, читаемый текст и единый ритм карточек."
                    align="center"
                />

                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {services.map((service, index) => (
                        <article key={service.id} className="industrial-card p-6">
                            <div className="relative">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-graphite-950 text-3xl text-factory-200 shadow-card">
                                        {service.icon || <Icon name="settings" className="h-7 w-7" />}
                                    </div>
                                    <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-black text-graphite-400 shadow-inner-soft">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                                </div>

                                <h3 className="mt-6 font-display text-2xl font-black leading-tight text-graphite-950 text-balance">{service.title}</h3>
                                <p className="mt-4 text-sm leading-7 text-graphite-600">{service.description}</p>
                            </div>
                        </article>
                    ))}
                </div>

                {onRequest ? (
                    <div className="mt-12 text-center">
                        <ActionButton onClick={onRequest}>Получить консультацию</ActionButton>
                    </div>
                ) : null}
            </section>
        </div>
    );
};

export default ServicesPage;
