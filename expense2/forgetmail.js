//fdom elements

const forgetmail=document.getElementById("forgotMailForm")
console.log(forgetmail)
//api configuration
const API_BASE = "http://localhost:3000";
const ENDPOINT = `${API_BASE}/password/forgotpassword`;

//api functions
async function createItem(data) {
  const res = await axios.post(ENDPOINT, data);
  return res.data;
}



//form submit
forgetmail.addEventListener('submit',async function(e){
    e.preventDefault();
    alert("Submitting forgot password request")
    const data={
        email:document.getElementById("email").value
    }
    console.log(data)
    try {
       const saved= await createItem(data)
       console.log(saved)
    } catch (error) {
        console.log("Error in sending forgot password email",error)
    }
})