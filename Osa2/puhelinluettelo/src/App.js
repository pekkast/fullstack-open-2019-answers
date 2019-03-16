import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '0987654321' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.findIndex(p => p.name === newName) !== -1) {
      return alert(`${newName} on jo luettelossa`);
    }
    setPersons(persons.concat({ name: newName, phone: newNumber }));
    setNewName('');
    setNewNumber('');
  };
  const handleNameChange = event => setNewName(event.target.value);
  const handleNumberChange = event => setNewNumber(event.target.value);

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          nimi: <input placeholder="Uusi henkilö" value={newName} onChange={handleNameChange} /><br />
          numero: <input placeholder="01234567890" value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      <ul>
        {persons.map(({ name, phone }) => <li key={name}>{name}: {phone}</li>)}
      </ul>
    </div>
  )
}

export default App