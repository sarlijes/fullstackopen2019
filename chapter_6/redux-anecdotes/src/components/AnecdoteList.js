import React from 'react'
import { connect } from 'react-redux'

import Anecdote from './Anecdote'

// import { setFilter } from '../reducers/notificationReducer'
// import { emptyFilter } from '../reducers/notificationReducer'

import { voteAnecdoteWithId } from '../reducers/anecdoteReducer'

const compareVotes = (a, b) => b.votes - a.votes

const AnecdoteList = ({ props }) => {

    console.log(props)
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

const mapStateToProps = (store) => {
    console.log("mapStateToProps")
    console.log(store.anecdotes)
    return {
        anecdotes: store.anecdotes,
        filter: store.filter,
    }
}


export default connect(
    mapStateToProps
)(AnecdoteList)

//export default AnecdoteList