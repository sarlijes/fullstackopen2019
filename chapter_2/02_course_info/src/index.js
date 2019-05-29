import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const Header = props =>
    <h1>{props.course}</h1>

const Total = props => {
    const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
    return <p>yhteensä {total} tehtävää</p>
}

const Part = props =>
    <p>{props.part.name} {props.part.exercises}</p>

// const Content = props => (
//     <div>
//         <Part part={props.parts[0]} />
//         <Part part={props.parts[1]} />
//         <Part part={props.parts[2]} />
//     </div>
// )

const courses = {
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
        }
    ]
}

ReactDOM.render(
    <App courses={courses} />,
    document.getElementById('root')
)