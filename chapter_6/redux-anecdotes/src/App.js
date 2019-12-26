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
    <div style={style}>
      <div style={style}>
        <AnecdoteForm store={props.store} />
      </div>

      <Filter store={props.store} />
      <AnecdoteList />
      <Notification store={props.store} />
    </div>
  )
}

export default App
