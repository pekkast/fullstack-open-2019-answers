import React from 'react';
import TextInput from './TextInput';

const AddPersonForm = ({ handleSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => (
    <form onSubmit={handleSubmit}>
        <TextInput label="nimi:" placeholder="Uusi henkilö" value={newName} handleChange={handleNameChange} />
        <TextInput label="numero:" placeholder="01234567890" value={newNumber} handleChange={handleNumberChange} />
        <div>
            <button type="submit">lisää</button>
        </div>
    </form>
);

export default AddPersonForm;
