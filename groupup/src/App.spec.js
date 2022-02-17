import React from "react"
import { mount } from "@cypress/react"
import App from "./App.js"

describe("App component", () => {
  it("works", () => {
    mount(<App />)
    // now use standard Cypress commands
    cy.contains("GroupUp").should("be.visible")
  })
})
