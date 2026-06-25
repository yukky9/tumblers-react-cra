import React, { useEffect, useState } from 'react';
import { api } from '../api/api';

interface RentPageProps {
    onRequest?: () => void;
}

interface Rental {
    id: number;
    title: string;
    description: string;
    area: string;
    price: string;
    image_url: string;
}

const RentPage: React.FC<RentPageProps> = ({ onRequest }) => {
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.getRentals()
            .then(data => {
                setRentals(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Не удалось загрузить объекты аренды');
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-10 text-gray-600">Загрузка...</div>;
    if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Аренда</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {rentals.map(item => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                        <img
                            src={item.image_url || 'https://via.placeholder.com/400x250?text=Фото+объекта'}
                            alt={item.title}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-2xl font-semibold text-gray-800">{item.title}</h3>
                            <p className="text-gray-600 mt-1">{item.description}</p>
                            <div className="mt-3 flex flex-wrap gap-3 text-sm">
                                <span className="bg-gray-100 px-3 py-1 rounded-full">Площадь: {item.area}</span>
                                <span className="bg-factory-100 text-factory-700 px-3 py-1 rounded-full font-bold">{item.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {onRequest && (
                <div className="text-center mt-10">
                    <button onClick={onRequest} className="bg-factory-600 text-white px-8 py-3 rounded-full hover:bg-factory-700 transition">
                        Узнать подробнее
                    </button>
                </div>
            )}
        </div>
    );
};

export default RentPage;