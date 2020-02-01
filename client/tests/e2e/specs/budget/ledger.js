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
                purchasedOn: '2019-10-11',
                accountId: 2,
               },
              {
                id: 2,
                description: 'Umbrella Pharmaceuticals',
                amountInCents: -777,
                purchasedOn: '2019-10-13',
                accountId: 1,
              }
            ]
          },
          GetAccounts: {
            getAccounts: [
              {
                id: 1,
                name: "Bank"
              },
              {
                id: 2,
                name: "Paypal"
              },
              {
                id: 3,
                name: 'Bank-Cypress'
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

    let expected = [
      { date: '10/13/2019', description: 'Umbrella Pharmaceuticals', amt: '-$7.77', acct: 'Bank' },
      { date: '10/11/2019', description: 'Korova Milk Bar', amt: '-$6.66', acct: 'Paypal' },
    ]

    cy.get('[data-cy="transaction-row2"]')

    cy.get('tr[data-cy]').each(($item, idx) => {
      if (!expected[idx].next) {
        let wrapped = cy.wrap($item)
        wrapped.get('[data-cy="transaction-date"]').contains(expected[idx].date)
        wrapped.get('[data-cy="transaction-description"]').contains(expected[idx].description)
        wrapped.get('[data-cy="transaction-amount"]').contains(expected[idx].amt)
        wrapped.get('[data-cy="transaction-account"]').contains(expected[idx].acct)
      }
    })

    cy.get('input[data-cy="transaction-description"]').clear().type('The Alibi')
    cy.get('input[data-cy="transaction-amount"]').clear().type('-6.66')
    cy.get('input[data-cy="transaction-date').clear().type('2019-10-12')
    cy.get('#transaction-acct').click({force: true})
    cy.contains('div', 'Bank-Cypress').click()
    cy.get('input[data-cy="transaction-submit"').click()

    let expected2 = expected.slice()
    expected2.splice(1,0,
      { date: '10/12/2019', description: 'The Alibi', amt: '-$6.66', acct: 'Bank-Cypress' })
    console.log(expected2)
    cy.get('tr[data-cy]').each(($item, idx) => {
      if (!expected2[idx].next) {
        let wrapped = cy.wrap($item)
        wrapped.get('[data-cy="transaction-date"]').contains(expected2[idx].date)
        wrapped.get('[data-cy="transaction-description"]').contains(expected2[idx].description)
        wrapped.get('[data-cy="transaction-amount"]').contains(expected2[idx].amt)
        wrapped.get('[data-cy="transaction-account"]').contains(expected2[idx].acct)
      }
    })

  })
})
