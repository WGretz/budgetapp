// https://docs.cypress.io/api/introduction/api.html

describe('Ledger Component', () => {
  it('displays transactions', () => {
    cy.visit('/')

    cy.contains('tr', 'Korova Milkbbar').then(elem => {
      elem.contains('$6.66')
    })
  })
})
