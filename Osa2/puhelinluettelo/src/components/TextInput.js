import React from 'react';

const TextInput = ({label, placeholder, value, handleChange}) => (
    <div>
        <label>{label}</label>
        <input placeholder={placeholder} value={value} onChange={handleChange} />
    </div>
);

export default TextInput;
