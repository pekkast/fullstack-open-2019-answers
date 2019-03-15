import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
    return (
        <div>
            <p>Hello World! Its {(new Date()).toString()}</p>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
