Cypress.Commands.add('preencherCamposEEnviar', function(){
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
        cy.get('#firstName').type('Alex')
        cy.get('#lastName').type('Auerbach')
        cy.get('#email').type('alex@teste.com')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.get('button[type="submit"]').click() 
})
