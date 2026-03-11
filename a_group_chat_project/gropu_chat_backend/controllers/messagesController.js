const Message= require("../models/messagetable") 

const addentries=async (req,res)=>{ // Function to add new message
    try {
        const {message}=req.body // Get data from request body
       const exp= await Message.create({ // Create new message in database
        message:message,
        UserId: req.user.id // Attach logged-in user's id
        })
       return res.status(201).json(exp) // Send created message as response
    } catch (error) {
        res.status(500).send("unable to add message") // If error happens
    }
}
const getMessages=async (req,res)=>{ // Function to fetch all user messages
    try {
        const exp = await Message.findAll({ // Get all expenses from database
            where:{ UserId:req.user.id} // Only logged-in user's messages
        });
        console.log(exp) // Debug output
    return res.json(exp); // Send messages to frontend
    } catch (err) {
        res.status(500).json({ error: err.message }); // If error happens
    }
}
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
region: process.env.AWS_REGION,
credentials:{
accessKeyId:process.env.AWS_ACCESS_KEY_ID,
secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
}
});

const uploadFile = async (req,res)=>{
    

try{
console.log(1)
const file = req.file;
console.log(2,file)


if(!file){
return res.status(400).json({error:"No file uploaded"});
}
console.log(3)
const fileName = `chat/${Date.now()}-${file.originalname}`;
console.log(4)
const command = new PutObjectCommand({
Bucket: process.env.AWS_BUCKET_NAME,
Key: fileName,
Body: file.buffer,
ContentType: file.mimetype
});
console.log(5)
await s3.send(command);
console.log(6)
res.status(200).json({
success:true,
fileKey:fileName
});
console.log(7)
}catch(err){

console.log(err);

res.status(500).json({error:err.message});

}

};
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const getFileUrl = async (req,res)=>{

try{
console.log(8)
const fileKey = req.query.key;
console.log(9)
const command = new GetObjectCommand({
Bucket: process.env.AWS_BUCKET_NAME,
Key: fileKey
});
console.log(10)
const url = await getSignedUrl(s3,command,{
expiresIn:3600
});
console.log(11)
res.json({url});
console.log(12)

}catch(err){

res.status(500).json({error:err.message});

}

};

module.exports={addentries,getMessages,getFileUrl,uploadFile}