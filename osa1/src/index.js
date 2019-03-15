import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ title }) => <h1>{title}</h1>;
const Total = ({ parts }) => <p>Yhteensä {parts.reduce((result, i) => result + i.exercises, 0)} tehtävää</p>;
const Part = ({ name, exercises }) => <p>{name} {exercises}</p>;
const Content = ({ parts }) => parts.map(({ name, exercises }, i) =>
    <Part key={i} name={name} exercises={exercises} />);

const App = () => {
    const course = 'Half Stack -sovelluskehitys';
    const parts = [{
        name: 'Reactin perusteet',
        exercises: 10,
    }, {
        name: 'Tiedonvälitys propseilla',
        exercises: 7,
    }, {
        name: 'Komponenttien tila',
        exercises: 14,
    }];

    return (
        <div>
            <Header title={course} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
