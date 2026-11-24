class PaginaContato {
  campos = {
    nome: '[data-qa="name"]',
    email: '[data-qa="email"]',
    assunto: '[data-qa="subject"]',
    mensagem: '[data-qa="message"]',
    anexo: 'input[name="upload_file"]',
    botaoEnviar: '[data-qa="submit-button"]',
    alertaSucesso: '.status.alert-success',
  };

  visitar() {
    cy.visit('/contact_us');
  }

  preencher({ nome, email, assunto, mensagem }) {
    if (nome) cy.get(this.campos.nome).type(nome);
    if (email) cy.get(this.campos.email).type(email);
    if (assunto) cy.get(this.campos.assunto).type(assunto);
    if (mensagem) cy.get(this.campos.mensagem).type(mensagem);
  }

  anexarArquivo(caminho) {
    cy.get(this.campos.anexo).selectFile(caminho);
  }

  enviar() {
    cy.get(this.campos.botaoEnviar).click();
  }

  alertaDeSucesso() {
    return cy.get(this.campos.alertaSucesso);
  }
}

export default new PaginaContato();
