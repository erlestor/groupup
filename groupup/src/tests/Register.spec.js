import React from "react"
import { mount } from "@cypress/react"
// import App from "../App"
import Register from "../components/login/Register"
import { BrowserRouter as Router } from "react-router-dom"
import App from "../App"

function enterFields() {
  cy.get("#firstName").type("test")
  cy.get("#lastName").type("test")
  cy.get("#email").type("fotball@123.com")
  cy.get("#password").type("football123")
  cy.get("#confirmPassword").type("wrongpassword")
  cy.get("#birthday").type("1998-04-14")
}

describe("Register button", () => {
  it("all inputs must be filled out before submitting", () => {
    mount(
      <Router>
        <Register />
      </Router>
    )
    cy.get("input[type='submit']").click()
    cy.get(".error").contains("firstname is invalid")

    cy.get("#firstName").type("test")
    cy.get("input[type='submit']").click()
    cy.get(".error").contains("lastname is invalid")

    cy.get("#lastName").type("test")
    cy.get("input[type='submit']").click()
    cy.get(".error").contains("email is invalid")

    cy.get("#email").type("unique@email.org")
    cy.get("input[type='submit']").click()
    cy.get(".error").contains("password is invalid")

    cy.get("#password").type("football123")
    cy.get("input[type='submit']").click()
    cy.get(".error").contains("confirm password is invalid")

    cy.get("#confirmPassword").type("wrongpassword")
    cy.get("input[type='submit']").click()

    cy.get("#birthday").type("1998-04-14")
    cy.get("input[type='submit']").click()
  })

  it("non-matching password throughs error", () => {
    mount(
      <Router>
        <Register />
      </Router>
    )
    enterFields()

    cy.get("#password").type("football123")
    cy.get("#confirmPassword").type("dancing123")
    cy.get("input[type='submit']").click()
    cy.get(".error").contains("passwords must match")
  })

  it("matching passwords makes log in", () => {
    mount(<App />)
    enterFields()

    cy.get("#password").clear().type("football123")
    cy.get("#confirmPassword").clear().type("football123")
    cy.get("#register-btn").click()

    cy.location("pathname").should("eq", "/")

    cy.request("DELETE", "http://localhost:8001/deleteUser", {
      email: "fotball@123.com",
    })
  })
})
