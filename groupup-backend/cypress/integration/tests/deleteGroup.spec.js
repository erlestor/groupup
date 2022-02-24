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

describe('DELETE group endpoint test', () => {
    it('Registering test user', () => {
        cy.request('POST', '/register', testUser)
    })

    it('Creating test group', () => {
        cy.request('POST', '/createGroup', testGroup)
    })

    it('Deleting non-existing group test', () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:8001/deleteGroup',
            failOnStatusCode: false,
            body: {
                _id: 696969
            }
        }).as('DeleteNonExistingGroup')
        cy.get('@DeleteNonExistingGroup').then(res => {
            expect(res.status).to.eq(404)
        })
    })

    it('Deleting test group test', () => {
        cy.request('DELETE', '/deleteGroup', {_id: id}).as('DeleteTestGroup')
        cy.get('@DeleteTestGroup').then(res => {
            expect(res.status).to.eq(200)
        })
    })

    it('Deleting test group', () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:8001/deleteGroup',
            failOnStatusCode: false,
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