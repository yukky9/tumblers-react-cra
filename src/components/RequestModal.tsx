import React, { useState } from 'react';
import { Icon } from './Icon'; // Предполагается, что у вас есть компонент Icon
import { api } from '../api/api'; // Для отправки заявки

// ===== Модальное окно заявки =====
interface RequestModalProps {
  open: boolean;
  onClose: () => void;
}

export function RequestModal({ open, onClose }: RequestModalProps) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createRequest(form);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setForm({ name: '', phone: '', email: '', message: '' });
      }, 1500);
    } catch (err) {
      alert('Ошибка отправки. Попробуйте позже.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
          <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              aria-label="Закрыть"
          >
            <Icon name="close" className="h-6 w-6" />
          </button>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Оставить заявку</h2>

          {success ? (
              <div className="text-green-600 text-center py-6">✅ Заявка отправлена!</div>
          ) : (
              <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Ваше имя *"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-factory-500"
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Телефон *"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-factory-500"
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email (необязательно)"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-factory-500"
                    onChange={handleChange}
                />
                <textarea
                    name="message"
                    placeholder="Сообщение"
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-factory-500"
                    onChange={handleChange}
                />
                <div className="flex justify-end gap-3">
                  <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                  >
                    Отмена
                  </button>
                  <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2 bg-factory-600 text-white rounded-lg hover:bg-factory-700 transition disabled:opacity-50"
                  >
                    {submitting ? 'Отправка...' : 'Отправить'}
                  </button>
                </div>
              </form>
          )}
        </div>
      </div>
  );
}

// ===== Плавающая кнопка консультанта =====
interface FloatingConsultantProps {
  onRequest: () => void;
}

export function FloatingConsultant({ onRequest }: FloatingConsultantProps) {
  return (
      <button
          type="button"
          onClick={onRequest}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-factory-600 text-white shadow-lg transition hover:bg-factory-700 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-factory-500 focus:ring-offset-2"
          aria-label="Связаться с консультантом"
      >
      </button>
  );
}