import React from "react"
import { mount } from "@cypress/react"
import App from "../App"
// import { BrowserRouter as Router } from "react-router-dom"

const login = () => {
  mount(<App />)

  cy.get("#login-email").type("test@test.test")
  cy.get("#login-password").type("test")
  cy.get("#login-submit").click()
}

describe("Header", () => {
  it("header shows email when signed in", () => {
    login()
    cy.get("#user-email").contains("test@test.test")
  })

  it("signing out button works", () => {
    login()
    cy.get("#sign-in-out-btn").click()
    cy.location("pathname").should("eq", "/login")
  })
})
