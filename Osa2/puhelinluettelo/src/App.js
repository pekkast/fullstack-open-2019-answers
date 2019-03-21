import React, { useState, useEffect } from 'react';
import TextFilter from './components/TextFilter';
import AddPersonForm from './components/AddPersonForm';
import PersonList from './components/PersonList';
import personsService from './services/persons.service';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchString, setSearchString] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const notificationTimeout = 6000;

  useEffect(() => {
    personsService.getAll().then(data => setPersons(data));
  }, []);

  const setError = (error, defaultMessage) => {
    const message = error.response.data ? `Virhetilanne: ${error.response.data.error}` : defaultMessage;
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, notificationTimeout)
  };

  const setSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, notificationTimeout)
  };

  const createPerson = (name, number) => {
    personsService
      .create({ name, number })
      .then(person => {
        setPersons(persons.concat(person));
        setNewName('');
        setNewNumber('');
        setSuccess(`Lisättiin luetteloon ${person.name}`);
      })
      .catch(error => {
        setError(error, error.message);
        personsService.getAll().then(data => setPersons(data));
      });
  };

  const tryUpdatePerson = (name, number) => {
    const proceed = personExists(name) && window.confirm(`${name} on jo luettelossa. Korvataanko vanha numero uudella?`);
    if (!proceed) {
      return;
    }

    const idx = persons.findIndex(p => p.name === name);
    const update = { ...persons[idx], number };
    personsService
      .update(update)
      .then(() => {
        const newState = [...persons];
        newState[idx] = update;
        setPersons(newState);
        setNewName('');
        setNewNumber('');
        setSuccess(`Päivitettiin ${update.name}`);
      })
      .catch(error => {
        setError(error, `Virhetilanne: ${update.name} lienee jo poistettu. Yritä tallentaa uudelleen.`);
        personsService.getAll().then(data => setPersons(data));
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
          setSuccess(`Poistettiin ${person.name}`);
        })
        .catch(error => {
          setError(error, `Virhetilanne: ${person.name} lienee jo poistettu`);
          personsService.getAll().then(data => setPersons(data));
        });
    }
  };

  const personExists = name => persons.findIndex(p => p.name === name) !== -1;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (personExists(newName)) {
      return tryUpdatePerson(newName, newNumber);
    }

    createPerson(newName, newNumber);
  };

  const visiblePersons = persons.filter(p => p.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  const handleNameChange = event => setNewName(event.target.value);
  const handleNumberChange = event => setNewNumber(event.target.value);
  const filterCollection = event => setSearchString(event.target.value);

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <TextFilter text="rajaa näytettäviä" handleChange={filterCollection} />
      <h2>Lisää uusi</h2>
      <Notification text={errorMessage} isError={true} />
      <Notification text={successMessage} isError={false} />
      <AddPersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numerot</h2>
      <PersonList persons={visiblePersons} removeHandler={removePerson} />
    </div>
  );
}

export default App;
