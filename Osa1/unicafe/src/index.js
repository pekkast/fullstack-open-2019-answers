import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Heading = ({ text }) => <h2>{text}</h2>;
const Button = ({ handleClick, label }) => <button onClick={handleClick}>{label}</button>;
const Statistic = ({ text, value }) => <tr><th>{text}</th><td>{value}</td></tr>;
const Statistics = (props) => {
    return props.count ? (
        <table>
            <tbody>
                <Statistic text="hyvä" value={props.good} />
                <Statistic text="neutraali" value={props.neutral} />
                <Statistic text="huono" value={props.bad} />
                <Statistic text="yhteensä" value={props.count} />
                <Statistic text="keskiarvo" value={props.average} />
                <Statistic text="positiivisia" value={`${props.positive} %`} />
            </tbody>
        </table>
    ) : <p>Ei yhtään palautetta vielä</p>;
}

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
