describe('GET all users from db test', () => {
    it('Getting all users, checking that an array is returned', () => {
        cy.request({method: 'GET', url: 'http://localhost:8001/users'}).as('GETUsersRequest')
        cy.get('@GETUsersRequest').then(res => {
            cy.expect(res.status).to.eq(200)
            cy.expect(res.body.length).to.be.least(0)
        })    
    })
})