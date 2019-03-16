import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, label }) => <button onClick={handleClick}>{label}</button>;

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState({});

    // Proudly loaned from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
    const vote = (selected) => () => {
        const update = { ...votes };
        update[selected] = (update[selected] || 0) + 1;
        setVotes(update);
    };

    return (
        <div>
            <p>{anecdotes[selected]}</p>
            <p>has {~~votes[selected]} votes</p>
            <Button label="vote" handleClick={vote(selected)} />
            <Button label="next anecdote" handleClick={() => setSelected(getRandomInt(anecdotes.length))} />
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
