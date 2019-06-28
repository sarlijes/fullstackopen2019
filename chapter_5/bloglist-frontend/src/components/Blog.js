import React from "react"

const Blog = ({ blog, handleDeleteButtonPress, handleSelectBlogChange, handleLike }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  const renderDetails = () => (
    <>
      <div>Posted by: {blog.user.name}</div>
      <div>Likes: {blog.likes}</div> 
      <button onClick={handleLike(blog)}>like</button>
    </>
  )
  const renderShowInfoButton = () => (
    <button onClick={handleSelectBlogChange}>Show more info</button>
  )

  return (
    <div style={blogStyle}>
      <div>
        {blog.author} {blog.title}
      </div>
      {blog.showDetails === true ?
        renderDetails() :
        renderShowInfoButton()
      }
    </div>
  )
}

export default Blog