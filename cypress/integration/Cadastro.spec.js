/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

context('Cadastro', () => {
    it('Cadastro de um usuario', () => {
        //base URL + endpoint(rota)

        cy.server();

        cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**' ).as('postNewTable');
        cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**' ).as('postUserTable');
        cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**' ).as('getNewTable');

        cy.visit('/Register.html');

        //type
        cy.get('input[placeholder = "First Name"]').type(chance.first());
        cy.get('input[ng-model = LastName]').type(chance.last());
        cy.get('input[ng-model = EmailAdress]').type(chance.email());
        cy.get('input[ng-model = Phone]').type(chance.phone({formatted: false}));

        //radio and checkboxes
        cy.get('input[value = FeMale').check();
        cy.get('input[type = checkbox').check('Movies');

        //select & select2
        cy.get('select#Skills').select('Android');
        cy.get('select#countries').select('Argentina');
        cy.get('select#country').select('Japan', {force: true});
        cy.get('select#yearbox').select('1986');
        cy.get('select[ng-model = monthbox]').select('January');
        cy.get('select#daybox').select('9');

        cy.get('input#firstpassword').type('Agilizei@2020');
        cy.get('input#secondpassword').type('Agilizei@2020');

        //upload de arquivos
        cy.get('input#imagesrc').attachFile('foto.png');

        //click
        cy.get('button#submitbtn').click();

        cy.wait('@postNewTable').then((resNewTable) => {
           expect(resNewTable.status).to.eq(200);
        })

        cy.wait('@postUserTable').then((resUserTable) => {
            expect(resUserTable.status).to.eq(200);
         })
        
        cy.wait('@getNewTable').then((resNewTable) => {
           expect(resNewTable.status).to.eq(200);
        }) 

        cy.url().should('contain', 'WebTable')
        
    });
});


