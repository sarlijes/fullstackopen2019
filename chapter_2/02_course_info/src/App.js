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
  const courses = [
    {
      name: 'Half Stack -sovelluskehitys',
      id: 1,
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
        }
      ]
    },
    {
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
    }
  ]
  const oneCourse = (course) => 
    <div>
      <Header name={course.name} />
      <ul>
        {partRow(course)}
      </ul>
      <Total parts={course.parts} />
    </div>
  

  const partRow = (course) => course.parts.map(course =>
    <Course
      key={course.id}
      course={course}
    />
  )

  return (
    <div>
      {courses.map(course => <div>{oneCourse(course)}</div>)}
    </div>
  )
}

export default App
