import React from 'react'
import Anecdote from './Anecdote'

// import { setFilter } from '../reducers/notificationReducer'
// import { emptyFilter } from '../reducers/notificationReducer'

import { voteAnecdoteWithId } from '../reducers/anecdoteReducer'

const compareVotes = (a, b) => b.votes - a.votes

const AnecdoteList = ({ store }) => {

    return (
        <ul>
            {store.getState()
                .anecdotes
                .filter(a => a.content.includes(store.getState().filter))
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