const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

function addTransactionDOM(rahil) {
  
  const sign = rahil.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(rahil.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
            ${rahil.text} <span> ${sign}${Math.abs(rahil.amount)}</span>
            <button class="delete-btn" onclick="removeTransaction(${
              rahil.id
            })">x</button>`;
  list.appendChild(item);
}

function removeTransaction(id) {
  transactions = transactions.filter((hussain) => hussain.id !== id);
  updateLocalStorage();
  Init();
}

function Init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

Init();

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateValues() {
  const amounts = transactions.map((mohd) => mohd.amount);

  const total = amounts.reduce((rahil, item) => (rahil += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `₹ ${total}`;
  money_plus.innerText = `₹${income}`;
  money_minus.innerText = `₹${expense}`;
}

function generateID() {
  return Math.floor(Math.random() * 10000);
}

form.addEventListener("submit", addTransaction);
