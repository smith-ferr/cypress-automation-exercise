import paginaLogin from '../../../support/paginas/PaginaLogin';
import { gerarUsuario } from '../../../support/dadosDeTeste';
import mensagens from '../../../fixtures/mensagens.json';

describe('Login', () => {
  const usuario = gerarUsuario();

  before(() => {
    cy.criarContaViaApi(usuario);
  });

  after(() => {
    cy.excluirContaViaApi(usuario);
  });

  context('Cenários positivos', () => {
    it('entra com e-mail e senha válidos', () => {
      paginaLogin.visitar();
      paginaLogin.entrar(usuario.email, usuario.senha);

      paginaLogin.usuarioLogado().should('be.visible').and('contain', usuario.nome);
    });

    it('sai da conta pelo menu e volta para a tela de login', () => {
      cy.login(usuario);
      cy.visit('/');

      paginaLogin.sair();

      cy.location('pathname').should('eq', '/login');
      cy.contains('a', 'Signup / Login').should('be.visible');
    });
  });

  context('Cenários negativos', () => {
    it('exibe erro com senha incorreta', () => {
      paginaLogin.visitar();
      paginaLogin.entrar(usuario.email, 'SenhaErrada@999');

      paginaLogin.mensagemDeErro(mensagens.loginInvalido).should('be.visible');
      cy.contains('a', 'Logged in as').should('not.exist');
    });

    it('exibe erro com e-mail não cadastrado', () => {
      paginaLogin.visitar();
      paginaLogin.entrar(`nao.cadastrado.${Date.now()}@exemplo.com`, usuario.senha);

      paginaLogin.mensagemDeErro(mensagens.loginInvalido).should('be.visible');
    });
  });

  context('Casos extremos', () => {
    it('não envia o formulário com os campos vazios', () => {
      paginaLogin.visitar();
      paginaLogin.entrar();

      cy.get(paginaLogin.campos.emailLogin).then(($campo) => {
        expect($campo[0].validity.valueMissing, 'e-mail obrigatório').to.be.true;
      });
      cy.location('pathname').should('eq', '/login');
    });

    it('não envia o formulário com e-mail em formato inválido', () => {
      paginaLogin.visitar();
      paginaLogin.entrar('email-sem-arroba', usuario.senha);

      cy.get(paginaLogin.campos.emailLogin).then(($campo) => {
        expect($campo[0].validity.typeMismatch, 'formato de e-mail').to.be.true;
      });
      cy.location('pathname').should('eq', '/login');
    });
  });
});
