import ActorMovieBusiness from "../../../business/implements/ActorMovieBusiness.js";
import HttpStatusCodes from "../../../domain/common/HttpStatusCodes.js";
import ActorMovieAddEditModel from "../../../domain/dto/actorMovies/ActorMovieAddEditModel.js";

class ActorMovieController {
  bus = new ActorMovieBusiness()
  status = new HttpStatusCodes();

  getAll = async (req, res) => {
    const actorMovies = await this.bus.getAll();
    return res.json(actorMovies)
  };

  get = async (req, res) => {
    const actorMovie = await this.bus.get(req.params.actorMovieId);
    return res.json(actorMovie)
  };

  create = async (req, res) => {
    const op = await this.bus.create(new ActorMovieAddEditModel(req.body));
    return res.json(op)
  };

  edit = async (req, res) => {
    const op = await this.bus.update(new ActorMovieAddEditModel(req.body));
    return res.json(op)
  };

  delete = async (req, res) => {
    const op = await this.bus.delete(req.params.actorMovieId);
    return res.json(op)
  };
}

export default ActorMovieController;
