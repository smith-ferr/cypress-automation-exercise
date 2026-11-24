import paginaLogin from '../../../support/paginas/PaginaLogin';
import paginaCadastro from '../../../support/paginas/PaginaCadastro';
import { gerarUsuario } from '../../../support/dadosDeTeste';
import mensagens from '../../../fixtures/mensagens.json';

describe('Cadastro de conta', () => {
  it('cria uma conta pelo formulário completo e depois a exclui', () => {
    const usuario = gerarUsuario();

    paginaLogin.visitar();
    paginaLogin.iniciarCadastro(usuario.nome, usuario.email);
    paginaCadastro.preencherFormulario(usuario);
    paginaCadastro.criarConta();

    cy.get(paginaCadastro.campos.tituloContaCriada).should('have.text', mensagens.contaCriada);
    paginaCadastro.continuar();
    paginaLogin.usuarioLogado().should('contain', usuario.nome);

    paginaCadastro.excluirConta();
    cy.get(paginaCadastro.campos.tituloContaExcluida).should('have.text', mensagens.contaExcluida);
  });

  it('impede o cadastro com e-mail já existente', () => {
    const usuario = gerarUsuario();
    cy.criarContaViaApi(usuario);

    paginaLogin.visitar();
    paginaLogin.iniciarCadastro(usuario.nome, usuario.email);

    cy.contains('p', mensagens.emailJaCadastrado).should('be.visible');
    cy.location('pathname').should('eq', '/signup');

    cy.excluirContaViaApi(usuario);
  });
});
