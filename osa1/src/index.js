import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ title }) => <h1>{title}</h1>;
const Total = ({ total }) => <p>Yhteensä {total} tehtävää</p>;
const Part = ({ name, exercises }) => <p>{name} {exercises}</p>;
const Content = ({ parts }) => parts.map(({ name, exercises }, i) =>
    <Part key={i} name={name} exercises={exercises} />);

const App = () => {
    const course = 'Half Stack -sovelluskehitys';
    const part1 = {
        name: 'Reactin perusteet',
        exercises: 10,
    };
    const part2 = {
        name: 'Tiedonvälitys propseilla',
        exercises: 7,
    };
    const part3 = {
        name: 'Komponenttien tila',
        exercises: 14,
    };

    return (
        <div>
            <Header title={course} />
            <Content parts={[part1, part2, part3]} />
            <Total total={part1.exercises + part2.exercises + part3.exercises} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
