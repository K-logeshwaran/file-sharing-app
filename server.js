const app = require("./app")
const mongoose = require("mongoose")  

const PORT = process.env.PORT || 3000
const db= "mongodb+srv://logeshwaran:goodmorning@blogmania.y6bz4.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(db).then(res=>{
    console.log("Connected Successfully")
    app.listen(PORT,()=>console.log(`listening on ${PORT}..`))
}).catch(err=>{throw new  Error(err.message)})
