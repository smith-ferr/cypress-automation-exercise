import mensagens from '../../fixtures/mensagens.json';

describe('API de produtos', () => {
  it('GET /productsList retorna a lista com os campos esperados', () => {
    cy.requisitarApi({ metodo: 'GET', rota: 'productsList' }).then((resposta) => {
      expect(resposta.responseCode).to.eq(200);
      expect(resposta.products).to.be.an('array').and.not.be.empty;
      resposta.products.forEach((produto) => {
        expect(produto).to.include.all.keys('id', 'name', 'price', 'brand', 'category');
      });
    });
  });

  it('POST /productsList não é suportado e retorna 405', () => {
    cy.requisitarApi({ metodo: 'POST', rota: 'productsList' }).then((resposta) => {
      expect(resposta.responseCode).to.eq(405);
      expect(resposta.message).to.eq(mensagens.metodoNaoSuportado);
    });
  });

  it('GET /brandsList retorna a lista de marcas', () => {
    cy.requisitarApi({ metodo: 'GET', rota: 'brandsList' }).then((resposta) => {
      expect(resposta.responseCode).to.eq(200);
      expect(resposta.brands).to.be.an('array').and.not.be.empty;
    });
  });

  // Partição de equivalência: termo que existe, termo que não existe e parâmetro ausente.
  context('POST /searchProduct', () => {
    it('retorna produtos para um termo existente', () => {
      cy.requisitarApi({ metodo: 'POST', rota: 'searchProduct', corpo: { search_product: 'jean' } }).then(
        (resposta) => {
          expect(resposta.responseCode).to.eq(200);
          expect(resposta.products).to.not.be.empty;
          resposta.products.forEach((produto) => {
            expect(`${produto.name} ${produto.category.category}`.toLowerCase()).to.contain('jean');
          });
        },
      );
    });

    it('retorna lista vazia para um termo inexistente', () => {
      cy.requisitarApi({
        metodo: 'POST',
        rota: 'searchProduct',
        corpo: { search_product: 'produto-inexistente-xyz' },
      }).then((resposta) => {
        expect(resposta.responseCode).to.eq(200);
        expect(resposta.products).to.be.empty;
      });
    });

    it('retorna 400 quando o parâmetro de busca não é enviado', () => {
      cy.requisitarApi({ metodo: 'POST', rota: 'searchProduct' }).then((resposta) => {
        expect(resposta.responseCode).to.eq(400);
        expect(resposta.message).to.eq(mensagens.parametroBuscaAusente);
      });
    });
  });
});
