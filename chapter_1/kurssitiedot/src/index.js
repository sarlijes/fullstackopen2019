import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi}</h1>
        </div>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            <Part name={props.part1} exercise={props.exercises1} />
            <Part name={props.part2} exercise={props.exercises2} />
            <Part name={props.part3} exercise={props.exercises3} />
        </div>
    )
}

const Yhteensa = (props) => {
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
                {props.name} {props.exercise}
            </p>
        </div>
    )
}

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = 'Reactin perusteet'
    const tehtavia1 = 10
    const osa2 = 'Tiedonvälitys propseilla'
    const tehtavia2 = 7
    const osa3 = 'Komponenttien tila'
    const tehtavia3 = 14
    return (

        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto osa={osa1} tehtaviä={tehtavia1} />
            <Sisalto osa={osa2} tehtaviä={tehtavia2} />
            <Sisalto osa={osa3} tehtaviä={tehtavia3} />
            <Yhteensa yhteensa={tehtavia1 + tehtavia2 + tehtavia3} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))