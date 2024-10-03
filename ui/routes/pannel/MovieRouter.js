import express from "express";
import MovieController from "../../controllers/pannel/MovieController.js";

const MovieRouter = express.Router();

MovieRouter.get("/getAll", new MovieController().getAll);

MovieRouter.get("/get/:movieId", new MovieController().get);

MovieRouter.post("/create", new MovieController().create);

MovieRouter.put("/edit", new MovieController().edit);

MovieRouter.delete("/delete/:movieId", new MovieController().delete);


export default MovieRouter;
