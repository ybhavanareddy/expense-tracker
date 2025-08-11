var expenseForm = document.getElementById("expense-form");
var expenseList = document.getElementById("expense-list");
var totalDisplay = document.getElementById("total");

// Load saved data on page load
window.onload = function() {
    var savedData = localStorage.getItem("expenses");
    if (savedData) {
        expenseList.innerHTML = savedData;
        setDeleteEvents();
        updateTotal();
    }
};

// Add new expense
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var amount = document.getElementById("amount").value;
    var category = document.getElementById("category").value;
    var description = document.getElementById("description").value;

    var row = document.createElement("tr");

    var amountCell = document.createElement("td");
    amountCell.textContent = "₹" + amount;

    var categoryCell = document.createElement("td");
    categoryCell.textContent = category;

    var descriptionCell = document.createElement("td");
    descriptionCell.textContent = description;

    var actionCell = document.createElement("td");
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function() {
        expenseList.removeChild(row);
        saveData();
        updateTotal();
    };
    actionCell.appendChild(deleteBtn);

    row.appendChild(amountCell);
    row.appendChild(categoryCell);
    row.appendChild(descriptionCell);
    row.appendChild(actionCell);

    expenseList.appendChild(row);

    saveData();
    updateTotal();
    expenseForm.reset();
});

// Save the table into localStorage
function saveData() {
    localStorage.setItem("expenses", expenseList.innerHTML);
    setDeleteEvents();
}

// Attach delete button events after loading
function setDeleteEvents() {
    var buttons = document.querySelectorAll("#expense-list button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            this.parentNode.parentNode.remove();
            saveData();
            updateTotal();
        };
    }
}

// Calculate and update total expenses
function updateTotal() {
    var rows = expenseList.getElementsByTagName("tr");
    var total = 0;

    for (var i = 0; i < rows.length; i++) {
        var amountText = rows[i].getElementsByTagName("td")[0].textContent;
        var amountValue = Number(amountText.replace("₹", ""));
        total += amountValue;
    }

    totalDisplay.textContent = "Total: ₹" + total;
}
