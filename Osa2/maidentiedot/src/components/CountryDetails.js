import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetails = ({ country }) => {
  const [weatherData, setWeatherData] = useState({});
  useEffect(() => {
    axios
      .get('https://api.apixu.com/v1/current.json?key=d779868b069a4d6fa9e170809191603&q=' + country.capital)
      .then(({ data }) => setWeatherData(data))
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

export default CountryDetails;
