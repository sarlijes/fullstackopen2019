import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { emptyNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        // props.dispatch(
        //     createAnecdote(content)
        // )
        const newAnecdote = await anecdoteService.createNew(content)
        props.createAnecdote(newAnecdote)
        props.dispatch(setNotification(`you added '${content}'`))
        setTimeout(() => {
            props.dispatch(emptyNotification())
        }, 5000)
    }

    return (
        <form onSubmit={addAnecdote}>
            <input name="anecdote" />
            <button type="submit">add</button>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
        notification: state.notification
    }
}

// export default connect(
//     null,
//     { createAnecdote }
//   )(AnecdoteForm)

const ConnectedAnecdoteForm = connect(mapStateToProps, { createAnecdote })(AnecdoteForm)

export default ConnectedAnecdoteForm
