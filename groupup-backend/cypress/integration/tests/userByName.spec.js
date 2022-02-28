const testUser = {
    "name": "test testesen",
    "email": "test@test.no",
    "birthDate": "1999-10-16",
    "password": "test"
  }


describe('GET userByName method test', () => {
    it('Posting test user to server', () => {
        cy.request('POST', '/register', testUser).as('registerRequest')
        cy.get('@registerRequest').then(res => {
          expect(res.status).to.eq(200)
        })
    })

    it('Getting user with userByName endpoint test', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8001/userByName?email=test@test.no',
            failOnStatusCode: false,
        }).as('getUserByNameRequest')
        cy.get('@getUserByNameRequest').then(res => {
            expect(res.status).to.eq(400)
            cy.expect(res.body).to.eq("This user already exists.")
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