import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Heading = ({text}) => <h2>{text}</h2>;
const Button = ({ handleClick, label }) => <button onClick={handleClick}>{label}</button>;
const Statistics = ({ count, label }) => <p>{label}: {count}</p>;

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const addGood = () => setGood(good + 1);
    const addNeutral = () => setNeutral(neutral + 1);
    const addBad = () => setBad(bad + 1);

    return (
        <div>
            <Heading text="Anna palautetta" />
            <Button handleClick={addGood} label="hyvä" />
            <Button handleClick={addNeutral} label="neutraali" />
            <Button handleClick={addBad} label="huono" />
            <Heading text="Statistiikka" />
            <Statistics count={good} label="hyvä" />
            <Statistics count={neutral} label="neutraali" />
            <Statistics count={bad} label="huono" />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
