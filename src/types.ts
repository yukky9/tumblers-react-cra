export type RouteId =
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
  | 'procurement';

export type NavItem = {
  label: string;
  route: RouteId;
};

export type ProductGroup = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  codes: string[];
  category: 'civil' | 'home' | 'auto' | 'services';
  accent: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  badge: string;
};

export type DocumentItem = {
  year: string;
  title: string;
  type: 'Годовой отчет' | 'Финансовый отчет' | 'СОУТ';
};

export type DepartmentContact = {
  title: string;
  phone: string[];
  email: string[];
};

export type Vacancy = {
  title: string;
  tags: string[];
  requirements: string[];
  duties: string[];
};

export type PriceRow = {
  name: string;
  bulk: string;
  retail: string;
  group: string;
};
