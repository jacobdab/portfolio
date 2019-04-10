Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('The Home Page', function() {
    it('successfully loads', function() {
        cy.visit('http://localhost:4000') // change URL to match your dev URL
    })
})