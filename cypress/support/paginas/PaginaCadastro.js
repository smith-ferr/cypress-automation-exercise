class PaginaCadastro {
  campos = {
    tratamentoSenhor: '#id_gender1',
    senha: '[data-qa="password"]',
    dia: '[data-qa="days"]',
    mes: '[data-qa="months"]',
    ano: '[data-qa="years"]',
    primeiroNome: '[data-qa="first_name"]',
    sobrenome: '[data-qa="last_name"]',
    empresa: '[data-qa="company"]',
    endereco: '[data-qa="address"]',
    complemento: '[data-qa="address2"]',
    pais: '[data-qa="country"]',
    estado: '[data-qa="state"]',
    cidade: '[data-qa="city"]',
    cep: '[data-qa="zipcode"]',
    celular: '[data-qa="mobile_number"]',
    botaoCriarConta: '[data-qa="create-account"]',
    tituloContaCriada: '[data-qa="account-created"]',
    tituloContaExcluida: '[data-qa="account-deleted"]',
    botaoContinuar: '[data-qa="continue-button"]',
  };

  preencherFormulario(usuario) {
    cy.get(this.campos.tratamentoSenhor).check();
    cy.get(this.campos.senha).type(usuario.senha, { log: false });
    cy.get(this.campos.dia).select(usuario.diaNascimento);
    cy.get(this.campos.mes).select(usuario.nomeMesNascimento);
    cy.get(this.campos.ano).select(usuario.anoNascimento);
    cy.get(this.campos.primeiroNome).type(usuario.primeiroNome);
    cy.get(this.campos.sobrenome).type(usuario.sobrenome);
    cy.get(this.campos.empresa).type(usuario.empresa);
    cy.get(this.campos.endereco).type(usuario.endereco);
    cy.get(this.campos.complemento).type(usuario.complemento);
    cy.get(this.campos.pais).select(usuario.pais);
    cy.get(this.campos.estado).type(usuario.estado);
    cy.get(this.campos.cidade).type(usuario.cidade);
    cy.get(this.campos.cep).type(usuario.cep);
    cy.get(this.campos.celular).type(usuario.celular);
  }

  criarConta() {
    cy.get(this.campos.botaoCriarConta).click();
  }

  continuar() {
    cy.get(this.campos.botaoContinuar).click();
  }

  excluirConta() {
    cy.contains('a', 'Delete Account').click();
  }
}

export default new PaginaCadastro();
