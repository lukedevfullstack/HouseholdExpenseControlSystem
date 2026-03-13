import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";
import CategoryTotalsPage from "./pages/CategoryTotalsPage";
import TransactionPage from "./pages/TransactionPage";
import PersonPage from "./pages/PersonPage";
import PersonTotalsPage from './pages/PersonTotalsPage';

const App: React.FC = () => {
    return (
        <Router>
            <div style={{ display: 'flex', minHeight: '100vh' }}>

                {/* SIDEBAR */}
                <nav style={{ width: '250px', background: '#1a202c', color: 'white', padding: '20px' }}>
                    <h2 style={{ color: '#63b3ed' }}>MyFinance</h2>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
                        <li style={navItem}><Link to="/" style={linkStyle}>🏠 Dashboard</Link></li>
                        <li style={navItem}><Link to="/transacoes" style={linkStyle}>💸 Novo Lançamento</Link></li>
                        <li style={navItem}><Link to="/moradores/resumo" style={linkStyle}>📊 Totais por Pessoa</Link></li>
                        <li style={navItem}><Link to="/categorias/cadastro" style={linkStyle}>📂 Categorias</Link></li>
                        <li style={navItem}><Link to="/categorias/resumo" style={linkStyle}>📊 Consulta de totais por categoria</Link></li>
                        <li style={navItem}><Link to="/moradores" style={linkStyle}>👥 Moradores</Link></li>
                    </ul>
                </nav>

                {/* ÁREA PRINCIPAL */}
                <main style={{ flex: 1, padding: '40px', background: '#f7fafc' }}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/transacoes" element={<TransactionPage />} />
                        <Route path="/moradores/resumo" element={<PersonTotalsPage />} />
                        <Route path="/categorias/cadastro" element={<CategoryPage />} />
                        <Route path="/categorias/resumo" element={<CategoryTotalsPage />} />
                        <Route path="/moradores" element={<PersonPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

const navItem = { marginBottom: '10px' };
const linkStyle = {
    color: '#cbd5e0',
    textDecoration: 'none',
    display: 'block',
    padding: '10px',
    background: '#2d3748',
    borderRadius: '6px'
};

export default App;