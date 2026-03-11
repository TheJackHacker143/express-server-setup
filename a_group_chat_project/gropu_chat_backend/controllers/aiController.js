const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});


/* ===== Predict typing ===== */

exports.predictTyping = async (req,res)=>{

try{

const {text} = req.body;

if(!text){
return res.json({suggestions:[]});
}

const prompt = `
Suggest 3 short phrase completions.

Message:
"${text}"

Rules:
- max 4 words
- only 3 suggestions
`;

const response = await ai.models.generateContent({

model:"gemini-2.5-flash-lite",
contents:prompt

});

const suggestions = response.text
.split("\n")
.map(v=>v.replace(/^\d+\.?/,"").trim())
.filter(Boolean)
.slice(0,3);

res.json({suggestions});

}catch(err){

console.log("AI error",err);

res.json({suggestions:[]});

}

};



/* ===== Smart replies ===== */

exports.smartReplies = async (req,res)=>{

try{

const {message} = req.body;

if(!message){
return res.json({replies:[]});
}

const prompt = `
Generate 3 short replies.

Message:
"${message}"

Rules:
- friendly tone
- max 10 words
- only 3 replies
`;

const response = await ai.models.generateContent({

model:"gemini-2.5-flash-lite",
contents:prompt

});

const replies = response.text
.split("\n")
.map(v=>v.replace(/^\d+\.?/,"").trim())
.filter(Boolean)
.slice(0,3);

res.json({replies});

}catch(err){

console.log("AI error",err);

res.json({replies:[]});

}

};