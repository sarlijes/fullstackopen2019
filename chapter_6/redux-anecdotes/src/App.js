import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import NewAnecdote from './components/NewAnecdote'

const App = (props) => {

  return (
    <div>
      <NewAnecdote store={props.store} />
      <AnecdoteList store={props.store} />
    </div>
  )
}

export default App
