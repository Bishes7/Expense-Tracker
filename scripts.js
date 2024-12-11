// Select DOM elements
const balanceEl = document.getElementById("total-balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const transactionListEl = document.getElementById("transaction-list");
const transactionForm = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

// Data array to hold transactions
let transactions = [];

// Update the UI
function updateUI() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const totalBalance = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);
  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  balanceEl.textContent = totalBalance;
  incomeEl.textContent = `$${income}`;
  expenseEl.textContent = `$${Math.abs(expense)}`;

  transactionListEl.innerHTML = "";
  transactions.forEach(addTransactionToDOM);
}

// Add transaction to DOM
function addTransactionToDOM(transaction) {
  const li = document.createElement("li");
  li.classList.add(transaction.amount > 0 ? "income" : "expense");
  li.innerHTML = `
    ${transaction.description}
    <span>${transaction.amount > 0 ? "+" : ""}${transaction.amount}</span>
    <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">x</button>
  `;
  transactionListEl.appendChild(li);
}

// Add new transaction
function addTransaction(e) {
  e.preventDefault();
  const description = descriptionEl.value.trim();
  const amount = parseFloat(amountEl.value.trim());

  if (description === "" || isNaN(amount)) {
    alert("Please fill out both fields");
    return;
  }

  const transaction = {
    id: Date.now(),
    description,
    amount,
  };

  transactions.push(transaction);
  updateUI();
  descriptionEl.value = "";
  amountEl.value = "";
}

// Remove transaction
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateUI();
}

// Event Listeners
transactionForm.addEventListener("submit", addTransaction);

// Initial UI update
updateUI();
