import React from 'react'

const Header = props =>
    <h1>{props.name}</h1>

    // count the total of each course's assignments
const Total = props => {
    const numbers = [];
    props.parts.map(part => numbers.push(part.exercises))
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const total = numbers.reduce(reducer);
    return <p>yhteensä {total} tehtävää</p>
}
// render the course
const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <ul>
                {Row(course)}
            </ul>
            <Total parts={course.parts} />
        </div>
    )
}
// render the rows
const Row = (course) => course.parts.map(part =>
    <div key={part.id}> {part.name}, {part.exercises}</div>
)

export default Course