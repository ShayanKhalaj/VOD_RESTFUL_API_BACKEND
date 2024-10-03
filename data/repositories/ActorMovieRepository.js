import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js";
import OperationResult from "../../domain/common/OperationResult.js";
import TahlildadehVODDbContext from "../../domain/context/TahlildadehVODDbContext.js";
import ActorMovieAddEditModel from "../../domain/dto/actorMovies/ActorMovieAddEditModel.js";

class ActorMovieRepository {
  db = new TahlildadehVODDbContext();

  toCreateModel = (model = ActorMovieAddEditModel.prototype) => {
    return {
      actorId: model.actorId,
      movieId: model.movieId,
    };
  };

  toEditModel = (model = ActorMovieAddEditModel.prototype) => {
    return {
      actorMovieId: model.actorMovieId,
      movieId: model.movieId,
      actorId: model.actorId,
    };
  };

  create = async (model = ActorMovieAddEditModel.prototype) => {
    const op = new OperationResult("create actor movie");
    try {
      const result = await this.db.actorMovies.create(
        this.toCreateModel(model)
      );
      if (result.actorMovieId === undefined)
        return op.failed(
          "actor movie did not create",
          null,
          new HttpStatusCodes().BadRequest()
        );
      return op.succeeded(
        "actor movie created",
        result.actorMovieId,
        new HttpStatusCodes().Created()
      );
    } catch (error) {
      return op.failed(
        "actor movie did not create",
        null,
        new HttpStatusCodes().BadGateway()
      );
    }
  };

  hasActorMovieDupicatedByThisActorIdAndMovieId = async (
    actorId = "",
    movieId = ""
  ) => {
    const result = await this.db.actorMovies.find({
      $and: [{ actorId: actorId }, { movieId: movieId }],
    });
    if (result.length > 0) return true;
    else return false;
  };

  update = async (model = ActorMovieAddEditModel.prototype) => {
    const op = new OperationResult("update actor movie");
    try {
      const result = await this.db.actorMovies.updateOne(
        { actorMovieId: model.actorMovieId },
        { $set: this.toEditModel(model) }
      );
      if (result.acknowledged === false && result.modifiedCount > 0)
        return op.failed(
          "actor movie did not update",
          model.actorMovieId,
          new HttpStatusCodes().NotModified()
        );
      return op.succeeded(
        "actor movie updated",
        model.actorMovieId,
        new HttpStatusCodes().Created()
      );
    } catch (error) {
      return op.failed(
        "actor movie did not update",
        model.actorMovieId,
        new HttpStatusCodes().BadGateway()
      );
    }
  };

  isActorMovieExistsByThisId = async (actorMovieId = "") => {
    const result = await this.db.actorMovies.find({
      actorMovieId: actorMovieId,
    });
    if (result.length > 0) return true;
    else return false;
  };

  delete = async (actorMovieId = "") => {
    const op = new OperationResult("delete actor movie");
    try {
      const result = await this.db.actorMovies.deleteOne({
        actorMovieId: actorMovieId,
      });
      if (result.deletedCount === 0)
        return op.failed(
          "actor movie did not delete",
          actorMovieId,
          new HttpStatusCodes().BadRequest()
        );
      return op.succeeded(
        "actor movie deleted",
        actorMovieId,
        new HttpStatusCodes().OK()
      );
    } catch (error) {
      return op.failed(
        "actor movie did not delete",
        actorMovieId,
        new HttpStatusCodes().BadGateway()
      );
    }
  };



  get = async (actorMovieId = "") => {
    return await this.db.actorMovies.findOne({ actorMovieId: actorMovieId });
  };

  getAll = async () => {
    return await this.db.actorMovies.find({});
  };
}

export default ActorMovieRepository;
