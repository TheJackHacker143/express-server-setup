//dom elements
const form=document.getElementById("postform");
const Email=document.getElementById("email");
const Password=document.getElementById("password");
const cardsection=document.getElementById("cardSection")
//api configuration
const API_BASE = "http://localhost:3000";
const ENDPOINT = `${API_BASE}/users/login`;

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
        email:Email.value,
        password: Password.value
    };
    try {
  const saved = await createItem(data)
  
  cardsection.innerHTML = `<span>${saved.message}</span>`
  alert(saved.token);
   if (saved.success === true) {
    
  localStorage.setItem("userId",saved.token);
      window.location.href = `http://127.0.0.1:5500/expense2/expense.html?userId=${saved.token}`;
    }
} catch (error) {
  cardsection.innerHTML = `<span>${error.message}</span>`
}
Email.value=""
Password.value=""

  // Redirect to your local HTML page
  //window.location.href = "http://127.0.0.1:5500/project2/project2.html";

  })



