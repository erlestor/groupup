const mongoose = require('mongoose');
const id = mongoose.Types.ObjectId();

const testUser = {
    name: 'Test',
    password: 'Testesen',
    email: 'test@test.com',
    birthDate: '1969-11-11',
}

const testUser2 = {
    name: 'Test2',
    password: 'Testesen2',
    email: 'test2@test2.com',
    birthDate: '1969-11-11',
}

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

describe('POST add user to group test', () => {
    it('Registering test user', () => {
        cy.request('POST', '/register', testUser)
    })

    it('Registering test user', () => {
        cy.request('POST', '/register', testUser2)
    })

    it('Create group with valid admin test', () => {
        cy.request('POST', '/createGroup', testGroup)
       
    })

    it('Adding user to group',() => {
        cy.request('PUT','/addUserToGroup', 
        {groupId: testGroup._id, userEmail: testUser2.email}).as('AddUser')
        cy.get('@AddUser').then(res => {
            expect(res.status).to.eq(200)
        })
        cy.request('GET', '/getGroup', {_id: id}).as('GetGroup')
        cy.get('@GetGroup').then(res => {
            expect(res.body.members.length).to.eq(2)
        })
    })

    it('Add invalid member to group',() => {
        cy.request({
            method: 'PUT',
            url: 'http://localhost:8001/getGroup',
            failOnStatusCode: false,
            body: {
                userEmail: "invalid@test.com"
            }
        }).as('AddInvalidUser')
 
       cy.get('@AddInvalidUser').then(res => {
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

    it('Deleting test user2', () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:8001/deleteUser',
            body: {
                email: "test2@test2.com"
            }
        })
    })
})