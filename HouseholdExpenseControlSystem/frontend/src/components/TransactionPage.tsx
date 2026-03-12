import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Person, Category, Transaction } from '../interfaces';

const TransactionPage: React.FC = () => {
  // Estados para dados do banco
  const [persons, setPersons] = useState<Person[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Estados para o formulário
  const [description, setDescription] = useState('');
  const [value, setValue] = useState<number>(0);
  const [type, setType] = useState<'Receita' | 'Despesa'>('Despesa');
  const [personId, setPersonId] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const loadInitialData = async () => {
    const [resPersons, resCats, resTrans] = await Promise.all([
      api.get<Person[]>('/person'),
      api.get<Category[]>('/category'),
      api.get<Transaction[]>('/transaction')
    ]);
    setPersons(resPersons.data);
    setCategories(resCats.data);
    setTransactions(resTrans.data);
  };

  useEffect(() => { loadInitialData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica front-end
    if (!description || value <= 0 || !personId || !categoryId) {
      return alert("Preencha todos os campos corretamente.");
    }

    try {
      await api.post('/transaction', {
        description,
        value,
        type,
        personId,
        categoryId
      });
      
      // Limpar campos e recarregar lista
      setDescription('');
      setValue(0);
      loadInitialData();
      alert("Transação salva com sucesso!");
    } catch (error: any) {
      // Aqui capturamos o BadRequest do .NET (ex: Menor de idade tentando receita)
      const message = error.response?.data || "Erro ao salvar transação.";
      alert(message);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h2>Cadastro de Transações</h2>

      <form onSubmit={handleSubmit} style={{ 
        display: 'grid', gap: '10px', padding: '20px', 
        border: '1px solid #ddd', borderRadius: '8px', marginBottom: '30px' 
      }}>
        <input 
          placeholder="Descrição" 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          maxLength={400}
        />

        <input 
          type="number" 
          placeholder="Valor" 
          value={value || ''} 
          onChange={e => setValue(Number(e.target.value))} 
        />

        <select value={type} onChange={e => setType(e.target.value as any)}>
          <option value="Despesa">Despesa</option>
          <option value="Receita">Receita</option>
        </select>

        <select value={personId} onChange={e => setPersonId(e.target.value)}>
          <option value="">Selecione a Pessoa</option>
          {persons.map(p => (
            <option key={p.id} value={p.id}>{p.name} ({p.age} anos)</option>
          ))}
        </select>

        <select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
          <option value="">Selecione a Categoria</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.description} ({c.purpose})</option>
          ))}
        </select>

        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Salvar Transação
        </button>
      </form>

      <h3>Lançamentos Recentes</h3>
      <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th>Descrição</th>
            <th>Pessoa</th>
            <th>Categoria</th>
            <th>Tipo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>
              <td>{t.description}</td>
              <td>{(t as any).person?.name}</td>
              <td>{(t as any).category?.description}</td>
              <td style={{ color: t.type === 'Receita' ? 'green' : 'red' }}>{t.type}</td>
              <td>R$ {t.value.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionPage;