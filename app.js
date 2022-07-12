const express = require("express")
// const pug = require('pug')
const File = require("./models/file")
const bcrypt = require("bcrypt")

const multer = require("multer")
const upload = multer({dest:"uploads"})
const app = express()
app.use(express.urlencoded({extended:true}))

app.set(" views ",__dirname+"/views")
app.set("view engine","pug")

app.get("/",(req,res)=>{
    res.render("index",{
        message:"Upload File " 
    })
})

app.post("/file",upload.single("file"),async (req,res)=>{
    console.log(req.body)
    console.log(req.file);
    let send  = await File.create({
        filename: req.file.originalname,
        path:req.file.path,
        password: await bcrypt.hash(req.body.password,10)
    })
    console.log(send);
    let link = `${req.headers.origin}/file/${send._id}`
    res.send(`<div>
        share link
        <a href = ${link}>${link}</a>
    </div>`)
    
    
    
});


// async function handler(req,res){
//     let file = await File.findById(req.params.id)
//     console.log("Both");
//     console.log(file);
//     if(file.password !=null){
//         console.log(req.body.password);
//         res.render("password")
//         if(req.body.password != null){
//             if(! await bcrypt.compare(req.body.password,file.password)){
//                 res.render("password",{
//                     error:"Wrong Password"
//                 })
//                 return 
//             }
//         }
//     }
//     file.noOfDownloads+=1 
//     await file.save()
//     res.download(file.path,file.filename)
// }

app.get("/file/:id",async (req,res)=>{
    res.render("password",{id:req.params.id})
});
app.post("/file/:id",async (req,res,next)=>{
    console.log("hello");
    console.log(req.params.id);
    let file = await File.findById(req.params.id)
    console.log(file);
    if(await bcrypt.compare(req.body.password,file.password)!=true){
        res.render("password",{
            error:"Incorrect Password ReEnter correctly" ,
            id:req.params.id     
        })
        return 
    }
    file.noOfDownloads+=1 
    await file.save()
    return res.download(file.path,file.filename)
});



module.exports = app 

