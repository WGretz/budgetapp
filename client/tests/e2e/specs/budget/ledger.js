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
                Id: 1,
                description: 'Korova Milk Bar',
                amountInCents: -666,
                purchasedOn: '10/11/2019'
               },
              {
                id: 2,
                description: 'Umbrella Pharmaceuticals',
                amountInCents: -777,
                purchasedOn: '10/13/2019'
              }
            ]
          },
          MakeTransaction: variables => {
            console.log(variables)
            return {createTransaction: {
              id: 3, ...variables.attributes
            }}
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
    }).should('deep.eq', ['10/13/2019', 'Umbrella Pharmaceuticals', '-$7.77', '10/11/2019',
      'Korova Milk Bar', '-$6.66'])

      cy.get('input[data-cy="transaction-description"]').clear().type('The Alibi')
      cy.get('input[data-cy="transaction-amount"]').clear().type('-6.66')
      cy.get('input[data-cy="transaction-date').clear().type('10-12-2019')
      cy.get('input[data-cy="transaction-submit"').click()

      cy.get('tr').then(($items) => {
        return $items.map((index, html) => {
          const wrapped = Cypress.$(html)
          return [
            wrapped.find('[data-cy="transaction-date"]').text(),
            wrapped.find('[data-cy="transaction-description"]').text(),
            wrapped.find('[data-cy="transaction-amount"]').text(),
          ]
        }).get()
      }).should('deep.eq', [ '10/13/2019', 'Umbrella Pharmaceuticals', '-$7.77',
        '10/12/2019', 'The Alibi', '-$6.66', '10/11/2019', 'Korova Milk Bar', '-$6.66'])

  })
})
