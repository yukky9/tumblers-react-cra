import React from 'react';
import { services } from '../config/services';

interface ServicesPageProps {
    onRequest?: () => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onRequest }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Услуги производства</h1>
                {onRequest && (
                    <button
                        type="button"
                        onClick={onRequest}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Заказать услугу
                    </button>
                )}
            </div>

            {/* Блок с описанием */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-8 border border-gray-200">
                <p className="text-gray-700 text-lg">
                    <span className="font-semibold">Гарантированное качество продукции, услуг, сервиса для Вас.</span>
                    {' '}Мы предлагаем широкий спектр производственных услуг с современным оборудованием и многолетним опытом.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => (
                    <div
                        key={service.id}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100 hover:border-green-200"
                    >
                        <div className="text-5xl mb-4">{service.icon}</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesPage;