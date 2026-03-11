//dom elements
const form=document.getElementById("postform");
const Name=document.getElementById("name");
const Email=document.getElementById("email");
const PHONE=document.getElementById("phno");
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
        phone:PHONE.value,
        password: Password.value
    };
    try {
  const saved = await createItem(data)
  console.log(saved)
  // Redirect to your local HTML page
  window.location.href = "http://127.0.0.1:5500/a_group_chat_project/frontend_gropuchat/login.html";
  
} catch (error) {
  console.log("Error creating user:", error);
  if (error.response) {
      cardsection.innerHTML = `<span>${error.response.data.message}</span>`
    } else {
      cardsection.innerHTML = `<span>Server error</span>`
    }
  }
Name.value=""
Email.value=""
Password.value=""
PHONE.value=""

  })



