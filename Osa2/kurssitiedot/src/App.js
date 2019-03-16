import React from 'react';
import Course from './components/Course';

const App = () => {
  const courses = [{
    name: 'Half Stack -sovelluskehitys',
    parts: [{
      name: 'Reactin perusteet',
      exercises: 10,
      id: 1,
    }, {
      name: 'Tiedonvälitys propseilla',
      exercises: 7,
      id: 2,
    }, {
      name: 'Komponenttien tila',
      exercises: 14,
      id: 3,
    }, {
      name: 'Redux',
      exercises: 7,
      id: 4,
    }]
  }, {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewaret',
        exercises: 7,
        id: 2
      }
    ]
  }, {
    name: 'Angular',
    id: 3,
    parts: [
      {
        name: 'Router',
        exercises: 4,
        id: 1
      },
      {
        name: 'NGXS',
        exercises: 6,
        id: 2
      }
    ]
  }];

  return courses.map(course => <Course course={course} />);
}

export default App;
