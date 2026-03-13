import React, { useState, useEffect } from 'react';
import api from '../services/api/api';

interface Transaction {
  id: string;
  description: string;
  value: number;
  type: string;
  personName?: string; // Opcional, caso seu backend retorne o nome da pessoa
  categoryDescription?: string;
}

const TransactionPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const response = await api.get<Transaction[]>('/Transaction');
      setTransactions(response.data);
    } catch (err) {
      console.error("Erro ao carregar extrato", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>🧾 Extrato de Transações</h2>
        <button 
          onClick={loadTransactions} 
          style={{ padding: '8px 15px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          🔄 Atualizar
        </button>
      </div>

      {loading ? (
        <p>Carregando transações...</p>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={tableHeaderStyle}>Descrição</th>
                <th style={tableHeaderStyle}>Tipo</th>
                <th style={tableHeaderStyle}>Valor</th>
                <th style={tableHeaderStyle}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((t) => (
                  <tr key={t.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={tableCellStyle}>{t.description}</td>
                    <td style={{ ...tableCellStyle, color: t.type === 'Receita' ? '#27ae60' : '#e74c3c', fontWeight: 'bold' }}>
                      {t.type}
                    </td>
                    <td style={tableCellStyle}>{formatCurrency(t.value)}</td>
                    <td style={tableCellStyle}>
                      {/* Espaço para botão de Deletar no futuro */}
                      <span style={{ color: '#95a5a6', fontSize: '0.8rem' }}>ID: {t.id.substring(0, 8)}...</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ padding: '20px', textAlign: 'center', color: '#7f8c8d' }}>
                    Nenhuma transação encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Estilos rápidos para a tabela
const tableHeaderStyle: React.CSSProperties = {
  padding: '12px 15px',
  textAlign: 'left',
  borderBottom: '2px solid #dee2e6',
  color: '#495057'
};

const tableCellStyle: React.CSSProperties = {
  padding: '12px 15px',
  color: '#212529'
};

export default TransactionPage;