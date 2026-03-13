import React, { useState, useEffect } from 'react';
import api from '../services/api/api';

const TransactionPage: React.FC = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [people, setPeople] = useState<any[]>([]);

    const [description, setDescription] = useState('');
    const [value, setValue] = useState<number>(0);
    const [type, setType] = useState('Despesa');
    const [categoryId, setCategoryId] = useState('');
    const [personId, setPersonId] = useState('');
    const [status, setStatus] = useState({ message: '', isError: false });

    useEffect(() => {
        api.get('/Category').then(res => setCategories(res.data));
        api.get('/Person').then(res => setPeople(res.data));
    }, []);

    const filteredCategories = categories.filter(c => c.purpose === 'Ambas' || c.purpose === type);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/Transaction', { description, value, type, categoryId, personId });
            setStatus({ message: 'Lançamento realizado!', isError: false });
            setDescription(''); setValue(0);
        } catch (err: any) {
            setStatus({ message: err.response?.data?.message || 'Erro ao salvar', isError: true });
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={cardStyle}>
                <h2 style={{ marginBottom: '20px' }}>Novo Lançamento</h2>

                {status.message && (
                    <div style={{
                        padding: '10px', marginBottom: '15px', borderRadius: '5px',
                        backgroundColor: status.isError ? '#fee2e2' : '#dcfce7', color: status.isError ? '#991b1b' : '#166534'
                    }}>
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    {}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>
                            são ({description.length}/400)
                        </label>
                        <textarea
                            maxLength={400}
                            style={textAreaStyle}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows={3}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                        <div>
                            <label style={labelStyle}>Tipo</label>
                            <select style={inputStyle} value={type} onChange={(e) => { setType(e.target.value); setCategoryId(''); }}>
                                <option value="Despesa">Despesa</option>
                                <option value="Receita">Receita</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Valor (R$)</label>
                            <input type="number" step="0.01" style={inputStyle} value={value} onChange={(e) => setValue(Number(e.target.value))} required />
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>Pessoa</label>
                        <select style={inputStyle} value={personId} onChange={(e) => setPersonId(e.target.value)} required>
                            <option value="">Selecione...</option>
                            {people.map(p => <option key={p.id} value={p.id}>{p.name} ({p.age} anos)</option>)}
                        </select>
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <label style={labelStyle}>Categoria</label>
                        <select style={inputStyle} value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                            <option value="">Selecione...</option>
                            {filteredCategories.map(c => <option key={c.id} value={c.id}>{c.description}</option>)}
                        </select>
                    </div>

                    <button type="submit" style={buttonStyle}>Salvar Lançamento</button>
                </form>
            </div>
        </div>
    );
};

// ESTILOS PARA FICAR IGUAL À IMAGEM
const cardStyle = { backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' };
const labelStyle = { display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '0.9rem', color: '#333' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box' as const };

const textAreaStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    fontFamily: 'inherit',
    resize: 'vertical' as const,
    boxSizing: 'border-box' as const
};

const buttonStyle = {
    backgroundColor: '#3182ce',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem'
};

export default TransactionPage;