import React from 'react';

const PersonDetails = ({ person, handleClick }) =>  (
    <li>
        <span>{person.name}: {person.number} </span>
        <button onClick={() => handleClick(person)}>poista</button>
    </li>
);

const PersonList = ({persons, removeHandler}) => (
    <ul>
        {persons.map(person => <PersonDetails key={person.id} person={person} handleClick={removeHandler} />)}
    </ul>
);

export default PersonList;
