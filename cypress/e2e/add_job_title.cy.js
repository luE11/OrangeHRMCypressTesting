/// <reference types="Cypress"/>   

describe('Casos de prueba para el añadir título de trabajo', function() {

    beforeEach(() => {
        cy.visit("https://opensource-demo.orangehrmlive.com/index.php/admin/viewSystemUsers")
        cy.fixture('add_job').as('jobs')
    })

    //Caso de prueba #1
    it('Should be add the new job title with all data', function() {
        cy.fixture('register_users').then((credentials) => {
            cy.get('#txtUsername').type(credentials.new_user_admin.username)
            cy.get('#txtPassword').type(credentials.new_user_admin.password)
            cy.get('#btnLogin').click()
        })

        cy.get('#menu_admin_Job').next().invoke('attr', 'style', 'position: initial')
        cy.get('#menu_admin_viewJobTitleList').click({ force: true })
        cy.get('#btnAdd').click()

        cy.get('@jobs').then((params) => {
            cy.get('#jobTitle_jobTitle').type(params.job_title.titlename)
            cy.get('#jobTitle_jobDescription').type(params.job_title.description)
            cy.get('#jobTitle_jobDescription').type(params.job_title.note)
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
    it('Should shows error because of job title name already exist', function() {
        cy.fixture('register_users').then((credentials) => {
            cy.get('#txtUsername').type(credentials.new_user_admin.username)
            cy.get('#txtPassword').type(credentials.new_user_admin.password)
            cy.get('#btnLogin').click()
        })

        cy.get('#menu_admin_Job').next().invoke('attr', 'style', 'position: initial')
        cy.get('#menu_admin_viewJobTitleList').click({ force: true })
        cy.get('#btnAdd').click()

        cy.get('@jobs').then((params) => {
            cy.get('#jobTitle_jobTitle').type(params.job_title.titlename)
            cy.get('#jobTitle_jobDescription').type(params.job_title.description)
            cy.get('#jobTitle_jobDescription').type(params.job_title.note)
            cy.get('span.validation-error').should('contain.text', 'Already exists')
        })
    })

    //Caso de prueba #4
    it('Should shows error because of job title field is empty', function() {
        cy.fixture('register_users').then((credentials) => {
            cy.get('#txtUsername').type(credentials.new_user_admin.username)
            cy.get('#txtPassword').type(credentials.new_user_admin.password)
            cy.get('#btnLogin').click()
        })

        cy.get('#menu_admin_Job').next().invoke('attr', 'style', 'position: initial')
        cy.get('#menu_admin_viewJobTitleList').click({ force: true })
        cy.get('#btnAdd').click()

        cy.get('.required').should('contain.text', '* Required field')
    })

})