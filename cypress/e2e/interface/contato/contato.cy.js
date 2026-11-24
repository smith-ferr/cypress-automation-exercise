import paginaContato from '../../../support/paginas/PaginaContato';
import mensagens from '../../../fixtures/mensagens.json';

describe('Formulário de contato', () => {
  const dadosDoContato = {
    nome: 'Usuario Teste QA',
    email: 'contato.teste@exemplo.com',
    assunto: 'Teste automatizado',
    mensagem: 'Mensagem enviada por um teste automatizado com Cypress.',
  };

  it('envia a mensagem com arquivo anexado após a confirmação', () => {
    const confirmacao = cy.stub().as('confirmacao').returns(true);
    cy.on('window:confirm', confirmacao);

    paginaContato.visitar();
    paginaContato.preencher(dadosDoContato);
    paginaContato.anexarArquivo('cypress/fixtures/anexo-contato.txt');
    paginaContato.enviar();

    cy.get('@confirmacao').should('have.been.calledOnce');
    paginaContato.alertaDeSucesso().should('be.visible').and('have.text', mensagens.contatoEnviado);
  });

  it('não envia a mensagem quando o usuário cancela a confirmação', () => {
    cy.on('window:confirm', () => false);

    paginaContato.visitar();
    paginaContato.preencher(dadosDoContato);
    paginaContato.enviar();

    paginaContato.alertaDeSucesso().should('not.be.visible');
  });

  it('não envia a mensagem sem o e-mail, que é obrigatório', () => {
    paginaContato.visitar();
    paginaContato.preencher({ ...dadosDoContato, email: '' });
    paginaContato.enviar();

    cy.get(paginaContato.campos.email).then(($campo) => {
      expect($campo[0].validity.valueMissing, 'e-mail obrigatório').to.be.true;
    });
    paginaContato.alertaDeSucesso().should('not.be.visible');
  });
});
