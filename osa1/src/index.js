import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ title }) => <h1>{title}</h1>;
const Total = ({ parts }) => <p>Yhteensä {parts.reduce((result, i) => result + i.exercises, 0)} tehtävää</p>;
const Part = ({ name, exercises }) => <p>{name} {exercises}</p>;
const Content = ({ parts }) => parts.map(({ name, exercises }, i) =>
    <Part key={i} name={name} exercises={exercises} />);

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [{
            name: 'Reactin perusteet',
            exercises: 10,
        }, {
            name: 'Tiedonvälitys propseilla',
            exercises: 7,
        }, {
            name: 'Komponenttien tila',
            exercises: 14,
        }]
    };

    return (
        <div>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
