/// <reference types="Cypress"/>  

describe('Casos de prueba para el registro de usuarios', function() {

    const boss = 'John Smith'
    var users;

    before(() => {
        cy.request('GET', 'https://ldatagenerator.herokuapp.com/3').then((res) => {
            users = res.body
        })
    })

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
        })
        cy.get('#btnCancel').click()
    })

    //Caso de prueba #2 - verificación
    it('Should be to verify that the users were created', function() {
        users.forEach(element => {
            cy.get('#searchSystemUser_userName').type(element.username)
            cy.get('#searchSystemUser_userType').select(element.user_role)
            cy.get('#searchSystemUser_employeeName_empName').type(boss)
            cy.get('#searchSystemUser_status').select(element.status)

            cy.get('#searchBtn').click()

            cy.get('#resultTable > tbody').children().first().children().as('columns').each(($el, index, $list) => {
                switch (index) {
                    case 1:
                        cy.get('@columns').eq(index).contains(element.username)
                        break;
                    case 2:
                        cy.get('@columns').eq(index).contains(element.user_role)
                        break;
                    case 3:
                        cy.get('@columns').eq(index).contains(boss)
                        break;
                    case 4:
                        cy.get('@columns').eq(index).contains(element.status)
                        break;
                    default:
                        break;
                }
            })
            cy.get('#resetBtn').click()
        })

    })

})