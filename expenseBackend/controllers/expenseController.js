 const db=require("../dbconnection")
 const Expense= require("../models/expense")
 const User= require("../models/UsersTable")
 const jswt= require('jsonwebtoken');
//  const { BlobServiceClient } = require('@azure/storage-blob');
// const { v1: uuidv1} = require('uuid');

 //const Identitycard=require("../models/identityCard")
 //const Student1= require("../models/students1")
//const UserName = require("../models/userName");

 //const project2=require("../../project2/project2")
const addentries=async (req,res)=>{
    try {
        
        const {expense,description,category,userId}=req.body
    const decoded=jswt.verify(userId, 'secretkey');
    console.log("decodeddddddd",decoded)
       const exp= await Expense.create({
        expense:expense,
        description:description,
        category:category,
        userId: decoded.userId
       // comment:comment
        
       })
       res.status(201).json(exp)
    } catch (error) {
        res.status(500).send("unable to add expense")
    }

}

// const addValStudentsAndIdentitycardTable=async (req,res)=>{
    
//      try {
//         const student1= await Student1.create(req.body.student1)
//         console .log("hii",student1.id)
//         const Idcard=await Identitycard.bulkCreate(
//             req.body.Idcard.map(card=>({
//                 ...card, Students1Id:student1.id
//             })),
            
//         )
//         res.status(201).json({student1,Idcard})
//     } catch (error) {
//         res.status(500).json({error:error.message})
//     }
// }
const updateEntry=async (req,res)=>{
    try {
        const {expense,description,category}=req.body
    
       const exp= await Expense.update({
        expense:expense,
        description:description,
        category:category,
        //comment:comment
        
       }, { where: { id: req.params.id, userId: req.user.id } })
       res.status(201).json({ message: "Updated" })
    } catch (error) {
        res.status(500).send("unpdte failed")
    }

    

}
const deleteEntry=async (req,res)=>{
        try {
        
    const id=req.params.id
       const exp= await Expense.destroy({
        where:{
            id:id
        }
       })
       if(!exp) {res.status(404).send("user mot found")}

       res.status(200).send("delted")
    } catch (error) {
        res.status(500).send("unable to delete")
    }

}
const reteriveEntry=async (req,res)=>{

try {
    const exp = await Expense.findAll({
        where:{ userId:req.user.id

        }
    });
console.log(exp)
   
    res.json(exp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getExpensesWithPagination = async (req, res) => {
  try {
    // 1️⃣ page & limit query se lo
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    // 2️⃣ offset calculate karo
    const offset = (page - 1) * limit;

    // 3️⃣ DB se paginated data + count
    const { count, rows } = await Expense.findAndCountAll({
      where: { userId: req.user.id },   // auth middleware se
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    // 4️⃣ response bhejo
    res.status(200).json({
      expenses: rows,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
    });

  } catch (err) {
    console.log(" error is",err);
    res.status(500).json({ error: err.message });
  }
};

//module.exports = { getExpensesWithPagination };
// const { BlobServiceClient } = require("@azure/storage-blob");
// const { v1: uuidv1 } = require("uuid");
// //const User = require("../models/User"); // apna path check kar lena

// const downloadExpenses = async (req, res) => {
//   try {
//     const queryId = Number(req.query.id);

//     // ✅ user fetch
//     const user = await User.findOne({ where: { id: queryId } });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // ✅ premium check
//     if (!user.isPremiumUser) {
//       return res.status(401).json({
//         success: false,
//         message: "User is not a premium user",
//       });
//     }

//     // ✅ Azure connection
//     const blobServiceClient = BlobServiceClient.fromConnectionString(
//       process.env.AZURE_STORAGE_CONNECTION_STRING
//     );

//     // ✅ container (lowercase + already public from portal)
//     const containerName = "prasadyash549yahooexpensetracker";
//     const containerClient =
//       blobServiceClient.getContainerClient(containerName);

//     // ✅ container exists check
//     const exists = await containerClient.exists();
//     if (!exists) {
//       await containerClient.create();
//       console.log("Container created");
//     }

//     // ✅ blob
//     const blobName = `expenses-${uuidv1()}.txt`;
//     const blockBlobClient =
//       containerClient.getBlockBlobClient(blobName);

//     // ✅ data
//     const expenses = await user.getExpenses();
//     const data = JSON.stringify(expenses);

//     // ✅ upload
//     await blockBlobClient.upload(data, Buffer.byteLength(data));

//     // ✅ public URL (download will work)
//     const fileUrl = `https://demostoragejagan123.blob.core.windows.net/${containerName}/${blobName}`;

//     return res.status(201).json({
//       success: true,
//       fileUrl,
//     });
//   } catch (err) {
//     console.error("Download error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };

const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuidv4 } = require("uuid");
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const uploadToS3 = async (data, fileName) => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: data,
    ContentType: "text/csv",
  });

  await s3.send(command);
};
const generateDownloadUrl = async (fileName) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
  });

  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 60, // 60 seconds
  });

  return signedUrl;
};

const downloadExpenses = async (req, res) => {
  const queryId = Number(req.query.id);
  try {
    const user = req.user;
    console.log("user in download expenses", user);
console.log("query id is", user.isPremiumUser)
    if (!user.isPremiumUser) {
      return res.status(401).json({ message: "Not a premium user" });
    }

    const expenses = await user.getExpenses();
    console.log(1)
    const fileName = `expenses/${user.id}/${Date.now()}.txt`;
console.log(2)
    await uploadToS3(JSON.stringify(expenses), fileName);
 console.log(3)
    const downloadUrl = await generateDownloadUrl(fileName);
console.log(4)
    res.status(200).json({
      success: true,
      downloadUrl,
    });

  } catch (err) {
    res.status(500).json({ error: err });
  }
};


//module.exports = { downloadExpenses };
 module.exports={addentries,updateEntry,deleteEntry,reteriveEntry,getExpensesWithPagination,downloadExpenses}
























 // const addentries=(req,res)=>{
//     const {email,name,age}=req.body
// const insertQuery=`insert into students (email,name,age) values(?,?,?)`
// db.query(insertQuery,[email,name,age],(err)=>{
//     if(err){
//         console.log(err);
//         res.status(500).send(err.message)
//         db.end();
//         return;
//     }
//     console.log("value inserted")
//     res.status(200).send(`students with name ${name} added`)
// })
// }
// const updateEntry=(req,res)=>{
//     const id=req.params.id
//     const {name}=req.body
//     console.log("PARAM ID:", id);
// console.log("BODY NAME:", name);

//     const updateQuery="update students set name= ? where id= ?";
//     db.query(updateQuery,[name,id],(err,result)=>{
//         if(err){
//             console.log(err.message)
//             res.status(500).send(err.message)
//             //db.end();
//             return;
//         }
//         if(result.affectedRows===0){
//             console.log("updated not succssfully")
            
//             res.status(400).send("student not found")
// return;
//         }
//         res.status(200).send("student  updated")

//             console.log("updated succssfully")
// })
// }
// const deleteEntry=(req,res)=>{
//     const id=req.params.id
//     const deleteQuery=`delete from students where id=?`
//     db.query(deleteQuery,[id],(err,result)=>{
// res.send("hello")
//     })
// }
// const reteriveEntry=(req,res)=>{
//     db.query("SELECT * FROM students", (err, result) => {
//     if (err) return res.status(500).send("DB error");
//     console.log(result)
//     res.send(result); // ✅ yahan actual DB data hota hai
//   });
// }
// module.exports={addentries,updateEntry,deleteEntry,reteriveEntry}
