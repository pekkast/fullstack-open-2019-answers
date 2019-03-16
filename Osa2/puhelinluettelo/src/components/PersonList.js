import React from 'react';

const PersonDetails = ({ person }) => <li>{person.name}: {person.number}</li>

const PersonList = ({persons}) => (
    <ul>
        {persons.map(person => <PersonDetails key={person.id} person={person} />)}
    </ul>
);

export default PersonList;
