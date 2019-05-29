import React from 'react';
import Course from './components/Course'
import { conditionalExpression } from '@babel/types';

const Header = props =>
  <h1>{props.name}</h1>

const Total = props => {
  const numbers = [];
  props.parts.map(part => numbers.push(part.exercises))
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = numbers.reduce(reducer);
  return <p>yhteensä {total} tehtävää</p>
}

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10,
        id: 1
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7,
        id: 2
      },
      {
        name: 'Komponenttien tila',
        exercises: 14,
        id: 3
      },
      {
        name: 'Konsolin käyttö',
        exercises: 594,
        id: 4
      }
    ]
  }

  const rows = () => course.parts.map(course =>
    <Course
      key={course.id}
      course={course}
    />
  )

  const result = course.parts.map(note => note.id)
  console.log(result)

  return (
    <div>
      <Header name={course.name} />
      <ul>
        {rows()}
      </ul>
      <Total parts={course.parts} />
    </div>
  )
}

export default App
