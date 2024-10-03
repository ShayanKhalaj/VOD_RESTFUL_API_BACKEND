import mongoose from "mongoose";

const Schema = mongoose.Schema

const ActorMovieSchema = new Schema({
    actorMovieId:{
        type:Schema.ObjectId,
        unique:true,
        auto:true,
        index:true
    },
    actorId:{
        type:Schema.ObjectId,
        ref:'actors'
    },
    movieId:{
        type:Schema.ObjectId,
        ref:'movies'
    }
})

export default ActorMovieSchema

// Module Not Found