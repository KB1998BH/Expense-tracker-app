// Function to add an expense to the list
function addExpense(name, category, amount) {
    const expenseList = JSON.parse(localStorage.getItem('expenses')) || [];
    const newExpense = {
      name: name,
      category: category,
      amount: parseFloat(amount)
    };
    expenseList.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenseList));
    displayExpenses();
  }
  
  // Function to delete an expense from the list
  function deleteExpense(index) {
    const expenseList = JSON.parse(localStorage.getItem('expenses'));
    expenseList.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenseList));
    displayExpenses();
  }
  
  // Function to edit an expense in the list
  function editExpense(index, newName, newCategory, newAmount) {
    const expenseList = JSON.parse(localStorage.getItem('expenses'));
    expenseList[index].name = newName;
    expenseList[index].category = newCategory;
    expenseList[index].amount = parseFloat(newAmount);
    localStorage.setItem('expenses', JSON.stringify(expenseList));
    displayExpenses();
  }
  
  // Function to display the expenses in the UI
  function displayExpenses() {
    const expenseList = JSON.parse(localStorage.getItem('expenses')) || [];
    const expenseListDiv = document.getElementById('expenseList');
    expenseListDiv.innerHTML = '';
  
    expenseList.forEach((expense, index) => {
      const expenseItem = document.createElement('div');
      expenseItem.classList.add('expense-item');
      expenseItem.innerHTML = `
        <span>${expense.name}</span>
        <span>${expense.category}</span>
        <span>$${expense.amount.toFixed(2)}</span>
        <span>
          <button class="edit-button" onclick="showEditForm(${index})">Edit</button>
          <button class="delete-button" onclick="deleteExpense(${index})">Delete</button>
        </span>
      `;
      expenseListDiv.appendChild(expenseItem);
    });
  }
  
  // Function to display the edit form
  function showEditForm(index) {
    const expenseList = JSON.parse(localStorage.getItem('expenses')) || [];
    const expenseToEdit = expenseList[index];
    const editForm = document.createElement('form');
  
    // Create an option list for expense categories
    const categoryOptions = ['email', 'branding', 'marketing', 'supplychain'];
    const categoryOptionsHtml = categoryOptions
      .map(option => `<option value="${option}" ${option === expenseToEdit.category ? 'selected' : ''}>${option}</option>`)
      .join('');
  
    editForm.innerHTML = `
      <label for="editExpenseName">Expense Name:</label>
      <input type="text" value="${expenseToEdit.name}" id="editExpenseName" required>
      <label for="editExpenseCategory">Expense Category:</label>
      <select id="editExpenseCategory" required>
        ${categoryOptionsHtml}
      </select>
      <label for="editExpenseAmount">Expense Amount:</label>
      <input type="number" value="${expenseToEdit.amount}" id="editExpenseAmount" required>
      <button type="button" onclick="cancelEdit()">Cancel</button>
      <button type="button" onclick="saveEdit(${index})">Save</button>
    `;
    const expenseItem = document.querySelectorAll('.expense-item')[index];
    expenseItem.innerHTML = '';
    expenseItem.appendChild(editForm);
  }
  
  // Function to cancel the edit form
  function cancelEdit() {
    displayExpenses();
  }
  
  // Function to save the edited expense
  function saveEdit(index) {
    const newName = document.getElementById('editExpenseName').value;
    const newCategory = document.getElementById('editExpenseCategory').value;
    const newAmount = document.getElementById('editExpenseAmount').value;
    editExpense(index, newName, newCategory, newAmount);
  }
  
  // Event listener for the form submission
  document.getElementById('expenseForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const expenseName = document.getElementById('expenseName').value;
    const expenseCategory = document.getElementById('expenseCategory').value;
    const expenseAmount = document.getElementById('expenseAmount').value;
    addExpense(expenseName, expenseCategory, expenseAmount);
    document.getElementById('expenseName').value = '';
    document.getElementById('expenseCategory').value = '';
    document.getElementById('expenseAmount').value = '';
  });
  
  // Initial display of expenses when the app loads
  displayExpenses();
  