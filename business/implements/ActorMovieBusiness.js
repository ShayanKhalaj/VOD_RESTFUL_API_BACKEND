import ActorMovieRepository from "../../data/repositories/ActorMovieRepository.js";
import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js";
import OperationResult from "../../domain/common/OperationResult.js";
import ActorMovieAddEditModel from "../../domain/dto/actorMovies/ActorMovieAddEditModel.js";

class ActorMovieBusiness {
  status = new HttpStatusCodes();
  repo = new ActorMovieRepository();
  create = async (model = ActorMovieAddEditModel.prototype) => {
    const op = new OperationResult("create actor movie");
    const checkDuplicate =
      await this.repo.hasActorMovieDupicatedByThisActorIdAndMovieId(
        model.actorId,
        model.movieId
      );
    if (checkDuplicate)
      return op.failed(
        "actor movie exists",
        model.actorMovieId,
        this.status.BadRequest()
      );
    else return await this.repo.create(model);
  };

  update = async (model = ActorMovieAddEditModel.prototype) => {
    const op = new OperationResult("update actor movie");
    const isExists = await this.repo.isActorMovieExistsByThisId(model.actorMovieId);
    if (!isExists){
        return op.failed("actor movie not found", null, this.status.NotFound());
    }
    else return await this.repo.update(model);
  };

  delete = async (actorMovieId = "") => {
    const op = new OperationResult("delete actor movie");
    const isExists = await this.repo.isActorMovieExistsByThisId(actorMovieId);
    if (!isExists)
      return op.failed("actor movie not found", null, this.status.NotFound());
    else return await this.repo.delete(actorMovieId);
  };

  get = async (actorMovieId = "") => {
    const actorMovie = await this.repo.get(actorMovieId);
    if (!actorMovie)
      return {error: "actor movie not found",status: this.status.NotFound()};
    else return actorMovie
  };

  getAll = async () => {
    const actorMovies = await this.repo.getAll();
    if (actorMovies.length === 0)
      return { error: "no actor movies", status: this.status.NoContent() };
    else return actorMovies;
  };
}

export default ActorMovieBusiness;
