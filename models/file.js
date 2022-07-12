const {Schema,model} = require("mongoose")

const FileSchema = new Schema({
    filename:{
        type:String,
        required:true 
    },
    path:{
        type:String,
        required:true 
    },
    noOfDownloads:{
        type:Number,
        default:0 
    },
    uploadedAt:{
        type:Date,
        default: Date() 
    },
    password:{
        type:String,
        required:true 
    }
})

module.exports = model("File",FileSchema)