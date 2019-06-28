import React from "react"

const BlogForm = ({ newTitle, newAuthor, newUrl, createNewBlogPost, handleAuthorChange, handleTitleChange, handleUrlChange }) => (
  <div>
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
      <div><small>please include the http:// in the URL</small></div>
      <button type='submit'>Confirm</button>
    </form>
  </div>
)

export default BlogForm