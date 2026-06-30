/* =========================================
   STEP 3 — INITIALIZE LOCALSTORAGE DATABASE
   ========================================= */
const STORAGE_KEY = "transactions";

let transactions = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

/* =========================================
   DOM REFERENCES
   ========================================= */
const transactionForm = document.querySelector("#transactionForm");
const titleInput = document.querySelector("#title");
const amountInput = document.querySelector("#amount");
const typeInput = document.querySelector("#type");
const dateInput = document.querySelector("#date");

const transactionTable = document.querySelector("#transactionTable");
const transactionBody = document.querySelector("#transactionBody");
const emptyState = document.querySelector("#emptyState");

const totalIncomeEl = document.querySelector("#totalIncome");
const totalExpenseEl = document.querySelector("#totalExpense");
const totalBalanceEl = document.querySelector("#totalBalance");

const editModal = document.querySelector("#editModal");
const editForm = document.querySelector("#editForm");
const editId = document.querySelector("#editId");
const editTitle = document.querySelector("#editTitle");
const editAmount = document.querySelector("#editAmount");
const editType = document.querySelector("#editType");
const editDate = document.querySelector("#editDate");
const cancelEditBtn = document.querySelector("#cancelEditBtn");

/* =========================================
   HELPERS
   ========================================= */
function formatCurrency(value) {
  return `₹${value.toFixed(2)}`;
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function generateId() {
  // Simple unique id: timestamp + random suffix
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/* =========================================
   STEP 6 — CALCULATE SUMMARY
   ========================================= */
function updateSummary() {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  totalIncomeEl.textContent = formatCurrency(totalIncome);
  totalExpenseEl.textContent = formatCurrency(totalExpense);
  totalBalanceEl.textContent = formatCurrency(balance);
}

/* =========================================
   STEP 5 — DISPLAY ALL TRANSACTIONS
   ========================================= */
function renderTransactions() {
  transactionBody.innerHTML = "";

  if (transactions.length === 0) {
    emptyState.classList.remove("hidden");
    transactionTable.classList.add("hidden");
    updateSummary();
    return;
  }

  emptyState.classList.add("hidden");
  transactionTable.classList.remove("hidden");

  // Most recent first
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  sorted.forEach((t) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${escapeHtml(t.title)}</td>
      <td class="amount ${t.type}">${t.type === "income" ? "+" : "-"}${formatCurrency(t.amount)}</td>
      <td><span class="badge ${t.type}">${t.type}</span></td>
      <td>${t.date}</td>
      <td>
        <div class="action-buttons">
          <button class="icon-btn edit" data-id="${t.id}" title="Edit">✏️</button>
          <button class="icon-btn delete" data-id="${t.id}" title="Delete">🗑️</button>
        </div>
      </td>
    `;

    transactionBody.appendChild(row);
  });

  updateSummary();
}

// Basic escaping so a title like <script> can't break the table
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* =========================================
   STEP 4 — ADD A NEW TRANSACTION
   ========================================= */
transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = typeInput.value;
  const date = dateInput.value;

  // Validate fields
  if (!title || isNaN(amount) || amount <= 0 || !date) {
    alert("Please fill in all fields with valid values.");
    return;
  }

  const newTransaction = {
    id: generateId(),
    title,
    amount,
    type,
    date,
  };

  transactions.push(newTransaction);
  saveToStorage();
  renderTransactions();

  transactionForm.reset();
});

/* =========================================
   STEP 7 — DELETE A TRANSACTION
   ========================================= */
function deleteTransaction(id) {
  const confirmed = confirm("Delete this transaction?");
  if (!confirmed) return;

  transactions = transactions.filter((t) => t.id !== id);
  saveToStorage();
  renderTransactions();
}

/* =========================================
   STEP 8 — EDIT A TRANSACTION
   ========================================= */
function openEditModal(id) {
  const transaction = transactions.find((t) => t.id === id);
  if (!transaction) return;

  editId.value = transaction.id;
  editTitle.value = transaction.title;
  editAmount.value = transaction.amount;
  editType.value = transaction.type;
  editDate.value = transaction.date;

  editModal.classList.remove("hidden");
}

function closeEditModal() {
  editModal.classList.add("hidden");
  editForm.reset();
}

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = editId.value;
  const title = editTitle.value.trim();
  const amount = parseFloat(editAmount.value);
  const type = editType.value;
  const date = editDate.value;

  if (!title || isNaN(amount) || amount <= 0 || !date) {
    alert("Please fill in all fields with valid values.");
    return;
  }

  const index = transactions.findIndex((t) => t.id === id);
  if (index === -1) return;

  transactions[index] = { id, title, amount, type, date };

  saveToStorage();
  renderTransactions();
  closeEditModal();
});

cancelEditBtn.addEventListener("click", closeEditModal);

// Close modal if clicking outside the modal content
editModal.addEventListener("click", (e) => {
  if (e.target === editModal) closeEditModal();
});

/* =========================================
   EVENT DELEGATION — EDIT / DELETE BUTTONS
   ========================================= */
transactionBody.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".icon-btn.edit");
  const deleteBtn = e.target.closest(".icon-btn.delete");

  if (editBtn) {
    openEditModal(editBtn.dataset.id);
  } else if (deleteBtn) {
    deleteTransaction(deleteBtn.dataset.id);
  }
});

/* =========================================
   INIT
   ========================================= */
function init() {
  // Default the date field to today for convenience
  const today = new Date().toISOString().split("T")[0];
  dateInput.value = today;

  renderTransactions();
}

init();
