import React, { useState, useEffect } from 'react';
import TextFilter from './components/TextFilter';
import AddPersonForm from './components/AddPersonForm';
import PersonList from './components/PersonList';
import personsService from './services/persons.service';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    personsService.getAll().then(data => setPersons(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const idx = persons.findIndex(p => p.name === newName);
    if (idx !== -1) {
      if (window.confirm(`${newName} on jo luettelossa. Korvataanko vanha numero uudella?`)) {
        const update = { ...persons[idx], number: newNumber };
        personsService
          .update(update)
          .then(() => {
            const newState = [...persons];
            newState[idx] = update;
            setPersons(newState);
            setNewName('');
            setNewNumber('');
          })
          .catch(reason => {
            alert(`Virhetilanne: ${update.name} lienee jo poistettu. Yritä tallentaa uudelleen.`);
            personsService.getAll().then(data => setPersons(data));
          })
      }
      return;
    }

    personsService
      .create({ name: newName, number: newNumber })
      .then(person => {
        setPersons(persons.concat(person));
        setNewName('');
        setNewNumber('');
      });
  };

  const removePerson = (person) => {
    if (window.confirm(`Vahvista henkilön ${person.name} poisto`)) {
    personsService
      .remove(person.id)
      .then(() => {
        const updated = [...persons];
        const idx = updated.findIndex(p => p.id === person.id);
        if (idx !== -1) {
          updated.splice(idx, 1);
        }
        setPersons(updated);
      })
      .catch(reason => {
        alert(`Virhetilanne: ${person.name} lienee jo poistettu`);
        personsService.getAll().then(data => setPersons(data));
      })
    }
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
      <PersonList persons={visiblePersons()} removeHandler={removePerson} />
    </div>
  );
}

export default App;
