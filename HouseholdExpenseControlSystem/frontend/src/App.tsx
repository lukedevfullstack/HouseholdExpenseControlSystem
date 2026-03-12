import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <nav style={{ padding: '20px', backgroundColor: '#282c34', color: 'white' }}>
        <ul style={{ display: 'flex', gap: '20px', listStyle: 'none' }}>
          <li>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
          </li>
          <li>
            <Link to="/pessoas" style={{ color: 'white', textDecoration: 'none' }}>Pessoas</Link>
          </li>
          <li>
            <Link to="/transacoes" style={{ color: 'white', textDecoration: 'none' }}>Nova Transação</Link>
          </li>
        </ul>
      </nav>

      <div style={{ padding: '20px' }}>
        <Routes>
          {}
          <Route path="/" element={<Dashboard />} />
          <Route path="/pessoas" element={<PersonPage />} />
          
          {}
          <Route path="/pessoas" element={<div>Página de Cadastro de Pessoas (A implementar)</div>} />
          <Route path="/transacoes" element={<div>Página de Transações (A implementar)</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;