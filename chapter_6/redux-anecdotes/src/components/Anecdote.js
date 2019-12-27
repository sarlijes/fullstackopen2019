import React from 'react'

const Anecdote = ({ anecdote, handleClick }) => {
  const style = {
    marginBottom: 15
  }
  return (
    <li style={style}>
      {"id: "}
      {anecdote.id}
      {" : "}
      {anecdote.content}
      <button onClick={handleClick}>vote</button>
      {anecdote.votes}
    </li>
  )
}

export default Anecdote