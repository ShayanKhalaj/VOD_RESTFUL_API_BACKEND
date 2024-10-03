import mongoose from "mongoose";

const Schema = mongoose.Schema

const BoxMovieSchema = new Schema({
    boxMovieId:{
        type:Schema.ObjectId,
        unique:true,
        auto:true,
        index:true
    },
    boxId:{
        type:Schema.ObjectId,
        ref:'boxes'
    },
    movieId:{
        type:Schema.ObjectId,
        ref:'movies'
    }
})

export default BoxMovieSchema