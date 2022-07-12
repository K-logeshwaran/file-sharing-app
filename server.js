const app = require("./app")
const mongoose = require("mongoose")  

const PORT = process.env.PORT || 3000
const db= "mongodb://localhost:27017/Uploader"
mongoose.connect(db).then(res=>{
    console.log("Connected Successfully")
    app.listen(PORT,()=>console.log(`listening on ${PORT}..`))
}).catch(err=>{throw new  Error(err.message)})
