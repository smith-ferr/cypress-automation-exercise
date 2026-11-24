import 'cypress-mochawesome-reporter/register';
import './commands';

const dominiosDeAnuncio = /(googlesyndication|doubleclick|googleadservices|adtrafficquality|fundingchoicesmessages)\./;

beforeEach(() => {
  // O site carrega anúncios de terceiros que abrem pop-ups e atrasam a página.
  // Bloquear essas requisições deixa os testes estáveis sem alterar o comportamento do site.
  cy.intercept({ hostname: dominiosDeAnuncio }, { statusCode: 204, body: '' });
});

Cypress.on('uncaught:exception', (erro) => {
  // Erros gerados pelos scripts de anúncio bloqueados não devem derrubar o teste.
  // Qualquer outro erro do site continua fazendo o teste falhar.
  if (/adsbygoogle|googletag|Script error/i.test(erro.message)) {
    return false;
  }
  return true;
});
