
const form = document.getElementById("postForm");
const expense = document.getElementById("expense");
const description = document.getElementById("description");
const options = document.getElementById("options");
const cardSection = document.getElementById("cardSection");
const submitBtn = document.getElementById("add");
const totalExpense = document.getElementById("totalExpense")

const API_BASE = "https://crudcrud.com/api/1757eb5e54124a98bae39e86c1d0b94d"; 
const RESOURCE = "expense";
const ENDPOINT = `${API_BASE}/${RESOURCE}`;


let currentEditKey = null; 


async function fetchAllItems() {
  const res = await axios.get(ENDPOINT);
  return res.data; // array
}

async function createItem(data) {
  const res = await axios.post(ENDPOINT, data);
  return res.data; // saved object with _id
}

async function updateItem(id, data) {
  await axios.put(`${ENDPOINT}/${id}`, data);
}

async function deleteItem(id) {
  await axios.delete(`${ENDPOINT}/${id}`);
}
/

// Load existing data from server on page load
(async function loadFromServer() {
  const items = await fetchAllItems();
    totalExpense.textContent = items.length;
    
  try {
    const items = await fetchAllItems();
    items.forEach(item => {
      const card = createCard(item.expense, item.description, item.category, item._id);
      cardSection.appendChild(card);
    });
  } catch (err) {
    console.error("Could not load items:", err);
    // optional: show warning to user
  }
})();

// Handle form submit (create or update)
form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const data = {
    expense: expense.value,
    description: description.value,
    category: options.value
  };

  try {
    if (currentEditKey) {
      // UPDATE existing on server
      await updateItem(currentEditKey, data);

      // update UI: replace old card with new
      const oldCard = cardSection.querySelector(`[data-key="${currentEditKey}"]`);
      if (oldCard) {
        const newCard = createCard(data.expense, data.description, data.category, currentEditKey);
        cardSection.replaceChild(newCard, oldCard);
      }

      // reset edit state
      currentEditKey = null;
      submitBtn.textContent = "Add";
    } else {
      // CREATE new on server
      const saved = await createItem(data); // saved has _id
      const card = createCard(saved.expense, saved.description, saved.category, saved._id);
      cardSection.appendChild(card);
    }
    const items = await fetchAllItems();
    totalExpense.textContent = items.length;
    
    //reset form
    expense.value = "";
    description.value = "";
    options.value = "";

  } catch (err) {
    console.error("Save failed:", err);
    //alert("Save failed. Check console for details.");
  }
});

// createCard - sets data-key to server _id (key)
function createCard(expensevalue, descriptionvalue, categoryvalue, key) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('data-key', key);

  card.innerHTML = ` <span>${escapeHtml(categoryvalue)}</span><span><img src="${escapeHtml(expensevalue)}" alt="Blog Image"></span><strong> ${escapeHtml(descriptionvalue)}</strong>`;

  // delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("delete-btn");

  // edit button
  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.classList.add("edit-btn");

  // Edit: fill form and enter edit mode
  editBtn.addEventListener('click', function () {
    expense.value = expensevalue;
    description.value = descriptionvalue;
    options.value = categoryvalue;
    currentEditKey = key;
    submitBtn.textContent = "Update";
    expense.focus();
  });

  // Delete: call server then remove DOM
  deleteBtn.addEventListener('click', async function () {
    //if (!confirm("Delete this item?")) return;
    try {
      await deleteItem(key);
      card.remove();
      if (currentEditKey === key) {
        // reset form if we were editing this item
        currentEditKey = null;
        submitBtn.textContent = "Add";
        expense.value = "";
        description.value = "";
        options.value = "";
      }
      const items = await fetchAllItems();
    totalExpense.textContent = items.length;
    
    } catch (err) {
      console.error("Delete failed:", err);
      //alert("Delete failed. Check console.");
    }
  });

  card.appendChild(deleteBtn);
  card.appendChild(editBtn);
  return card;
}

// small helper to avoid HTML injection
function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
