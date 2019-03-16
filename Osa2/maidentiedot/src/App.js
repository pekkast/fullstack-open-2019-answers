import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetails = ({country}) => (
  <div>
    <h2>{country.name}</h2>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h3>Languages</h3>
    <ul>{country.languages.map(({ iso639_2, name }) => <li key={iso639_2}>{name}</li>)}</ul>
    <img src={country.flag} alt="lippu" width="480" />
  </div>
);

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(({data}) => setCountries(data))
      .catch(reason => console.log(reason));
  }, [])

  const handleChange = event => setSearch(event.target.value && event.target.value.toLowerCase());
  const filteredCountries = countries
    .filter(c => c.name.toLowerCase().indexOf(search) !== -1 || c.nativeName.toLowerCase().indexOf(search) !== -1);

  return (
    <div>
      <h1>Maatiedot</h1>
      <div>
        find countries <input value={search} onChange={handleChange} />
      </div>
      {filteredCountries.length > 10 && <p>Too many matches.</p>}
      {filteredCountries.length === 1 && <CountryDetails country={filteredCountries[0]} />}
      {filteredCountries.length === 0 && <p>No matches.</p>}
      {filteredCountries.length <= 10 && filteredCountries.length > 1 &&
        <ul>{filteredCountries.map(c => <li key={c.alpha3Code}>{c.name}</li>)}</ul>}
    </div>
  );
};

export default App;
