import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextFilter from './components/TextFilter';
import AddPersonForm from './components/AddPersonForm';
import PersonList from './components/PersonList';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data);
    });
  }, []);

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
      <TextFilter text="rajaa näytettäviä" handleChange={filterCollection} />
      <h2>Lisää uusi</h2>
      <AddPersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numerot</h2>
      <PersonList persons={visiblePersons()} />
    </div>
  );
}

export default App;
