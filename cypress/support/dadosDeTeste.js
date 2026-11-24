import usuarioBase from '../fixtures/usuario.json';

/**
 * Gera um usuário com e-mail único a cada chamada.
 * O e-mail único evita conflito entre execuções e permite rodar os testes em paralelo.
 */
export function gerarUsuario() {
  const identificador = `${Date.now()}${Cypress._.random(1000, 9999)}`;
  return {
    ...usuarioBase,
    email: `qa.cypress.${identificador}@exemplo.com`,
  };
}
