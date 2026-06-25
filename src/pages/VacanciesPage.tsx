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

    if (loading) return <div className="page-shell text-center font-semibold text-graphite-500">Загрузка вакансий...</div>;
    if (error) return <div className="page-shell text-center font-semibold text-red-600">{error}</div>;

    // Функция для разбивки требований и обязанностей по строкам (если есть разделители)
    const splitIntoItems = (text: string): string[] => {
        if (!text) return [];
        // Разбиваем по точкам с запятой, запятым или переносам строк
        return text.split(/[;,\n]/).map(s => s.trim()).filter(s => s.length > 0);
    };

    return (
        <div className="page-shell">
            <div className="mb-10">
                <h1 className="page-title">Вакансии</h1>
            </div>

            <div className="space-y-5">
                {vacancies.map(vacancy => (
                    <div key={vacancy.id} className="card-hover overflow-hidden p-6">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-3xl">
                                <h3 className="font-display text-2xl font-black text-graphite-950">{vacancy.title}</h3>
                                <div className="mt-3">
                                    <h4 className="text-sm font-bold uppercase tracking-[0.1em] text-factory-700">Обязанности</h4>
                                    <ul className="list-disc list-inside text-sm leading-7 text-graphite-600">
                                        {splitIntoItems(vacancy.description).map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="grid min-w-[260px] gap-3 sm:grid-cols-2 lg:grid-cols-1">
                                <div className="rounded-2xl border border-factory-100 bg-factory-50 p-4">
                                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-factory-700">Зарплата</span>
                                    <p className="mt-1 font-black text-graphite-950">{vacancy.salary || 'по договорённости'}</p>
                                </div>
                                <div className="rounded-2xl border border-graphite-100 bg-graphite-50 p-4">
                                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-graphite-400">Требования</span>
                                    <ul className="mt-1 text-sm font-semibold leading-6 text-graphite-700 list-disc list-inside">
                                        {splitIntoItems(vacancy.requirements).map((req, idx) => (
                                            <li key={idx}>{req}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {onRequest && (
                <div className="mt-10 text-center">
                    <button type="button" onClick={onRequest} className="btn-primary px-8">
                        Откликнуться на вакансию
                    </button>
                </div>
            )}
        </div>
    );
};

export default VacanciesPage;