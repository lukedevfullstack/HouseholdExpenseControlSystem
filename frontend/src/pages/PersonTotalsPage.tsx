import React, { useEffect, useState } from 'react';
import api from '../services/api/api';

const PersonTotalsPage: React.FC = () => {
    // 1. Iniciamos como null para saber quando os dados chegaram
    const [report, setReport] = useState<any>(null);

    useEffect(() => {
        api.get('/Person/all-totals')
            .then(res => {
                setReport(res.data);
            });
    }, []);

    // 2. Se ainda não carregou, exibe uma mensagem
    if (!report) return <div style={{ padding: '20px' }}>Carregando relatório...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>Consulta de Totais por Pessoa</h2>

            <table style={tableStyle}>
                <thead>
                    <tr style={{ backgroundColor: '#edf2f7' }}>
                        <th style={tdStyle}>Nome</th>
                        <th style={tdStyle}>Receitas</th>
                        <th style={tdStyle}>Despesas</th>
                        <th style={tdStyle}>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 3. Acessamos report.data que é onde está a lista de pessoas */}
                    {report.data && report.data.map((p: any, i: number) => (
                        <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={tdStyle}>{p.name}</td>
                            <td style={{ ...tdStyle, color: '#38a169' }}>R$ {p.totalRecipes.toFixed(2)}</td>
                            <td style={{ ...tdStyle, color: '#e53e3e' }}>R$ {p.totalExpenses.toFixed(2)}</td>
                            <td style={{ ...tdStyle, fontWeight: 'bold', color: p.balance >= 0 ? '#3182ce' : '#e53e3e' }}>
                                R$ {p.balance.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr style={{ backgroundColor: '#2d3748', color: 'white', fontWeight: 'bold' }}>
                        <td style={tdStyle}>TOTAL GERAL</td>
                        <td style={tdStyle}>R$ {report.grandTotalRecipes.toFixed(2)}</td>
                        <td style={tdStyle}>R$ {report.grandTotalExpenses.toFixed(2)}</td>
                        <td style={{ ...tdStyle, color: report.netBalance >= 0 ? '#63b3ed' : '#feb2b2' }}>
                            R$ {report.netBalance.toFixed(2)}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden'
};

const tdStyle = { padding: '12px', border: '1px solid #edf2f7', textAlign: 'left' as const };

export default PersonTotalsPage;