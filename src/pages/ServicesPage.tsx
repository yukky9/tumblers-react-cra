import React, { useEffect, useState } from 'react';
import { api } from '../api/api';

interface ServicesPageProps {
    onRequest?: () => void;
}

interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
    price: string;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onRequest }) => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.getServices()
            .then(data => {
                setServices(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Не удалось загрузить услуги');
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-10 text-gray-600">Загрузка услуг...</div>;
    if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Наши услуги</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map(service => (
                    <div key={service.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300 border-t-4 border-factory-500">
                        <div className="text-5xl mb-4">{service.icon || '🔧'}</div>
                        <h3 className="text-2xl font-semibold text-gray-800">{service.title}</h3>
                        <p className="text-gray-600 mt-2">{service.description}</p>
                        <p className="text-factory-600 font-bold mt-4">{service.price}</p>
                    </div>
                ))}
            </div>
            {onRequest && (
                <div className="text-center mt-10">
                    <button onClick={onRequest} className="bg-factory-600 text-white px-8 py-3 rounded-full hover:bg-factory-700 transition">
                        Получить консультацию
                    </button>
                </div>
            )}
        </div>
    );
};

export default ServicesPage;