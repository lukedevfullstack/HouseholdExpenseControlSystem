import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface Transaction {
  id: string;
  description: string;
  value: number;
  type: string;
}

interface Props {
  refresh: number;
}

const TransactionTable: React.FC<Props> = ({ refresh }) => {
  const [list, setList] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get<Transaction[]>('/Transaction').then(res => setList(res.data));
  }, [refresh]);

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
          <th>Descrição</th>
          <th>Tipo</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        {list.map(t => (
          <tr key={t.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '10px 0' }}>{t.description}</td>
            <td style={{ color: t.type === 'Receita' ? 'green' : 'red' }}>{t.type}</td>
            <td>R$ {t.value.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;