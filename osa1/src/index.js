import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ title }) => <h1>{title}</h1>;
const Total = ({ total }) => <p>Yhteensä {total} tehtävää</p>;
const Part = ({ name, quantity }) => <p>{name} {quantity}</p>;
const Content = ({ parts }) => parts.map(({ name, quantity }, i) =>
    <Part key={i} name={name} quantity={quantity} />);

const App = () => {
    const course = 'Half Stack -sovelluskehitys';
    const part1 = 'Reactin perusteet';
    const exercises1 = 10;
    const part2 = 'Tiedonvälitys propseilla';
    const exercises2 = 7;
    const part3 = 'Komponenttien tila';
    const exercises3 = 14;

    return (
        <div>
            <Header title={course} />
            <Content parts={[
                { name: part1, quantity: exercises1 },
                { name: part2, quantity: exercises2 },
                { name: part3, quantity: exercises3 }
            ]} />
            <Total total={exercises1 + exercises2 + exercises3} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
