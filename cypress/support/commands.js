import paginaLogin from './paginas/PaginaLogin';

/**
 * Faz uma requisição à API do site e devolve o corpo já convertido em objeto.
 * A API responde com HTTP 200 e informa o status real no campo "responseCode" do corpo.
 */
Cypress.Commands.add('requisitarApi', ({ metodo, rota, corpo }) => {
  return cy
    .request({
      method: metodo,
      url: `/api/${rota}`,
      form: true,
      body: corpo,
      failOnStatusCode: false,
    })
    .then((resposta) => {
      expect(resposta.status, 'status HTTP').to.eq(200);
      return typeof resposta.body === 'string' ? JSON.parse(resposta.body) : resposta.body;
    });
});

/**
 * Cria a conta pela API, sem passar pela tela.
 * Usado como pré-condição dos testes que não estão validando o cadastro em si.
 */
Cypress.Commands.add('criarContaViaApi', (usuario) => {
  cy.requisitarApi({
    metodo: 'POST',
    rota: 'createAccount',
    corpo: {
      name: usuario.nome,
      email: usuario.email,
      password: usuario.senha,
      title: usuario.tratamento,
      birth_date: usuario.diaNascimento,
      birth_month: usuario.mesNascimento,
      birth_year: usuario.anoNascimento,
      firstname: usuario.primeiroNome,
      lastname: usuario.sobrenome,
      company: usuario.empresa,
      address1: usuario.endereco,
      address2: usuario.complemento,
      country: usuario.pais,
      zipcode: usuario.cep,
      state: usuario.estado,
      city: usuario.cidade,
      mobile_number: usuario.celular,
    },
  })
    .its('responseCode')
    .should('eq', 201);
});

/**
 * Exclui a conta pela API para não deixar dados de teste no site.
 */
Cypress.Commands.add('excluirContaViaApi', (usuario) => {
  cy.requisitarApi({
    metodo: 'DELETE',
    rota: 'deleteAccount',
    corpo: { email: usuario.email, password: usuario.senha },
  });
});

/**
 * Faz login pela tela uma única vez e reaproveita a sessão nos testes seguintes.
 * A validação confere se a sessão salva ainda está ativa antes de reutilizá-la.
 */
Cypress.Commands.add('login', (usuario) => {
  cy.session(
    usuario.email,
    () => {
      paginaLogin.visitar();
      paginaLogin.entrar(usuario.email, usuario.senha);
      paginaLogin.usuarioLogado().should('contain', usuario.nome);
    },
    {
      validate() {
        cy.visit('/');
        paginaLogin.usuarioLogado().should('contain', usuario.nome);
      },
    },
  );
});
