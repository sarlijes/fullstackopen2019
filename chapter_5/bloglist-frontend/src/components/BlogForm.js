import React from "react"

const BlogForm = ({ newTitle, newAuthor, newUrl, createNewBlogPost, handleAuthorChange, handleTitleChange, handleUrlChange }) => (
  <div>
    <h2>Add new blog post</h2>
    <form onSubmit={createNewBlogPost}>
      <div><label>Title: </label>
        <input type='text' name='newTitle' value={newTitle} onChange={handleTitleChange} />
      </div>
      <div><label>Author:</label>
        <input type='text' name='newAuthor' value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div><label>URL: </label>
        <input type='text' name='newUrl' value={newUrl} onChange={handleUrlChange} />
      </div>
      <button type='submit'>Confirm</button>
    </form>
  </div>
)

export default BlogForm