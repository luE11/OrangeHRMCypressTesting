/// <reference types="Cypress" />

describe('Testing login form', () => {

    beforeEach(() => {
      cy.visit('https://opensource-demo.orangehrmlive.com/')
      cy.fixture('login').as('credentials')
    })
  
    it('should get into dashboard after submit form', () => {
      cy.get('@credentials').then((credentials) => {
        cy.get('#txtUsername').type(credentials.existing_user.username)
        cy.get('#txtPassword').type(credentials.existing_user.password)
        cy.get('#btnLogin').click()
        cy.get('#menu_dashboard_index > b').contains('Dashboard')
      })
    })
  
    it('should shows error for unexisting user after submit', () => {
      cy.get('@credentials').then((credentials) => {
        cy.get('#txtUsername').type(credentials.unexisting_user.username)
        cy.get('#txtPassword').type(credentials.unexisting_user.password)
        cy.get('#btnLogin').click()
        cy.get('#spanMessage').contains('Invalid credentials')
      })
    })

    it('should shows error for required user after submit', () => {
      cy.get('@credentials').then((credentials) => {
        cy.get('#txtPassword').type(credentials.existing_user.password)
        cy.get('#btnLogin').click()
        cy.get('#spanMessage').contains('Username cannot be empty')
      })
    })

    it('should shows error for required password after submit', () => {
      cy.get('@credentials').then((credentials) => {
        cy.get('#txtUsername').type(credentials.existing_user.username)
        cy.get('#btnLogin').click()
        cy.get('#spanMessage').contains('Password cannot be empty')
      })
    })

    it('should shows error for required username and password after submit', () => {
      cy.get('#btnLogin').click()
      cy.get('#spanMessage').contains('cannot be empty')
    })
})