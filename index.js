let transactions = [];

// Atualiza o saldo total das transações exibido no DOM
function updateBalance() {
    const balanceSpan = document.querySelector('#balance');
    const balance = transactions.reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
    const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    balanceSpan.textContent = formatter.format(balance);
}

// Configura o sistema, buscando as transações e exibindo-as no DOM
async function setup() {
    const results = await fetchTransactions();
    transactions.push(...results);
    transactions.forEach(renderTransaction);
    updateBalance();
}

// Cria o contêiner de uma transação
function createTransactionContainer(id) {
    const container = document.createElement('div');
    container.classList.add('transaction');
    container.id = `transaction-${id}`;
    return container;    
}

// Cria o título de uma transação
function createTransactionTitle(name) {
    const title = document.createElement('span');
    title.classList.add('transaction-title');
    title.textContent = name;
    return title;    
}

// Cria o valor de uma transação
function createTransactionAmount(amount) {
    const span = document.createElement('span');
    span.classList.add('transaction-amount');
    const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const formattedAmount = formatter.format(amount);

    if (amount > 0) {
        span.textContent = `${formattedAmount} Crédito`;
        span.classList.add('credit');
    } else {
        span.textContent = `${formattedAmount} Débito`;
        span.classList.add('debit');
    }
    return span;
}

// Renderiza uma transação no DOM
function renderTransaction(transaction) {
    const container = createTransactionContainer(transaction.id);
    const title = createTransactionTitle(transaction.name);
    const amount = createTransactionAmount(transaction.amount);
    const deleteBtn = createDeleteTransactionBtn(transaction.id);
    const editBtn = createEditTransactionBtn(transaction);

    container.append(title, amount, editBtn, deleteBtn);
    document.querySelector('#transactions').append(container);
}

// Busca transações no servidor
async function fetchTransactions() {
    return await fetch('http://localhost:3001/transactions')
        .then(response => response.json());
}

// Salva ou edita uma transação
async function saveTransaction(ev) {
    ev.preventDefault();

    const id = document.querySelector('#id').value;
    const name = document.querySelector('#name').value;
    const amount = parseFloat(document.querySelector('#amount').value);

    if (!name || isNaN(amount)) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    if (id) {
        const response = await fetch(`http://localhost:3001/transactions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, amount })
        });

        const transaction = await response.json();
        const indexToRemove = transactions.findIndex(transaction => transaction.id === parseInt(id));
        transactions.splice(indexToRemove, 1, transaction);
        document.querySelector(`#transaction-${id}`).remove();
        renderTransaction(transaction);
    } else {
        const response = await fetch('http://localhost:3001/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, amount })
        });

        const transaction = await response.json();
        transactions.push(transaction);
        renderTransaction(transaction);
    }    

    ev.target.reset();
    updateBalance();
}

// Cria botão para editar uma transação
function createEditTransactionBtn(transaction) {
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.addEventListener('click', () => {
        document.querySelector('#id').value = transaction.id;
        document.querySelector('#name').value = transaction.name;
        document.querySelector('#amount').value = transaction.amount;
    });
    return editBtn;
}

// Cria botão para deletar uma transação
function createDeleteTransactionBtn(id) {
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Deletar';
    deleteBtn.addEventListener('click', async () => {
        await fetch(`http://localhost:3001/transactions/${id}`, {
            method: 'DELETE'
        });
        deleteBtn.parentElement.remove();
        const indexToRemove = transactions.findIndex(transaction => transaction.id === id);
        transactions.splice(indexToRemove, 1);
        updateBalance();
    });
    return deleteBtn;
}

// Inicializa a aplicação
document.addEventListener('DOMContentLoaded', setup);

document.querySelector('form').addEventListener('submit', saveTransaction);