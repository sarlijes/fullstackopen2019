import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, cleanup } from "@testing-library/react"
import SimpleBlog from "./SimpleBlog"

afterEach(cleanup)

test("renders content", () => {
  const blog = {
    title: "Component testing",
    author: "Ken Lee",
    likes: 3
  }
  console.log(SimpleBlog)

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    "Component testing"
  )

})

test("renders title, author and likes", () => {
  const blog = {
    title: "Component testing",
    author: "Ken Lee",
    likes: 3
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const title = component.container.querySelector(".title")
  expect(title).toHaveTextContent(
    "Component testing"
  )

  const author = component.container.querySelector(".author")
  expect(author).toHaveTextContent(
    "Ken Lee"
  )

  const likes = component.container.querySelector(".likes")
  expect(likes).toHaveTextContent(
    "3"
  )

})
