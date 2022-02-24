const testUser = {
    "name": "test testesen",
    "email": "test@test.no",
    "birthDate": "1999-10-16",
    "password": "test"
}

describe('Login POST method test', () => {
    it('Registering test user', () => {
        cy.request('POST', '/register', testUser)
    })

    it('Testing login success', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8001/login',
            body :{
                email: 'test@test.no',
                password: 'test'
            }
        }).as('LoginSuccessRequest')
        cy.get('@LoginSuccessRequest').then(res => {
            cy.expect(res.status).to.eq(200)
            cy.wrap(res.body).should('deep.include', {
                name: "test testesen",
                email: "test@test.no",
                birthDate: "1999-10-16",
                password: "test"
            })
        })
    })

    it('Testing login wrong username or password', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8001/login',
            failOnStatusCode: false,
            body: {
                email: "thisuserdoesnotexist@nonexistingdomain.cum",
                password: "neitherdoesthispassword"
            }
        }).as('LoginWrongPasswordOrUsernameRequest')
        cy.get('@LoginWrongPasswordOrUsernameRequest').then(res => {
            cy.expect(res.status).to.eq(404)
            cy.expect(res.body).to.eq("Wrong username or password.")
        })
    })

    it('Cleaning up after test', () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:8001/deleteUser',
            body: {
              email: "test@test.no"
            }
        })
    })
})