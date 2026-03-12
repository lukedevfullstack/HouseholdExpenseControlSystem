export interface Person {
  id?: string;
  name: string;
  age: number;
}

export interface Category {
  id?: string;
  description: string;
  purpose: 'Receita' | 'Despesa' | 'Ambas';
}

export interface Transaction {
  id?: string;
  description: string;
  value: number;
  type: 'Receita' | 'Despesa';
  personId: string;
  categoryId: string;
}

export interface PersonTotal {
  name: string;
  totalRevenue: number;
  totalExpense: number;
  balance: number;
}

export interface GeneralReport {
  items: PersonTotal[];
  globalRevenue: number;
  globalExpense: number;
  netBalance: number;
}