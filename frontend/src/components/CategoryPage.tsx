import React, { useState, useEffect } from 'react';
import api from '../services/api/api';

interface Category {
  id: string;
  description: string;
  purpose: string; // "Receita", "Despesa" ou "Ambas"
}

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [description, setDescription] = useState('');
  const [purpose, setPurpose] = useState('Despesa');

  const loadCategories = async () => {
    const res = await api.get<Category[]>('/Category');
    setCategories(res.data);
  };

  useEffect(() => { loadCategories(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/Category', { description, purpose });
      alert("Categoria criada!");
      setDescription('');
      loadCategories();
    } catch (err) { alert("Erro ao criar categoria"); }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>📂 Categorias de Gastos/Ganhos</h2>
      
      <form onSubmit={handleSave} style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <input 
          placeholder="Ex: Aluguel, Salário..." 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          required 
        />
        <select value={purpose} onChange={e => setPurpose(e.target.value)}>
          <option value="Receita">Apenas Receita</option>
          <option value="Despesa">Apenas Despesa</option>
          <option value="Ambas">Ambas</option>
        </select>
        <button type="submit">Cadastrar Categoria</button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>
            <th>Descrição</th>
            <th>Finalidade</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(c => (
            <tr key={c.id}>
              <td>{c.description}</td>
              <td>{c.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryPage;