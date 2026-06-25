import React from 'react';

// ===== Общая страница "Информация для акционеров" =====
export const InfoPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8 text-center">Информация для акционеров</h1>
            <div className="max-w-3xl mx-auto text-gray-700 space-y-6">
                <p>
                    ОАО «Смоленский завод радиодеталей» является открытым акционерным обществом.
                    Мы стремимся к максимальной прозрачности и открытости перед нашими акционерами.
                </p>
                <p>
                    В этом разделе вы найдёте все необходимые документы и отчёты, а также информацию
                    о корпоративном управлении и финансовых показателях.
                </p>
                <p className="text-sm text-gray-500">
                    Для получения более детальной информации обращайтесь в отдел по работе с акционерами.
                </p>
            </div>
        </div>
    );
};

// ===== Страница документов (принимает тип) =====
interface DocumentPageProps {
    type: string;
}

export const DocumentPage: React.FC<DocumentPageProps> = ({ type }) => {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8 text-center">{type}</h1>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
                <p className="text-gray-600">Здесь будет список документов для категории <strong>«{type}»</strong>.</p>
                <p className="text-sm text-gray-400 mt-4">
                    Данные загружаются из API. В реальном проекте здесь будут ссылки на PDF-файлы.
                </p>
                <div className="mt-6 space-y-2">
                    <div className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50 transition">
                        <span className="text-green-600">📄</span>
                        <a href="#" className="text-blue-600 hover:underline">Пример документа 1.pdf</a>
                        <span className="ml-auto text-sm text-gray-400">12.05.2025</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50 transition">
                        <span className="text-green-600">📄</span>
                        <a href="#" className="text-blue-600 hover:underline">Пример документа 2.pdf</a>
                        <span className="ml-auto text-sm text-gray-400">01.03.2025</span>
                    </div>
                </div>
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

// ===== Страница "Справочная информация" / "Реквизиты" =====
export const DetailsPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8 text-center">Реквизиты и справочная информация</h1>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="font-semibold text-gray-600">Полное наименование:</span>
                    <span>Открытое акционерное общество «Смоленский завод радиодеталей»</span>
                    <span className="font-semibold text-gray-600">ИНН:</span>
                    <span>1234567890</span>
                    <span className="font-semibold text-gray-600">КПП:</span>
                    <span>987654321</span>
                    <span className="font-semibold text-gray-600">ОГРН:</span>
                    <span>1234567890123</span>
                    <span className="font-semibold text-gray-600">Юридический адрес:</span>
                    <span>г. Смоленск, ул. Бабушкина, д. 7</span>
                    <span className="font-semibold text-gray-600">Банковские реквизиты:</span>
                    <span>р/с 40702810123456789012 в ПАО Сбербанк</span>
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
                    Информация о текущих закупках и тендерах ОАО «Смоленский завод радиодеталей».
                </p>
                <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4 py-2">
                        <h3 className="font-semibold">Закупка №1234</h3>
                        <p className="text-sm text-gray-600">Комплектующие для производства тумблеров</p>
                        <p className="text-xs text-gray-400">Окончание подачи заявок: 15.07.2026</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                        <h3 className="font-semibold">Закупка №1235</h3>
                        <p className="text-sm text-gray-600">Оборудование для лаборатории</p>
                        <p className="text-xs text-gray-400">Окончание подачи заявок: 01.08.2026</p>
                    </div>
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded text-sm text-gray-500">
                    Для участия в закупках необходимо зарегистрироваться на портале поставщиков.
                </div>
            </div>
        </div>
    );
};