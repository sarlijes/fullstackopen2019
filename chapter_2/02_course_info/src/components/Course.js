import React from 'react'

const Header = props =>
    <h1>{props.name}</h1>

const Total = props => {
    const numbers = [];
    props.parts.map(part => numbers.push(part.exercises))
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const total = numbers.reduce(reducer);
    return <p>yhteensä {total} tehtävää</p>
}

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

const Row = (course) => course.parts.map(part =>
    <div>{part.name}, {part.exercises}</div>
)

export default Course