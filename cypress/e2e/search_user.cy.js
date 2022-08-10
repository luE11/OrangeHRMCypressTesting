/// <reference types="Cypress" />

describe('Testing user search', () => {

    beforeEach(() => {
      cy.visit('https://opensource-demo.orangehrmlive.com/')
      cy.fixture('login').then((credentials) => {
        cy.get('#txtUsername').type(credentials.existing_user.username)
        cy.get('#txtPassword').type(credentials.existing_user.password)
        cy.get('#btnLogin').click()
      })
      cy.fixture('search_users').as('user_params')
    })
  
    it('should get a list with related results', () => {
      cy.get('@user_params').then((params) => {
        cy.get('#menu_admin_viewAdminModule > b').click()
        cy.get('#menu_admin_UserManagement').next().invoke('attr', 'style', 'position: initial')
        cy.get('#menu_admin_viewSystemUsers').click({force: true})

        cy.get('#searchSystemUser_userName').type(params.existing_user.username)
        cy.get('#searchSystemUser_userType').select(params.existing_user.user_role)
        cy.get('#searchSystemUser_employeeName_empName').type(params.existing_user.employee)
        cy.get('#searchSystemUser_status').select(params.existing_user.status)

        cy.get('#searchBtn').click()

        cy.get('#resultTable > tbody').children().first().children().as('columns').each(($el, index, $list) => {
            switch (index) {
                case 1:
                    cy.get('@columns').eq(index).contains(params.existing_user.username)
                    break;
                case 2:
                    cy.get('@columns').eq(index).contains(params.existing_user.user_role)
                    break;
                case 3:
                    cy.get('@columns').eq(index).contains(params.existing_user.employee)
                    break;
                case 4:
                    cy.get('@columns').eq(index).contains(params.existing_user.status)
                    break;
                default:
                    break;
            }
        })
      })
    })

    it('should get a list with no results (unexisting user search)', () => {
        cy.get('@user_params').then((params) => {
          cy.get('#menu_admin_viewAdminModule > b').click()
          cy.get('#menu_admin_UserManagement').next().invoke('attr', 'style', 'position: initial')
          cy.get('#menu_admin_viewSystemUsers').click({force: true})
  
          cy.get('#searchSystemUser_userName').type(params.unexisting_user.username)
          cy.get('#searchSystemUser_userType').select(params.unexisting_user.user_role)
          cy.get('#searchSystemUser_employeeName_empName').type(params.unexisting_user.employee)
          cy.get('#searchSystemUser_status').select(params.unexisting_user.status)
  
          cy.get('#searchBtn').click()
  
          cy.get('#resultTable > tbody').children().first().contains('No Records Found')
        })
      })

    it('should get a list with all results', () => {
        cy.get('@user_params').then((params) => {
          cy.get('#menu_admin_viewAdminModule > b').click()
          cy.get('#menu_admin_UserManagement').next().invoke('attr', 'style', 'position: initial')
          cy.get('#menu_admin_viewSystemUsers').click({force: true})
  
          cy.get('#searchBtn').click()
  
          cy.get('#resultTable > tbody').children().its('length').should('be.greaterThan', 0)
        })
      })
})