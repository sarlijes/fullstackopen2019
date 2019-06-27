import React, { useState, useEffect } from "react"
import "./App.css"
import blogService from "./services/blogs"
import loginService from "./services/loginService"

const Bloglist = ({ blogs }) => {
  // console.log("blogs bloglistissa ", blogs)
  return (
    <>{blogs.map(blog => <Blog key={blog.id} blog={blog} />)}</>
  )
}
const Blog = ({ blog }) => {
  return (
    <li>{blog.author}: {blog.title}
      {/* <button onClick={handleDeleteButtonPress}>delete</button> */}
    </li>
  )
}

const Notification = ({ message }) => {
  if (message === undefined) {
    return null
  }
  return (
    <div className="error">{message}</div>
  )
}

const App = () => {

  const [blogs, setBlogs] = useState([])
  // const [newNote, setNewNote] = useState('')
  // const [showAll, setShowAll] = useState(true)
  const [notification, setNotification] = useState()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  // console.log("App alussa user ------------------", user)

  const changeNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(undefined)
    }, 3000)
  }

  useEffect(() => {
    blogService
      .getAll().then(blogsFromDatabase => {
        setBlogs(blogsFromDatabase)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      console.log("user --------- handlelogin", user)
      // window.localStorage.setItem(
      //   "loggedNoteappUser", JSON.stringify(user)
      // )
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      // ...
    }
  }
  if (user === null) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Blog post app</h1>
        </header>
        <div className="App-body">
          <h2>Log in to application</h2>
          <Notification message={notification} />
          <form onSubmit={handleLogin}>
            <div>username
              <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}
              />
            </div><button type="submit">login</button>
          </form>
        </div>
      </div>
    )
  }

  return (

    <div className="App">
      <header className="App-header">
        <h1>Blog post app</h1>
      </header>
      <div className="App-body">
        <div>
          <p>{user.name} logged in</p>
          {/* {noteForm()} */}
        </div>

        <Bloglist blogs={blogs}
        // handleDeleteButtonPress={handleDeleteButtonPress}
        />
      </div>
    </div>
  )
}
export default App