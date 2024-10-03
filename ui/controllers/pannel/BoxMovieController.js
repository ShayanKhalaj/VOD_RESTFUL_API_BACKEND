import BoxMovieBusiness from "../../../business/implements/BoxMovieBusiness.js";
import BoxMovieAddEditModel from "../../../domain/dto/boxMovies/BoxMovieAddEditModel.js";

class BoxMovieController {
  bus = new BoxMovieBusiness();

  getAll = async (req, res) => {
    return res.json(await this.bus.getAll());
  };
  get = async (req, res) => {
    return res.json(await this.bus.get(req.params.boxMovieId));
  };
  create = async (req, res) => {
    return res.json(await this.bus.create(new BoxMovieAddEditModel(req.body)));
  };
  edit = async (req, res) => {
    return res.json(await this.bus.update(new BoxMovieAddEditModel(req.body)));
  };
  delete = async (req, res) => {
    return res.json(await this.bus.delete(req.params.boxMovieId));
  };
}

export default BoxMovieController;
