import React from 'react';
import Course from './components/Course'

const App = ({ courses }) => {
  console.log(courses)
  const rows = () => courses.map(course =>
    <Course
      key={course.id}
      course={course}
    />
  )

  return (
    <div>
      <h1>Otsikko</h1>
      <ul>
        {rows()}
      </ul>

    </div>
  )
}

export default App
