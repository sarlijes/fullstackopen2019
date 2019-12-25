import React from "react"
import { render, waitForElement } from "@testing-library/react"
jest.mock("./services/__mocks__/blogs")
import App from "./App"

describe("<App />", () => {
    test("show login page if no logged in user", async () => {
        let component

        component = render(
            <App />
        )
        component.rerender(<App />)

        await waitForElement(
            () => component.getByText("login")
        )

        expect(component.container).toHaveTextContent("username")
        expect(component.container).toHaveTextContent("password")

        // await waitForElement(
        //     () => component.container.querySelector(".blog")
        // )

        // const blogs = component.container.querySelectorAll(".blog")
        // expect(blogs.length).toBe(2)

        // expect(component.container).toHaveTextContent(
        //     "HTML is easy"
        // )
        // expect(component.container).toHaveTextContent(
        //     "Browser can execute only javascript"
        // )
    })
})

