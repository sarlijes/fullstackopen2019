import React, { useState, useEffect } from 'react'
import './App.css'


const App = () => {


  /*
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    noteService
      .getAll().then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  // ...

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  }
*/
  return (

    <div className="App">
      <header className="App-header">
        <h1>
          Blog post app
        </h1>
      </header>

      <div className="App-body">
        tekstiä
      </div>
    </div>
    /*
        <div>
          <h1>Notes</h1>
          <Notification message={errorMessage} />
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
          // ...
        </div>
        */
  )
}

export default App


