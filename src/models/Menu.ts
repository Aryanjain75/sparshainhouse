import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    CloudanaryImageId: {
        type: String,
        required: [true, "Please provide Image Id"]
    },
    DISCOUNT: {
        type: String,
        required: [true, "Please provide Discount"]
    },
    CUSSINE: {
        type: String,
        required: [true, "Please provide Cuisine"]
    },
    FOODNAME: {
        type: String,
        required: [true, "Please provide Item Name"]
    },
    PRICE: {
        type: String,
        required: [true, "Please provide Price of Item"]
    },
    DISCOUNTED_PRICE: {
        type: String,
        required: [true, "Please provide discounted price"]
    },
    RATINGS: {
        type: Number,
        required: [true, "Please provide ratings"]
    },
    TAGS: {
        type: [String],
        required: [true, "Please provide tags"]
    }
});

export const Items = mongoose.models.Menu || mongoose.model("Menu", menuSchema);
