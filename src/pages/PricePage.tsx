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

    if (loading) return <div className="text-center py-10 text-gray-600">Загрузка прайс-листа...</div>;
    if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Заголовок и кнопки */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Прайс с приемкой ОТК</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        В оригинальном файле указаны отпускные цены за штуку без учета НДС, отдельно для партий более и менее 100 шт.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <a
                        href="http://localhost:8000/download-price"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition shadow-sm text-sm"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Скачать PDF
                    </a>
                    {onRequest && (
                        <button
                            type="button"
                            onClick={onRequest}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm text-sm"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Связаться с продажами
                        </button>
                    )}
                </div>
            </div>

            {/* Фильтры */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Поиск по изделию..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    />
                </div>
                <div>
                    <select
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value)}
                        className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-sm"
                    >
                        <option value="">Все группы</option>
                        {groups.map(group => (
                            <option key={group} value={group}>{group}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Таблица */}
            <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Изделие</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Группа</th>
                        <th className="py-3 px-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">&gt; 100 шт.</th>
                        <th className="py-3 px-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">&lt; 100 шт.</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {currentItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition">
                            <td className="py-3 px-4 text-sm font-mono text-gray-800">{item.product_name}</td>
                            <td className="py-3 px-4 text-sm text-gray-500">{item.group_name || '—'}</td>
                            <td className="py-3 px-4 text-sm font-semibold text-green-600 text-right">
                                {item.price_bulk?.toFixed(2) ?? '—'}
                            </td>
                            <td className="py-3 px-4 text-sm font-semibold text-blue-600 text-right">
                                {item.price_retail?.toFixed(2) ?? '—'}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Информация ОТК и пагинация */}
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700">ОТК</span>
                    <span className="text-xs text-gray-400">Контроль качества соблюдается</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
          <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
            {filteredPrices.length === 0 ? 0 : startIndex + 1} – {Math.min(startIndex + itemsPerPage, filteredPrices.length)} из {filteredPrices.length}
          </span>
                    <div className="flex gap-1">
                        <button
                            type="button"
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition text-xs"
                        >
                            Назад
                        </button>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-md font-semibold text-xs">
              {currentPage} / {totalPages}
            </span>
                        <button
                            type="button"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition text-xs"
                        >
                            Вперёд
                        </button>
                    </div>
                </div>
            </div>

            {/* Дополнительная ссылка "Консультант" */}
            {onRequest && (
                <div className="mt-4 text-center">
                    <button
                        type="button"
                        onClick={onRequest}
                        className="text-sm text-green-600 hover:text-green-800 font-medium hover:underline transition"
                    >
                        Консультант
                    </button>
                </div>
            )}
        </div>
    );
};

export default PricePage;