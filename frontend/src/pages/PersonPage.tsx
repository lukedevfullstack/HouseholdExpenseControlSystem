import React, { useState, useEffect } from 'react';
import api from '../services/api/api';

interface Person {
  id: string;
  name: string;
  age: number;
}

const PersonPage: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Carregar lista de pessoas ao abrir a página
  const loadPersons = async () => {
    try {
      const response = await api.get<Person[]>('/Person');
      setPersons(response.data);
    } catch (err) {
      console.error("Erro ao buscar pessoas", err);
    }
  };

  useEffect(() => {
    loadPersons();
  }, []);

  // 2. Função para salvar nova pessoa
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.post('/Person', { 
        name, 
        age: Number(age) 
      });
      
      alert("Morador cadastrado com sucesso!");
      setName('');
      setAge('');
      loadPersons(); // Atualiza a lista na tela
    } catch (err: any) {
      const msg = err.response?.data?.message || "Erro ao cadastrar morador.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>👥 Gerenciar Moradores</h2>
      
      {/* Formulário de Cadastro */}
      <section style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '30px' }}>
        <h3>Novo Cadastro</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <form onSubmit={handleSave} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Nome completo" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
            style={{ flex: 2, padding: '8px' }}
          />
          <input 
            type="number" 
            placeholder="Idade" 
            value={age} 
            onChange={e => setAge(e.target.value === '' ? '' : Number(e.target.value))} 
            required 
            style={{ flex: 1, padding: '8px' }}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{ padding: '8px 20px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {loading ? 'Salvando...' : 'Cadastrar'}
          </button>
        </form>
      </section>

      {/* Tabela de Moradores Cadastrados */}
      <section>
        <h3>Moradores Atuais</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
              <th style={{ padding: '10px' }}>Nome</th>
              <th style={{ padding: '10px' }}>Idade</th>
              <th style={{ padding: '10px' }}>ID do Sistema</th>
            </tr>
          </thead>
          <tbody>
            {persons.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{p.name}</td>
                <td style={{ padding: '10px' }}>{p.age} anos</td>
                <td style={{ padding: '10px', fontSize: '0.8rem', color: '#95a5a6' }}>{p.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default PersonPage;