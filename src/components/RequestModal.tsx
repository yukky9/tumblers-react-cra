import React, { useState } from 'react';

import { api } from '../api/api';
import { Icon } from './Icon';

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
        <div className="animate-fadeIn relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/80 bg-white p-6 shadow-deep sm:p-7">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-factory-500 via-signal-400 to-factory-300" />
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-factory-100 blur-3xl" />

          <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-graphite-50 p-2 text-graphite-500 transition hover:bg-graphite-100 hover:text-graphite-900"
              aria-label="Закрыть"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>

          <div className="relative pr-10">
            <span className="kicker">Заявка</span>
            <h2 className="mt-4 font-display text-3xl font-black tracking-tight text-graphite-950 sm:text-4xl">Оставить заявку</h2>
            <p className="mt-3 text-sm leading-6 text-graphite-500">Напишите контакты — менеджер свяжется с вами и уточнит детали заказа.</p>
          </div>

          {success ? (
              <div className="relative mt-6 rounded-2xl border border-factory-200 bg-factory-50 px-4 py-9 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-factory-500 text-white shadow-glow">
                  <Icon name="check" className="h-7 w-7" />
                </div>
                <p className="mt-4 font-display text-2xl font-black text-factory-800">Заявка отправлена!</p>
              </div>
          ) : (
              <form onSubmit={handleSubmit} className="relative mt-6 grid gap-3">
                <input
                    type="text"
                    name="name"
                    placeholder="Ваше имя *"
                    className="input-soft"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="tel"
                    name="phone"
                    placeholder="Телефон *"
                    className="input-soft"
                    value={form.phone}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email для получения заявки *"
                    className="input-soft"
                    value={form.email}
                    onChange={handleChange}
                    required  // можно сделать обязательным
                />

                <textarea
                    name="message"
                    placeholder="Сообщение"
                    rows={4}
                    className="input-soft resize-none"
                    value={form.message}
                    onChange={handleChange}
                />

                <div className="mt-3 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button type="button" onClick={onClose} className="btn-light py-2.5">
                    Отмена
                  </button>

                  <button type="submit" disabled={submitting} className="btn-primary py-2.5">
                <span className="relative z-10 inline-flex items-center gap-2">
                  {submitting ? 'Отправка...' : 'Отправить'}
                  <Icon name="arrowRight" className="h-4 w-4" />
                </span>
                  </button>
                </div>
              </form>
          )}
        </div>
      </div>
  );
}

interface FloatingConsultantProps {
  onRequest: () => void;
}

export function FloatingConsultant({ onRequest }: FloatingConsultantProps) {
  return (
      <button
          type="button"
          onClick={onRequest}
          className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-factory-500 to-signal-500 text-white shadow-glow transition duration-300 hover:-translate-y-1 hover:brightness-110 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-factory-300/40"
          aria-label="Связаться с консультантом"
      >
        <span className="absolute inset-0 rounded-full animate-pulse-ring" />
        <Icon name="mail" className="relative h-6 w-6" />
      </button>
  );
}
