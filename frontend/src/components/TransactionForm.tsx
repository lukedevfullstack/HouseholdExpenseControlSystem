import React, { useState, useEffect } from 'react';
import api from '../services/api/api';

const TransactionForm: React.FC<{ onTransactionSuccess: () => void }> = ({ onTransactionSuccess }) => {
  const [persons, setPersons] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ description: '', value: '', type: 'Despesa', personId: '', categoryId: '' });

  useEffect(() => {
    api.get('/Person').then(res => setPersons(res.data));
    api.get('/Category').then(res => setCategories(res.data));
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validação de segurança no Front
    if (Number(form.value) <= 0) {
        setError("O valor deve ser maior que zero.");
        return;
    }

    try {
      await api.post('/Transaction', { ...form, value: Number(form.value) });
      alert("Sucesso!");
      setForm({ ...form, description: '', value: '' }); // Limpa campos de texto
      onTransactionSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao salvar");
    }
  };

  return (
    <form onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {error && <div style={{ color: 'white', background: '#e74c3c', padding: '10px', borderRadius: '4px' }}>{error}</div>}
      
      <label>Descrição</label>
      <input value={form.description} onChange={e => setForm({...form, description: e.target.value})} required placeholder="Ex: Mercado" />

      <label>Valor (R$)</label>
      <input 
        type="number" 
        step="0.01" // O Pulo do Gato: permite centavos para o Decimal do C#
        min="0.01"
        value={form.value} 
        onChange={e => setForm({...form, value: e.target.value})} 
        required 
        placeholder="0,00"
        style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
      />

      <label>Pessoa</label>
      <select onChange={e => setForm({...form, personId: e.target.value})} required>
        <option value="">Selecione...</option>
        {persons.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>

      <label>Categoria</label>
      <select onChange={e => setForm({...form, categoryId: e.target.value})} required>
        <option value="">Selecione...</option>
        {categories.map(c => <option key={c.id} value={c.id}>{c.description}</option>)}
      </select>

      <button type="submit" style={{ padding: '12px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
        💾 Salvar Lançamento
      </button>
    </form>
  );
};

export default TransactionForm;