import MovieBusiness from "../../../business/implements/MovieBusiness.js";
import MovieAddEditModel from "../../../domain/dto/movies/MovieAddEditModel.js";

class MovieController {
  bus = new MovieBusiness()
  getAll = async (req, res) => {
    const movies = await this.bus.getAll();
    return res.json(movies)
  };

  get = async (req, res) => {
    const movie = await this.bus.get(req.params.movieId);
    return res.json(movie)
  };

  create = async (req, res) => {
    const op = await this.bus.create(new MovieAddEditModel(req.body));
    return res.json(op)
  };

  edit = async (req, res) => {
    const op = await this.bus.update(new MovieAddEditModel(req.body));
    return res.json(op)
  };

  delete = async (req, res) => {
    const op = await this.bus.delete(req.params.movieId);
    return res.json(op)
  };
}

export default MovieController;
