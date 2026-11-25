# Como executar os testes

## 1. Baixar e abrir o projeto

Pré-requisitos: [Node.js](https://nodejs.org) 20 ou superior, Git e [VS Code](https://code.visualstudio.com).

```bash
git clone https://github.com/smith-ferr/cypress-automation-exercise.git
cd cypress-automation-exercise
npm install
code .
```

No VS Code, abra o terminal com **Ctrl+'** para rodar os comandos abaixo.

## 2. Comandos

| Comando | O que faz |
|---|---|
| `npm run cy:open` | **Abre o modo visual**: você escolhe um arquivo de teste e vê o navegador executando cada passo |
| `npm test` | Roda todos os testes direto, sem abrir janela |
| `npm run test:interface` | Só os testes de tela |
| `npm run test:api` | Só os testes de API |

## 3. Modo visual

1. Rode `npm run cy:open`, escolha **E2E Testing** e um navegador.
2. Clique em um arquivo da pasta `interface`, por exemplo `login.cy.js`.
3. Acompanhe a execução: o site aparece à direita e cada passo é listado à esquerda.
4. Depois da execução, passe o mouse sobre qualquer passo para ver como a tela estava naquele momento.

Os testes da pasta `api` não têm tela. Para ver a requisição e a resposta, clique na linha **REQUEST** do teste e abra o console do navegador com **F12**.

## 4. Relatório

Depois do `npm test`, abra `cypress/reports/index.html` no navegador.
No GitHub Actions, o relatório fica disponível como artefato de cada execução.
