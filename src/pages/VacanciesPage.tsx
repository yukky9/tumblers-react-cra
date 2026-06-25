import React, { useEffect, useState } from 'react';

import { api } from '../api/api';
import { Icon } from '../components/Icon';
import { ActionButton, PageHero, SectionHeader } from '../components/UI';

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

    const splitIntoItems = (text: string): string[] => {
        if (!text) return [];
        return text.split(/[;,\n]/).map(s => s.trim()).filter(s => s.length > 0);
    };

    if (loading) {
        return (
            <div className="page-shell text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-card">
                    <Icon name="settings" className="h-7 w-7 animate-spin text-factory-600" />
                </div>
                <p className="mt-4 font-semibold text-graphite-500">Загрузка вакансий...</p>
            </div>
        );
    }

    if (error) return <div className="page-shell text-center font-semibold text-red-600">{error}</div>;

    return (
        <div>
            <PageHero
                label="Вакансии"
                title="Работа на производственном предприятии"
                description="Список вакансий отображается из прежнего API, но карточки стали удобнее: обязанности, требования и зарплата разделены визуально."
            >
                {onRequest ? <ActionButton onClick={onRequest}>Откликнуться</ActionButton> : null}
            </PageHero>

            <section className="page-shell pt-0">
                <SectionHeader
                    kicker="Карьера"
                    title="Открытые вакансии"
                    description="Карточки сохраняют прежние данные и помогают быстро понять условия по каждой позиции."
                    align="center"
                />

                <div className="mt-12 space-y-5">
                    {vacancies.map(vacancy => {
                        const duties = splitIntoItems(vacancy.description);
                        const requirements = splitIntoItems(vacancy.requirements);

                        return (
                            <article key={vacancy.id} className="card-hover overflow-hidden p-6 sm:p-7">
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                    <div className="max-w-3xl">
                                        <span className="stat-pill">Вакансия</span>
                                        <h3 className="mt-4 font-display text-2xl font-black text-graphite-950 sm:text-3xl">{vacancy.title}</h3>

                                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                                            <div>
                                                <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-graphite-500">
                                                    <Icon name="briefcase" className="h-4 w-4 text-factory-600" />
                                                    Обязанности
                                                </h4>
                                                <ul className="mt-3 space-y-2 text-sm leading-6 text-graphite-600">
                                                    {duties.map((item, idx) => (
                                                        <li key={`${item}-${idx}`} className="flex gap-2">
                                                            <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-factory-600" />
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-graphite-500">
                                                    <Icon name="shield" className="h-4 w-4 text-factory-600" />
                                                    Требования
                                                </h4>
                                                <ul className="mt-3 space-y-2 text-sm leading-6 text-graphite-600">
                                                    {requirements.map((req, idx) => (
                                                        <li key={`${req}-${idx}`} className="flex gap-2">
                                                            <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-factory-600" />
                                                            <span>{req}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid min-w-[250px] gap-3">
                                        <div className="rounded-2xl border border-factory-100 bg-factory-50 p-5">
                                            <span className="text-xs font-black uppercase tracking-[0.18em] text-factory-700">Зарплата</span>
                                            <p className="mt-2 font-display text-2xl font-black text-graphite-950">{vacancy.salary || 'по договорённости'}</p>
                                        </div>
                                        {onRequest ? (
                                            <button type="button" onClick={onRequest} className="btn-light w-full py-2.5">
                                                Откликнуться
                                            </button>
                                        ) : null}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {onRequest ? (
                    <div className="mt-12 text-center">
                        <ActionButton onClick={onRequest}>Откликнуться на вакансию</ActionButton>
                    </div>
                ) : null}
            </section>
        </div>
    );
};

export default VacanciesPage;
