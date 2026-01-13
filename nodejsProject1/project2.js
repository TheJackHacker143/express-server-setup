//DOM ELMENTS
const form = document.getElementById("postForm");
const expense = document.getElementById("expense");
const description = document.getElementById("description");
const options = document.getElementById("options");
const cardSection = document.getElementById("cardSection");
const submitBtn = document.getElementById("add");
const totalExpense = document.getElementById("totalExpense");

//api cpnfiguration
const API_BASE = "http://localhost:3000";
const ENDPOINT = `${API_BASE}/students`;
const ENDPOINT2 = `${API_BASE}/username`;

//api functions
async function fetchAllItems() {
  const res = await axios.get(ENDPOINT);
  return res.data;
}

async function createItem(data) {
  const res = await axios.post(ENDPOINT, data);
  return res.data;
}

async function createItemForUserName(data) {
  const res = await axios.post(ENDPOINT2, data);
  return res.data;
}

//data load
(async function loadFromServer() {
  try {
    const items = await fetchAllItems();
    cardSection.innerHTML = "";
    cardSection.className = "row g-3"; //  bootstrap grid keliye

    items.forEach(item => {
      const card = createCard(
        item.expense,
        item.description,
        item.category,
        item.id,
        item.comments || []
      );
      cardSection.appendChild(card);
    });

    totalExpense.textContent = items.length;
  } catch (err) {
    console.error("Load failed:", err);
  }
})();

//form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!expense.value || !description.value || !options.value) {
    alert("All fields required");
    return;
  }

  const data = {
    expense: expense.value,
    description: description.value,
    category: options.value
  };

  try {
    const saved = await createItem(data);

    const card = createCard(
      saved.expense,
      saved.description,
      saved.category,
      saved.id,
      []
    );

    cardSection.appendChild(card);

    const items = await fetchAllItems();
    totalExpense.textContent = items.length;

    form.reset();
  } catch (err) {
    console.error("Save failed:", err);
  }
});

//create card
function createCard(
  expensevalue,
  descriptionvalue,
  categoryvalue,
  key,
  comments = []
) {
  //column
  const col = document.createElement("div");
  col.className = "col-12 col-sm-6 col-md-4";

  //card
  const card = document.createElement("div");
  card.className = "card shadow-sm h-auto";
  card.style.borderRadius = "12px";
  card.style.overflow = "hidden";

  //img tag
  const img = document.createElement("img");
  img.src = escapeHtml(expensevalue);
  img.alt = "image";
  img.className = "img-fluid";
  img.style.objectFit = "contain"; // no extra white space
  img.style.maxHeight = "220px";
  img.style.width = "100%";

  //body
  const body = document.createElement("div");
  body.className = "card-body p-3";

  const category = document.createElement("span");
  category.className = "badge bg-secondary mb-2";
  category.innerText = escapeHtml(categoryvalue);

  const desc = document.createElement("p");
  desc.className = "fw-semibold mb-2";
  desc.innerText = escapeHtml(descriptionvalue);

  //comment input
  const commentBox = document.createElement("input");
  commentBox.className = "form-control form-control-sm mb-2";
  commentBox.placeholder = "Write a comment...";

  //send butm
  const sendBtn = document.createElement("button");
  sendBtn.className = "btn btn-primary btn-sm w-100 mb-2";
  sendBtn.innerText = "Send";

  //comment list
  const commentList = document.createElement("ul");
  commentList.className = "list-group list-group-flush";

  comments.forEach(c => {
    const li = document.createElement("li");
    li.className = "list-group-item py-1";
    li.innerText = escapeHtml(c);
    commentList.appendChild(li);
  });

  sendBtn.addEventListener("click", async () => {
    if (!commentBox.value.trim()) return;

    const saved = await createItemForUserName({
      comment: `anonymous- ${commentBox.value}`,
      studentId: key
    });

    const li = document.createElement("li");
    li.className = "list-group-item py-1";
    li.innerText = escapeHtml(saved.comment);
    commentList.appendChild(li);

    commentBox.value = "";
  });

  //append bod
  body.append(category, desc, commentBox, sendBtn, commentList);
  card.append(img, body);
  col.appendChild(card);

  return col;
}

//safe for html injection function
function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}