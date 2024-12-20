# Controle de Finanças Pessoais

Este projeto é um sistema simples de controle de finanças pessoais que permite adicionar, editar e excluir transações, além de calcular o saldo total baseado nessas transações.

![Logo do Projeto](https://img.shields.io/badge/Controle%20de%20Finan%C3%A7as%20Pessoais-FF5733?style=flat-square&logo=bitcoin&logoColor=white)

## Funcionalidades

- ✅ **Adicionar transações**: O usuário pode adicionar transações informando o nome e o valor (crédito ou débito).
- ✏️ **Editar transações**: O usuário pode editar as transações previamente cadastradas.
- 🗑️ **Deletar transações**: O usuário pode deletar transações do sistema.
- 💰 **Cálculo de saldo**: O sistema calcula automaticamente o saldo total das transações.

## Tecnologias Utilizadas

- ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) **HTML**: Estrutura da página.
- ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) **CSS**: Estilização.
- ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) **JavaScript**: Lógica de manipulação de transações e cálculos.
- ![JSON Server](https://img.shields.io/badge/-JSON%20Server-1E9F1E?style=flat-square&logo=json&logoColor=white) **JSON Server**: API simulada para armazenamento das transações.

## Como Usar

1. Clone o repositório:
    ```bash
    git clone https://github.com/pedrromg01/Finance-App.git
    ```

2. Instale as dependências do servidor:
    ```bash
    npm install -g json-server
    ```

3. Inicie o servidor:
    ```bash
    json-server --watch db.json --port 3001
    ```

4. Abra o arquivo `index.html` no seu navegador para utilizar o sistema.

## Estrutura do Código

- 🔄 **`updateBalance()`**: Atualiza o saldo total das transações.
- 🔍 **`setup()`**: Configura o sistema, buscando as transações e exibindo-as.
- 🏷️ **`createTransactionContainer(id)`**: Cria o contêiner de uma transação.
- 📝 **`createTransactionTitle(name)`**: Cria o título de uma transação.
- 💵 **`createTransactionAmount(amount)`**: Cria o valor de uma transação.
- 👁️ **`renderTransaction(transaction)`**: Renderiza uma transação no DOM.
- 🔄 **`fetchTransactions()`**: Busca as transações do servidor.
- 💾 **`saveTransaction(ev)`**: Salva ou edita uma transação.
- ✏️ **`createEditTransactionBtn(transaction)`**: Cria o botão de editar para uma transação.
- 🗑️ **`createDeleteTransactionBtn(id)`**: Cria o botão de deletar para uma transação.

## Exemplo de Uso

![GIF do projeto](https://github.com/pedrromg01/Finance-App/blob/main/gif%20finance.gif?raw=true)

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autor

👤 **Pedro Martins**
