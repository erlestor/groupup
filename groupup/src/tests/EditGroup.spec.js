import React from "react"
import { mount } from "@cypress/react"
import App from "../App"

const login = () => {
  mount(<App />)

  cy.get("#login-email").type("test@test.test")
  cy.get("#login-password").type("test")
  cy.get("#login-submit").click()
}

describe("Edit Group Component", () => {
  it("Group details show on load", () => {
    login()

    cy.contains("test edit group").click()
    cy.get(".edit-button").click()

    // wait for the first response to finish
    cy.get("#group-name")
      .invoke("val")
      .then((txt) => cy.expect(txt).to.equal("test edit group"))
    cy.get("#group-description")
      .invoke("val")
      .then((txt) => cy.expect(txt).to.equal("testing purposes"))
    cy.get(".select-fylke")
      .invoke("val")
      .then((txt) => cy.expect(txt).to.equal("Trøndelag"))
  })

  it("editing group details works", () => {
    login()

    cy.contains("test edit group").click()
    cy.get(".edit-button").click()

    cy.get("#group-name").clear().type("new group name")
    cy.get("#group-description").clear().type("new group description")
    cy.get("#save-edit-group-btn").click()
    cy.get("#to-group-page-btn").click()

    // sjekke contains her
    cy.get(".group-name-title").contains("new group name")
    cy.get(".group-desc").contains("new group description")

    cy.get(".edit-button").click()
    cy.get("#group-name").clear().type("test edit group")
    cy.get("#group-description").clear().type("testing purposes")
    cy.get("#save-edit-group-btn").click()
  })
})
