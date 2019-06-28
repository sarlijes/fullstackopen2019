import React, { useState, useEffect } from "react"
import "./App.css"
import blogService from "./services/blogs"
import loginService from "./services/loginService"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import Blog from "./components/Blog"

const Bloglist = ({ blogs, handleDeleteButtonPress, handleSelectBlogChange, handleLike }) => {
  return (
    <>{blogs
      .sort((b1, b2) => b2.likes - b1.likes)
      .map(blog => <Blog key={blog.id} blog={blog} handleDeleteButtonPress={() => handleDeleteButtonPress(blog.id)}
        handleSelectBlogChange={() => handleSelectBlogChange(blog.id)}
        handleLike={() => handleLike(blog.id)} />)}</>
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
  const [notification, setNotification] = useState()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [selectedBlog, setSelectedBlog] = useState(null)
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
      .getAll()
      .then(console.log("moi"))
      .then(blogsFromDatabase => {
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

  const handleDeleteButtonPress = id => {
    const blogToBeDeleted = blogs.find(b => b.id === id)
    blogService
      .deleteBlog(blogToBeDeleted.id, user)
      .then(filter => {
        setBlogs(blogs.filter(b => b.id !== id))
      })
    changeNotification(`Deleted ${blogToBeDeleted.title}`)
  }

  const handleSelectBlogChange = id => {
    const blogToBeSelected = blogs.find(b => b.id === id)
    setSelectedBlog(blogToBeSelected)
    blogToBeSelected.showDetails = true
    blogs.filter(b => b.id !== id).map(blog => blog.showDetails = false)
  }

  const handleLike = (id) => async () => {
    const blogToBeLiked = blogs.find(b => b.id === id)
    const allOtherBlogs = blogs.filter(b => b.id !== blogToBeLiked.id)
    try {
      const updatedBlog = await blogService.update(blogToBeLiked.id, {
        author: blogToBeLiked.author,
        title: blogToBeLiked.title,
        likes: blogToBeLiked.likes + 1,
        url: blogToBeLiked.url,
        user: blogToBeLiked.user._id
      })
      setBlogs(allOtherBlogs.concat(updatedBlog))
      // setSelectedBlog(updatedBlog)
      changeNotification(`You have liked ${blogToBeLiked.title} <3`)
      // changeNotification("You have liked <3")
    } catch (err) {
      console.log(err)
    }
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

  // render() {
  const login = () => (
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
  const blogFormRef = React.createRef()

  const blogList = () => (
    <div className="App">
      <header className="App-header">
        <h1>Blog post app</h1>
      </header>
      <div className="App-body">
        <div>
          <p>{user.name} logged in</p>
          <div><button onClick={handleLogout}>Log out</button></div>
          <div></div>
          <Notification message={notification} />
          <Togglable buttonLabel='new blog' ref={blogFormRef} >
            {/* <Togglable buttonLabel='add new blog' ref={BlogForm} > */}
            <BlogForm
              createNewBlogPost={createNewBlogPost}
              newAuthor={newAuthor} newTitle={newTitle}
              newUrl={newUrl} handleTitleChange={handleTitleChange}
              handleUrlChange={handleUrlChange}
              handleAuthorChange={handleAuthorChange} />
          </Togglable>
        </div>
        <Bloglist blogs={blogs}
          handleDeleteButtonPress={handleDeleteButtonPress}
          selectedBlog={selectedBlog} setSelectedBlog={setSelectedBlog}
          handleSelectBlogChange={handleSelectBlogChange}
          handleLike={handleLike}
        />
      </div>
    </div>
  )
  // }

  return (
    <div>
      {user === null ? login() : blogList()}
    </div>
  )
}
export default App