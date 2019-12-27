// https://docs.cypress.io/api/introduction/api.html

describe('Ledger Component', () => {
  it('displays transactions', () => {
    cy.task("getSchema").then(schema => {
      cy.mockGraphql({
        schema
      });
      cy.mockGraphqlOps({
        operations: {
          GetTransactions: {
            getTransactions: [
              { Id: 'FOO', description: 'Korova Milk Bar', amountInCents: 666 }
            ]
          }
        }
      })
    })

    cy.visit('/')

    cy.contains('tr', 'Korova Milk Bar').then(elem => {
      console.log(elem)
      cy.wrap(elem).contains('-$6.66')
    })
  })
})
