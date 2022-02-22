const testUser = {
  "name": "test testesen",
  "email": "test@test.no",
  "birthDate": "1999-10-16",
  "password": "test"
}

describe('Register POST method test', () => {
  it('Register POST method test, registering test user', () => {
    cy.request('POST', '/register', testUser).as('registerRequest')
    cy.get('@registerRequest').then(res => {
      expect(res.status).to.eq(200)
      cy.wrap(res.body).should('deep.include', {
        name: "test testesen",
        email: "test@test.no",
        birthDate: "1999-10-16",
        password: "test"
      });
    })
  })

  it('Checking that test user already exists', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8001/register',
      failOnStatusCode: false,
      body: {
        email: "test@test.no"
      }
    }).as('secondRegisterRequest')
    cy.get('@secondRegisterRequest').then(res => {
      expect(res.status).to.eq(400)
      expect(res.body).to.eq("This user already exists.")
    })
  })

  it('Cleaning up after test, testing DELETE endpoint', () => {
    cy.request({
      method: 'DELETE',
      url: 'http://localhost:8001/deleteUser',
      body: {
        email: "test@test.no"
      }
    }).as('deleteRequest')
    cy.get('@deleteRequest').then(res => {
      cy.expect(res.status).to.eq(200)
    })
  })

  it('Testing DELETE non-existing user', () => {
    cy.request({
      method: 'DELETE',
      url: 'http://localhost:8001/deleteUser',
      failOnStatusCode: false,
      body: {
        email: "test@test.no"
      }
    }).as('secondDeleteRequest')
    cy.get('@secondDeleteRequest').then(res => {
      cy.expect(res.status).to.eq(404)
    })
  })
});