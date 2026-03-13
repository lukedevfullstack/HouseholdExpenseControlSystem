import React, { useState, useEffect } from 'react';
import api from '../services/api/api';

interface CategoryTotal {
  categoryName: string;
  totalRecipes: number;
  totalExpenses: number;
  balance: number;
}

interface GeneralTotal {
  categories: CategoryTotal[];
  grandTotalRecipes: number;
  grandTotalExpenses: number;
  grandTotalBalance: number;
}

const CategoryTotalsPage: React.FC = () => {
  const [data, setData] = useState<GeneralTotal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<GeneralTotal>('Category/totals')
      .then(res => setData(res.data))
      .catch(err => console.error("Erro ao buscar totais por categoria", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Calculando totais por categoria...</p>;
  if (!data) return <p>Nenhum dado encontrado.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>📊 Resumo por Categoria</h2>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', backgroundColor: 'white' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Categoria</th>
            <th style={{ padding: '12px', textAlign: 'right' }}>Receitas</th>
            <th style={{ padding: '12px', textAlign: 'right' }}>Despesas</th>
            <th style={{ padding: '12px', textAlign: 'right' }}>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {data.categories.map((cat, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px' }}>{cat.categoryName}</td>
              <td style={{ padding: '12px', textAlign: 'right', color: 'green' }}>
                {cat.totalRecipes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </td>
              <td style={{ padding: '12px', textAlign: 'right', color: 'red' }}>
                {cat.totalExpenses.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </td>
              <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>
                {cat.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ backgroundColor: '#e9ecef', fontWeight: 'bold', fontSize: '1.1rem' }}>
            <td style={{ padding: '12px' }}>TOTAL GERAL</td>
            <td style={{ padding: '12px', textAlign: 'right', color: 'green' }}>
              {data.grandTotalRecipes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </td>
            <td style={{ padding: '12px', textAlign: 'right', color: 'red' }}>
              {data.grandTotalExpenses.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </td>
            <td style={{ padding: '12px', textAlign: 'right', color: '#007bff' }}>
              {data.grandTotalBalance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CategoryTotalsPage;