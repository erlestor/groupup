const mongoose = require('mongoose');
const id = mongoose.Types.ObjectId();

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

const testUser1 = {
    name: 'Test',
    password: 'Testesen',
    email: 'test@test.com',
    birthDate: '1969-11-11',
}

const testUser2 = {
    name: 'Test',
    password: 'Testesen',
    email: 'test@test2.com',
    birthDate: '1969-11-11',
}

describe("Remove member from group endpoint test", () => {

    it("Registering test user 1", () => {
        cy.request("POST", "/register", testUser1)
    })

    it("Registering test user 2", () => {
        cy.request("POST", "/register", testUser2)
    })

    it("Create test group", () => {
        cy.request("POST", "/createGroup", testGroup)
    })

    it("Removing admin from group validation test", () => {
        cy.request({
            method: "PUT",
            url: "http://localhost:8001/removeMember",
            failOnStatusCode: false,
            body: {
                groupId: id,
                adminEmail: testUser1.email,
                userEmail: testUser1.email
            }
        }).as("AdminRemoveRequest")
        cy.get("@AdminRemoveRequest").then(res => {
            expect(res.status).to.eq(400)
            expect(res.body).to.eq("Cannot remove admin from group.")
        })
    })

    it("Removing non-existing user from group", () => {
        cy.request({
            method: "PUT",
            url: "http://localhost:8001/removeMember",
            failOnStatusCode: false,
            body: {
                groupId: id,
                adminEmail: testUser1.email,
                userEmail: "nonexistingmail@mail.com"
            }
        }).as("RemovingNonExistingUserRequest")
        cy.get("@RemovingNonExistingUserRequest").then(res => {
            expect(res.status).to.eq(404)
            expect(res.body).to.eq("user does not exist")
        })
    })

    it("Removing test user 2 from group test", () => {
        cy.request("PUT", "/removeMember", {
            groupId: id,
            adminEmail: testUser1.email,
            userEmail: testUser2.email
        }).as("RemoveUserRequest")
        cy.get("@RemoveUserRequest").then(res => {
            expect(res.status).to.eq(200)
        })
    })

    it("Checking that test user 2 was removed from group", () => {
        cy.request("GET", "/getGroup", {_id: id}).as("GetGroupRequest")
        cy.get("@GetGroupRequest").then(res => {
            expect(res.body.members.length).to.eq(1)
            expect(res.body.members[0]).to.eq(testUser1.email)
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

    it('Deleting test user 1', () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:8001/deleteUser',
            body: {
                email: testUser1.email
            }
        })
    })

    it('Deleting test user 2', () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:8001/deleteUser',
            body: {
                email: testUser2.email
            }
        })
    })
})