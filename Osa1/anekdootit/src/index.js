import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, label }) => <button onClick={handleClick}>{label}</button>;

const Anecdote = ({ title, text, votes }) => (
    <div>
        <h2>{title}</h2>
        <p>{text}</p>
        <p>has {votes} votes</p>
    </div>
);

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

    // Proudly loaned from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
    const vote = (selected) => () => {
        const update = [...votes];
        update[selected] += 1;
        setVotes(update);
    };
    const voteLead = () => votes.reduce((result, count, index) => {
        return count > result.count ? { index, count } : result;
    }, { index: 0, count: 0 });

    return (
        <div>
            <Anecdote title="Anecdote of the Day" text={anecdotes[selected]} votes={votes[selected]} />
            <Button label="vote" handleClick={vote(selected)} />
            <Button label="next anecdote" handleClick={() => setSelected(getRandomInt(anecdotes.length))} />
            {!!voteLead().count && <Anecdote title="Anecdote with most votes" text={anecdotes[voteLead().index]} votes={votes[voteLead().index]} />}
        </div>
    );
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
