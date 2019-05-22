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
    const osa1 = 'Reactin perusteet'
    const tehtavia1 = 10
    const osa2 = 'Tiedonvälitys propseilla'
    const tehtavia2 = 7
    const osa3 = 'Komponenttien tila'
    const tehtavia3 = 14
    return (

        <div>
            <Header course={course} />
             <Content osa1={osa1} tehtavia1={tehtavia1} 
            osa2={osa2} tehtavia2 = {tehtavia2}
            osa3={osa3} tehtavia3 = {tehtavia3}/>

            {/*  Content osa={osa1} tehtavia={tehtavia1} />
             Content osa={osa2} tehtavia={tehtavia2} />
             Content osa={osa3} tehtavia={tehtavia3} /> */}
            <Total yhteensa={tehtavia1 + tehtavia2 + tehtavia3} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))