// implementacao dos passos descritos na feature

/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

Given(/^que acesso o site$/, () => {
	cy.server();

        cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**' ).as('postNewTable');
        cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**' ).as('postUserTable');
        cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**' ).as('getNewTable');

        cy.visit('/Register.html');
});

When(/^informar meu dados$/, () => {
	 //type
     cy.get('input[placeholder = "First Name"]').type(chance.first());
     cy.get('input[ng-model = LastName]').type(chance.last());
     cy.get('input[ng-model = EmailAdress]').type(chance.email());
     cy.get('input[ng-model = Phone]').type(chance.phone({formatted: false}));

     //checkboxes
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
});

And(/^salvar$/, () => {
	//click
    cy.get('button#submitbtn').click();
});

Then(/^devo ser cadastrado como sucesso$/, () => {
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

