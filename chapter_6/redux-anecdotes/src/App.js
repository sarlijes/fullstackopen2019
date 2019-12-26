import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = (props) => {
  const style = {
    marginBottom: 15
  }
  return (
    <div>
      <h1>Programming anecdotes</h1>
      <div style={style}>
        <AnecdoteForm />
      </div>
      <Filter />
      <AnecdoteList />
      <Notification />
    </div>
  )
}

export default App
