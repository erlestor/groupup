import React from "react"
import { mount } from "@cypress/react"
import App from "../App"
import Login from "../components/login/Login"
import { BrowserRouter as Router } from "react-router-dom"

describe("Login component", () => {
  it("wrong email/password combination gives error", () => {
    mount(
      <Router>
        <Login />
      </Router>
    )

    cy.get("input[type='email']").type("1@2.com")
    cy.get("input[type='password']").type("ikkematchendepassord")
    cy.get("input[type='submit']").click()
    cy.get("p").contains("Invalid email/password combination")
  })

  it("incomplete form gives error", () => {
    mount(
      <Router>
        <Login />
      </Router>
    )

    cy.get("input[type='email']").type("1@2.com")
    cy.get("input[type='submit']").click()
    cy.get(".error").contains("Invalid email/password combination")
  })

  it("correct login redirects", () => {
    mount(<App />)

    cy.get("#login-email").type("test@test.test")
    cy.get("#login-password").type("test")
    cy.get("#login-submit").click()

    cy.location("pathname").should("eq", "/")
    cy.get("#user-email").contains("test@test.test")
  })
})
