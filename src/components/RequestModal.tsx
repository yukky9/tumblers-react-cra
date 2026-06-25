import { useEffect } from 'react';
import { contacts } from '../data';
import { Icon } from './Icon';

export function RequestModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const sales = contacts.find((item) => item.title === 'Отдел продаж');

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-graphite-950/70 px-4 py-8 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <div className="relative bg-graphite-950 p-6 text-white sm:p-8">
          <div className="absolute inset-0 bg-mesh opacity-80" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 p-2 text-white/80 transition hover:bg-white/20 hover:text-white"
            aria-label="Закрыть окно"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-factory-400/16 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-factory-100">
              <Icon name="spark" className="h-4 w-4" />
              Консультант
            </span>
            <h2 className="mt-5 font-display text-3xl font-black tracking-tight">Отправить запрос на продукцию или услугу</h2>
            <p className="mt-3 text-sm leading-7 text-white/66">
              Форма подготовлена для интеграции с CRM или почтовым шлюзом. Сейчас она оформляет данные на клиенте и показывает готовую структуру.
            </p>
          </div>
        </div>

        <form
          className="grid gap-5 p-6 sm:p-8"
          onSubmit={(event) => {
            event.preventDefault();
            onClose();
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-graphite-800">
              Имя
              <input className="rounded-2xl border border-graphite-200 px-4 py-3 text-sm outline-none transition focus:border-factory-400 focus:ring-4 focus:ring-factory-100" placeholder="Ваше имя" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-graphite-800">
              Телефон или e-mail
              <input className="rounded-2xl border border-graphite-200 px-4 py-3 text-sm outline-none transition focus:border-factory-400 focus:ring-4 focus:ring-factory-100" placeholder="+7 ... / email" />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-semibold text-graphite-800">
            Тема
            <select className="rounded-2xl border border-graphite-200 px-4 py-3 text-sm outline-none transition focus:border-factory-400 focus:ring-4 focus:ring-factory-100">
              <option>Каталог продукции</option>
              <option>Прайс лист</option>
              <option>Услуги производства</option>
              <option>Арендная деятельность</option>
              <option>Вакансия</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-graphite-800">
            Сообщение
            <textarea className="min-h-32 rounded-2xl border border-graphite-200 px-4 py-3 text-sm outline-none transition focus:border-factory-400 focus:ring-4 focus:ring-factory-100" placeholder="Опишите задачу, изделие, объем партии или вопрос" />
          </label>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm leading-6 text-graphite-500">
              Для связи напрямую: <a className="font-semibold text-factory-700" href={`mailto:${sales?.email[0] ?? 'sbit@tumblers.ru'}`}>{sales?.email[0] ?? 'sbit@tumblers.ru'}</a>
            </div>
            <button type="submit" className="btn-primary">
              Отправить запрос
              <Icon name="arrowRight" className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function FloatingConsultant({ onRequest }: { onRequest: () => void }) {
  return (
    <button
      type="button"
      onClick={onRequest}
      className="fixed bottom-5 right-5 z-40 hidden items-center gap-3 rounded-full border border-white/40 bg-graphite-950 px-5 py-3 text-sm font-bold text-white shadow-glow transition hover:-translate-y-1 hover:bg-graphite-900 sm:flex"
      aria-label="Открыть консультанта"
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-factory-500">
        <Icon name="mail" className="h-4 w-4" />
      </span>
      Консультант
    </button>
  );
}
