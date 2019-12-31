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
              {
                Id: 'FOO',
                description: 'Korova Milk Bar',
                amountInCents: 666,
                purchasedOn: '10/11/2019'
               },
              {
                id: 'BAR',
                description: 'Umbrella Pharmaceuticals',
                amountInCents: 777,
                purchasedOn: '10/12/2019'
              }
            ]
          }
        }
      })
    })

    cy.visit('/')

    cy.get('tr').then(($items) => {
      return $items.map((index, html) => {
        const wrapped = Cypress.$(html)
        return [
          wrapped.find('[data-cy="transaction-date"]').text(),
          wrapped.find('[data-cy="transaction-description"]').text(),
          wrapped.find('[data-cy="transaction-amount"]').text(),
        ]
      }).get()
    }).then((x) => {
      console.log(x)
      console.log(x.length)
      return x
    }).should('deep.eq', ['10/12/2019', 'Umbrella Pharmaceuticals', '-$7.77', '10/11/2019',
      'Korova Milk Bar', '-$6.66'])

  })
})
