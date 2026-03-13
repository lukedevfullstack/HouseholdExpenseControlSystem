import React, { useState, useEffect } from 'react';
import api from '../services/api/api';

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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!personId) return;

    setLoading(true);
    api.get<Totals>(`/Person/${personId}/totals`)
      .then(res => setTotals(res.data))
      .catch(err => console.error("Erro ao carregar totais", err))
      .finally(() => setLoading(false));
  }, [personId, refresh]);

  const format = (val: number) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  if (!personId) return <div style={{ color: '#7f8c8d' }}>Selecione um morador para ver o saldo.</div>;

  return (
    <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', position: 'relative', minHeight: '100px' }}>
      {loading && (
        <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'rgba(255,255,255,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
          <span>⌛ Atualizando saldos...</span>
        </div>
      )}
      
      <div style={{ flex: 1, border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: '#e6fffa' }}>
        <small>Receitas</small>
        <h2 style={{ color: 'green', margin: 0 }}>{format(totals.totalRecipes)}</h2>
      </div>
      <div style={{ flex: 1, border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: '#fff5f5' }}>
        <small>Despesas</small>
        <h2 style={{ color: 'red', margin: 0 }}>{format(totals.totalExpenses)}</h2>
      </div>
      <div style={{ flex: 1, border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: totals.balance >= 0 ? '#ebf8ff' : '#fff5f5' }}>
        <small>Saldo Líquido</small>
        <h2 style={{ color: totals.balance >= 0 ? 'blue' : 'darkred', margin: 0 }}>{format(totals.balance)}</h2>
      </div>
    </div>
  );
};

export default SummaryCards;