import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Hello = ({name, age}) => (
    <div>
        <p>Hello {name}, you are {age} years</p>
    </div>
);

const App = () => {
    const young = 17;
    return (
        <div>
            <Hello name="Jussi" age={young} />
            <Hello name="Matti" age={young + 7} />
            <Hello name="Pekka" age={99} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
