import React from 'react';
import { rentalInfo } from '../config/rental';

interface RentPageProps {
    onRequest?: () => void;
}

const RentPage: React.FC<RentPageProps> = ({ onRequest }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Арендная деятельность</h1>
                {onRequest && (
                    <button
                        type="button"
                        onClick={onRequest}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Запросить аренду
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Основная информация */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                        <div className="prose max-w-none">
                            <p className="text-gray-700 text-lg leading-relaxed">{rentalInfo.description}</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Преимущества:</h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {rentalInfo.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2 text-gray-700">
                                        <span className="text-green-500">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Контактная информация */}
                <div className="lg:col-span-1">
                    <div className="bg-gradient-to-b from-green-50 to-white rounded-xl shadow-md p-6 border border-green-200 sticky top-20">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span>📞</span> Контакты для связи
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Телефон</p>
                                <a
                                    href={`tel:${rentalInfo.phone.replace(/[^+\d]/g, '')}`}
                                    className="text-lg font-semibold text-green-700 hover:text-green-900 hover:underline transition"
                                >
                                    {rentalInfo.phone}
                                </a>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Электронная почта</p>
                                <a
                                    href={`mailto:${rentalInfo.email}`}
                                    className="text-lg font-semibold text-green-700 hover:text-green-900 hover:underline transition"
                                >
                                    {rentalInfo.email}
                                </a>
                            </div>
                        </div>

                        {onRequest && (
                            <button
                                type="button"
                                onClick={onRequest}
                                className="mt-6 w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                            >
                                Оставить заявку
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RentPage;