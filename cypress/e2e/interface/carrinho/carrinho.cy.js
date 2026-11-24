import paginaProdutos from '../../../support/paginas/PaginaProdutos';
import paginaCarrinho from '../../../support/paginas/PaginaCarrinho';
import mensagens from '../../../fixtures/mensagens.json';

/**
 * Converte o preço exibido no site ("Rs. 500") em número.
 */
function converterPreco(textoPreco) {
  return Number(textoPreco.replace(/\D/g, ''));
}

describe('Carrinho', () => {
  beforeEach(() => {
    cy.intercept('GET', '/add_to_cart/*').as('adicionarAoCarrinho');
    cy.intercept('GET', '/delete_cart/*').as('removerDoCarrinho');
  });

  it('exibe a mensagem de carrinho vazio para um novo visitante', () => {
    paginaCarrinho.visitar();

    paginaCarrinho.mensagemCarrinhoVazio().should('be.visible').and('contain', mensagens.carrinhoVazio);
  });

  it('adiciona um produto pela listagem e o exibe no carrinho', () => {
    paginaProdutos.visitar();
    paginaProdutos.adicionarAoCarrinhoPelaLista(1);

    cy.wait('@adicionarAoCarrinho').its('response.statusCode').should('eq', 200);
    paginaProdutos.modalDeConfirmacao().should('be.visible').and('contain', 'Your product has been added to cart.');

    paginaCarrinho.visitar();
    paginaCarrinho.linhaDoProduto(1).should('contain', 'Blue Top');
    paginaCarrinho.quantidadeDoProduto(1).should('eq', '1');
  });

  it('calcula o total pelo preço unitário e pela quantidade escolhida', () => {
    const quantidade = 4;

    paginaProdutos.visitarDetalhes(1);
    paginaProdutos.adicionarAoCarrinhoPelosDetalhes(quantidade);
    cy.wait('@adicionarAoCarrinho');

    paginaCarrinho.visitar();
    paginaCarrinho.quantidadeDoProduto(1).should('eq', String(quantidade));
    paginaCarrinho.linhaDoProduto(1).within(() => {
      cy.get('.cart_price').invoke('text').then((textoPreco) => {
        const totalEsperado = converterPreco(textoPreco) * quantidade;
        cy.get('.cart_total_price').invoke('text').then((textoTotal) => {
          expect(converterPreco(textoTotal)).to.eq(totalEsperado);
        });
      });
    });
  });

  it('soma a quantidade ao adicionar o mesmo produto duas vezes', () => {
    // A pré-condição é montada por requisição para o teste focar só no resultado no carrinho.
    cy.request('/add_to_cart/2');
    cy.request('/add_to_cart/2');

    paginaCarrinho.visitar();

    paginaCarrinho.linhas().should('have.length', 1);
    paginaCarrinho.quantidadeDoProduto(2).should('eq', '2');
  });

  it('remove um produto e exibe o carrinho vazio', () => {
    cy.request('/add_to_cart/1');
    paginaCarrinho.visitar();

    paginaCarrinho.removerProduto(1);

    cy.wait('@removerDoCarrinho');
    paginaCarrinho.linhaDoProduto(1).should('not.exist');
    paginaCarrinho.mensagemCarrinhoVazio().should('be.visible');
  });
});
