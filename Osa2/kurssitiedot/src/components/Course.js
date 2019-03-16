import React from 'react';

const Header = ({ title }) => <h1>{title}</h1>;
const Part = ({ name, exercises }) => <p>{name} {exercises}</p>;
const Content = ({ parts }) => parts.map(({ name, exercises, id }) =>
  <Part key={id} name={name} exercises={exercises} />);
const Total = ({ parts }) =>
  <p>Yhteensä {parts.reduce((result, i) => result + i.exercises, 0)} tehtävää</p>;

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default Course;
