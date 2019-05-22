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
            <Part nimi={props.osa1} harjoitus={props.tehtavia1} />
            <Part nimi={props.osa2} harjoitus={props.tehtavia2} />
            <Part nimi={props.osa3} harjoitus={props.tehtavia3} />
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
                {props.nimi} {props.harjoitus}
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