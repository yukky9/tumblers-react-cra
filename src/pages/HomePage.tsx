import React, { useEffect, useState } from 'react';

import { api } from '../api/api';
import { Icon } from '../components/Icon';
import { ProductVisual } from '../components/ProductVisual';
import { ActionButton, LinkButton, Metric, SectionHeader } from '../components/UI';

interface HomePageProps {
    onRequest?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onRequest }) => {
    const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        Promise.all([
            api.getProducts(),
            api.getServices()
        ])
            .then(([products, servicesData]) => {
                setFeaturedProducts(products.slice(0, 3));
                setServices(servicesData.slice(0, 3));
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <section className="relative overflow-hidden bg-graphite-950 py-20 text-white sm:py-24 lg:py-28">
                <div className="absolute inset-0 bg-mesh opacity-95" />
                <div className="absolute inset-0 bg-grid-dark technical-grid opacity-30" />
                <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-factory-300/70 to-transparent" />

                <div className="container-page relative z-10 grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
                    <div>
                        <span className="badge-dot">Смоленский завод радиодеталей</span>
                        <h1 className="mt-6 max-w-4xl font-display text-4xl font-black tracking-tight text-balance sm:text-6xl lg:text-7xl">
                            Коммутационные изделия для надежных систем управления
                        </h1>
                        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
                            Российский производитель радиодеталей: тумблеры, переключатели, кнопки, элементы сигнализации и производственные услуги с контролем качества.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            {onRequest ? <ActionButton onClick={onRequest}>Оставить заявку</ActionButton> : null}
                            <LinkButton href="#/catalog" variant="secondary">Смотреть каталог</LinkButton>
                        </div>

                        <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3 text-center text-white/70">
                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                <div className="font-display text-2xl font-black text-white">60+</div>
                                <div className="mt-1 text-xs font-bold uppercase tracking-[0.16em]">лет опыта</div>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                <div className="font-display text-2xl font-black text-white">ОТК</div>
                                <div className="mt-1 text-xs font-bold uppercase tracking-[0.16em]">контроль</div>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                <div className="font-display text-2xl font-black text-white">РФ</div>
                                <div className="mt-1 text-xs font-bold uppercase tracking-[0.16em]">производство</div>
                            </div>
                        </div>
                    </div>

                    <ProductVisual className="animate-float-soft" />
                </div>
            </section>

            <section className="section-wrap">
                <div className="container-page">
                    <SectionHeader
                        kicker="Продукция"
                        title="Популярные позиции каталога"
                        description="В нашем каталоге вы найдете широкий ассортимент высококачественной радиодетальной продукции, изготовленной с применением современных технологий и строгим контролем качества."
                        align="center"
                    />

                    {loading ? (
                        <div className="mt-12 text-center font-semibold text-graphite-500">Загрузка...</div>
                    ) : (
                        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
                            {featuredProducts.map((product, index) => (
                                <article key={product.id} className="card-hover group relative overflow-hidden p-5">
                                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-factory-500 via-signal-400 to-factory-500 opacity-80" />

                                    <div className="flex items-start gap-4">
                                        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-dark-surface text-factory-200 shadow-card transition duration-300 group-hover:-translate-y-1 group-hover:rotate-3">
                                            <span className="font-display text-lg font-black">{String(index + 1).padStart(2, '0')}</span>
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            {product.category ? (
                                                <span className="inline-flex max-w-full rounded-full bg-factory-50 px-3 py-1 text-xs font-black text-factory-700">
                          <span className="truncate">{product.category}</span>
                        </span>
                                            ) : null}
                                            <h3 className="mt-3 font-display text-2xl font-black leading-tight text-graphite-950 text-balance">
                                                {product.name}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="mt-5 line-clamp-4 text-sm leading-6 text-graphite-600">{product.description}</p>

                                    <div className="mt-5 flex items-center justify-between border-t border-graphite-100 pt-4 text-xs font-black uppercase tracking-[0.16em] text-graphite-400">
                                        <span>Продукция</span>
                                        <Icon name="settings" className="h-4 w-4 text-factory-500" />
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    <div className="mt-10 text-center">
                        <LinkButton href="#/catalog">Весь каталог</LinkButton>
                    </div>
                </div>
            </section>

            <section className="section-wrap bg-white/50">
                <div className="container-page">
                    <SectionHeader
                        kicker="Производственные услуги"
                        title="Поверхностная обработка, покрытия и изготовление деталей"
                        description="Здесь вы сможете ознакомиться с нашим ассортиментом товаров и услуг."
                        align="center"
                    />

                    {loading ? (
                        <div className="mt-12 text-center font-semibold text-graphite-500">Загрузка...</div>
                    ) : (
                        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                            {services.map(service => (
                                <article key={service.id} className="industrial-card p-6">
                                    <div className="relative">
                                        <div className="mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-graphite-950 text-3xl text-factory-200 shadow-card">
                                            {service.icon || <Icon name="settings" className="h-7 w-7" />}
                                        </div>
                                        <h3 className="font-display text-2xl font-black text-graphite-950">{service.title}</h3>
                                        <p className="mt-3 min-h-[5rem] text-sm leading-6 text-graphite-600">{service.description}</p>
                                        {service.price ? <p className="mt-5 font-black text-factory-700">{service.price}</p> : null}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    <div className="mt-10 text-center">
                        <LinkButton href="#/services" variant="primary">Все услуги</LinkButton>
                    </div>
                </div>
            </section>

            <section className="section-wrap">
                <div className="container-page">
                    <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr] lg:items-stretch">
                        <div className="relative overflow-hidden rounded-[2rem] bg-dark-surface p-8 text-white shadow-deep sm:p-10">
                            <div className="absolute inset-0 bg-grid-dark technical-grid opacity-25" />
                            <div className="absolute -right-20 -top-16 h-56 w-56 rounded-full bg-factory-400/20 blur-3xl" />
                            <div className="relative">
                                <span className="badge-dot">О предприятии</span>
                                <h2 className="mt-6 font-display text-3xl font-black tracking-tight text-balance sm:text-5xl">Завод с историей и современным подходом к подаче информации</h2>
                                <p className="mt-5 text-base leading-8 text-white/70">
                                    ОАО «Смоленский завод радиодеталей», основанное в 1961 году, более 60 лет выпускает коммутационные и установочные изделия.
                                </p>
                                <p className="mt-4 text-base leading-8 text-white/70">
                                    Постановлением Совета Министров РСФСР №106-1 от 29.01.1959 года началось строительство завода радиодеталей в Смоленске, а в октябре 1961 года предприятие вступило в строй действующих.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Metric value="1961" label="год запуска" caption="Предприятие работает на рынке радиодеталей несколько десятилетий." />
                            <Metric value="ОТК" label="приемка" caption="Визуальный акцент на качестве и технологической дисциплине." />
                            <Metric value="B2B" label="заявки" caption="Быстрые CTA-кнопки ведут в существующую форму заявки." />
                            <Metric value="24/7" label="доступ" caption="Для арендных помещений сохранены ключевые условия доступа." />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
