import React, { useEffect, useState } from 'react';
import { api } from '../api/api';

// ===== Общая страница "Информация для акционеров" =====
export const InfoPage: React.FC = () => {
    const items = [
        {
            title: 'Годовые отчеты',
            description:
                'Подробные годовые отчеты, отражающие результаты деятельности завода, ключевые показатели и планы на будущее. Прозрачность и открытость информации помогают акционерам принимать взвешенные решения.',
            icon: '📄',
            link: '#/years',
        },
        {
            title: 'Финансовые отчеты',
            description:
                'Актуальные финансовые отчеты, включающие баланс, отчет о прибылях и убытках, а также анализ финансового состояния предприятия. Полная и достоверная информация для оценки инвестиционной привлекательности.',
            icon: '📊',
            link: '#/finance',
        },
        {
            title: 'Раскрытие информации',
            description:
                'Раздел с обязательной информацией, раскрываемой в соответствии с законодательством и внутренними стандартами. Обеспечивает прозрачность деятельности и доверие со стороны акционеров и партнеров.',
            icon: '🔓',
            link: 'http://www.e-disclosure.ru/portal/company.aspx?id=21093',
            external: true,
        },
        {
            title: 'Специальная оценка труда',
            description:
                'Информация о проведении специальной оценки условий труда на предприятии, направленная на улучшение безопасности и здоровья сотрудников, а также на соответствие нормативным требованиям.',
            icon: '🛡️',
            link: '#/sout',
        },
    ];

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Информация для акционеров</h1>
            <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
                Акционерная информация: прозрачность и надежность.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
                    >
                        <div className="flex items-start gap-4">
                            <div className="text-4xl">{item.icon}</div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                                <div className="mt-4">
                                    {item.external ? (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block text-green-600 hover:text-green-800 font-medium hover:underline transition"
                                        >
                                            Перейти →
                                        </a>
                                    ) : (
                                        <a
                                            href={item.link}
                                            className="inline-block text-green-600 hover:text-green-800 font-medium hover:underline transition"
                                        >
                                            Перейти →
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ===== Динамическая страница документов =====
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
            <div className="container mx-auto px-4 py-16 text-center text-gray-600">
                Загрузка документов...
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-16 text-center text-red-600">
                {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8 text-center">{type}</h1>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
                {docs.length === 0 ? (
                    <p className="text-gray-600 text-center">Документов в этой категории пока нет.</p>
                ) : (
                    <div className="space-y-2">
                        {docs.map((doc) => {
                            const isPlaceholder = !doc.file_url || doc.file_url === '#';
                            return (
                                <div
                                    key={doc.id}
                                    className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50 transition"
                                >
                                    <span className="text-green-600 text-xl">📄</span>
                                    {isPlaceholder ? (
                                        <span className="text-gray-500 flex-1">{doc.title}</span>
                                    ) : (
                                        <a
                                            href={doc.file_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline flex-1"
                                        >
                                            {doc.title}
                                        </a>
                                    )}
                                    <span className="text-sm text-gray-400">{doc.date}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

// ===== Страница "Наши партнеры" =====
export const PartnersPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8 text-center">Наши партнеры</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition">
                        <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-400">
                            П{i}
                        </div>
                        <p className="mt-3 font-semibold">Партнёр {i}</p>
                        <p className="text-sm text-gray-500">ООО «Компания {i}»</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ===== Страница "Справочная информация" и "Реквизиты" =====
export const DetailsPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8 text-center">Реквизиты и справочная информация</h1>
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-2 text-sm border-b border-gray-100 py-2">
                        <span className="font-semibold text-gray-600">Полное наименование организации</span>
                        <span>Открытое акционерное общество «Смоленский завод радиодеталей»</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-2 text-sm border-b border-gray-100 py-2">
                        <span className="font-semibold text-gray-600">Сокращенное наименование организации</span>
                        <span>ОАО «Смоленский завод радиодеталей»</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-2 text-sm border-b border-gray-100 py-2">
                        <span className="font-semibold text-gray-600">Юридический адрес</span>
                        <span>214031, г. Смоленск, ул. Бабушкина, д. 7</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-2 text-sm border-b border-gray-100 py-2">
                        <span className="font-semibold text-gray-600">Почтовый адрес</span>
                        <span>214031, г. Смоленск, ул. Бабушкина, д. 7</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-2 text-sm border-b border-gray-100 py-2">
                        <span className="font-semibold text-gray-600">Дата государственной регистрации</span>
                        <span>07 октября 2002 года</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-2 text-sm border-b border-gray-100 py-2">
                        <span className="font-semibold text-gray-600">ОГРН</span>
                        <span>1026701430238</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-2 text-sm border-b border-gray-100 py-2">
                        <span className="font-semibold text-gray-600">ИНН</span>
                        <span>6731017748</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-2 text-sm border-b border-gray-100 py-2">
                        <span className="font-semibold text-gray-600">Зарегистрировавший орган</span>
                        <span>Инспекция МНС Россия по Промышленному району г. Смоленска</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-2 text-sm border-b border-gray-100 py-2">
                        <span className="font-semibold text-gray-600">Руководитель</span>
                        <span>Лужецкий Георгий Эдуардович</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-2 text-sm border-b border-gray-100 py-2">
                        <span className="font-semibold text-gray-600">Контактные телефоны</span>
                        <span>+7 (4812) 31-09-57, +7 (4812) 29-91-25</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-2 text-sm border-b border-gray-100 py-2">
                        <span className="font-semibold text-gray-600">Адрес страницы в сети Интернет</span>
                        <span>
              <a
                  href="http://www.e-disclosure.ru/portal/company.aspx?id=21093"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
              >
                http://www.e-disclosure.ru/portal/company.aspx?id=21093
              </a>
            </span>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">Банковские реквизиты</h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-2 text-sm border-b border-gray-100 py-2">
                        <span className="font-semibold text-gray-600">Расчётный счёт</span>
                        <span>40702810143000000848</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-2 text-sm border-b border-gray-100 py-2">
                        <span className="font-semibold text-gray-600">Банк</span>
                        <span>Смоленский РФ АО «Россельхозбанк» г. Смоленск</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-2 text-sm border-b border-gray-100 py-2">
                        <span className="font-semibold text-gray-600">Корреспондентский счёт</span>
                        <span>30101810500000000776</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-2 text-sm py-2">
                        <span className="font-semibold text-gray-600">БИК</span>
                        <span>046614776</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ===== Страница "Портал закупок" =====
export const ProcurementPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8 text-center">Портал закупок</h1>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
                <p className="text-gray-700 mb-4">
                    Информация о текущих закупках и тендерах ОАО «Смоленский завод радиодеталей» доступна на официальном портале.
                </p>
                <div className="text-center">
                    <a
                        href="https://zakupki.gov.ru/epz/main/public/home.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                    >
                        Перейти на портал закупок
                    </a>
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded text-sm text-gray-500">
                    Для участия в закупках необходимо зарегистрироваться на портале поставщиков.
                </div>
            </div>
        </div>
    );
};