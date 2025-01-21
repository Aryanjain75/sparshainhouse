import mongoose from "mongoose";

const billingSchema = new mongoose.Schema({
   orderid:{
    type:String,
    required:true
   },
   bill:{
    type:Array,
    required:true
   }
});

export const billItems = mongoose.models.bills || mongoose.model("bills", billingSchema);
