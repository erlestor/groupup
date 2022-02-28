const mongoose = require('mongoose');
const id = mongoose.Types.ObjectId();
const fakeId = mongoose.Types.ObjectId();

const testGroup = {
    _id: id,
    name: "Skjalg sin gruppe",
    interests: ["Frisbeegolf", "Quiz"],
    description: "Den beste gruppa :)",
    date: "2022-10-10",
    location: "Viken",
    adminEmail: "test@test.com",
    members: ["test@test.com"],
    image: ""
}

const testUser = {
    name: 'Test',
    password: 'Testesen',
    email: 'test@test.com',
    birthDate: '1969-11-11',
}

/*
  body = {
  name: "Updated name",
  interests: ["Klatring"],
  description: "Desc",
  date: "YYYY-MM-DD",
  location: "Viken",
  image: "imageUrl"
}
*/

describe("Edit group details endpoint test", () => {
    //Might want to add test for validation aswell
    it("Registering test user", () => {
        cy.request("POST", "/register", testUser)
    })

    it("Create test group", () => {
        cy.request("POST", "/createGroup", testGroup)
    })

    it("Edit group with invalid group id", () => {
        cy.request({
            method: "PUT",
            url: "http://localhost:8001/editGroup",
            failOnStatusCode: false,
            body: {
                _id: fakeId
            }
        }).as("EditInvalidGroupRequest")
        cy.get("@EditInvalidGroupRequest").then(res => {
            expect(res.status).to.eq(404)
            expect(res.body).to.eq("No group with that id.")
        })
    })

    it("Editing group test, check for 200 status code", () => {
        cy.request("PUT", "/editGroup", {
            _id: id,
            name: "Edited test group",
            interests: ["Klatring", "Quiz"],
            description: "Edited description",
        }).as("EditGroupRequest")
        cy.get("@EditGroupRequest").then(res => {
            expect(res.status).to.eq(200)
            expect(res.body).to.eq("Group was updated.")
        })
    })

    it("Check that test group was edited successfully.", () => {
        cy.request("GET", "/getGroup", {_id: id}).as("GetGroupRequest")
        cy.get("@GetGroupRequest").then(res => {
            expect(res.body.name).to.eq("Edited test group")
            expect(res.body.interests.length).to.eq(2)
            expect(res.body.description).to.eq("Edited description")
        })
    })

    it("Delete test group", () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:8001/deleteGroup',
            body : {
                _id: id
            }
        })
    })

    it('Deleting test user', () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:8001/deleteUser',
            body: {
                email: "test@test.com"
            }
        })
    })
})
