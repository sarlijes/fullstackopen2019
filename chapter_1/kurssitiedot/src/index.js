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
            <Part nimi={props.osa1} harjoitus={props.tehtavia1} />
            <Part nimi={props.osa2} harjoitus={props.tehtavia2} />
            <Part nimi={props.osa3} harjoitus={props.tehtavia3} />
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>yht. {props.yhteensa} tehtävää
            </p>
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

    const part1 = {
        name: 'Reactin perusteet',
        exercises: 10
    }
    const part2 = {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
    }
    const part3 = {
        name: 'Komponenttien tila',
        exercises: 14
    }

    return (

        <div>
            <Header course={course} />
            <Content osa1={part1.name} tehtavia1={part1.exercises}
                osa2={part2.name} tehtavia2={part2.exercises}
                osa3={part1.name} tehtavia3={part3.exercises} />

            {/*  Content osa={osa1} tehtavia={tehtavia1} />
             Content osa={osa2} tehtavia={tehtavia2} />
             Content osa={osa3} tehtavia={tehtavia3} /> */}
            <Total yhteensa={part1.exercises + part2.exercises + part3.exercises} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))