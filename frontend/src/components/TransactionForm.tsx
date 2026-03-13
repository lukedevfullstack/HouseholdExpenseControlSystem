import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface Props {
  onTransactionSuccess: () => void;
}

const TransactionForm: React.FC<Props> = ({ onTransactionSuccess }) => {
  const [persons, setPersons] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    description: '',
    value: '',
    type: 'Despesa',
    personId: '',
    categoryId: ''
  });

  useEffect(() => {
    const load = async () => {
      const [p, c] = await Promise.all([api.get('/Person'), api.get('/Category')]);
      setPersons(p.data);
      setCategories(c.data);
    };
    load();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await api.post('/Transaction', { ...form, value: Number(form.value) });
      alert("Salvo!");
      onTransactionSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro no servidor");
    }
  };

  return (
    <form onSubmit={save} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <h3>Nova Movimentação</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input placeholder="Descrição" onChange={e => setForm({...form, description: e.target.value})} required style={{ display: 'block', marginBottom: '10px', width: '100%' }} />
      <input type="number" placeholder="Valor" onChange={e => setForm({...form, value: e.target.value})} required style={{ display: 'block', marginBottom: '10px', width: '100%' }} />
      
      <select onChange={e => setForm({...form, personId: e.target.value})} required style={{ display: 'block', marginBottom: '10px', width: '100%' }}>
        <option value="">Selecione a Pessoa</option>
        {persons.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>

      <select onChange={e => setForm({...form, categoryId: e.target.value})} required style={{ display: 'block', marginBottom: '10px', width: '100%' }}>
        <option value="">Selecione a Categoria</option>
        {categories.map(c => <option key={c.id} value={c.id}>{c.description}</option>)}
      </select>

      <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} style={{ display: 'block', marginBottom: '10px', width: '100%' }}>
        <option value="Receita">Receita</option>
        <option value="Despesa">Despesa</option>
      </select>

      <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Lançar</button>
    </form>
  );
};

export default TransactionForm;