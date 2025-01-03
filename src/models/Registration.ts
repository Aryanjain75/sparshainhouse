import mongoose from "mongoose";
import { URL } from "url";

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "Please enter Name"]
    },
    Email: {
        type: String,
        required: [true, "Please enter Email"]
    },
    Password: {
        type: String,
        required: [true, "Please provide password"]
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    url:{
        type:String,
        required:[true,"Please provide url"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
});

const user = mongoose.models.Registration || mongoose.model("Registration", userSchema);
export default user;
