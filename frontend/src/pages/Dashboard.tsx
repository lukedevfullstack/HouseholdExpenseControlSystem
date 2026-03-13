import React, { useEffect, useState } from 'react';
import api from '../services/api/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Interface de dados
interface CategoryTotal {
  categoryName: string;
  totalExpenses: number;
}

interface GeneralTotal {
  categories: CategoryTotal[];
  grandTotalRecipes: number;
  grandTotalExpenses: number;
  grandTotalBalance: number;
}

// Cores para as fatias do gráfico
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Dashboard: React.FC = () => {
  const [data, setData] = useState<GeneralTotal | null>(null);

  useEffect(() => {
    api.get<GeneralTotal>('/Category/totals')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <p>Carregando dados...</p>;

  // Preparar dados para o gráfico (apenas categorias com gastos > 0)
  const chartData = data.categories
    .filter(cat => cat.totalExpenses > 0)
    .map(cat => ({
      name: cat.categoryName,
      value: cat.totalExpenses
    }));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Resumo Geral</h1>

      {/* Cartões de Cima (KPIs) */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={cardStyle}>
          <small>RECEITAS</small>
          <h2 style={{ color: '#2ecc71' }}>R$ {data.grandTotalRecipes.toFixed(2)}</h2>
        </div>
        <div style={cardStyle}>
          <small>DESPESAS</small>
          <h2 style={{ color: '#e74c3c' }}>R$ {data.grandTotalExpenses.toFixed(2)}</h2>
        </div>
        <div style={cardStyle}>
          <small>SALDO LÍQUIDO</small>
          <h2 style={{ color: '#3498db' }}>R$ {data.grandTotalBalance.toFixed(2)}</h2>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        
        {/* GRÁFICO DE PIZZA */}
        <div style={{ ...cardStyle, flex: 1, height: '400px' }}>
          <h3>Distribuição de Gastos</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* TABELA LATERAL RÁPIDA */}
        <div style={{ ...cardStyle, flex: 1 }}>
          <h3>Gastos por Categoria</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {chartData.map((item, index) => (
              <li key={index} style={{ padding: '10px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                <span>{item.name}</span>
                <strong>R$ {item.value.toFixed(2)}</strong>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  flex: 1
};

export default Dashboard;