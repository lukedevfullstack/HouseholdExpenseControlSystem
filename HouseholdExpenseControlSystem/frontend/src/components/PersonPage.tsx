import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Person } from '../interfaces';

const PersonPage: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(0);

  // Carrega a listagem de pessoas
  const loadPersons = async () => {
    const response = await api.get<Person[]>('/person');
    setPersons(response.data);
  };

  useEffect(() => { loadPersons(); }, []);

  // Lógica para Criar Pessoa
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || age <= 0) return alert("Preencha os campos corretamente!");

    try {
      await api.post('/person', { name, age });
      setName('');
      setAge(0);
      loadPersons(); // Atualiza a lista
    } catch (error) {
      alert("Erro ao salvar pessoa.");
    }
  };

  // Lógica para Deletar Pessoa (Garante a regra de apagar transações vinculadas)
  const handleDelete = async (id: string) => {
    if (window.confirm("Ao excluir esta pessoa, todas as suas transações serão apagadas. Confirmar?")) {
      await api.delete(`/person/${id}`);
      loadPersons();
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Gerenciamento de Pessoas</h2>

      {/* Formulário de Cadastro */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Nome (max 200)" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          maxLength={200}
        />
        <input 
          type="number" 
          placeholder="Idade" 
          value={age || ''} 
          onChange={(e) => setAge(Number(e.target.value))}
        />
        <button type="submit">Cadastrar</button>
      </form>

      {/* Tabela de Listagem */}
      <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.age} anos</td>
              <td>
                <button onClick={() => handleDelete(p.id!)} style={{ color: 'red' }}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonPage;