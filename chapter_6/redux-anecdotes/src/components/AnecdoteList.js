import React from 'react'
import { connect } from 'react-redux'

import Anecdote from './Anecdote'

import { voteAnecdoteWithId } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const compareVotes = (a, b) => b.votes - a.votes

const AnecdoteList = ( props ) => {

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
                            props.dispatch(voteAnecdoteWithId(anecdote.id, props))
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

const ConnectedAnecdoteList = connect(mapStateToProps)(AnecdoteList)

export default ConnectedAnecdoteList

