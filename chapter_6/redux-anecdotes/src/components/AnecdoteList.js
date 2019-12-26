import React from 'react'
import Anecdote from './Anecdote'

import { voteAnecdoteWithId } from '../reducers/anecdoteReducer'

const compareVotes = (a, b) => b.votes - a.votes

const AnecdoteList = ({ store }) => {
    return (
        <ul>
            {store.getState()
                .anecdotes
                .sort(compareVotes)
                .map(anecdote =>
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={() =>
                            store.dispatch(voteAnecdoteWithId(anecdote.id, store))
                        }
                    />
                )}
        </ul>
    )
}

export default AnecdoteList