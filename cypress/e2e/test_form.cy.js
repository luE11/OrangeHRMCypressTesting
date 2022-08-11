/// <reference types="Cypress"/>  

describe('Casos de prueba para el registro de usuarios', function() {

    beforeEach(() => {
        cy.visit("https://opensource-demo.orangehrmlive.com/index.php/admin/viewSystemUsers")

        cy.fixture('register_users').then((credentials) => {
            cy.get('#txtUsername').type(credentials.new_user_admin.username)
            cy.get('#txtPassword').type(credentials.new_user_admin.password)
            cy.get('#btnLogin').click()
        })
    })

    //Caso de prueba #1
    it('Should be add the new user with all list data', function() {

        cy.get('#menu_admin_UserManagement').next().invoke('attr', 'style', 'position: initial')
        cy.get('#menu_admin_viewSystemUsers').click({ force: true })
        cy.get('#btnAdd').click()

        cy.request('GET', 'https://ldatagenerator.herokuapp.com/').then((res) => {
            let users = res.body
            const boss = 'John Smith'

            users.forEach(element => {
                console.log(element)
                cy.get('#systemUser_userType').select(element.user_role)
                cy.get('#systemUser_employeeName_empName').type(boss)
                cy.get('#systemUser_userName').type(element.username)
                cy.get('#systemUser_status').select(element.status)
                cy.get('#systemUser_password').type(element.password)
                cy.get('#systemUser_confirmPassword').type(element.password)
                cy.get('#btnSave').click()

                cy.get('#btnAdd').click()
            });
        })
    })

})