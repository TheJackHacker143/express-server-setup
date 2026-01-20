//dom elements
const form=document.getElementById("postform");
const Name=document.getElementById("name");
const Email=document.getElementById("email");
const Password=document.getElementById("password");
const cardsection=document.getElementById("cardSection")
//api configuration
const API_BASE = "http://localhost:3000";
const ENDPOINT = `${API_BASE}/users/signup`;

//api functions
async function fetchAllItems() {
  const res = await axios.get(ENDPOINT);
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
        name: Name.value,
        email:Email.value,
        password: Password.value
    };
    try {
  const saved = await createItem(data)
  
} catch (error) {
  cardsection.innerHTML = `<span>user already exists</span>`
}
Name.value=""
Email.value=""
Password.value=""

  // Redirect to your local HTML page
  window.location.href = "http://127.0.0.1:5500/expense2/loginpage.html";
  })



