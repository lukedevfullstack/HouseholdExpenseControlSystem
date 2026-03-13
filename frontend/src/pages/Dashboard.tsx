import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { GeneralReport } from '../interfaces';

const Dashboard: React.FC = () => {
  const [report, setReport] = useState<GeneralReport | null>(null);

  const loadData = async () => {
    const response = await api.get<GeneralReport>('/person/totals');
    setReport(response.data);
  };

  useEffect(() => { loadData(); }, []);

  if (!report) return <div>Carregando...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Totais por Pessoa</h2>
      <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Receitas</th>
            <th>Despesas</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {report.items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td style={{ color: 'green' }}>R$ {item.totalRevenue.toFixed(2)}</td>
              <td style={{ color: 'red' }}>R$ {item.totalExpense.toFixed(2)}</td>
              <td>R$ {item.balance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
          <tr>
            <td>TOTAL GERAL</td>
            <td style={{ color: 'green' }}>R$ {report.globalRevenue.toFixed(2)}</td>
            <td style={{ color: 'red' }}>R$ {report.globalExpense.toFixed(2)}</td>
            <td style={{ backgroundColor: report.netBalance >= 0 ? '#d4edda' : '#f8d7da' }}>
              R$ {report.netBalance.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Dashboard;