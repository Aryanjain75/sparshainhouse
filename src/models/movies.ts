import mongoose from "mongoose";
const movieschema=new mongoose.Schema({
    titleText:{
        type:String,
        required:[true,"Please provide title"]
    },
    titleType:{
        type:String,
        required:[true,"Please provide titletype"]
    },
    originalTitleText:{
        type:String,
        required:[true,"please provide movie name"]
    },
    primaryImage:{
        type:String,
        required:[true,"please provide image"]
    },
    heros:{
        type:Array,
        required:[true,"please provide heros"]
    },
    releaseYear:{
        type:String,
        required:[true,"please provide year"]
    },ratingsSammary:{
        type:String,
        rating:[true,"please provide ratting"]
    },
    runtime:{
        type:Number,
        required:[true,"please provide runtime"]
    },
    certificateratting:{
        type:String,
        required:[true,"please provide certificate ratting"]
    },
    canRate:{
        type:Boolean,
        required:[true,"please provide rattingoption"]
    },
    titleGenres:{
        type:Array,
        required:[true,"please provide genere"]
    },

})
const movies =mongoose.models.movies|| mongoose.model("movies", movieschema);

export default movies;
