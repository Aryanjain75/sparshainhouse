import mongoose from "mongoose";
const user = new mongoose.Schema({
    orderid:{
        type:String,
        required:[true,"orderid required"]
    },
    userid:{
        type:String,
        required:[true,"userid required"]
    },
    name:{
     type:String,
     required:[true,"Please provide a username"]
    },
    email:{
        type:String,
        required:[true,"please provide Email"]
    },
    phone:{
        type:String,
        required:[true,"please provide phonenumber"]
    },
    date:{
        type:String,
        required:[true,"please provide date"]
    },
    time:{
        type:String,
        required:[true,"please provide time"]
    },
    noOfPeople:{
        type:String,
        required:[true,"please provide number of People"]
    },
    message:{
        type:String,
        required:[true,"please provide message"]
    },
    status:{
        type:String,
        required:[true,"Please Provide status"]
    }
});
const User=mongoose.models.resturents||mongoose.model("resturents",user);
export default User;