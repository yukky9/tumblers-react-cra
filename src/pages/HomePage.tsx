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
            <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">Каталог нашей продукции</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Российский производитель и разработчик коммутационных изделий для цепей управления, контроля, сигнализации и диагностики.
                    </p>
                    {onRequest && (
                        <button
                            type="button"
                            onClick={onRequest}
                            className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                        >
                            Оставить заявку
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
                        <a href="#/catalog" className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
                            Весь каталог
                        </a>
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
                                <div key={service.id} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition border-t-4 border-green-500">
                                    <div className="text-4xl mb-3">{service.icon || '🔧'}</div>
                                    <h3 className="text-xl font-semibold">{service.title}</h3>
                                    <p className="text-gray-600 mt-2">{service.description}</p>
                                    <p className="text-green-600 font-bold mt-3">{service.price}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="text-center mt-6">
                        <a href="#/services" className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
                            Все услуги
                        </a>
                    </div>
                </div>
            </section>

            {/* Блок "О нас" */}
            <section className="py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">О нас</h2>
                    <div className="max-w-4xl mx-auto text-gray-700 space-y-4">
                        <p>ОАО «Смоленский завод радиодеталей», основанное в 1961 году, и более 60 лет является одним из крупнейших предприятий, выпускающих коммутационные и установочные изделия.</p>
                        <p>Постановлением Совета Министров РСФСР №106-1 от 29.01.1959 года началось строительство завода радиодеталей по производству коммутационных и установочных изделий в Смоленске, в октябре 1961 года Смоленский завод радиодеталей вступил в строй действующих.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;