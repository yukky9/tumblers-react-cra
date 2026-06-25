import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
            {/* Hero-блок (можно оставить как есть) */}
            <section className="bg-gradient-to-r from-factory-700 to-factory-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">Тумблеры.рф</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Российский производитель и разработчик коммутационных изделий для цепей управления, контроля, сигнализации и диагностики.
                    </p>
                    {onRequest && (
                        <button onClick={onRequest} className="mt-8 bg-white text-factory-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                            Связаться с нами
                        </button>
                    )}
                </div>
            </section>

            {/* Блок "Продукция" */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Наша продукция</h2>
                    {loading ? (
                        <div className="text-center">Загрузка...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {featuredProducts.map(product => (
                                <div key={product.id} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
                                    <img src={product.image_url || 'https://via.placeholder.com/200'} alt={product.name} className="w-full h-40 object-contain mb-3" />
                                    <h3 className="font-semibold">{product.name}</h3>
                                    <p className="text-sm text-gray-600">{product.description}</p>
                                    <p className="text-green-600 font-bold mt-2">{product.price} ₽</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="text-center mt-6">
                        <Link to="/catalog" className="inline-block bg-factory-600 text-white px-6 py-2 rounded hover:bg-factory-700 transition">
                            Весь каталог
                        </Link>
                    </div>
                </div>
            </section>

            {/* Блок "Услуги" */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Наши услуги</h2>
                    {loading ? (
                        <div className="text-center">Загрузка...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {services.map(service => (
                                <div key={service.id} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition border-t-4 border-factory-500">
                                    <div className="text-4xl mb-3">{service.icon || '🔧'}</div>
                                    <h3 className="text-xl font-semibold">{service.title}</h3>
                                    <p className="text-gray-600 mt-2">{service.description}</p>
                                    <p className="text-factory-600 font-bold mt-3">{service.price}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="text-center mt-6">
                        <Link to="/services" className="inline-block bg-factory-600 text-white px-6 py-2 rounded hover:bg-factory-700 transition">
                            Все услуги
                        </Link>
                    </div>
                </div>
            </section>

            {/* Остальные статические блоки (О нас, Акционерам) можно оставить */}
        </div>
    );
};

export default HomePage;