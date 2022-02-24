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

const testUser = {
    name: 'Test',
    password: 'Testesen',
    email: 'test@test.com',
    birthDate: '1969-11-11',
}

describe('POST create group test', () => {
    it('Registering test user', () => {
        cy.request('POST', '/register', testUser)
    })

    it('Create group with valid admin test', () => {
        cy.request('POST', '/createGroup', testGroup).as('CreateGroupRequest')
        cy.get('@CreateGroupRequest').then(res => {
            expect(res.status).to.eq(200)
            expect(res.body.adminEmail).to.eq("test@test.com")
            cy.wrap(res.body).should('deep.include', {
                name: "Skjalg sin gruppe",
                interests: ["Frisbeegolf", "Quiz"],
                description: "Den beste gruppa :)",
                date: "2022-10-10",
                location: "Viken",
                adminEmail: "test@test.com",
                members: ["test@test.com"],
                image: ""
            })
        })
    })

    it('Create group without valid admin test', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8001/getGroup',
            failOnStatusCode: false,
            body: {
                email: "invalid@test.com"
            }
        }).as('createInvalidGroup')
        cy.get('@createInvalidGroup').then(res =>{
            
            expect(res.status).to.eq(404)
        })
    })

    it('Deleting test group', () => {
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