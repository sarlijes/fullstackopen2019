import React, { useState, useEffect } from "react"
import "./App.css"
import blogService from "./services/blogs"
import loginService from "./services/loginService"
import BlogForm from "./components/BlogForm"

const Bloglist = ({ blogs }) => {
  // console.log("blogs bloglistissa ", blogs)
  return (
    <>{blogs.map(blog => <Blog key={blog.id} blog={blog} />)}</>
  )
}
const Blog = ({ blog }) => {
  return (
    <div>{blog.author}:
      <a href={blog.url}>{blog.title}</a>
      {/* <button onClick={handleDeleteButtonPress}>delete</button> */}
    </div>
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
  const [newBlog, setNewBlog] = useState("")
  // const [showAll, setShowAll] = useState(true)
  const [notification, setNotification] = useState()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const [newAuthor, setNewAuthor] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const [newUrl, setNewUrl] = useState("")

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

  const handleLogout = async (event) => {
    event.preventDefault()
    blogService.removeToken()
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        "loggedNoteappUser", JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      changeNotification("Wrong username or password")
    }
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }


  const createNewBlogPost = (event) => {

    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    changeNotification("Added " + newTitle + " by " + newAuthor)

    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setNewBlog("")
      })

  }

  if (user === null) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Blog post app</h1>
        </header>
        <div className="App-body">
          <h2>Log in to application</h2>
          <div><Notification message={notification} /></div>

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
          <div><button onClick={handleLogout}>Log out</button></div>
          <div></div>
          <BlogForm
            createNewBlogPost={createNewBlogPost}
            newAuthor={newAuthor} newTitle={newTitle}
            newUrl={newUrl} handleTitleChange={handleTitleChange}
            handleUrlChange={handleUrlChange}
            handleAuthorChange={handleAuthorChange} />
          <Notification message={notification} />
        </div>

        <Bloglist blogs={blogs}
        // handleDeleteButtonPress={handleDeleteButtonPress}
        />
      </div>
    </div>
  )
}
export default App