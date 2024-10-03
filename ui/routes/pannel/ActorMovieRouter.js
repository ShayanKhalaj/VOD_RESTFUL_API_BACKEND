import express from "express";
import ActorMovieController from "../../controllers/pannel/ActorMovieController.js";

const ActorMovieRouter = express.Router()

ActorMovieRouter.get('/getAll',new ActorMovieController().getAll)

ActorMovieRouter.get('/get/:actorMovieId',new ActorMovieController().getAll)

ActorMovieRouter.post('/create',new ActorMovieController().create)

ActorMovieRouter.put('/edit',new ActorMovieController().edit)

ActorMovieRouter.delete('/delete/:actorMovieId',new ActorMovieController().delete)

export default ActorMovieRouter