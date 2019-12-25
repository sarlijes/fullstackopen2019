import React from "react"
import { render, fireEvent } from "@testing-library/react"
import SimpleBlog from "./SimpleBlog"


  const blog = {
    title: "Component testing",
    author: "Ken Lee",
    likes: 3
     }
test("renders content", () => {

 

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    "Component testing"
  )

})
