# Projeto: "Meu Orçamento" - Gerenciador de Finanças Pessoais

Bem-vindo ao projeto final do nosso curso de JavaScript! O "Meu Orçamento" é uma aplicação que servirá como um gerenciador financeiro simples. Este projeto é para consolidar o conhecimento que você adquiriu, desde a manipulação de arrays até a interação com o DOM e o armazenamento de dados no navegador.

## 🎬 Visão Geral do Projeto

A aplicação permitirá que o usuário adicione e remova transações financeiras (receitas e despesas). Todos os dados serão salvos localmente no navegador, e a interface será atualizada em tempo real para refletir o balanço financeiro atual.

### Funcionalidades Principais:

- Adicionar novas transações (com descrição e valor).
- Listar todas as transações, diferenciando visualmente receitas e despesas.
- Calcular e exibir o total de receitas, o total de despesas e o saldo final.
- Remover transações da lista.
- Manter os dados salvos mesmo após o usuário recarregar ou fechar a página.

## 🎯 Objetivos de Aprendizagem

Este projeto é uma oportunidade de aplicar de forma integrada os seguintes conceitos:

- **Manipulação do DOM:** Criar, ler, atualizar e remover elementos HTML de forma dinâmica para construir a interface.
- **Eventos:** Utilizar `addEventListener` para responder a interações do usuário, como submissão de formulários e cliques.
- **Web Storage:** Empregar o `localStorage` para persistir os dados da aplicação, funcionando como um banco de dados no lado do cliente.
- **Métodos de Array (`map`, `filter`, `reduce`):** Usar métodos funcionais para processar, renderizar e calcular dados de forma eficiente.
- **Estrutura de Dados:** Trabalhar com arrays de objetos para gerenciar o estado da aplicação.

---

## 🚀 Como Começar

1.  **Arquivos do Projeto:** Utilize os arquivos `index.html`, `style.css` e `script.js` que você já possui.
2.  **Foco no JavaScript:** Toda a lógica da aplicação será construída exclusivamente no arquivo `script.js`.
3.  **Ambiente de Teste:** Abra o arquivo `index.html` em seu navegador. Mantenha o **Console do Desenvolvedor (F12)** aberto para depurar seu código e verificar se há erros.

---

## 🛠️ Guia de Implementação (O que fazer no `script.js`)

Siga os passos abaixo para construir a lógica da sua aplicação.

### Etapa 1: Estrutura Inicial e `localStorage`

O primeiro passo é definir como os dados serão armazenados e gerenciados.

- **Estrutura do Dado:** Defina o formato de um objeto de transação. Sugestão: `{ id: 1726085923843, descricao: 'Salário', valor: 5000 }`. O `id` pode ser um timestamp (`new Date().getTime()`) para ser único, e o `valor` deve ser positivo para receitas e negativo para despesas.
- **Variável de Estado:** Crie uma variável no escopo global para armazenar o array de transações. Ex: `let transacoes = [];`.
- **Funções de Persistência:** Crie duas funções para lidar com o `localStorage`:
  1.  `carregarTransacoes()`: Esta função deve ler os dados do `localStorage`. Se os dados existirem, deve usar `JSON.parse()` para convertê-los em um array. Se não existirem ou se ocorrer um erro na conversão (use `try...catch`), ela deve retornar um array vazio `[]`.
  2.  `salvarTransacoes()`: Esta função deve receber o array de transações, convertê-lo para uma string JSON com `JSON.stringify()` e salvá-lo no `localStorage`.

### Etapa 2: Adicionar Novas Transações

Faça o formulário se tornar funcional.

- **Listener de Evento:** Adicione um `addEventListener` ao evento `'submit'` do formulário. Lembre-se de usar `event.preventDefault()`.
- **Captura de Dados:** Dentro do listener, capture os valores dos inputs de descrição e valor. Converta o valor para um número.
- **Validação:** Verifique se os campos não estão vazios.
- **Atualização do Estado:** Crie um novo objeto de transação com os dados capturados e adicione-o ao seu array `transacoes`.
- **Sincronização:** Após adicionar a transação, chame a função `salvarTransacoes()` e, em seguida, uma função principal para atualizar a tela inteira.
- **Limpeza:** Limpe os campos do formulário para que o usuário possa adicionar outra transação.

### Etapa 3: Exibir os Dados na Tela (`map` e `reduce`)

Crie as funções que atualizam a interface com base no array de transações.

- **Função `atualizarResumo()`:**
  - Use `filter` e `reduce` para calcular o total de receitas (soma de todos os `valor` > 0).
  - Faça o mesmo para as despesas (soma de todos os `valor` < 0).
  - Calcule o saldo final (receitas + despesas).
  - Atualize o `textContent` dos elementos no `html` (`#valor-receitas`, `#valor-despesas`, `#valor-saldo`). Crie uma função auxiliar para formatar os números como moeda (ex: `R$ 1.234,56`).
- **Função `renderizarListaTransacoes()`:**
  - Primeiro, limpe a lista existente no HTML para evitar duplicatas (`lista.innerHTML = ''`).
  - Use `map` para percorrer o array `transacoes` e criar a string HTML para cada item `<li>`.
  - Adicione a classe `'receita'` ou `'despesa'` dinamicamente com base no sinal do valor.
  - **Importante:** Cada `<li>` deve conter um botão de remoção com um atributo `data-id="${transacao.id}"` para que você possa identificar qual item remover mais tarde.
  - Insira o HTML gerado na `<ul>` do seu `index.html`.

### Etapa 4: Remover Transações (`filter` e Delegação de Eventos)

Permita que o usuário apague transações que foram adicionadas por engano.

- **Delegação de Eventos:** Adicione um único `addEventListener` de `'click'` na `<ul>` (`#lista-transacoes`).
- **Identificação:** Dentro da função do evento, verifique se o elemento clicado (`event.target`) é um botão de remover.
- **Obtenção do ID:** Se for um botão de remover, obtenha o `id` da transação a partir do atributo `data-id`.
- **Filtragem:** Use o método `filter()` para criar um novo array de transações, excluindo o item com o `id` correspondente.
- **Atualização Final:** Atribua este novo array filtrado à sua variável de estado `transacoes`, salve no `localStorage` e chame a função principal para atualizar a tela.

### Etapa 5: Inicialização da Aplicação

Junte todas as peças para que a aplicação funcione ao ser carregada.

- **Função `init()`:** Crie uma função chamada `init()` que será responsável por iniciar a aplicação.
- **Ordem de Execução:** Dentro de `init()`, você deve:
  1.  Chamar `carregarTransacoes()` para popular seu array `transacoes`.
  2.  Chamar as funções que rendenizam a lista e o resumo na tela pela primeira vez.
  3.  Configurar todos os `event listeners` necessários (o do formulário e o da lista de transações).
- **Execução:** Chame `init()` no final do seu arquivo `script.js`.

---

### 🏆 Desafios Adicionais (Para ir Além)

Se concluir todas as etapas, tente implementar estas funcionalidades extras:

- **Editar Transações:** Adicione um botão de "editar" em cada item. Ao clicar, os dados da transação devem preencher o formulário, permitindo que o usuário os altere e salve.
- **Filtrar por Tipo:** Adicione botões para filtrar a lista e exibir "Apenas Receitas" ou "Apenas Despesas".
- **Animações Suaves:** Use CSS transitions para que os itens da lista apareçam e desapareçam de forma mais suave.
- **Mensagens de Feedback:** Exiba mensagens temporárias para o usuário, como "Transação adicionada com sucesso!".
