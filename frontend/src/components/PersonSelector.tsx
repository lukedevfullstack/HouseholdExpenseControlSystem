import React, { useState, useEffect } from 'react';
import api from '../services/api/api';

// Interface baseada no seu PersonResponse do C#
interface Person {
  id: string;
  name: string;
  age: number;
}

interface Props {
  onSelectPerson: (id: string) => void;
}

const PersonSelector: React.FC<Props> = ({ onSelectPerson }) => {
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    api.get<Person[]>('/Person').then(res => {
      setPersons(res.data);
      if (res.data.length > 0) onSelectPerson(res.data[0].id);
    });
  }, [onSelectPerson]);

  return (
    <div style={{ marginBottom: '20px' }}>
      <label><b>Morador: </b></label>
      <select onChange={(e) => onSelectPerson(e.target.value)}>
        {persons.map(p => (
          <option key={p.id} value={p.id}>{p.name} ({p.age} anos)</option>
        ))}
      </select>
    </div>
  );
};

export default PersonSelector;