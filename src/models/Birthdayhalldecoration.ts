import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    _id: { type: String, required: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    media: {
        primary: {
            defaultAlt: { type: String },
            url: { type: String, required: true }
        }
    },
    updatedAt: { type: Date, default: Date.now },
    sku: { type: String, required: true },
    quality: {
        rating: {
            value: { type: Number },
            count: { type: Number }
        }
    },
    tag: { type: Object },
    delivery: {
        processingTime: {
            hours: { type: Number }
        },
        slots: [{
            type: { type: String }
        }]
    },
    price: {
        price: { type: Number, required: true },
        mrp: { type: Number, required: true }
    },
    slotTypes: [{
        _id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        timeSlots: [{
            label: { type: String, required: true }
        }]
    }]
},);

export const  BirthdayHallDecoration =
  mongoose.models.BirthdayHallDecoration ||
  mongoose.model('BirthdayHallDecoration', schema);