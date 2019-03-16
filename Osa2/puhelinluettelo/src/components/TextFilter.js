import React from 'react';

const TextFilter = ({text, handleChange}) =>
    <div>{text} <input onChange={handleChange} /></div>;

export default TextFilter;
