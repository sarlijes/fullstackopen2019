import React from 'react';
import { createStore } from 'redux'
import reducer from './reducers/anecdoteReducer'


const App = (props) => {
  const anecdotes = props.store.getState()

  const store = createStore(reducer)

  const vote = (id) => {
    store.dispatch({
      type: 'UPVOTE',
      data: { id }
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
/*
  const createVoteAction = (id) => {
    return {
      type: 'UPVOTE',
      data: { id }
    }
  }

  const vote = (id) => () => {
    store.dispatch(vote(id))
  }*/