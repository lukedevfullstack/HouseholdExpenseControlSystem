import React, { useState, useEffect } from 'react';
import api from '../services/api/api';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get<Transaction[]>('/Transaction')
      .then(res => setList(res.data))
      .finally(() => setLoading(false));
  }, [refresh]);

  if (loading) return <p>⌛ Carregando histórico...</p>;

  return (
    <div style={{ marginTop: '20px' }}>
      {list.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', border: '2px dashed #ccc', borderRadius: '8px', color: '#7f8c8d' }}>
          <p style={{ fontSize: '1.2rem', margin: 0 }}>📭 Nenhuma transação encontrada.</p>
          <p>Cadastre uma nova movimentação para começar a gerenciar suas finanças.</p>
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
              <th style={{ padding: '10px' }}>Descrição</th>
              <th style={{ padding: '10px' }}>Tipo</th>
              <th style={{ padding: '10px' }}>Valor</th>
            </tr>
          </thead>
          <tbody>
            {list.map(t => (
              <tr key={t.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{t.description}</td>
                <td style={{ padding: '10px', color: t.type === 'Receita' ? 'green' : 'red', fontWeight: 'bold' }}>{t.type}</td>
                <td style={{ padding: '10px' }}>R$ {t.value.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionTable;