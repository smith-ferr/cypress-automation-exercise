import paginaProdutos from '../../../support/paginas/PaginaProdutos';

describe('Produtos', () => {
  context('Listagem e detalhes', () => {
    it('lista a mesma quantidade de produtos que a API retorna', () => {
      cy.requisitarApi({ metodo: 'GET', rota: 'productsList' }).then(({ products }) => {
        paginaProdutos.visitar();
        paginaProdutos.cartoes().should('have.length', products.length);
      });
    });

    it('exibe nos detalhes os mesmos dados cadastrados na API', () => {
      cy.requisitarApi({ metodo: 'GET', rota: 'productsList' }).then(({ products }) => {
        const produto = products[0];

        paginaProdutos.visitarDetalhes(produto.id);

        cy.get('.product-information h2').should('have.text', produto.name);
        cy.get('.product-information').should('contain', produto.price).and('contain', produto.brand);
      });
    });
  });

  context('Busca', () => {
    it('encontra os mesmos produtos que a busca da API', () => {
      const termo = 'top';

      cy.requisitarApi({ metodo: 'POST', rota: 'searchProduct', corpo: { search_product: termo } }).then(
        ({ products }) => {
          paginaProdutos.visitar();
          paginaProdutos.buscar(termo);

          cy.contains('h2', 'Searched Products').should('be.visible');
          paginaProdutos.cartoes().should('have.length', products.length);
        },
      );
    });

    it('ignora a diferença entre maiúsculas e minúsculas no termo buscado', () => {
      paginaProdutos.visitar();
      paginaProdutos.buscar('top');
      paginaProdutos.cartoes().its('length').then((quantidadeMinusculas) => {
        paginaProdutos.visitar();
        paginaProdutos.buscar('TOP');
        paginaProdutos.cartoes().should('have.length', quantidadeMinusculas);
      });
    });

    it('não exibe produtos quando o termo não existe', () => {
      paginaProdutos.visitar();
      paginaProdutos.buscar('produto-inexistente-xyz');

      cy.contains('h2', 'Searched Products').should('be.visible');
      paginaProdutos.cartoes().should('not.exist');
    });
  });
});
