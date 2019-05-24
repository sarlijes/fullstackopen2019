import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import './index.css';

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setAll] = useState([].Array.apply(null, Array(6)).map(Number.prototype.valueOf, 0))

    const handleVote = selected => {
        const copy = [...points]
        copy[selected] += 1
        setAll(copy)
    }

    return (
        <div>
            <div className="App">
                <header className="App-header">
                    <Display anecdote={props.anecdotes[selected]} votes={points[selected]} />
                    <Button handleClick={() => handleVote(selected)} text="Vote" />
                    <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="Next one" />
                </header>
            </div>
        </div>
    )
}

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

// let points = Array.apply(null, Array(6)).map(Number.prototype.valueOf, 0);

const Display = (props) => {
    return (
        <div>
            <div>{props.anecdote}</div>
            Votes: <div>{props.votes}</div>
        </div>
    )
}

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)