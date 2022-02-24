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

describe('GET group by id test', () => {
    it('Registering test user', () => {
        cy.request('POST','/register',testUser)
    })
    
    it('Registering test group', () => {
        cy.request('POST','/creategroup',testGroup).as('CreateGroupRequest')
    })
    
    it('Getting test group from id', () =>{
        cy.request({
            method: 'GET',
            url: 'http://localhost:8001/getGroup',
            failOnStatusCode: false,
            body: {
                _id: id
            }
        }).as('GetGroupRequest')
        cy.get('@GetGroupRequest').then(res => (
            expect(res.status).to.eq(200)
        ))
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