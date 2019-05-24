import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './App.css';

const Display = (props) => {
    return (
        <div>{props.label}: {props.value}</div>
    )
}

const Positives = (props) => {
    // let positivesCount = 1

    // for (let i = 0; i < props.allFeedbacks.length; i++) {
    //     if (props.allFeedbacks[i] === 1) {
    //         positivesCount++;
    //     }
    // }

    if (props.allFeedbacks.length === 0) {
        return (
            <div>{props.label} 0.0 % </div>
        )
    }

    return (
        <div> {props.label} { 100 * props.positivesCount / props.allFeedbacks.length } {"%"} </div>
    )

}

const Average = (props) => {
    let sum = 0

    props.allFeedbacks.forEach(value => {
        sum = sum + parseInt(value, 10)
    })

    if (props.allFeedbacks.length === 0) {
        return (
            <div>{props.label} 0.0 </div>
        )
    }

    return (
        <div> {props.label} {sum / props.allFeedbacks.length} </div>
    )
}

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const App = props => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [allFeedbacks, setAll] = useState([])
    const setToGood = newValue => {
        setAll(allFeedbacks.concat('1'))
        setGood(newValue)
    }
    const setToNeutral = newValue => {
        setAll(allFeedbacks.concat('0'))
        setNeutral(newValue)
    }
    const setToBad = newValue => {
        setAll(allFeedbacks.concat('-1'))
        setBad(newValue)
    }

    return (
        <div>
            <div className="App">
                <header className="App-header">
                    <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple118/v4/11/d3/04/11d30405-e164-7877-9f11-ee7ae8353b00/source/512x512bb.jpg" className="App-logo" alt="logo" />
                    <div>Give feedback</div>
                    <Button handleClick={() => setToGood(good + 1)} text="good" />
                    <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
                    <Button handleClick={() => setToBad(bad + 1)} text="bad" />
                    <div>Statistics</div>
                    <div><Display label="Good" value={good} /></div>
                    <div><Display label="Neutral" value={neutral} /> </div>
                    <div><Display label="Bad" value={bad} /></div>
                    <div><Display label="Total" value={allFeedbacks.length} /></div>
                    <div><Average label="Average" allFeedbacks={allFeedbacks} /></div>
                    <div><Positives label="Positives" allFeedbacks={allFeedbacks} positivesCount={good} /></div>
                </header>
            </div>
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'))

