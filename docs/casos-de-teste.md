# Casos de teste

Cada caso automatizado tem um identificador, pré-condição, resultado esperado, tipo e prioridade.
Os casos estão agrupados em suítes por funcionalidade.

**Tipos:** ✅ positivo · ❌ negativo · ⚡ caso extremo
**Prioridade:** Alta (fluxo crítico) · Média · Baixa

## Suíte: Autenticação

| ID | Título | Pré-condição | Resultado esperado | Tipo | Prioridade |
|---|---|---|---|---|---|
| TC-001 | Login com e-mail e senha válidos | Conta criada pela API | Usuário logado, com o nome exibido no menu | ✅ | Alta |
| TC-002 | Logout pelo menu | Usuário logado | Volta para a tela de login | ✅ | Média |
| TC-003 | Login com senha incorreta | Conta criada pela API | Mensagem de erro e usuário não logado | ❌ | Alta |
| TC-004 | Login com e-mail não cadastrado | Nenhuma | Mensagem de erro | ❌ | Alta |
| TC-005 | Login com campos vazios | Nenhuma | Formulário não é enviado | ⚡ | Média |
| TC-006 | Login com e-mail em formato inválido | Nenhuma | Formulário não é enviado | ⚡ | Média |
| TC-007 | Cadastro completo e exclusão da conta | Nenhuma | Conta criada, usuário logado e conta excluída | ✅ | Alta |
| TC-008 | Cadastro com e-mail já existente | Conta criada pela API | Mensagem de e-mail já cadastrado | ❌ | Alta |

## Suíte: Produtos

| ID | Título | Pré-condição | Resultado esperado | Tipo | Prioridade |
|---|---|---|---|---|---|
| TC-009 | Listagem com a mesma quantidade da API | Nenhuma | Tela e API exibem o mesmo total de produtos | ✅ | Alta |
| TC-010 | Detalhes iguais aos dados da API | Nenhuma | Nome, preço e marca iguais aos da API | ✅ | Média |
| TC-011 | Busca por termo existente | Nenhuma | Mesmos resultados da busca pela API | ✅ | Alta |
| TC-012 | Busca com maiúsculas e minúsculas | Nenhuma | Mesma quantidade de resultados | ⚡ | Baixa |
| TC-013 | Busca por termo inexistente | Nenhuma | Nenhum produto exibido | ❌ | Média |

## Suíte: Carrinho

| ID | Título | Pré-condição | Resultado esperado | Tipo | Prioridade |
|---|---|---|---|---|---|
| TC-014 | Carrinho vazio para novo visitante | Nenhuma | Mensagem de carrinho vazio | ✅ | Baixa |
| TC-015 | Adicionar produto pela listagem | Nenhuma | Produto no carrinho com quantidade 1 | ✅ | Alta |
| TC-016 | Total calculado pela quantidade | Nenhuma | Total igual a preço unitário × quantidade | ✅ | Alta |
| TC-017 | Mesmo produto adicionado duas vezes | Nenhuma | Uma linha só, com quantidade 2 | ⚡ | Média |
| TC-018 | Remover produto | Produto no carrinho | Produto removido e carrinho vazio | ✅ | Alta |

## Suíte: Contato

| ID | Título | Pré-condição | Resultado esperado | Tipo | Prioridade |
|---|---|---|---|---|---|
| TC-019 | Envio com arquivo anexado | Nenhuma | Confirmação pedida e mensagem de sucesso | ✅ | Média |
| TC-020 | Cancelar a confirmação de envio | Nenhuma | Mensagem não é enviada | ❌ | Baixa |
| TC-021 | Envio sem e-mail | Nenhuma | Formulário não é enviado | ❌ | Média |

## Suíte: API

| ID | Título | Resultado esperado | Tipo | Prioridade |
|---|---|---|---|---|
| TC-022 | GET /productsList | 200 e todos os produtos com os campos obrigatórios | ✅ | Alta |
| TC-023 | POST /productsList | 405, método não suportado | ❌ | Média |
| TC-024 | GET /brandsList | 200 e lista de marcas | ✅ | Média |
| TC-025 | POST /searchProduct com termo existente | 200 e produtos relacionados ao termo | ✅ | Alta |
| TC-026 | POST /searchProduct com termo inexistente | 200 e lista vazia | ❌ | Média |
| TC-027 | POST /searchProduct sem parâmetro | 400 e mensagem de parâmetro ausente | ⚡ | Média |
| TC-028 | Criar, consultar e excluir conta | 201, dados conferidos, 200 e login recusado após a exclusão | ✅ | Alta |
| TC-029 a TC-033 | POST /verifyLogin (tabela de decisão) | 200, 404 ou 400 conforme a combinação de e-mail e senha | ✅ ❌ ⚡ | Alta |
| TC-034 | DELETE /verifyLogin | 405, método não suportado | ❌ | Baixa |

### Tabela de decisão do login pela API

| E-mail | Senha | Código | Mensagem |
|---|---|---|---|
| cadastrado | correta | 200 | User exists! |
| cadastrado | incorreta | 404 | User not found! |
| não cadastrado | correta | 404 | User not found! |
| ausente | correta | 400 | Parâmetro ausente |
| cadastrado | ausente | 400 | Parâmetro ausente |
