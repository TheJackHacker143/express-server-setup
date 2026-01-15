//dom elements
const form=document.getElementById("postform");
const Email=document.getElementById("email");
const Password=document.getElementById("password");
const cardsection=document.getElementById("cardSection")
//api configuration
const API_BASE = "http://localhost:3000";
const ENDPOINT = `${API_BASE}/expense/login`;

//api functions
async function fetchAllItems(data) {
  const res = await axios.get(ENDPOINT,data);
  return res.data;
}

async function createItem(data) {
  const res = await axios.post(ENDPOINT, data);
  return res.data;
}
//form submit
form.addEventListener('submit', async function (e) {
    e.preventDefault();
cardsection.innerHTML="";
    const data = {
        email:Email.value,
        password: Password.value
    };
    try {
  const saved = await createItem(data)
  cardsection.innerHTML = `<span>${saved.message}</span>`
  alert(saved.message);
} catch (error) {
  cardsection.innerHTML = `<span>${error.message}</span>`
}
Email.value=""
Password.value=""

  })



