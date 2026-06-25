import React, { useEffect, useState } from 'react';
import { api } from '../api/api';

interface VacanciesPageProps {
    onRequest?: () => void;
}

interface Vacancy {
    id: number;
    title: string;
    description: string;
    salary: string;
    requirements: string;
}

const VacanciesPage: React.FC<VacanciesPageProps> = ({ onRequest }) => {
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.getVacancies()
            .then(data => {
                setVacancies(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Не удалось загрузить вакансии');
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-10 text-gray-600">Загрузка вакансий...</div>;
    if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Вакансии</h1>
            <div className="space-y-6">
                {vacancies.map(vacancy => (
                    <div key={vacancy.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-factory-500 hover:shadow-lg transition">
                        <h3 className="text-2xl font-semibold text-gray-800">{vacancy.title}</h3>
                        <p className="text-gray-700 mt-2">{vacancy.description}</p>
                        <div className="mt-3 flex flex-wrap gap-4 text-sm">
                            <span className="font-semibold text-factory-700">Зарплата: {vacancy.salary}</span>
                            <span className="text-gray-600">Требования: {vacancy.requirements}</span>
                        </div>
                    </div>
                ))}
            </div>
            {onRequest && (
                <div className="text-center mt-10">
                    <button onClick={onRequest} className="bg-factory-600 text-white px-8 py-3 rounded-full hover:bg-factory-700 transition">
                        Откликнуться на вакансию
                    </button>
                </div>
            )}
        </div>
    );
};

export default VacanciesPage;