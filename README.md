# Expense Tracker

A simple and responsive **Expense Tracker Web App** built with **HTML, CSS, and JavaScript**.
It helps users manage their **income and expenses**, track transaction history, and view a real-time financial summary — all directly in the browser using **Local Storage**.

---

## 🚀 Features

* **Add Transactions**

  * Add income or expense entries with:

    * Title
    * Amount
    * Type (Income / Expense)
    * Date

* **Transaction History**

  * View all added transactions in a clean table
  * Transactions are sorted with the **most recent first**

* **Edit Transactions**

  * Update any existing transaction using the edit modal

* **Delete Transactions**

  * Remove unwanted transactions from the list

* **Financial Summary**

  * Automatically calculates:

    * **Total Income**
    * **Total Expense**
    * **Current Balance**

* **Persistent Data with Local Storage**

  * Transactions remain saved even after refreshing or reopening the browser

* **Responsive UI**

  * Works smoothly on **mobile, tablet, and desktop**

---

## 🛠️ Tech Stack

* **HTML5** – Structure of the app
* **CSS3** – Styling, layout, responsive design, and modal UI
* **JavaScript (Vanilla JS)** – App logic, DOM manipulation, local storage handling, and transaction management

---

## 📂 Project Structure

```bash
Expense-Tracker/
│── index.html      # Main HTML structure
│── style.css       # Styling and responsive design
│── app.js          # Application logic and local storage functionality
│── README.md       # Project documentation
```

---

## 📸 Overview

This Expense Tracker includes:

* A **transaction form** for adding new records
* A **summary dashboard** displaying total income, total expense, and balance
* A **transaction history table**
* An **edit modal** for updating existing entries

---

## ⚙️ How It Works

### 1. Add a Transaction

Users fill out the form with:

* Title
* Amount
* Type (Income / Expense)
* Date

After submission:

* The transaction is stored in an array
* Saved to **Local Storage**
* Rendered in the transaction table
* Summary values update automatically

### 2. Display Transactions

All transactions are:

* Loaded from Local Storage on page load
* Sorted by date (latest first)
* Rendered dynamically into the table

### 3. Edit a Transaction

When the user clicks the **edit button**:

* A modal opens with the existing transaction details
* The user can modify and save changes
* Data updates in Local Storage instantly

### 4. Delete a Transaction

When the user clicks the **delete button**:

* A confirmation prompt appears
* If confirmed, the transaction is removed
* Summary and history are updated

### 5. Calculate Summary

The app calculates:

* **Total Income** = Sum of all income transactions
* **Total Expense** = Sum of all expense transactions
* **Balance** = Income - Expense

---

## 💾 Local Storage

This project uses the browser’s **Local Storage API** to save transaction data.

### Storage Key

```js
transactions
```

This ensures that user data stays available even after refreshing the page.

---

## 📱 Responsive Design

The application is designed to work across different screen sizes:

* **Mobile**

  * Summary cards stack vertically
  * Form layout adjusts to one column
  * Date column is hidden on very small screens for better readability

* **Tablet**

  * Optimized container width for medium screens

* **Desktop**

  * Expanded layout with improved spacing and readability

---

## 🔒 Validation & Safety

The project includes basic validation to ensure:

* Title is not empty
* Amount is a valid positive number
* Date is selected

It also includes a small **HTML escaping function** to safely render transaction titles inside the table.

---

## ▶️ How to Run the Project

### Option 1: Run Directly

1. Download or clone the project
2. Open `index.html` in your browser

### Option 2: Use VS Code Live Server

1. Open the project folder in VS Code
2. Install the **Live Server** extension
3. Right-click `index.html`
4. Click **Open with Live Server**

---

## 📌 Future Improvements

Possible features that can be added in future versions:

* Category-based transactions (Food, Travel, Salary, Bills, etc.)
* Search and filter transactions
* Monthly / weekly expense reports
* Charts and graphs for financial insights
* Export transactions to CSV / PDF
* Dark mode support
* User authentication with backend/database integration

---

## 🎯 Learning Objectives of This Project

This project is useful for practicing:

* DOM manipulation
* Event handling
* Form validation
* JavaScript array methods (`filter`, `reduce`, `sort`)
* CRUD operations in frontend
* Modal handling
* Local Storage usage
* Responsive UI design

---

## 👨‍💻 Author

**Aditya Tiwari**

If you want, you can improve this project further by adding analytics, categories, or a backend for cloud data storage.

---
