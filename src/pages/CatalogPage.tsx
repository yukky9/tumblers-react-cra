import React, { useEffect, useState, useMemo } from 'react';
import { api } from '../api/api';

interface Product {
    id: number;
    name: string;
    description: string;
    image_url: string;
    price: number;
    category: string;
}

const CatalogPage: React.FC = () => {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');

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

    // Получаем уникальные группы (категории)
    const groups = useMemo(() => {
        const groupSet = new Set(allProducts.map(p => p.category).filter(Boolean));
        return Array.from(groupSet);
    }, [allProducts]);

    // Фильтрация
    const filteredProducts = useMemo(() => {
        let result = allProducts;
        if (selectedGroup) {
            result = result.filter(p => p.category === selectedGroup);
        }
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            result = result.filter(p => p.name.toLowerCase().includes(term) ||
                (p.description && p.description.toLowerCase().includes(term)));
        }
        return result;
    }, [allProducts, selectedGroup, searchTerm]);

    if (loading) return <div className="text-center py-10 text-gray-600">Загрузка каталога...</div>;
    if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Каталог продукции</h1>

            {/* Фильтры и поиск */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Поиск по названию..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div>
                    <select
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value)}
                        className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                    >
                        <option value="">Все группы</option>
                        {groups.map(group => (
                            <option key={group} value={group}>{group}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Результаты */}
            {filteredProducts.length === 0 ? (
                <div className="text-center py-10 text-gray-500">Товары не найдены</div>
            ) : (
                <>
                    <div className="mb-4 text-sm text-gray-500">Найдено: {filteredProducts.length} товаров</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                                <img
                                    src={product.image_url || 'https://via.placeholder.com/300x200?text=Нет+изображения'}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                                    <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                                    <div className="mt-3 flex justify-between items-center">
                                        {product.price && product.price > 0 ? (
                                            <span className="text-lg font-bold text-green-600">{product.price} ₽</span>
                                        ) : (
                                            <span className="text-sm font-medium text-gray-500">по запросу</span>
                                        )}
                                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">{product.category}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CatalogPage;