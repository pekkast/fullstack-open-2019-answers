import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetails = ({country}) => {
  const [weatherData, setWeatherData] = useState({});
  useEffect(() => {
    axios
      .get('https://api.apixu.com/v1/current.json?key=d779868b069a4d6fa9e170809191603&q=' + country.capital)
      .then(({data}) => setWeatherData(data))
      .catch(reason => console.log(reason));
  }, []);

  const data = weatherData.current;

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Languages</h3>
      <ul>{country.languages.map(({ iso639_2, name }) => <li key={iso639_2}>{name}</li>)}</ul>
      <p><img src={country.flag} alt="lippu" width="480" /></p>
      <h3>Weather in {country.capital}</h3>
      {data && <div>
        <p><b>temperature:</b> {Math.round(data.temp_c)} Celsius</p>
        <p><img src={data.condition.icon} alt="säätila" /></p>
        <p><b>wind:</b> {data.wind_kph} kph direction {data.wind_dir}</p>
      </div>}
    </div>
  );
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [countryCode, setCountryCode] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(({data}) => setCountries(data))
      .catch(reason => console.log(reason));
  }, []);

  const handleChange = event => {
    setSearch(event.target.value && event.target.value.toLowerCase());
    setCountryCode('');
  };

  const filteredCountries = countries
    .filter(c => countryCode.length > 0 ? countryCode === c.alpha3Code : c.name.toLowerCase().indexOf(search) !== -1 || c.nativeName.toLowerCase().indexOf(search) !== -1);

  const selectCountry = countryCode => () => setCountryCode(countryCode);

  return (
    <div>
      <h1>Maatiedot</h1>
      <div>
        find countries <input value={search} onChange={handleChange} />
      </div>
      {countryCode.length > 0 && <button onClick={() => setCountryCode('')}>Back to results</button>}
      {filteredCountries.length > 10 && <p>Too many matches.</p>}
      {filteredCountries.length === 1 && <CountryDetails country={filteredCountries[0]} />}
      {filteredCountries.length === 0 && <p>No matches.</p>}
      {filteredCountries.length <= 10 && filteredCountries.length > 1 && <ul>{
          filteredCountries
            .map(c =>
              <li key={c.alpha3Code}>
                {c.name}
                <button onClick={selectCountry(c.alpha3Code)}>show</button>
              </li>
            )
      }</ul>}
    </div>
  );
};

export default App;
