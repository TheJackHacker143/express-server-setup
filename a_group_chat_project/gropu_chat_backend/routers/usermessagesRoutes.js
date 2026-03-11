const express=require("express")
const multer=require("multer")
const aunthenticateToken=require("../middleware/auth")
const messagesController=require("../controllers/messagesController")

const router=express.Router()

/* multer setup */

const upload=multer()

router.post(
"/fileupload",
aunthenticateToken.aunthenticate,
upload.single("file"),
messagesController.uploadFile
)

router.get(
"/file",
aunthenticateToken.aunthenticate,
messagesController.getFileUrl
)
module.exports=router;