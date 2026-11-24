class PaginaLogin {
  campos = {
    emailLogin: '[data-qa="login-email"]',
    senhaLogin: '[data-qa="login-password"]',
    botaoEntrar: '[data-qa="login-button"]',
    nomeCadastro: '[data-qa="signup-name"]',
    emailCadastro: '[data-qa="signup-email"]',
    botaoCadastrar: '[data-qa="signup-button"]',
  };

  visitar() {
    cy.visit('/login');
  }

  entrar(email, senha) {
    if (email) cy.get(this.campos.emailLogin).type(email);
    if (senha) cy.get(this.campos.senhaLogin).type(senha, { log: false });
    cy.get(this.campos.botaoEntrar).click();
  }

  iniciarCadastro(nome, email) {
    cy.get(this.campos.nomeCadastro).type(nome);
    cy.get(this.campos.emailCadastro).type(email);
    cy.get(this.campos.botaoCadastrar).click();
  }

  usuarioLogado() {
    return cy.contains('a', 'Logged in as');
  }

  sair() {
    cy.contains('a', 'Logout').click();
  }

  mensagemDeErro(texto) {
    return cy.contains('p', texto);
  }
}

export default new PaginaLogin();
