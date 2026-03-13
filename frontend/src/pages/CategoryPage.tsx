import React, { useState } from 'react';
import api from '../services/api/api';

const CategoryPage: React.FC = () => {
    const [desc, setDesc] = useState('');
    const [purpose, setPurpose] = useState('Ambas');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/Category', { description: desc, purpose });
            alert('Categoria salva!');
            setDesc('');
        } catch (err) { alert('Erro ao salvar'); }
    };

    return (
        <div style={cardStyle}>
            <h3>Nova Categoria</h3>
            <form onSubmit={handleSubmit}>
                <label>Descrição ({desc.length}/400)</label>
                <textarea
                    maxLength={400}
                    style={inputStyle}
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    required
                />

                <label>Finalidade</label>
                <select style={inputStyle} value={purpose} onChange={e => setPurpose(e.target.value)}>
                    <option value="Receita">Receita</option>
                    <option value="Despesa">Despesa</option>
                    <option value="Ambas">Ambas (Receita e Despesa)</option>
                </select>

                <button type="submit" style={btnStyle}>Salvar Categoria</button>
            </form>
        </div>
    );
};

// Estilos rápidos para manter o padrão
const cardStyle = { background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' };
const inputStyle = { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc', display: 'block' };
const btnStyle = { padding: '10px 20px', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };

export default CategoryPage;