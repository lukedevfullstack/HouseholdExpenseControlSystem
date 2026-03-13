import React, { useState } from 'react';
import PersonSelector from '../components/PersonSelector';
import SummaryCards from '../components/SummaryCards';
import TransactionForm from '../components/TransactionForm';
import TransactionTable from '../components/TransactionTable';

const Dashboard: React.FC = () => {
  const [selectedPersonId, setSelectedPersonId] = useState<string>('');
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  // Função para disparar a atualização de saldo e tabela após um novo cadastro
  const handleTransactionSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#2c3e50' }}>Dashboard Financeiro</h1>
        <p style={{ color: '#7f8c8d' }}>Gerencie as contas da sua residência</p>
      </header>

      {/* 1. Seletor de Pessoa (Filtro Global) */}
      <section style={{ marginBottom: '30px', backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <PersonSelector onSelectPerson={setSelectedPersonId} />
      </section>

      {/* 2. Cards de Resumo (Receitas, Despesas e Saldo) */}
      <SummaryCards personId={selectedPersonId} refresh={refreshTrigger} />

      {/* 3. Grid de Conteúdo (Formulário à esquerda, Tabela à direita) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '30px', 
        marginTop: '30px' 
      }}>
        
        {/* Coluna do Formulário */}
        <aside>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginTop: 0 }}>Nova Transação</h3>
            <TransactionForm onTransactionSuccess={handleTransactionSuccess} />
          </div>
        </aside>

        {/* Coluna da Tabela */}
        <main>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginTop: 0 }}>Histórico Recente</h3>
            <TransactionTable refresh={refreshTrigger} />
          </div>
        </main>

      </div>
    </div>
  );
};

export default Dashboard;