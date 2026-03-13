import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import PersonPage from './components/PersonPage';
import TransactionPage from './components/TransactionPage';
import CategoryPage from './components/CategoryPage';

// Definimos os tipos de páginas disponíveis para o TypeScript não reclamar
type Page = 'dashboard' | 'persons' | 'transactions' | 'categories';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  // Estilo simples para os botões do menu
  const navButtonStyle = (page: Page) => ({
    background: currentPage === page ? '#3498db' : 'transparent',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '4px',
    fontWeight: currentPage === page ? 'bold' : 'normal' as any,
    transition: '0.3s'
  });

  return (
    <div style={{ fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      
      {/* Barra de Navegação Superior */}
      <nav style={{ 
        backgroundColor: '#2c3e50', 
        padding: '10px 0', 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)' 
      }}>
        <button onClick={() => setCurrentPage('dashboard')} style={navButtonStyle('dashboard')}>
          📊 Dashboard
        </button>
        <button onClick={() => setCurrentPage('persons')} style={navButtonStyle('persons')}>
          👥 Moradores
        </button>
        <button onClick={() => setCurrentPage('transactions')} style={navButtonStyle('transactions')}>
          🧾 Extrato Geral
        </button>
        <button onClick={() => setCurrentPage('categories')} style={navButtonStyle('categories')}>
          📂 Categorias
        </button>
      </nav>

      {/* Área de Conteúdo Dinâmico */}
      <main style={{ padding: '20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {currentPage === 'dashboard' && <Dashboard />}
          
          {currentPage === 'persons' && (
            <section>
              <h1 style={{ textAlign: 'center' }}>Gestão de Moradores</h1>
              <PersonPage />
            </section>
          )}

          {currentPage === 'transactions' && (
            <section>
              <h1 style={{ textAlign: 'center' }}>Histórico Financeiro da Casa</h1>
              <TransactionPage />
            </section>
          )}

          {currentPage === 'categories' && (
            <section>
              <h1 style={{ textAlign: 'center' }}>Configuração de Categorias</h1>
              <CategoryPage />
            </section>
          )}

        </div>
      </main>

      {/* Rodapé Informativo */}
      <footer style={{ 
        textAlign: 'center', 
        padding: '20px', 
        color: '#7f8c8d', 
        fontSize: '0.9rem',
        marginTop: '40px' 
      }}>
        Household Expense Control System &copy; 2026 | Full Stack Project
      </footer>
    </div>
  );
};

export default App;