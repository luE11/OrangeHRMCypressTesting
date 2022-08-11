/// <reference types="Cypress"/>   

describe('Casos de prueba para el registro de usuarios', function() {

    beforeEach(() => {
        cy.visit("https://opensource-demo.orangehrmlive.com/index.php/admin/viewSystemUsers")
        cy.fixture('register_users').as('user_params')
    })

    //Caso de prueba #1
    it('Should be add the new user with all data', function() {
        cy.fixture('register_users').then((credentials) => {
            cy.get('#txtUsername').type(credentials.new_user_admin.username)
            cy.get('#txtPassword').type(credentials.new_user_admin.password)
            cy.get('#btnLogin').click()
        })

        cy.get('#menu_admin_UserManagement').next().invoke('attr', 'style', 'position: initial')
        cy.get('#menu_admin_viewSystemUsers').click({ force: true })
        cy.get('#btnAdd').click()

        cy.get('@user_params').then((params) => {
            cy.get('#systemUser_userType').select(params.new_user_no_admin.user_role)
            cy.get('#systemUser_employeeName_empName').type(params.new_user_no_admin.employee)
            cy.get('#systemUser_userName').type(params.new_user_no_admin.username)
            cy.get('#systemUser_status').select(params.new_user_no_admin.status)
            cy.get('#systemUser_password').type(params.new_user_no_admin.password)
            cy.get('#systemUser_confirmPassword').type(params.new_user_no_admin.password)
            cy.get('#btnSave').click()
        })
    })

    //Caso de prueba #2
    it('Should shows error because of user is not admin', function() {
        cy.fixture('register_users').then((credentials) => {
            cy.get('#txtUsername').type(credentials.new_user_no_admin.username)
            cy.get('#txtPassword').type(credentials.new_user_no_admin.password)
            cy.get('#btnLogin').click()
        })

        cy.get('h1').should('contain', 'Dashboard')
    })


    //Caso de prueba #3
    it('Should shows error because of incomplete data', function() {
        cy.fixture('register_users').then((credentials) => {
            cy.get('#txtUsername').type(credentials.new_user_admin.username)
            cy.get('#txtPassword').type(credentials.new_user_admin.password)
            cy.get('#btnLogin').click()
        })

        cy.get('#menu_admin_UserManagement').next().invoke('attr', 'style', 'position: initial')
        cy.get('#menu_admin_viewSystemUsers').click({ force: true })
        cy.get('#btnAdd').click()

        cy.get('@user_params').then((params) => {
            cy.get('#systemUser_userType').select(params.new_user_no_admin.user_role)
            cy.get('#systemUser_userName').type(params.new_user_no_admin.username)
            cy.get('#systemUser_status').select(params.new_user_no_admin.status)
            cy.get('#systemUser_password').type(params.new_user_no_admin.password)
            cy.get('#systemUser_confirmPassword').type(params.new_user_no_admin.password)
            cy.get('#btnSave').click()
        })

        cy.get(':nth-child(3) > span.validation-error').should('contain.text', 'Already exists')
    })

    //Caso de prueba #4
    it('Should shows error because of password incomplete', function() {
        cy.fixture('register_users').then((credentials) => {
            cy.get('#txtUsername').type(credentials.new_user_admin.username)
            cy.get('#txtPassword').type(credentials.new_user_admin.password)
            cy.get('#btnLogin').click()
        })

        cy.get('#menu_admin_UserManagement').next().invoke('attr', 'style', 'position: initial')
        cy.get('#menu_admin_viewSystemUsers').click({ force: true })
        cy.get('#btnAdd').click()

        cy.get('@user_params').then((params) => {
            cy.get('#systemUser_userType').select(params.new_user_no_admin.user_role)
            cy.get('#systemUser_employeeName_empName').type(params.new_user_no_admin.employee)
            cy.get('#systemUser_userName').type(params.new_user_no_admin.username)
            cy.get('#systemUser_status').select(params.new_user_no_admin.status)
            cy.get('#systemUser_password').type('Pab12345')
            cy.get('#systemUser_confirmPassword').type('Pab12345')
            cy.get('#btnSave').click()
        })

    })

})