import React, { useEffect, useState } from 'react';

import { api } from '../api/api';
import { Icon } from '../components/Icon';
import { LinkButton, PageHero, SectionHeader } from '../components/UI';

interface InfoItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    link: string;
    external?: boolean;
}

const infoItems: InfoItem[] = [
    {
        title: 'Годовые отчеты',
        description:
            'Подробные годовые отчеты, отражающие результаты деятельности завода, ключевые показатели и планы на будущее. Прозрачность и открытость информации помогают акционерам принимать взвешенные решения.',
        icon: <Icon name="file" className="h-7 w-7" />,
        link: '#/years',
    },
    {
        title: 'Финансовые отчеты',
        description:
            'Актуальные финансовые отчеты, включающие баланс, отчет о прибылях и убытках, а также анализ финансового состояния предприятия. Полная и достоверная информация для оценки инвестиционной привлекательности.',
        icon: <Icon name="briefcase" className="h-7 w-7" />,
        link: '#/finance',
    },
    {
        title: 'Раскрытие информации',
        description:
            'Раздел с обязательной информацией, раскрываемой в соответствии с законодательством и внутренними стандартами. Обеспечивает прозрачность деятельности и доверие со стороны акционеров и партнеров.',
        icon: <Icon name="external" className="h-7 w-7" />,
        link: 'http://www.e-disclosure.ru/portal/company.aspx?id=21093',
        external: true,
    },
    {
        title: 'Специальная оценка труда',
        description:
            'Информация о проведении специальной оценки условий труда на предприятии, направленная на улучшение безопасности и здоровья сотрудников, а также на соответствие нормативным требованиям.',
        icon: <Icon name="shield" className="h-7 w-7" />,
        link: '#/sout',
    },
];

