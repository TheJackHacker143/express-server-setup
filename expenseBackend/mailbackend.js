const { request } = require("express");
const SibApiV3Sdk=require("sib-api-v3-sdk")
require("dotenv").config()
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey=client.authentications['api-key']
apiKey.apiKey=process.env.SENDINBLUE_API_KEY
const transEmailApi=new SibApiV3Sdk.TransactionalEmailsApi()
const sender={
    email:"nojagudada@gmail.com",
    name:"Jagan"

}
const receiver=[
    {email:"paridaj819@gmail.com"},

]
transEmailApi.sendTransacEmail({
    sender,
    to:receiver,
    subject:"Test Email from Sib",
    textContent:"Hello, this is a test email sent using Sendinblue API"
}).then(response=>{
    console.log("Email sent successfully",response)}).catch(error=>{
    console.log(
    " Error sending email",
    error.response?.body || error)
    })
    console.log("mailbackend.js run",request.body)


