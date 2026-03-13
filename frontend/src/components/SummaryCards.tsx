import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface Totals {
  totalRecipes: number;
  totalExpenses: number;
  balance: number;
}

interface Props {
  personId: string;
  refresh: number;
}

const SummaryCards: React.FC<Props> = ({ personId, refresh }) => {
  const [totals, setTotals] = useState<Totals>({ totalRecipes: 0, totalExpenses: 0, balance: 0 });

  useEffect(() => {
    if (personId) {
      api.get<Totals>(`/Person/${personId}/totals`).then(res => setTotals(res.data));
    }
  }, [personId, refresh]);

  const format = (val: number) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
      <div style={{ flex: 1, border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
        <small>Receitas</small>
        <h2 style={{ color: 'green' }}>{format(totals.totalRecipes)}</h2>
      </div>
      <div style={{ flex: 1, border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
        <small>Despesas</small>
        <h2 style={{ color: 'red' }}>{format(totals.totalExpenses)}</h2>
      </div>
      <div style={{ flex: 1, border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: '#f0f9ff' }}>
        <small>Saldo Líquido</small>
        <h2 style={{ color: totals.balance >= 0 ? 'blue' : 'darkred' }}>{format(totals.balance)}</h2>
      </div>
    </div>
  );
};

export default SummaryCards;