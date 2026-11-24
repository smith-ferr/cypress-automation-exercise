class PaginaProdutos {
  campos = {
    campoBusca: '#search_product',
    botaoBuscar: '#submit_search',
    cartaoProduto: '.productinfo',
    quantidade: '#quantity',
    botaoAdicionarNaTelaDeDetalhes: 'button.cart',
    modalCarrinho: '#cartModal',
  };

  visitar() {
    cy.visit('/products');
  }

  visitarDetalhes(idProduto) {
    cy.visit(`/product_details/${idProduto}`);
  }

  buscar(termo) {
    cy.get(this.campos.campoBusca).type(termo);
    cy.get(this.campos.botaoBuscar).click();
  }

  cartoes() {
    return cy.get(this.campos.cartaoProduto);
  }

  nomesDosProdutos() {
    return cy.get(`${this.campos.cartaoProduto} p`);
  }

  adicionarAoCarrinhoPelaLista(idProduto) {
    cy.get(`${this.campos.cartaoProduto} [data-product-id="${idProduto}"]`).click();
  }

  adicionarAoCarrinhoPelosDetalhes(quantidade) {
    cy.get(this.campos.quantidade).clear().type(String(quantidade));
    cy.get(this.campos.botaoAdicionarNaTelaDeDetalhes).click();
  }

  modalDeConfirmacao() {
    return cy.get(this.campos.modalCarrinho);
  }

  continuarComprando() {
    cy.get(`${this.campos.modalCarrinho} .close-modal`).click();
  }
}

export default new PaginaProdutos();
