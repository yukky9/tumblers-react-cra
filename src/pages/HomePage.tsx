import React, { useEffect, useState } from 'react';
import { api } from '../api/api';

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
            {/* Hero-блок */}
            <section className="relative overflow-hidden bg-graphite-950 py-20 text-white sm:py-24">
                <div className="absolute inset-0 bg-mesh opacity-95" />
                <div className="absolute inset-0 bg-grid-dark technical-grid opacity-30" />
                <div className="container-page relative z-10 grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
                    <div>
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-factory-100 backdrop-blur">
              Смоленский завод радиодеталей
            </span>
                        <h1 className="mt-6 max-w-4xl font-display text-4xl font-black tracking-tight text-balance sm:text-6xl lg:text-7xl">
                            Каталог нашей продукции
                        </h1>
                        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
                            Российский производитель и разработчик коммутационных изделий для цепей управления, контроля, сигнализации и диагностики.
                        </p>

                        {onRequest && (
                            <button
                                type="button"
                                onClick={onRequest}
                                className="btn-primary mt-8"
                            >
                                Оставить заявку
                            </button>
                        )}
                    </div>

                    <div className="glass-card relative min-h-[360px] p-6 animate-float-soft">
                        <div className="absolute inset-6 rounded-[1.5rem] border border-white/10 bg-graphite-950/50" />
                        <div className="relative z-10 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                            <span>Control panel</span>
                            <span className="rounded-full bg-factory-400/20 px-2 py-1 text-factory-100">Online</span>
                        </div>
                        <div className="relative z-10 mt-10 grid place-items-center">
                            <div className="relative h-52 w-72 rounded-[2rem] border border-white/10 bg-gradient-to-br from-graphite-800 to-graphite-950 shadow-soft">
                                <div className="absolute left-8 top-10 h-14 w-24 rounded-2xl border border-white/10 bg-black/40" />
                                <div className="absolute right-8 top-10 h-14 w-24 rounded-2xl border border-white/10 bg-black/40" />
                                <div className="absolute left-16 top-24 h-8 w-8 rounded-full bg-factory-400 shadow-glow" />
                                <div className="absolute right-16 top-24 h-8 w-8 rounded-full bg-white/40" />
                                <div className="absolute bottom-8 left-10 right-10 h-1 rounded-full bg-factory-400/70" />
                            </div>
                            <div className="absolute top-4 h-32 w-24 rounded-b-[2rem] rounded-t-xl bg-gradient-to-br from-white to-graphite-300 shadow-soft" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Блок "Продукция" */}
            <section className="py-16 sm:py-20">
                <div className="container-page">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="kicker">Продукция</span>
                        <h2 className="mt-5 font-display text-3xl font-black tracking-tight text-graphite-950 sm:text-5xl">Наша продукция</h2>
                    </div>

                    {loading ? (
                        <div className="mt-10 text-center font-semibold text-graphite-500">Загрузка...</div>
                    ) : (
                        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                            {featuredProducts.map(product => (
                                <div key={product.id} className="card-hover overflow-hidden p-4">
                                    <div className="rounded-[1.25rem] bg-gradient-to-br from-graphite-50 to-white p-4">
                                        <img src={product.image_url || 'https://via.placeholder.com/200'} alt={product.name} className="h-44 w-full object-contain" />
                                    </div>
                                    <div className="p-2 pt-5">
                                        <h3 className="font-display text-xl font-black text-graphite-950">{product.name}</h3>
                                        <p className="mt-2 text-sm leading-6 text-graphite-600">{product.description}</p>
                                        {/* Показываем цену только если она > 0, иначе "по запросу" */}
                                        {product.price && product.price > 0 ? (
                                            <p className="mt-4 inline-flex rounded-full bg-factory-50 px-3 py-1 text-sm font-black text-factory-700">{product.price} ₽</p>
                                        ) : (
                                            <p className="mt-4 inline-flex rounded-full bg-graphite-100 px-3 py-1 text-sm font-semibold text-graphite-500">по запросу</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <a href="#/catalog" className="btn-light">Весь каталог</a>
                    </div>
                </div>
            </section>

            {/* Блок "Услуги" */}
            <section className="bg-white/50 py-16 sm:py-20">
                <div className="container-page">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="kicker">Сервис</span>
                        <h2 className="mt-5 font-display text-3xl font-black tracking-tight text-graphite-950 sm:text-5xl">Наши услуги</h2>
                    </div>

                    {loading ? (
                        <div className="mt-10 text-center font-semibold text-graphite-500">Загрузка...</div>
                    ) : (
                        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                            {services.map(service => (
                                <div key={service.id} className="card-hover p-6 text-center">
                                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-graphite-950 text-3xl text-factory-200 shadow-card">
                                        {service.icon || ''}
                                    </div>
                                    <h3 className="mt-5 font-display text-xl font-black text-graphite-950">{service.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-graphite-600">{service.description}</p>
                                    <p className="mt-4 font-black text-factory-700">{service.price}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <a href="#/services" className="btn-primary">Все услуги</a>
                    </div>
                </div>
            </section>

            {/* Блок "О нас" */}
            <section className="py-16 sm:py-20">
                <div className="container-page">
                    <div className="surface-card p-6 sm:p-10 lg:p-12">
                        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
                            <div>
                                <span className="kicker">О нас</span>
                                <h2 className="mt-5 font-display text-3xl font-black tracking-tight text-graphite-950 sm:text-5xl">
                                    Более 60 лет лидерства
                                </h2>
                                <p className="mt-3 text-sm text-graphite-500">Ключевые вехи истории завода</p>
                            </div>
                            <div className="space-y-5 text-base leading-8 text-graphite-600">
                                <p>
                                    <span className="font-bold text-factory-700">ОАО «Смоленский завод радиодеталей»</span>,
                                    основанное в <span className="font-bold text-factory-700">1961 году</span>, и более 60 лет является одним из крупнейших предприятий, выпускающих коммутационные и установочные изделия.
                                </p>
                                <p>
                                    Постановлением Совета Министров РСФСР №106-1 от <span className="font-bold text-factory-700">29 января 1959 года</span> началось строительство завода радиодеталей по производству коммутационных и установочных изделий в Смоленске. В октябре <span className="font-bold text-factory-700">1961 года</span> Смоленский завод радиодеталей вступил в строй действующих.
                                </p>
                                <p>
                                    В <span className="font-bold text-factory-700">1976 году</span> заводу присвоено имя «Смоленский завод имени XXV партсъезда».
                                    В <span className="font-bold text-factory-700">1979 году</span> вошел в состав НПО «Феникс».
                                </p>
                                <p>
                                    В <span className="font-bold text-factory-700">1994 году</span> реорганизован в АООТ «Смоленский завод радиодеталей».
                                    В <span className="font-bold text-factory-700">2002 году</span> переименован в ОАО «Смоленский завод радиодеталей».
                                </p>
                            </div>
                        </div>

                        {/* Таймлайн ключевых событий */}
                        <div className="mt-10 pt-8 border-t border-graphite-200">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                                {[
                                    { year: '1959', event: 'Начало строительства' },
                                    { year: '1961', event: 'Ввод в эксплуатацию' },
                                    { year: '1976', event: 'Присвоение имени' },
                                    { year: '1979', event: 'Вхождение в НПО «Феникс»' },
                                    { year: '1994', event: 'Реорганизация в АООТ' },
                                    { year: '2002', event: 'Переименование в ОАО' },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-graphite-50 rounded-xl p-3 text-center hover:shadow-md transition-shadow border border-graphite-100"
                                    >
                                        <div className="text-lg font-bold text-factory-700">{item.year}</div>
                                        <div className="text-xs text-graphite-500 leading-tight">{item.event}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== БЛОК С ФОТО ЗАВОДА, ЛОГОТИПАМИ И ВАКАНСИЯМИ ===== */}
            <section className="py-16 sm:py-20 bg-white">
                <div className="container-page">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        {/* Фото завода */}
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src="/images/factory.jpg"
                                alt="Смоленский завод радиодеталей"
                                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/60 to-transparent flex items-end p-6">
                                <div className="text-white">
                                    <p className="text-sm font-semibold uppercase tracking-widest text-factory-300">Смоленский завод радиодеталей</p>
                                    <h3 className="text-2xl font-bold">Производство с 1961 года</h3>
                                </div>
                            </div>
                        </div>

                        {/* Логотипы и информация о вакансиях */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-graphite-950 mb-4">Надёжный партнёр</h2>
                                <p className="text-graphite-600 text-lg leading-relaxed">
                                    Мы гордимся сотрудничеством с ведущими предприятиями России.
                                </p>
                            </div>

                            {/* Логотипы партнёров */}
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="bg-white p-3 rounded-xl shadow-md border border-graphite-100">
                                    <img src="/images/rostech_logo.png" alt="Ростех" className="h-12 object-contain" />
                                </div>
                                <div className="bg-white p-3 rounded-xl shadow-md border border-graphite-100">
                                    <img src="/images/concern_avtomatika_logo.png" alt="Концерн Автоматика" className="h-12 object-contain" />
                                </div>
                                <div className="bg-white p-3 rounded-xl shadow-md border border-graphite-100">
                                    <img src="/images/szr_logo.png" alt="Смоленский завод радиодеталей" className="h-12 object-contain" />
                                </div>
                            </div>

                            {/* Блок с вакансиями */}
                            <div className="bg-gradient-to-r from-factory-50 to-factory-100 rounded-2xl p-6 border border-factory-200">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-factory-600 rounded-xl text-white">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-graphite-950">Набираем учеников</h3>
                                        <p className="text-sm text-graphite-600 mt-1">Присоединяйтесь к команде профессионалов</p>
                                        <div className="mt-3 flex flex-wrap items-center gap-4">
                                            <a
                                                href="tel:+74812310957"
                                                className="inline-flex items-center gap-2 text-factory-700 font-bold text-lg hover:text-factory-800 transition"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                +7 (4812) 31-09-57
                                            </a>
                                            <a
                                                href="#/vacancies"
                                                className="btn-primary text-sm px-4 py-2"
                                            >
                                                Все вакансии
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
