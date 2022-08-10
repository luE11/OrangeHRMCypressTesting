/// <reference types="Cypress"/>   

describe('Casos de prueba para el registro de usuarios', function() {

    beforeEach(() => {
        cy.visit("https://opensource-demo.orangehrmlive.com/index.php/admin/viewSystemUsers")
    })

    //Caso de prueba #1
    it('Should be add the new user with all data', function() {
        cy.get('#txtUsername').type('Admin')
        cy.get('#txtPassword').type('admin123')
        cy.get('#btnLogin').click()

        cy.get('#menu_admin_UserManagement').next().invoke('attr', 'style', 'position: initial')
        cy.get('#menu_admin_viewSystemUsers').click({ force: true })
        cy.get('#btnAdd').click()

        cy.get('#systemUser_userType').select('ESS')
        cy.get('#systemUser_employeeName_empName').type('John Smith')
        cy.get('#systemUser_userName').type('pabloperez')
        cy.get('#systemUser_status').select('Enabled')
        cy.get('#systemUser_password').type('Pab1234.')
        cy.get('#systemUser_confirmPassword').type('Pab1234.')
        cy.get('#btnSave').click()
    })

    //Caso de prueba #2
    it('Should shows error because of user is not admin', function() {
        cy.get('#txtUsername').type('pabloperez')
        cy.get('#txtPassword').type('Pab1234.')
        cy.get('#btnLogin').click()

        cy.get('h1').should('contain', 'Dashboard')
    })


    //Caso de prueba #3
    it('Should shows error because of incomplete data', function() {
        cy.get('#txtUsername').type('Admin')
        cy.get('#txtPassword').type('admin123')
        cy.get('#btnLogin').click()

        cy.get('#menu_admin_UserManagement').next().invoke('attr', 'style', 'position: initial')
        cy.get('#menu_admin_viewSystemUsers').click({ force: true })
        cy.get('#btnAdd').click()

        cy.get('#systemUser_userType').select('ESS')
        cy.get('#systemUser_employeeName_empName').type('John Smith')
        cy.get('#systemUser_userName').type('pabloperez')
        cy.get('#systemUser_status').select('Enabled')
        cy.get('#systemUser_password').type('Pab1234.')
        cy.get('#systemUser_confirmPassword').type('Pab1234.')
        cy.get('#btnSave').click()

        cy.get(':nth-child(3) > span.validation-error').should('contain.text', 'Already exists')
    })

    //Caso de prueba #4
    it('Should shows error because of password incomplete', function() {
        cy.get('#txtUsername').type('Admin')
        cy.get('#txtPassword').type('admin123')
        cy.get('#btnLogin').click()

        cy.get('#menu_admin_UserManagement').next().invoke('attr', 'style', 'position: initial')
        cy.get('#menu_admin_viewSystemUsers').click({ force: true })
        cy.get('#btnAdd').click()

        cy.get('#systemUser_userType').select('ESS')
        cy.get('#systemUser_employeeName_empName').type('John Smith')
        cy.get('#systemUser_userName').type('pabloperez2')
        cy.get('#systemUser_status').select('Enabled')
        cy.get('#systemUser_password').type('Pab12345')
        cy.get('#systemUser_confirmPassword').type('Pab12345')
        cy.get('#btnSave').click()
    })

})