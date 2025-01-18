import mongoose from "mongoose";

const Agent = new mongoose.Schema({
    orderId:{
        type:String,
        required:true
    },
    agentName:{
        type:String,
        required:true
    }, 
    contactNumber:{
        type:String,
        required:true
    }, 
    email:{
        type:String,
        required:true
    }, 
    agencyName:{
        type:String,
        required:true
    }, 
    agentId:{
        type:String,
        required:true
    }, 
    specialization:{
        type:String,
        required:true
    }, 
    address:{
        type:String,
        required:true
    }, 
    experience:{
        type:String,
        required:true
    },
});

export default mongoose.models.Agent ||
  mongoose.model("Agent", Agent);