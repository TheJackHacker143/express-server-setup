const form = document.getElementById("postForm");
const expense = document.getElementById("expense");
const description = document.getElementById("description");
const options = document.getElementById("options");
const cardSection = document.getElementById("cardSection");
const submitBtn = document.getElementById("add");

let currentEditKey = null; 

// Load existing data from localStorage on page load
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const data = JSON.parse(localStorage.getItem(key));

    const card = createCard(data.expense, data.description, data.category, key);
    cardSection.appendChild(card);
}

// Handle form submit
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
        expense: expense.value,
        description: description.value,
        category: options.value
    };

  
    if (currentEditKey) {
        // Edit mode: update existing
        localStorage.setItem(currentEditKey, JSON.stringify(data));

        // Update UI: replace the old card with a new one
        const oldCard = document.querySelector(`[data-key="${currentEditKey}"]`);
        if (oldCard) {
            const newCard = createCard(data.expense, data.description, data.category, currentEditKey);
            cardSection.replaceChild(newCard, oldCard);
        }

        // reset edit state
        currentEditKey = null;
        submitBtn.textContent = "Add expense";
    } else {
        // Normal mode: create new
        const key = `expense_${Date.now()}`; // Step 1: unique key
        localStorage.setItem(key, JSON.stringify(data));

        const card = createCard(data.expense, data.description, data.category, key);
        cardSection.appendChild(card);
    }

    // Step 7: Form reset after update/create
    expense.value = "";
    description.value = "";
    options.value = "fuel";
});

// Function to create card
function createCard(expensevalue, descriptionvalue, categoryvalue, key) {
  const card = document.createElement("div");
   //card.classList.add('card');
  card.className = "card my-2 p-2 d-flex flex-row justify-content-between align-items-center shadow-sm";
card.setAttribute('data-key', key);
  // Text part
  const span = document.createElement("span");
  span.innerHTML = `<strong>${expensevalue}</strong> - ${descriptionvalue} - ${categoryvalue}`;

  // Button group
  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-sm btn-danger";

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.className = "btn btn-sm btn-success";

  btnGroup.appendChild(deleteBtn);
  btnGroup.appendChild(editBtn);

  card.appendChild(span);
  card.appendChild(btnGroup);

  // Event listeners
  deleteBtn.addEventListener("click", () => {
    card.remove();
    localStorage.removeItem(key);
  });

  editBtn.addEventListener("click", () => {
    expense.value = expensevalue;
    description.value = descriptionvalue;
    options.value = categoryvalue;
    currentEditKey = key;
    submitBtn.textContent = "Update expense";
  });

  return card;
}
