/// <reference types="Cypress"/>   

describe('Casos de prueba para el añadir título de trabajo', function() {

    beforeEach(() => {
        cy.visit("https://opensource-demo.orangehrmlive.com/index.php/admin/viewSystemUsers")
    })

    //Caso de prueba #1
    it('Should be add the new job title with all data', function() {
        cy.get('#txtUsername').type('Admin')
        cy.get('#txtPassword').type('admin123')
        cy.get('#btnLogin').click()

        cy.get('#menu_admin_Job').next().invoke('attr', 'style', 'position: initial')
        cy.get('#menu_admin_viewJobTitleList').click({ force: true })
        cy.get('#btnAdd').click()

        cy.get('#jobTitle_jobTitle').type('Gerente TI')
        cy.get('#jobTitle_jobDescription').type('Responsable de la administración de TI')
        cy.get('#jobTitle_jobDescription').type('none')
        cy.get('#btnSave').click()
    })

    //Caso de prueba #2
    it('Should shows error because of user is not admin', function() {
        cy.get('#txtUsername').type('pabloperez')
        cy.get('#txtPassword').type('Pab1234.')
        cy.get('#btnLogin').click()

        cy.get('#menu_admin_Job').next().invoke('attr', 'style', 'position: initial')
        cy.get('#menu_admin_viewJobTitleList').click({ force: true })
        cy.get('#btnAdd').click()

        cy.get('#jobTitle_jobTitle').type('Gerente TI')
        cy.get('#jobTitle_jobDescription').type('Responsable de la administración de TI')
        cy.get('#jobTitle_jobDescription').type('none')
    })

    //Caso de prueba #3
    it('Should shows error because of job title name already exist', function() {
        cy.get('#txtUsername').type('Admin')
        cy.get('#txtPassword').type('admin123')
        cy.get('#btnLogin').click()

        cy.get('#menu_admin_Job').next().invoke('attr', 'style', 'position: initial')
        cy.get('#menu_admin_viewJobTitleList').click({ force: true })
        cy.get('#btnAdd').click()

        cy.get('#jobTitle_jobTitle').type('Gerente TI')
        cy.get('#jobTitle_jobDescription').type('Responsable de la administración de TI')
        cy.get('#jobTitle_jobDescription').type('none')

        cy.get('span.validation-error').should('contain.text', 'Already exists')
    })

    //Caso de prueba #4
    it('Should shows error because of job title field is empty', function() {
        cy.get('#txtUsername').type('Admin')
        cy.get('#txtPassword').type('admin123')
        cy.get('#btnLogin').click()

        cy.get('#menu_admin_Job').next().invoke('attr', 'style', 'position: initial')
        cy.get('#menu_admin_viewJobTitleList').click({ force: true })
        cy.get('#btnAdd').click()

        cy.get('.required').should('contain.text', '* Required field')
    })

})