const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs.map(blog => blog.toJSON()))
    })
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog.toJSON())
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
    const body = request.body

    const blog = new Blog({

        title: body.title,
        author: body.author,
        url: body.url,
        date: new Date()
    })
    if (!blog.likes) blog.likes = 0

    if (!blog.title || blog.title.length === 0) {
        return response.status(400).send({ error: 'Title is required' })
    }
    if (!blog.url || blog.url.length === 0) {
        return response.status(400).send({ error: 'URL  is required' })
    }

    blog.save()
        .then(savedBlog => {
            response.json(savedBlog.toJSON())
        })
        .catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const blog = {
        content: body.content,
        important: body.important
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog.toJSON())
        })
        .catch(error => next(error))
})

module.exports = blogsRouter