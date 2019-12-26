import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { emptyNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.store.dispatch(
            createAnecdote(content)
        )
        props.store.dispatch(setNotification(`you added '${content}'`))
        setTimeout(() => {
            props.store.dispatch(emptyNotification())
        }, 5000)
    }

    return (
        <form onSubmit={addAnecdote}>
            <input name="anecdote" />
            <button type="submit">add</button>
        </form>
    )
}

export default AnecdoteForm