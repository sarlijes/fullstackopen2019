import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './App.css';

const Display = (props) => {
    return (
        <div>{props.label}: {props.value}</div>
    )
}

const Statistics = (props) => {

    if (props.allFeedbacks.length === 0) {
        return (
            <div>No feedback given</div>
        )
    }
    let sum = 0.0
    props.allFeedbacks.forEach(value => {
        sum = sum + parseInt(value, 10)
    })
    let average = sum / props.allFeedbacks.length

    let positives = 100 * props.positive / props.allFeedbacks.length + " %"
    return (
        <div>
            <Statistic label="Good" value={props.positive} />
            <Statistic label="Neutral" value={props.neutral} /> 
            <Statistic label="Bad" value={props.negative} />
            <Statistic label="Total" value={props.allFeedbacks.length} />
            <Statistic label="Average" value={average} />
            <Statistic label="Positives" value={positives} /> 
        </div>
    )
}

const Statistic = (props) => {
    return (
        <Display label={props.label} value={props.value}/>
    )
}


const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const App = props => {
    const [positive, setPositive] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [negative, setNegative] = useState(0)
    const [allFeedbacks, setAll] = useState([])

    const setToGood = newValue => {
        setAll(allFeedbacks.concat('1'))
        setPositive(newValue)
    }
    const setToNeutral = newValue => {
        setAll(allFeedbacks.concat('0'))
        setNeutral(newValue)
    }
    const setToBad = newValue => {
        setAll(allFeedbacks.concat('-1'))
        setNegative(newValue)
    }

    return (
        <div>
            <div className="App">
                <header className="App-header">
                    <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple118/v4/11/d3/04/11d30405-e164-7877-9f11-ee7ae8353b00/source/512x512bb.jpg" className="App-logo" alt="logo" />
                    <h1>Give feedback</h1>
                    <Button handleClick={() => setToGood(positive + 1)} text="positive" />
                    <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
                    <Button handleClick={() => setToBad(negative + 1)} text="negative" />
                    <h1>Statistics</h1>
                    <Statistics positive={positive} neutral={neutral} negative={negative} allFeedbacks={allFeedbacks} />
                </header>
            </div>
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'))