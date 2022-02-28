import React from "react"
import { mount } from "@cypress/react"
import { BrowserRouter as Router } from "react-router-dom"
// import App from "../App"
import EditGroup from "../components/groupPage/EditGroup"

describe("Edit group component", () => {
  it("wrong email/password combination gives error", () => {
    mount(
      <Router>
        <EditGroup />
      </Router>
    )
  })
})
