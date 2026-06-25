import { useCallback, useEffect, useMemo, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { FloatingConsultant, RequestModal } from './components/RequestModal';
import CatalogPage from './pages/CatalogPage';
import { ContactsPage } from './pages/ContactsPage';
import {
  InfoPage,
  DocumentPage,
  PartnersPage,
  DetailsPage,
  ProcurementPage
} from './pages/InfoPages'; // ✅ Именованные импорты
import HomePage from './pages/HomePage';
import PricePage from './pages/PricePage';
import RentPage from './pages/RentPage';
import ServicesPage from './pages/ServicesPage';
import VacanciesPage from './pages/VacanciesPage';

type RouteId =
    | 'home'
    | 'catalog'
    | 'services'
    | 'rent'
    | 'info'
    | 'price'
    | 'contacts'
    | 'vacancies'
    | 'years'
    | 'finance'
    | 'sout'
    | 'partners'
    | 'details'
    | 'procurement'
    | 'confidentiality';

const routes: RouteId[] = [
  'home',
  'catalog',
  'services',
  'rent',
  'info',
  'price',
  'contacts',
  'vacancies',
  'years',
  'finance',
  'sout',
  'partners',
  'details',
  'procurement',
  'confidentiality',
];

function getRouteFromHash(): RouteId {
  const raw = window.location.hash.replace(/^#\/?/, '') || 'home';
  return routes.includes(raw as RouteId) ? (raw as RouteId) : 'home';
}

export default function App() {
  const [route, setRoute] = useState<RouteId>(getRouteFromHash);
  const [requestOpen, setRequestOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route]);

  const openRequest = useCallback(() => setRequestOpen(true), []);
  const closeRequest = useCallback(() => setRequestOpen(false), []);

  const page = useMemo(() => {
    switch (route) {
      case 'catalog':
        return <CatalogPage />;
      case 'services':
        return <ServicesPage onRequest={openRequest} />;
      case 'rent':
        return <RentPage onRequest={openRequest} />;
      case 'info':
        return <InfoPage />;
      case 'price':
        return <PricePage onRequest={openRequest} />;
      case 'contacts':
        return <ContactsPage />;
      case 'vacancies':
        return <VacanciesPage onRequest={openRequest} />;
      case 'years':
        return <DocumentPage type="Годовой отчет" />;
      case 'finance':
        return <DocumentPage type="Финансовый отчет" />;
      case 'sout':
        return <DocumentPage type="СОУТ" />;
      case 'partners':
        return <PartnersPage />;
      case 'details':
        return <DetailsPage />;
      case 'procurement':
        return <ProcurementPage />;
      case 'confidentiality':
        return <DocumentPage type="Соглашение о конфиденциальности" />;
      case 'home':
      default:
        return <HomePage onRequest={openRequest} />;
    }
  }, [openRequest, route]);

  return (
      <div className="min-h-screen bg-graphite-50 text-graphite-950">
        <Header currentRoute={route} onRequest={openRequest} />
        <main>{page}</main>
        <Footer onRequest={openRequest} />
        <FloatingConsultant onRequest={openRequest} />
        <RequestModal open={requestOpen} onClose={closeRequest} />
      </div>
  );
}