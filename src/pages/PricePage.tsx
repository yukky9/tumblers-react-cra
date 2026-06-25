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

    // Первые 5 позиций для предпросмотра
    const previewItems = filteredPrices.slice(0, 5);

    if (loading) return <div className="text-center py-10 text-gray-600">Загрузка прайс-листа...</div>;
    if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Заголовок с иконкой */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Прайс с приемкой ОТК</h1>
                        <p className="text-sm text-gray-500">
                            Отпускные цены за штуку без НДС для партий более и менее 100 шт.
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <a
                        href="http://localhost:8000/download-price"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition shadow-sm"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Скачать PDF
                    </a>
                    {onRequest && (
                        <button
                            type="button"
                            onClick={onRequest}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Связаться с продажами
                        </button>
                    )}
                </div>
            </div>

            {/* Блок предпросмотра (первые 5 позиций) */}
            {filteredPrices.length > 0 && (
                <div className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-5 shadow-sm">
                    <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2 mb-3">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                        Предпросмотр ключевых позиций
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                        {previewItems.map(item => (
                            <div key={item.id} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition">
                                <div className="text-sm font-medium text-gray-800 truncate">{item.product_name}</div>
                                <div className="text-xs text-gray-500 truncate">{item.group_name || '—'}</div>
                                <div className="mt-1 flex justify-between text-xs font-semibold">
                                    <span className="text-green-600">{item.price_bulk?.toFixed(2)} ₽</span>
                                    <span className="text-blue-600">{item.price_retail?.toFixed(2)} ₽</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Фильтры */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Поиск по изделию..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <select
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value)}
                        className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    >
                        <option value="">Все группы</option>
                        {groups.map(group => (
                            <option key={group} value={group}>{group}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Таблица с зеброй */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider">Изделие</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider">Группа</th>
                        <th className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-wider">
                <span className="inline-flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                    &gt; 100 шт.
                </span>
                        </th>
                        <th className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-wider">
                <span className="inline-flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                  </svg>
                    &lt; 100 шт.
                </span>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {currentItems.map((item, index) => (
                        <tr
                            key={item.id}
                            className={`transition hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                        >
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

            {/* Пагинация и счётчик */}
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-500">
        <span className="bg-gray-100 px-3 py-1 rounded-full">
          {filteredPrices.length === 0 ? 0 : startIndex + 1} – {Math.min(startIndex + itemsPerPage, filteredPrices.length)} из {filteredPrices.length} позиций
        </span>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        Назад
                    </button>
                    <span className="px-4 py-1 bg-green-100 text-green-700 rounded-lg font-semibold">
            {currentPage} / {totalPages}
          </span>
                    <button
                        type="button"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        Вперёд
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PricePage;