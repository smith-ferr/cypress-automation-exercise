import { gerarUsuario } from '../../support/dadosDeTeste';
import mensagens from '../../fixtures/mensagens.json';

describe('API de usuários', () => {
  context('Ciclo de vida da conta', () => {
    const usuario = gerarUsuario();

    it('cria, consulta e exclui uma conta', () => {
      cy.criarContaViaApi(usuario);

      cy.requisitarApi({ metodo: 'GET', rota: `getUserDetailByEmail?email=${encodeURIComponent(usuario.email)}` }).then(
        (resposta) => {
          expect(resposta.responseCode).to.eq(200);
          expect(resposta.user).to.include({
            name: usuario.nome,
            email: usuario.email,
            first_name: usuario.primeiroNome,
            last_name: usuario.sobrenome,
            city: usuario.cidade,
          });
        },
      );

      cy.requisitarApi({
        metodo: 'DELETE',
        rota: 'deleteAccount',
        corpo: { email: usuario.email, password: usuario.senha },
      }).then((resposta) => {
        expect(resposta.responseCode).to.eq(200);
        expect(resposta.message).to.eq(mensagens.contaExcluidaApi);
      });

      cy.requisitarApi({
        metodo: 'POST',
        rota: 'verifyLogin',
        corpo: { email: usuario.email, password: usuario.senha },
      })
        .its('responseCode')
        .should('eq', 404);
    });
  });

  context('POST /verifyLogin (tabela de decisão)', () => {
    const usuario = gerarUsuario();

    before(() => {
      cy.criarContaViaApi(usuario);
    });

    after(() => {
      cy.excluirContaViaApi(usuario);
    });

    // Cada linha combina as condições de entrada (e-mail e senha) com o resultado esperado.
    const tabelaDeDecisao = [
      { condicao: 'e-mail e senha corretos', email: 'cadastrado', senha: 'correta', codigo: 200, mensagem: mensagens.usuarioExiste },
      { condicao: 'senha incorreta', email: 'cadastrado', senha: 'incorreta', codigo: 404, mensagem: mensagens.usuarioNaoEncontrado },
      { condicao: 'e-mail não cadastrado', email: 'inexistente', senha: 'correta', codigo: 404, mensagem: mensagens.usuarioNaoEncontrado },
      { condicao: 'e-mail ausente', email: 'ausente', senha: 'correta', codigo: 400, mensagem: mensagens.parametroLoginAusente },
      { condicao: 'senha ausente', email: 'cadastrado', senha: 'ausente', codigo: 400, mensagem: mensagens.parametroLoginAusente },
    ];

    const valoresDeEmail = {
      cadastrado: () => usuario.email,
      inexistente: () => `nao.cadastrado.${Date.now()}@exemplo.com`,
      ausente: () => undefined,
    };

    const valoresDeSenha = {
      correta: () => usuario.senha,
      incorreta: () => 'SenhaErrada@999',
      ausente: () => undefined,
    };

    tabelaDeDecisao.forEach(({ condicao, email, senha, codigo, mensagem }) => {
      it(`${condicao}: retorna ${codigo}`, () => {
        const corpo = Cypress._.omitBy(
          { email: valoresDeEmail[email](), password: valoresDeSenha[senha]() },
          Cypress._.isUndefined,
        );

        cy.requisitarApi({ metodo: 'POST', rota: 'verifyLogin', corpo }).then((resposta) => {
          expect(resposta.responseCode).to.eq(codigo);
          expect(resposta.message).to.eq(mensagem);
        });
      });
    });

    it('DELETE /verifyLogin não é suportado e retorna 405', () => {
      cy.requisitarApi({ metodo: 'DELETE', rota: 'verifyLogin' }).then((resposta) => {
        expect(resposta.responseCode).to.eq(405);
        expect(resposta.message).to.eq(mensagens.metodoNaoSuportado);
      });
    });
  });
});
