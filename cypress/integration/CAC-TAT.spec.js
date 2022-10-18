/// <reference types="Cypress"/>

describe('Central de Atendimento ao Cliente CAC TAT', function(){
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('verifica se o H1 esta visível', function(){
        cy.get('h1:contains(CAC TAT)').should('be.visible')
    })

    it('preencher campos e enviar', function(){
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
        cy.get('#firstName').type('Alex')
        cy.get('#lastName').type('Auerbach')
        cy.get('#email').type('alex@teste.com')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('preencher campos e enviar', function(){
        cy.preencherCamposEEnviar()
        cy.get('.success').should('be.visible') 
    })

    it('e-mail inválido', function(){
        cy.get('#firstName').type('Alex')
        cy.get('#lastName').type('Auerbach')
        cy.get('#email').type('alex@teste')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('não permitir texto no campo telefone', function(){
        cy.get('#phone').type('abcdefghijklmnopqrstuvwxyz').should('have.value', '')
    })

    it('validar obrigatoridade de telefone', function(){
        cy.get('#firstName').type('Alex')
        cy.get('#lastName').type('Auerbach')
        cy.get('#email').type('alex@teste.com')
        cy.get('#open-text-area').type('teste')
        cy.get('#phone-checkbox').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('validar se está selecionando opção de campo flutuante', function(){
        //cy.get('select').select('Blog') //Seleção pelo texto
        //cy.get('select').select('youtube') //Seleção pelo value 
        //cy.get('select').select(1) //Seleção pelo indice
        cy.get ('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('selecionar outro tipo de atendimento', function(){
        //cy.get ('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
        cy.get ('input[type="radio"]').should('have.length', 3)
            .each(function($radio)
                {cy.wrap($radio).check().should('be.checked')}
            )
    })

    it('marcar e desmarcar campos check', function(){
        //cy.get ('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
        cy.get ('input[type="checkbox"]').should('have.length', 2)
            .each(function($check)
                {cy.wrap($check).check().should('be.checked')
                cy.wrap($check).uncheck().should('not.be.checked')}
            )
    })

    it('upload de arquivos da pasta fixtures', function(){
        cy.get ('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando drag-and-drop', function(){
        cy.get ('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get ('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a politica de privacidade abre em outro aba sem necessidade do click', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página de política de privacidade removendo o target e enão clicando no link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })


})

