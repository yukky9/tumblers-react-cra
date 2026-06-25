import React, { useEffect, useMemo, useState } from 'react';

import { api } from '../api/api';
import { Icon } from '../components/Icon';
import { PageHero } from '../components/UI';

interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
}

const CatalogPage: React.FC = () => {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedGroup, setSelectedGroup] = useState<string>('');

    useEffect(() => {
        api.getProducts()
            .then(data => {
                setAllProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Не удалось загрузить каталог');
                setLoading(false);
            });
    }, []);

    const groups = useMemo(() => {
        const groupSet = new Set(allProducts.map(product => product.category).filter(Boolean));
        return Array.from(groupSet);
    }, [allProducts]);

    const filteredProducts = useMemo(() => {
        let result = allProducts;

        if (selectedGroup) {
            result = result.filter(product => product.category === selectedGroup);
        }

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            result = result.filter(product =>
                product.name.toLowerCase().includes(term) ||
                (product.description && product.description.toLowerCase().includes(term))
            );
        }

        return result;
    }, [allProducts, selectedGroup, searchTerm]);

    if (loading) {
        return (
            <div className="page-shell text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-card">
                    <Icon name="settings" className="h-7 w-7 animate-spin text-factory-600" />
                </div>
                <p className="mt-4 font-semibold text-graphite-500">Загрузка каталога...</p>
            </div>
        );
    }

    if (error) return <div className="page-shell text-center font-semibold text-red-600">{error}</div>;

    return (
        <div>
            <PageHero
                label="Каталог"
                title="Каталог продукции"
                description="Подберите изделия по названию, описанию или группе. Карточки оставлены чистыми: без фотографий и без ценовых блоков."
            />

            <section className="page-shell pt-0">
                <div className="surface-card p-4 sm:p-5">
                    <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                        <label className="relative block">
                            <span className="sr-only">Поиск по каталогу</span>
                            <input
                                type="text"
                                placeholder="Поиск по названию или описанию"
                                value={searchTerm}
                                onChange={event => setSearchTerm(event.target.value)}
                                className="h-12 w-full rounded-2xl border border-graphite-200 bg-white px-4 pr-11 text-sm font-semibold text-graphite-800 shadow-inner-soft outline-none transition placeholder:text-graphite-400 focus:border-factory-300 focus:ring-4 focus:ring-factory-100"
                            />
                            <Icon name="spark" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-factory-500" />
                        </label>

                        <label className="relative block sm:min-w-[240px]">
                            <span className="sr-only">Фильтр по группе</span>
                            <select
                                value={selectedGroup}
                                onChange={event => setSelectedGroup(event.target.value)}
                                className="h-12 w-full appearance-none rounded-2xl border border-graphite-200 bg-white px-4 pr-11 text-sm font-black text-graphite-800 shadow-inner-soft outline-none transition focus:border-factory-300 focus:ring-4 focus:ring-factory-100"
                            >
                                <option value="">Все группы</option>
                                {groups.map(group => (
                                    <option key={group} value={group}>
                                        {group}
                                    </option>
                                ))}
                            </select>
                            <Icon name="chevronDown" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-graphite-500" />
                        </label>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-graphite-500">
                        Найдено: {filteredProducts.length} товаров
                    </p>
                    {selectedGroup ? (
                        <button
                            type="button"
                            onClick={() => setSelectedGroup('')}
                            className="rounded-full bg-graphite-100 px-4 py-2 text-xs font-black text-graphite-600 transition hover:bg-graphite-200"
                        >
                            Сбросить группу
                        </button>
                    ) : null}
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="mt-8 surface-card p-10 text-center">
                        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-graphite-950 text-factory-200 shadow-card">
                            <Icon name="factory" className="h-8 w-8" />
                        </div>
                        <h3 className="mt-5 font-display text-2xl font-black text-graphite-950">Товары не найдены</h3>
                        <p className="mt-3 text-sm leading-6 text-graphite-500">Попробуйте изменить поисковый запрос или выбрать другую группу.</p>
                    </div>
                ) : (
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {filteredProducts.map((product, index) => (
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
            </section>
        </div>
    );
};

export default CatalogPage;
