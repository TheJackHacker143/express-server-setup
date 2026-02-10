//dom elements
const form=document.getElementById("postform");
const Email=document.getElementById("email");
const Password=document.getElementById("password");
const cardsection=document.getElementById("cardSection")
const forgotpassbtn=document.getElementById("forgotpass")


//api configuration
const API_BASE = "http://localhost:3000";
const ENDPOINT = `${API_BASE}/users/login`;
//forgot password event
forgotpassbtn.addEventListener('click',async function(){
alert("Forgot Password Clicked")
window.location.href = 'http://127.0.0.1:5500/expense2/forgetmail.html'
})

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
        password: Password.value
    };
    try {
  const saved = await createItem(data)
  id=saved.id
  console.log("saved",saved)
  alert("ggggg");
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
localStorage.setItem("id",id);
  // Redirect to your local HTML page
  //window.location.href = "http://127.0.0.1:5500/project2/project2.html";
// (async function jagan ()  {
//     try {
//       const response = await fetch("http://localhost:3000/pay", {
//       method: "POST",
//     });

//     const data = await response.json();
//     const paymentSessionId = data.paymentSessionId;
//     const orderId = data.orderId;
//     console.log("Payment Session ID:", paymentSessionId);

//  const response2 = await fetch(`http://localhost:3000/payment-status/${orderId}`, {
//           method: "GET",
//         });
//         const data2 = await response2.json();
//         alert("Your payment is " + data2.paymentStatus )
//         if(data2.paymentStatus==="success"){
//           console.log("User ID for premium update:", id);
//         const premiumResponse= await axios.put(`http://localhost:3000/premium/updateStatus/${id}`,{isPremiumUser:true})
//     console.log("Premium status updated:", premiumResponse.data);
//         }
//     } catch (error) {
//       console.log("errorrrrrr", error)
//     }
//   })()
  })

  // Fetch payment session ID from backend
  
    