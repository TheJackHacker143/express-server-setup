//dom elements
const form=document.getElementById("postform");
const Email=document.getElementById("email");
const PHONE=document.getElementById("phno");
const Password=document.getElementById("password");
const cardsection=document.getElementById("cardSection")
const forgotpassbtn=document.getElementById("forgotpass")


//api configuration
const API_BASE = "http://localhost:3000";
const ENDPOINT = `${API_BASE}/users/login`;
//forgot password event
// forgotpassbtn.addEventListener('click',async function(){
// alert("Forgot Password Clicked")
// window.location.href = 'http://127.0.0.1:5500/expense2/forgetmail.html'
// })

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
var id;
form.addEventListener('submit', async function (e) {
  alert("Login button clicked")
    e.preventDefault();
cardsection.innerHTML="";
    const data = {
        email:Email.value,
        phone:PHONE.value,
        password: Password.value
    };
    try {
  const saved = await createItem(data)
  id=saved.id
  console.log("saved",saved)
  alert("ggggg");
  cardsection.innerHTML = `<span>${saved.message}</span>`
  alert(saved.token);
   if (saved.success == true) {
    
  localStorage.setItem("token",saved.token);
  localStorage.setItem("email",saved.email)
  localStorage.setItem("userName",saved.name);
  
     window.location.href = `http://127.0.0.1:5500/a_group_chat_project/frontend_gropuchat/chat.html?userId=${saved.token}`;
    }
} catch (error) {
  cardsection.innerHTML = `<span>${error.message}</span>`
}
Email.value=""
Password.value=""
localStorage.setItem("id",id);
})