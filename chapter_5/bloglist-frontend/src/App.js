import React, { useState, useEffect } from "react"
import "./App.css"
import blogService from "./services/blogService"
import loginService from "./services/loginService"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import Bloglist from "./components/Bloglist"
import { useField } from "./hooks/index"

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
    const [user, setUser] = useState(null)
    const [selectedBlog, setSelectedBlog] = useState(null)

    const newAuthor = useField("text")
    const newTitle = useField("text")
    const newUrl = useField("text")

    const username = useField("text")
    const password = useField("password")

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
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        const credentials = {
            username: username.value,
            password: password.value
        }

        try {
            const user = await loginService.login(credentials)
            window.localStorage.setItem(
                "loggedBlogAppUser", JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            username.reset("")
            password.reset("")
        } catch (exception) {
            changeNotification("Wrong username or password")
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        blogService.removeToken()
        setUser(null)
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
            title: newTitle.value,
            author: newAuthor.value,
            url: newUrl.value,
            user: user
        }
        changeNotification("Added " + newTitle.value + " by " + newAuthor.value)
        blogService
            .create(blogObject)
            .then(data => {
                setBlogs(blogs.concat(data))
                newAuthor.reset("")
                newTitle.reset("")
                newUrl.reset("")
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
                <LoginForm className="loginform"
                    username={skipReset(username)}
                    password={skipReset(password)}
                    handleLogin={handleLogin}
                />
            </div>
        </div>
    )
    const blogFormRef = React.createRef()

    const skipReset = (hook) => {
        // eslint-disable-next-line no-unused-vars
        let { reset, ...hookWithoutAnyReset } = hook
        return hookWithoutAnyReset
    }

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
                        <h4>Add new blog post</h4>
                        <BlogForm
                            createNewBlogPost={createNewBlogPost}
                            newAuthor={skipReset(newAuthor)}
                            newTitle={skipReset(newTitle)}
                            newUrl={skipReset(newUrl)}
                        // newAuthor={newAuthor}
                        // newTitle={newTitle}
                        // newUrl={newUrl}
                        />
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