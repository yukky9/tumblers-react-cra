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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-graphite-950/70 p-4 backdrop-blur-sm">
        <div className="animate-fadeIn relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/80 bg-white p-6 shadow-soft">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-factory-500 via-emerald-400 to-sky-400" />

          <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-graphite-50 p-2 text-graphite-500 transition hover:bg-graphite-100 hover:text-graphite-900"
              aria-label="Закрыть"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>

          <div className="pr-10">
            <h2 className="font-display text-3xl font-black text-graphite-950">Оставить заявку</h2>
          </div>

          {success ? (
              <div className="mt-6 rounded-2xl border border-factory-200 bg-factory-50 px-4 py-8 text-center font-black text-factory-700">
                ✅ Заявка отправлена!
              </div>
          ) : (
              <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
                <input
                    type="text"
                    name="name"
                    placeholder="Ваше имя *"
                    className="input-soft"
                    onChange={handleChange}
                    required
                />

                <input
                    type="tel"
                    name="phone"
                    placeholder="Телефон *"
                    className="input-soft"
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email (необязательно)"
                    className="input-soft"
                    onChange={handleChange}
                />

                <textarea
                    name="message"
                    placeholder="Сообщение"
                    rows={3}
                    className="input-soft resize-none"
                    onChange={handleChange}
                />

                <div className="mt-2 flex justify-end gap-3">
                  <button
                      type="button"
                      onClick={onClose}
                      className="btn-light py-2"
                  >
                    Отмена
                  </button>

                  <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary py-2 disabled:cursor-not-allowed disabled:opacity-60"
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
          className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-factory-500 to-emerald-500 text-white shadow-glow transition duration-300 hover:-translate-y-1 hover:brightness-110 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-factory-300/40"
          aria-label="Связаться с консультантом"
      >
        <Icon name="mail" className="h-6 w-6" />
      </button>
  );
}
