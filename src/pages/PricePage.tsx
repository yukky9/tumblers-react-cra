import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import { Icon } from '../components/Icon';
import { ActionButton, PageHero } from '../components/UI';

interface PriceItem {
    id: number;
    product_name: string;
    unit: string;
    price: number;
    price_bulk: number;
    price_retail: number;
    group_name: string;
    note: string;
}

interface PricePageProps {
    onRequest?: () => void;
}

const formatPrice = (value?: number) =>
    typeof value === 'number'
        ? value.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : '—';

const PricePage: React.FC<PricePageProps> = ({ onRequest }) => {
    const [allPrices, setAllPrices] = useState<PriceItem[]>([]);
    const [filteredPrices, setFilteredPrices] = useState<PriceItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;

    const groups = Array.from(new Set(allPrices.map(item => item.group_name).filter(Boolean)));

    useEffect(() => {
        api.getPrices()
            .then(data => {
                setAllPrices(data);
                setFilteredPrices(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Не удалось загрузить прайс-лист');
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let filtered = allPrices;
        if (selectedGroup) filtered = filtered.filter(item => item.group_name === selectedGroup);
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            filtered = filtered.filter(item => item.product_name.toLowerCase().includes(term));
        }
        setFilteredPrices(filtered);
        setCurrentPage(1);
    }, [searchTerm, selectedGroup, allPrices]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredPrices.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(filteredPrices.length / itemsPerPage);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (loading) {
        return (
            <div className="page-shell text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-card">
                    <Icon name="settings" className="h-7 w-7 animate-spin text-factory-600" />
                </div>
                <p className="mt-4 font-semibold text-graphite-500">Загрузка прайс-листа...</p>
            </div>
        );
    }

    if (error) return <div className="page-shell text-center font-semibold text-red-600">{error}</div>;

    return (
        <div>
            <PageHero
                label="Прайс-лист"
                title="Прайс с приемкой ОТК"
                description="В оригинальном файле указаны отпускные цены за штуку без учета НДС, отдельно для партий более и менее 100 шт."
            >
                <a href="http://localhost:8000/download-price" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    <Icon name="download" className="h-4 w-4" />
                    Скачать PDF
                </a>
                {onRequest ? <ActionButton onClick={onRequest}>Связаться с продажами</ActionButton> : null}
            </PageHero>

            <section className="page-shell pt-0">
                <div className="panel-card mb-6 flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Поиск по изделию..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-soft pl-11"
                        />
                        <svg
                            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.35-5.15a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
                        </svg>
                    </div>
                    <select
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value)}
                        className="input-soft min-w-[220px] bg-white sm:w-auto"
                    >
                        <option value="">Все группы</option>
                        {groups.map(group => (
                            <option key={group} value={group}>{group}</option>
                        ))}
                    </select>
                </div>

                <div className="table-shell">
                    <table className="min-w-full divide-y divide-graphite-200/80">
                        <thead className="bg-graphite-950 text-white">
                        <tr>
                            <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-[0.18em] text-white/70">Изделие</th>
                            <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-[0.18em] text-white/70">Группа</th>
                            <th className="px-4 py-4 text-right text-xs font-black uppercase tracking-[0.18em] text-white/70">&gt; 100 шт.</th>
                            <th className="px-4 py-4 text-right text-xs font-black uppercase tracking-[0.18em] text-white/70">&lt; 100 шт.</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-graphite-100">
                        {currentItems.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-4 py-12 text-center text-graphite-500">
                                    <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-graphite-100">
                                        <div
                                            className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-graphite-100 text-2xl">
                                            🔍
                                        </div>
                                    </div>
                                    <p className="font-semibold">Ничего не найдено</p>
                                    <p className="text-sm text-graphite-400">Попробуйте изменить параметры поиска или фильтра</p>
                                </td>
                            </tr>
                        ) : (
                            currentItems.map((item) => (
                                <tr key={item.id} className="transition hover:bg-factory-50/60">
                                    <td className="px-4 py-4 font-mono text-sm font-semibold text-graphite-900">{item.product_name}</td>
                                    <td className="px-4 py-4 text-sm text-graphite-500">{item.group_name || '—'}</td>
                                    <td className="px-4 py-4 text-right text-sm font-black text-factory-700">
                                        {formatPrice(item.price_bulk)}
                                    </td>
                                    <td className="px-4 py-4 text-right text-sm font-black text-signal-700">
                                        {formatPrice(item.price_retail)}
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-5 flex flex-col items-start justify-between gap-3 text-sm text-graphite-500 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2">
                        <span className="stat-pill">ОТК</span>
                        <span className="text-xs text-graphite-400">Контроль качества соблюдается</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold shadow-card">
              {filteredPrices.length === 0 ? 0 : startIndex + 1} – {Math.min(startIndex + itemsPerPage, filteredPrices.length)} из {filteredPrices.length}
            </span>

                        <div className="flex gap-1">
                            <button
                                type="button"
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="rounded-full border border-graphite-200 bg-white px-3 py-1 text-xs font-bold transition hover:border-factory-300 hover:text-factory-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Назад
                            </button>

                            <span className="rounded-full bg-factory-50 px-3 py-1 text-xs font-black text-factory-700">
                {currentPage} / {totalPages}
              </span>

                            <button
                                type="button"
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="rounded-full border border-graphite-200 bg-white px-3 py-1 text-xs font-bold transition hover:border-factory-300 hover:text-factory-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Вперёд
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PricePage;