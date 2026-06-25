import axios from 'axios';

const API_BASE = 'http://localhost:8000'; // или ваш реальный адрес бэкенда

export const api = {
    // Продукция
    getProducts: (category?: string) =>
        axios.get(`${API_BASE}/products`, { params: { category } }).then(res => res.data),

    // Услуги
    getServices: () =>
        axios.get(`${API_BASE}/services`).then(res => res.data),

    // Аренда
    getRentals: () =>
        axios.get(`${API_BASE}/rentals`).then(res => res.data),

    // Вакансии
    getVacancies: () =>
        axios.get(`${API_BASE}/vacancies`).then(res => res.data),

    // Документы (с фильтром по типу)
    getDocuments: (docType?: string) =>
        axios.get(`${API_BASE}/documents`, { params: { doc_type: docType } }).then(res => res.data),

    // Прайс-лист
    getPrices: () =>
        axios.get(`${API_BASE}/prices`).then(res => res.data),

    // Отправка заявки
    createRequest: (data: { name: string; phone: string; email?: string; message?: string }) =>
        axios.post(`${API_BASE}/requests`, data).then(res => res.data),
};