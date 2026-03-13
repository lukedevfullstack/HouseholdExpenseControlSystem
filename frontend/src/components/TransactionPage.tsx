import React, { useEffect, useState } from 'react';
import api from '../services/api/api';

const TransactionPage: React.FC = () => {
  // Estados para carregar as opções dos seletores
  const [people, setPeople] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  // Estados do formulário
  const [desc, setDesc] = useState('');
  const [value, setValue] = useState(0);
  const [type, setType] = useState('Despesa');
  const [personId, setPersonId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    // Carrega moradores e categorias para os dropdowns
    api.get('/Person').then(res => setPeople(res.data));
    api.get('/Category').then(res => setCategories(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      description: desc,
      value: value,
      type: type,
      personId: personId,
      categoryId: categoryId
    };

    try {
      await api.post('/Transaction', payload);
      setMessage({ text: 'Transação registrada com sucesso!', type: 'success' });
      // Limpar campos
      setDesc('');
      setValue(0);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Erro ao registrar transação.';
      setMessage({ text: errorMsg, type: 'error' });
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ color: '#2d3748' }}>Novo Lançamento</h2>
      
      {message.text && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '20px', 
          borderRadius: '5px',
          backgroundColor: message.type === 'success' ? '#c6f6d5' : '#fed7d7',
          color: message.type === 'success' ? '#22543d' : '#822727'
        }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} style={formStyle}>
        <label>Descrição</label>
        <input style={inputStyle} type="text" value={desc} onChange={e => setDesc(e.target.value)} required placeholder="Ex: Compras do mês" />

        <label>Valor (R$)</label>
        <input style={inputStyle} type="number" step="0.01" value={value} onChange={e => setValue(parseFloat(e.target.value))} required />

        <label>Tipo</label>
        <select style={inputStyle} value={type} onChange={e => setType(e.target.value)}>
          <option value="Despesa">Despesa</option>
          <option value="Receita">Receita</option>
        </select>

        <label>Quem realizou?</label>
        <select style={inputStyle} value={personId} onChange={e => setPersonId(e.target.value)} required>
          <option value="">Selecione um morador</option>
          {people.map(p => <option key={p.id} value={p.id}>{p.name} ({p.age} anos)</option>)}
        </select>

        <label>Categoria</label>
        <select style={inputStyle} value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
          <option value="">Selecione uma categoria</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.description}</option>)}
        </select>

        <button type="submit" style={buttonStyle}>Registrar Transação</button>
      </form>
    </div>
  );
};

// Estilos básicos
const formStyle = { display: 'flex', flexDirection: 'column' as const, gap: '10px', backgroundColor: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' };
const inputStyle = { padding: '10px', borderRadius: '5px', border: '1px solid #cbd5e0', fontSize: '1rem' };
const buttonStyle = { padding: '12px', backgroundColor: '#4a5568', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' as const, fontSize: '1rem', marginTop: '10px' };

export default TransactionPage;