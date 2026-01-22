const express=require ("express")
const app=express()
const db=require("./dbconnection")
const usersRoutes= require("./routers/usersRouters")
const expenseRoutes=require("./routers/expenseRoutes")
var cors=require('cors')
require("./models/userToexpense");
const dotenv = require("dotenv");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");
require("./models/ForgotPasswordRequests")
require("./models/userToForgotPasswordRequests")

dotenv.config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

//require("./models")
app.use(express.json());

app.use(express.static("public"));
app.use(cors())
app.get("/",(req,res)=>{
    res.send("hello")
})
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// app.post("/ask", async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

//     const responseFromAi = await ai.models.generateContent({
//       model: "gemini-1.5-flash",
//       contents: prompt,
//     });
//     console.log("ai response:", responseFromAi.text)

//     res.status(200).json({ response: responseFromAi.text});

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ response: "AI failed to respond" });
//   }
// });
app.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ]
    });

    res.json({ response: completion.choices[0].message.content });

  } catch (err) {
    console.log("GPT Error:", err);
    res.json({ response: "GPT failed to respond" });
  }
});



app.use("/users",usersRoutes)

app.use("/expense",expenseRoutes)
app.use("/password",require("./routers/forgetpasswordrouter"))


// db.query("SET FOREIGN_KEY_CHECKS = 0")
//   .then(() => {
//     return db.sync({ force: true });
//   })
//   .then(() => {
//     app.listen(3000, () => {
//       console.log("server is running");
//     });
//   })
//   .catch(err => {
//     console.log(err);
//   });


db.sync({force:false}).then(()=>{

app.listen(3000,(er)=>{
    console.log("erver is running")
  console.log("Loaded Key:", process.env.OPENAI_API_KEY ? "Exists" : "Missing");
})
}).catch((err)=>{
    console.log(err)
})
// app.listen(3000,(er)=>{
//     console.log("erver is running")
// })
