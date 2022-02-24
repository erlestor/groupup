import React from "react"
import { mount } from "@cypress/react"
// import App from "../App"
import Register from "../components/login/Register"
import { BrowserRouter as Router } from "react-router-dom"

describe("Register button", () => {
  it("register button clicked on gives successfull home site", () => {
    mount(
      <Router>
        <Register />
      </Router>
    )

    // cy.contains("Login")

    cy.get("input[type='submit']").click()
    cy.get(".error").contains("firstname is invalid")

    cy.get("#firstName").type("test")
    cy.get("input[type='submit']").click()
    cy.get(".error").contains("lastname is invalid")

    cy.get("#lastName").type("test")
    cy.get("input[type='submit']").click()
    cy.get(".error").contains("email is invalid")

    cy.get("#email").type("1@2.com")
    cy.get("input[type='submit']").click()
    cy.get(".error").contains("password is invalid")

    cy.get("#password").type("football123")
    cy.get("input[type='submit']").click()
    cy.get(".error").contains("confirm password is invalid")

    cy.get("#confirmPassword").type("wrongpassword")
    cy.get("input[type='submit']").click()

    // cy.get("input[type='email']").type("1@2.com")
    // cy.get("input[type='password']").type("ikkematchendepassord")
    // cy.get("input[type='submit']").click()
  })
})
