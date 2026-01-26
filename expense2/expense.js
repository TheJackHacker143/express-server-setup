
const form = document.getElementById("postForm");
const expense = document.getElementById("expense");
const description = document.getElementById("description");
const options = document.getElementById("options");
const cardSection = document.getElementById("cardSection");
const submitBtn = document.getElementById("add");
const totalExpense = document.getElementById("totalExpense")
const LeaderboardBtn =document.getElementById("leaderboardBtn")
console.log(LeaderboardBtn,"leaderbtn")
const paginationDiv = document.getElementById("pagination");



//leaderboard button click
LeaderboardBtn.addEventListener("click", async function(e){
e.preventDefault();
alert("leader board showing")
try {
  const leaderBoard=await loadAllItems()
  console.log(leaderBoard)
  var sortUser=leaderBoard.map((user)=>{
    let x=0
    user.totalExpense=0
    user.Expenses.map((items)=>{
   x=parseInt(items.expense)
    user.totalExpense+=x
    })    
return user   
  })
  sortUser.sort((a, b) => b.totalExpense - a.totalExpense);

  console.log(sortUser,"kskskksks")
  for(let i=0;i<sortUser.length;i++){
    const li=document.createElement("li");
    li.innerText=`User:${sortUser[i].name} Total Expense:${sortUser[i].totalExpense}`;
    document.getElementById("leaderboardList").appendChild(li);
  }
} catch (error) {
  console.log(error.message)
}
})

const API_BASE = "http://localhost:3000"; 
const RESOURCE = "expense";
const ENDPOINT = `${API_BASE}/${RESOURCE}`;
//passing userid from loginpage to expense page
const userId = localStorage.getItem("userId");
console.log("userId",userId)

let currentEditKey = null; 

async function fetchAllItems() {
  const res = await axios.get(`${ENDPOINT}/${userId}`);
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
async function loadAllItems() {
  const res = await axios.get("http://localhost:3000/users");
  return res.data; // array
}


//leaderboard button click
//idhar ye- LeaderboardBtn.addEventListener likhne par dikkat araha hai

// Load existing data from server on page load
(async function loadFromServer() {
  alert("hii")
  //const items = await fetchAllItems();
    
  try {
    
    const items = await fetchAllItems();
    
    totalExpense.textContent = items.length;
    items.forEach(item => {
      const card = createCard(item.expense, item.description, item.category, item.id);
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
    category: options.value,
    userId:userId
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
      const card = createCard(saved.expense, saved.description, saved.category, saved.id);
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

  card.innerHTML = ` <span>${escapeHtml(categoryvalue)}</span><span>${escapeHtml(expensevalue)}</span><strong> ${escapeHtml(descriptionvalue)}</strong>`;

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
//for pagination
let currentPage = 1;
const limit = 2;

async function loadExpenses(page) {
  alert("hii2")
  try {var userId = localStorage.getItem("userId");
    const res = await axios.get(
  `http://localhost:3000/expense?page=${page}&limit=2`,
  {
    headers: {
      Authorization: localStorage.getItem("userId") // 👈 token
    }
  }
);
console.log("fjjjfnf0",res.data)
    showExpenses(res.data.expenses);
    showPagination(res.data.currentPage, res.data.totalPages);

  } catch (err) {
    console.log("Error loading expenses", err);
  }
}

function showExpenses(expenses) {
  cardSection.innerHTML = "";

  expenses.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <strong>${item.category}</strong> |
      ₹${item.expense} |
      ${item.description}
    `;
    cardSection.appendChild(div);
  });
}

function showPagination(current, total) {
  paginationDiv.innerHTML = "";

  if (current > 1) {
    const prevBtn = document.createElement("button");
    prevBtn.innerText = "Prev";
    prevBtn.onclick = () => changePage(current - 1);
    paginationDiv.appendChild(prevBtn);
  }

  const span = document.createElement("span");
  span.innerText = ` Page ${current} of ${total} `;
  paginationDiv.appendChild(span);

  if (current < total) {
    const nextBtn = document.createElement("button");
    nextBtn.innerText = "Next";
    nextBtn.onclick = () => changePage(current + 1);
    paginationDiv.appendChild(nextBtn);
  }
}
function changePage(page) {
  currentPage = page;
  loadExpenses(currentPage);
}
document.addEventListener("DOMContentLoaded", () => {
  loadExpenses(currentPage);
});