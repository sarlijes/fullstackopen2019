import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './App.css';

const Display = props => <div>{props.value}</div>

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const App = props => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const setToGood = newValue => {
        setGood(newValue)
    }
    const setToNeutral = newValue => {
        setNeutral(newValue)
    }
    const setToBad = newValue => {
        setBad(newValue)
    }
    return (
        <div>
            <div className="App">
                <header className="App-header">
                    <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple118/v4/11/d3/04/11d30405-e164-7877-9f11-ee7ae8353b00/source/512x512bb.jpg" className="App-logo" alt="logo" />
                    <p>Give feedback, please</p>
                    <Button handleClick={() => setToGood(good + 1)} text="good" />
                    <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
                    <Button handleClick={() => setToBad(bad + 1)} text="bad" />
                    <p>Statistics</p>
                    <p>Good: </p><Display value={good} />
                    <p>Neutral: </p><Display value={neutral} />
                    <p>Bad: </p><Display value={bad} />
                </header>
            </div>
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'))

