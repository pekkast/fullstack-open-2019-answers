import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    setPersons(persons.concat({ name: newName }));
  };
  const handleTextChange = event => setNewName(event.target.value);

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          nimi: <input placeholder="Uusi henkilö" value={newName} onChange={handleTextChange} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      <ul>
        {persons.map(({ name }) => <li key={name}>{name}</li>)}
      </ul>
    </div>
  )
}

export default App