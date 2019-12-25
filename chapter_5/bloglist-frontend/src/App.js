import React, { useState, useEffect } from "react"
import "./App.css"
import blogService from "./services/blogService"
import loginService from "./services/loginService"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import Bloglist from "./components/Bloglist"

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

    const handleLogout = async (event) => {
        event.preventDefault()
        blogService.removeToken()
        setUser(null)
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

    const handleDeleteButtonPress = (id) => async () => {
        const blogToBeDeleted = blogs.find(b => b.id === id)
        const allOtherBlogs = blogs.filter(b => b.id !== blogToBeDeleted.id)
        try {
            blogService
                .deleteBlog(blogToBeDeleted.id)
            setBlogs(allOtherBlogs)
            changeNotification(`Deleted ${blogToBeDeleted.title}`)
        } catch (err) {
            console.log(err)
        }
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
            changeNotification(`You have liked ${blogToBeLiked.title} <3`)
        } catch (err) {
            console.log(err)
        }
    }

    const createNewBlogPost = (event) => {
        event.preventDefault()
        const blogObject = {
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            user: user
        }
        changeNotification("Added " + newTitle + " by " + newAuthor)
        blogService
            .create(blogObject)
            .then(data => {
                setBlogs(blogs.concat(data))
                setNewTitle("")
                setNewAuthor("")
                setNewUrl("")
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
                <LoginForm
                    handleLogin={handleLogin} username={username} setUsername={setUsername}
                    password={password} setPassword={setPassword}
                />
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
                        <h2>Add new blog post</h2>
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
                    user={user}
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