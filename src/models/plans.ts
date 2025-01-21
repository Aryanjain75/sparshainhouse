import mongoose from "mongoose";

const PlansSchema = new mongoose.Schema({
   orderid:{
    type:String,
    required:true
   },
   plan:{
    type:Array,
    required:true
   }
});

export const Items = mongoose.models.Plans || mongoose.model("Plans", PlansSchema);
