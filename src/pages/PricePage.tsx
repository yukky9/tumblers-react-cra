import React, { useEffect, useState } from 'react';

import { api } from '../api/api';

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

    if (loading) return <div className="page-shell text-center font-semibold text-graphite-500">Загрузка прайс-листа...</div>;

    if (error) return <div className="page-shell text-center font-semibold text-red-600">{error}</div>;

    return (
        <div className="page-shell max-w-7xl">
            {/* Заголовок и кнопки */}
            <div className="surface-card relative mb-6 overflow-hidden p-6 sm:p-8">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-factory-500 via-emerald-400 to-sky-400" />
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                    <div>
                        <span className="kicker">Прайс-лист</span>
                        <h1 className="page-title mt-4 text-3xl sm:text-4xl">Прайс с приемкой ОТК</h1>
                        <p className="page-subtitle text-sm sm:text-base">
                            В оригинальном файле указаны отпускные цены за штуку без учета НДС, отдельно для партий более и менее 100 шт.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <a
                            href="http://localhost:8000/download-price"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-light py-2.5"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Скачать PDF
                        </a>

                        {onRequest && (
                            <button
                                type="button"
                                onClick={onRequest}
                                className="btn-primary py-2.5"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Связаться с продажами
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Фильтры */}
            <div className="surface-card mb-6 flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Поиск по изделию..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input-soft"
                    />
                </div>
                <div>
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
            </div>

            {/* Таблица */}
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
                    {currentItems.map((item) => (
                        <tr key={item.id} className="transition hover:bg-factory-50/60">
                            <td className="px-4 py-4 font-mono text-sm font-semibold text-graphite-900">{item.product_name}</td>
                            <td className="px-4 py-4 text-sm text-graphite-500">{item.group_name || '—'}</td>
                            <td className="px-4 py-4 text-right text-sm font-black text-factory-700">
                                {item.price_bulk?.toFixed(2) ?? '—'}
                            </td>
                            <td className="px-4 py-4 text-right text-sm font-black text-sky-700">
                                {item.price_retail?.toFixed(2) ?? '—'}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Информация ОТК и пагинация */}
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
        </div>
    );
};

export default PricePage;
