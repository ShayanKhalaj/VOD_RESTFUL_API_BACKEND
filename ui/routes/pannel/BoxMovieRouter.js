import express from "express";
import BoxMovieController from "../../controllers/pannel/BoxMovieController.js";

const BoxMovieRouter = express.Router()

BoxMovieRouter.get('/getAll',new BoxMovieController().getAll)
BoxMovieRouter.get('/get/:boxMovieId',new BoxMovieController().get)
BoxMovieRouter.post('/create',new BoxMovieController().create)
BoxMovieRouter.put('/edit',new BoxMovieController().edit)
BoxMovieRouter.delete('/delete/:boxMovieId',new BoxMovieController().delete)

export default BoxMovieRouter