import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'

import { initializeAnecdotes }  from './reducers/anecdoteReducer'

const App = (props) => {

  useEffect(() => {
    props.initializeAnecdotes()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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

export default connect(null, { initializeAnecdotes })(App)