class PaginaCarrinho {
  campos = {
    linhaProduto: '#cart_info_table tbody tr',
    mensagemCarrinhoVazio: '#empty_cart',
  };

  visitar() {
    cy.visit('/view_cart');
  }

  linhaDoProduto(idProduto) {
    return cy.get(`#product-${idProduto}`);
  }

  quantidadeDoProduto(idProduto) {
    return this.linhaDoProduto(idProduto).find('.cart_quantity').invoke('text').invoke('trim');
  }

  linhas() {
    return cy.get(this.campos.linhaProduto);
  }

  removerProduto(idProduto) {
    cy.get(`.cart_quantity_delete[data-product-id="${idProduto}"]`).click();
  }

  mensagemCarrinhoVazio() {
    return cy.get(this.campos.mensagemCarrinhoVazio);
  }
}

export default new PaginaCarrinho();
