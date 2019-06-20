const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)



beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

test('blog posts are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('the two initial blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('a specific blog post is within the returned data', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain('React patterns')
})

test('the first blog post is about React patterns ', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].title).toBe('React patterns')
})

test('the blog post object has an id defined (instead if an "__id")', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.id).toBeDefined
})

test('adding one blog post increases the amount of posts', async () => {

    const newBlog =
    {
        title: 'async/await simplifies making async calls',
        author: "Jane Doe",
        url: "https://not.here",
        likes: 73,
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)
    expect(response.body.length).toBe(helper.initialBlogs.length + 1)
    expect(titles).toContain('async/await simplifies making async calls')
})
/*

      const blogsAtEnd = await helper.blogInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

      const contents = blogsAtEnd.map(b => b.content)
      expect(contents).toContain('async/await simplifies making async calls')
    })

    test('fails with status code 400 if data invailid', async () => {
      const newBlog = {
        important: true
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })
  })
*/
afterAll(() => {
    mongoose.connection.close()
})