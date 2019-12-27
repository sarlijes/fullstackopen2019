import React from 'react'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'
import { voteAnecdoteWithId } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const compareVotes = (a, b) => b.votes - a.votes

const AnecdoteList = (props) => {

    const upvote = (id) => {
        props.voteAnecdoteWithId(id)
        const anecdote = props.anecdotes.find(anecdote => anecdote.id === id)
        props.setNotification(`you voted '${anecdote.content}'`, 3)
    }

    return (
        <ul>
            {props
                .anecdotes
                .filter(a => a.content.includes(props.filter))
                .sort(compareVotes)
                .map(anecdote =>
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={() =>
                            upvote(anecdote.id)
                        }
                    />
                )}
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
        notification: state.notification
    }
}

const ConnectedAnecdoteList = connect(mapStateToProps, { voteAnecdoteWithId, setNotification })(AnecdoteList)

export default ConnectedAnecdoteList