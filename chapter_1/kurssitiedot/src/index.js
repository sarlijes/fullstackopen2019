import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part nimi={props.parts[0].name} harjoitus={props.parts[0].exercises} />
            <Part nimi={props.parts[1].name} harjoitus={props.parts[1].exercises} />
            <Part nimi={props.parts[2].name} harjoitus={props.parts[2].exercises} />
        </div>
    )
}

const Total = (props) => {
    // console.log(props)
    // console.log(props[0])
    return (
        <div>

            <p>yht. {props.parts[0].exercises + props.parts[1].exercises
            + props.parts[2].exercises} tehtävää
            </p>

            {/* <p>yht. {props.total} tehtävää
            </p> */}
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.nimi} {props.harjoitus}
            </p>
        </div>
    )
}

const App = () => {
    const course = 'Half Stack -sovelluskehitys'

    const parts = [
        {
            name: 'Reactin perusteet',
            exercises: 10
        },
        {
            name: 'Tiedonvälitys propseilla',
            exercises: 7
        },
        {
            name: 'Komponenttien tila',
            exercises: 14
        }
    ]


    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts} />
           </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))