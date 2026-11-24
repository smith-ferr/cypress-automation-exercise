# Testes E2E e de API com Cypress

![Testes Cypress](https://github.com/smith-ferr/cypress-automation-exercise/actions/workflows/testes.yml/badge.svg)
![Cypress](https://img.shields.io/badge/Cypress-16-17202C?style=flat-square&logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Testes](https://img.shields.io/badge/testes-34-22C55E?style=flat-square)

Projeto de automação de testes de interface e de API do [Automation Exercise](https://automationexercise.com), um site público criado para prática de testes.

## O que é testado

| Suíte | Casos | Destaques |
|---|---|---|
| Autenticação | 8 | Login, logout, cadastro completo com exclusão da conta e validações de formulário |
| Produtos | 5 | Listagem e busca conferidas com os dados da API |
| Carrinho | 5 | Inclusão, remoção, soma de quantidades e cálculo do total |
| Contato | 3 | Envio com anexo e confirmação, cancelamento e campo obrigatório |
| API | 13 | Produtos, busca, marcas, ciclo de vida da conta e login |

Todos os casos estão documentados em [docs/casos-de-teste.md](docs/casos-de-teste.md), com pré-condição, resultado esperado, tipo e prioridade.

## Boas práticas aplicadas

- **Cobertura completa:** cenários positivos, negativos e casos extremos em cada suíte
- **Técnicas de teste:** partição de equivalência na busca e tabela de decisão no login pela API, com testes orientados a dados
- **Page Objects:** seletores e ações de cada tela concentrados em [`cypress/support/paginas`](cypress/support/paginas)
- **Seletores estáveis:** atributos `data-qa` e `id`, evitando classes de estilo
- **Sem espera fixa:** o teste aguarda as requisições com `cy.intercept` em vez de usar tempo fixo
- **Sessão reaproveitada:** login feito uma vez com `cy.session` e validado antes de cada reutilização
- **Testes independentes:** cada execução gera dados únicos, cria a pré-condição pela API e exclui o que criou
- **Interface conferida com a API:** os dados exibidos na tela são comparados com a resposta da API
- **Integração contínua:** os testes rodam no GitHub Actions a cada push, a cada pull request e uma vez por dia
- **Relatório:** relatório HTML com gráficos e capturas de tela das falhas, publicado em cada execução

## Como executar

Pré-requisito: [Node.js](https://nodejs.org) 20 ou superior.

```bash
npm install

npm test                 # todos os testes, sem abrir o navegador
npm run test:api         # somente API
npm run test:interface   # somente interface
npm run cy:open          # modo interativo do Cypress
```

O relatório é gerado em `cypress/reports/index.html`. No GitHub Actions, ele fica disponível como artefato da execução.

## Estrutura

```text
cypress/
├── e2e/
│   ├── api/                 testes de API
│   └── interface/           testes de interface, separados por funcionalidade
├── fixtures/                dados de teste e mensagens esperadas
└── support/
    ├── paginas/             Page Objects
    ├── commands.js          comandos customizados (login, API, criação e exclusão de conta)
    └── dadosDeTeste.js      geração de dados únicos por execução
docs/
└── casos-de-teste.md        documentação dos casos de teste
```

## Autor

**Ézio Ferreira**, desenvolvedor júnior com foco em QA · [LinkedIn](https://www.linkedin.com/in/ezioferreira) · [GitHub](https://github.com/smith-ferr)
