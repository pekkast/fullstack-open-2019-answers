import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Heading = ({ text }) => <h2>{text}</h2>;
const Button = ({ handleClick, label }) => <button onClick={handleClick}>{label}</button>;
const Statistics = (props) => (
    <div>
        <p>hyvä: {props.good}</p>
        <p>neutraali: {props.neutral}</p>
        <p>huono: {props.bad}</p>
        <p>yhteensä: {props.count}</p>
        <p>keskiarvo: {props.average}</p>
        <p>positiivisia: {props.positive} %</p>
    </div>);

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const addGood = () => setGood(good + 1);
    const addNeutral = () => setNeutral(neutral + 1);
    const addBad = () => setBad(bad + 1);
    const getStatistics = (good, neutral, bad) => {
        const count = good + neutral + bad;
        const total = good * 1 + neutral * 0 + bad * -1;
        return {
            good,
            neutral,
            bad,
            count,
            average: count && total / count,
            positive: count && Math.round(good / count * 100)
        };
    }

    return (
        <div>
            <Heading text="Anna palautetta" />
            <Button handleClick={addGood} label="hyvä" />
            <Button handleClick={addNeutral} label="neutraali" />
            <Button handleClick={addBad} label="huono" />
            <Heading text="Statistiikka" />
            <Statistics {...getStatistics(good, neutral, bad)} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
