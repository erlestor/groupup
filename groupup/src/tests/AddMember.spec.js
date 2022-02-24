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

const goToEditPage = () => {
  cy.get(".group-info").contains("test").click()
  cy.get(".edit-button").click()
}

const enterMember = (text) => {
  cy.get(".group-input").type(text)
}

const submit = () => {
  cy.get(".form-btn").click()
}

const checkError = (text) => {
  cy.get(".error").contains(text)
}

describe("AddMember page", () => {
  beforeEach(() => {
    login()
    goToEditPage()
  })

  it("error shows when user tries to add non existing member", () => {
    enterMember("non@existing.member")
    submit()
    checkError("user does not exist")
  })

  //   it("error shows when user tries to add a member that's already in the group", () => {
  //     enterMember("test@test.test")
  //     submit()
  //     checkError("user already in group")
  //   })

  it("pressing back to group page works", () => {
    cy.get(".btn-grey").click()
    cy.location("pathname").should("eq", "/group/6214feb7c18c3e4cab80cfc0")
  })

  it("adding a new member works", () => {
    enterMember("1@2.com")
    submit()
    // include when endpoint exists
    // cy.request({
    //   method: "DELETE",
    //   url: "http://localhost:8001/deleteUserFromGroup",
    //   body: { _id: "6214feb7c18c3e4cab80cfc0", userEmail: "1@2.com" },
    // })
  })
})