export const InfoPage: React.FC = () => {
    return (
        <div>
            <PageHero
                label="Акционерам"
                title="Информация для акционеров"
                description="Акционерная информация: прозрачность и надежность. Карточки документов стали более современными, но ведут на прежние разделы."
            />

            <section className="page-shell pt-0">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {infoItems.map((item, index) => (
                        <article key={item.title} className="industrial-card p-6 sm:p-7">
                            <div className="relative">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-graphite-950 text-factory-200 shadow-card">
                                        {item.icon}
                                    </div>
                                    <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-black text-graphite-400 shadow-inner-soft">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                                </div>
                                <h3 className="mt-6 font-display text-2xl font-black text-graphite-950">{item.title}</h3>
                                <p className="mt-4 text-sm leading-7 text-graphite-600">{item.description}</p>
                                <div className="mt-6">
                                    <LinkButton href={item.link} external={item.external} variant="light">Перейти</LinkButton>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};

interface DocumentPageProps {
    type: string;
}

interface Document {
    id: number;
    title: string;
    doc_type: string;
    file_url: string;
    date: string;
}

export const DocumentPage: React.FC<DocumentPageProps> = ({ type }) => {
    const [docs, setDocs] = useState<Document[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.getDocuments(type)
            .then((data: Document[]) => {
                setDocs(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Не удалось загрузить документы');
                setLoading(false);
            });
    }, [type]);

    if (loading) {
        return (
            <div className="page-shell text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-card">
                    <Icon name="settings" className="h-7 w-7 animate-spin text-factory-600" />
                </div>
                <p className="mt-4 font-semibold text-graphite-500">Загрузка документов...</p>
            </div>
        );
    }

    if (error) return <div className="page-shell text-center font-semibold text-red-600">{error}</div>;

    return (
        <div>
            <PageHero
                label="Документы"
                title={type}
                description="Раздел документов использует прежний API-запрос и прежнюю проверку ссылок, но вывод стал чище и удобнее для просмотра."
            />

            <section className="page-shell pt-0">
                <div className="mx-auto max-w-4xl panel-card p-5 sm:p-6">
                    {docs.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-graphite-200 bg-white/70 p-10 text-center text-graphite-500">
                            Документов в этой категории пока нет.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {docs.map((doc) => {
                                const isPlaceholder = !doc.file_url || doc.file_url === '#';

                                return (
                                    <div key={doc.id} className="flex flex-col gap-3 rounded-2xl border border-graphite-100 bg-white/80 p-4 transition hover:border-factory-200 hover:bg-factory-50/50 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-start gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-graphite-950 text-factory-200">
                        <Icon name="file" className="h-5 w-5" />
                      </span>
                                            {isPlaceholder ? (
                                                <span className="font-bold leading-6 text-graphite-500">{doc.title}</span>
                                            ) : (
                                                <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="font-bold leading-6 text-graphite-900 transition hover:text-factory-700">
                                                    {doc.title}
                                                </a>
                                            )}
                                        </div>
                                        <span className="rounded-full bg-graphite-100 px-3 py-1 text-xs font-black text-graphite-500">{doc.date}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export const PartnersPage: React.FC = () => {
    return (
        <div>
            <PageHero
                label="Партнеры"
                title="Наши партнеры"
                description="Статический раздел партнеров получил аккуратные карточки и визуальную иерархию."
            />

            <section className="page-shell pt-0">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <article key={i} className="card-hover p-6 text-center">
                            <div className="mx-auto grid h-20 w-20 place-items-center rounded-[1.4rem] bg-gradient-to-br from-graphite-950 to-factory-800 font-display text-2xl font-black text-white shadow-glow">
                                П{i}
                            </div>
                            <p className="mt-5 font-display text-xl font-black text-graphite-950">Партнёр {i}</p>
                            <p className="mt-2 text-sm text-graphite-500">ООО «Компания {i}»</p>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};

const detailRows: Array<[string, React.ReactNode]> = [
    ['Полное наименование организации', 'Открытое акционерное общество «Смоленский завод радиодеталей»'],
    ['Сокращенное наименование организации', 'ОАО «Смоленский завод радиодеталей»'],
    ['Юридический адрес', '214031, г. Смоленск, ул. Бабушкина, д. 7'],
    ['Почтовый адрес', '214031, г. Смоленск, ул. Бабушкина, д. 7'],
    ['Дата государственной регистрации', '07 октября 2002 года'],
    ['ОГРН', '1026701430238'],
    ['ИНН', '6731017748'],
    ['Зарегистрировавший орган', 'Инспекция МНС Россия по Промышленному району г. Смоленска'],
    ['Руководитель', 'Лужецкий Георгий Эдуардович'],
    ['Контактные телефоны', '+7 (4812) 31-09-57, +7 (4812) 29-91-25'],
    [
        'Адрес страницы в сети Интернет',
        <a
            href="http://www.e-disclosure.ru/portal/company.aspx?id=21093"
            target="_blank"
            rel="noopener noreferrer"
            className="break-all font-bold text-factory-700 transition hover:text-factory-900 hover:underline"
        >
            http://www.e-disclosure.ru/portal/company.aspx?id=21093
        </a>,
    ],
];

const bankRows: Array<[string, string]> = [
    ['Расчётный счёт', '40702810143000000848'],
    ['Банк', 'Смоленский РФ АО «Россельхозбанк» г. Смоленск'],
    ['Корреспондентский счёт', '30101810500000000776'],
    ['БИК', '046614776'],
];

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 gap-2 border-b border-graphite-100 py-4 text-sm md:grid-cols-[260px_1fr]">
            <span className="font-black text-graphite-500">{label}</span>
            <span className="font-semibold leading-6 text-graphite-900">{value}</span>
        </div>
    );
}

export const DetailsPage: React.FC = () => {
    return (
        <div>
            <PageHero
                label="Реквизиты"
                title="Реквизиты и справочная информация"
                description="Юридическая и банковская информация сохранена, изменена только визуальная структура таблиц."
            />

            <section className="page-shell pt-0">
                <div className="mx-auto max-w-5xl panel-card p-6 sm:p-8">
                    <SectionHeader kicker="Организация" title="Основные сведения" description="Данные представлены в виде современной адаптивной таблицы." />

                    <div className="mt-6">
                        {detailRows.map(([label, value]) => (
                            <DetailRow key={label} label={label} value={value} />
                        ))}
                    </div>

                    <div className="mt-10 rounded-[1.5rem] bg-graphite-950 p-6 text-white sm:p-8">
                        <h2 className="font-display text-2xl font-black">Банковские реквизиты</h2>
                        <div className="mt-5 divide-y divide-white/10">
                            {bankRows.map(([label, value]) => (
                                <div key={label} className="grid grid-cols-1 gap-2 py-4 text-sm md:grid-cols-[260px_1fr]">
                                    <span className="font-black text-white/50">{label}</span>
                                    <span className="font-semibold leading-6 text-white/90">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export const ProcurementPage: React.FC = () => {
    return (
        <div>
            <PageHero
                label="Закупки"
                title="Портал закупок"
                description="Информация о текущих закупках и тендерах ОАО «Смоленский завод радиодеталей» доступна на официальном портале."
            >
                <LinkButton href="https://zakupki.gov.ru/epz/main/public/home.html" external variant="secondary">Перейти на портал закупок</LinkButton>
            </PageHero>

            <section className="page-shell pt-0">
                <div className="mx-auto max-w-3xl panel-card p-6 text-center sm:p-8">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-graphite-950 text-factory-200 shadow-card">
                        <Icon name="briefcase" className="h-7 w-7" />
                    </div>
                    <h2 className="mt-6 font-display text-3xl font-black text-graphite-950">Участие в закупках</h2>
                    <p className="mt-4 text-sm leading-7 text-graphite-600">
                        Для участия в закупках необходимо зарегистрироваться на портале поставщиков.
                    </p>
                </div>
            </section>
        </div>
    );
};
