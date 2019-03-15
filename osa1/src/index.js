import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Hello = () => (
    <div>
        <p>Hello world</p>
    </div>
);

const App = () => {
    return (
        <div>
            <Hello />
            <Hello />
            <Hello />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
