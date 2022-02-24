describe('GET all groups from db test', () => {
    it('Getting all groups, checking that an array is returned', () => {
        cy.request({method: 'GET', url: 'http://localhost:8001/groups'}).as('GETGroupsRequest')
        cy.get('@GETGroupsRequest').then(res => {
            cy.expect(res.status).to.eq(200)
            cy.expect(res.body.length).to.be.least(0)
        })    
    })
})