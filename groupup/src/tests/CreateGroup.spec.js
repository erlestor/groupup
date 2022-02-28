import React from "react"
import { mount } from "@cypress/react"
// import AddMember from "../components/groupPage/AddMember"
import App from "../App"
// import { BrowserRouter as Router } from "react-router-dom"

const login = () => {
  mount(<App />)

  cy.get("#login-email").type("test@test.test")
  cy.get("#login-password").type("test")
  cy.get("#login-submit").click()
}

const submit = () => {
  cy.get("#create-group-btn").click()
}

const checkError = (text) => {
  cy.get(".error").contains(text)
}

const submitAndCheckError = (text) => {
  submit()
  checkError(text)
}

describe("CreateGroup page", () => {
  beforeEach(() => {
    login()
    cy.get("#create-group-btn").click()
  })

  it("all inputs must be filled", () => {
    cy.get("input#group-name").type("testnavn")
    submitAndCheckError("gruppebeskrivelse")

    cy.get("textarea#group-description").type("description")
    submitAndCheckError("interesse")

    cy.get("#interest-Quiz").click()
    submitAndCheckError("lokasjon")

    cy.get(".select-fylke").select("Viken")
    submitAndCheckError("bilde")
  })

  it("creating a group works", () => {
    cy.get("input#group-name").type("testnavn")
    cy.get("textarea#group-description").type("description")
    cy.get("#interest-Quiz").click()
    cy.get(".select-fylke").select("Viken")
    cy.get("img[alt='0']").click()
    submit()
    cy.get(".group-name-title").contains("testnavn")
  })
})
