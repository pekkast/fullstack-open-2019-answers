import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchString, setSearchString] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.findIndex(p => p.name === newName) !== -1) {
      return alert(`${newName} on jo luettelossa`);
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName('');
    setNewNumber('');
  };

  const visiblePersons = () => persons.filter(p => p.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);

  const handleNameChange = event => setNewName(event.target.value);
  const handleNumberChange = event => setNewNumber(event.target.value);
  const filterCollection = event => setSearchString(event.target.value);

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <p>
        rajaa näytettäviä <input onChange={filterCollection} />
      </p>
      <h2>Lisää uusi</h2>
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
        {visiblePersons().map(({ name, number }) => <li key={name}>{name}: {number}</li>)}
      </ul>
    </div>
  );
}

export default App;
