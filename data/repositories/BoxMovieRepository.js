import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js";
import OperationResult from "../../domain/common/OperationResult.js";
import TahlildadehVODDbContext from "../../domain/context/TahlildadehVODDbContext.js";
import BoxMovieAddEditModel from "../../domain/dto/boxMovies/BoxMovieAddEditModel.js";

class BoxMovieRepository {
  db = new TahlildadehVODDbContext();
  status = new HttpStatusCodes()

  toCreateModel = (model = BoxMovieAddEditModel.prototype) => {
    return {
      boxId: model.boxId,
      movieId: model.movieId,
    };
  };

  toEditModel = (model = BoxMovieAddEditModel.prototype) => {
    return {
      boxMovieId: model.boxMovieId,
      movieId: model.movieId,
      boxId: model.boxId,
    };
  };

  create = async (model = BoxMovieAddEditModel.prototype) => {
    const op = new OperationResult("create box movie");
    try {
      const result = await this.db.boxMovies.create(this.toCreateModel(model))
      if(result.boxMovieId===undefined) return op.failed('box movie did not create',null,this.status.BadRequest())
      else return op.succeeded("box movie created", result.boxMovieId,this.status.Created());
    } catch (error) {
      console.log(error)
      return op.failed("box movie did not create", null,this.status.BadGateway());
    }
  };

  hasDuplicatedBoxMovieByThisBoxIdAndMovieId=async(boxId='',movieId='')=>{
    const result = await this.db.boxMovies.find({$and:[{boxId:boxId},{movieId:movieId}]})
    if(result.length>0) return true
    else return false
  }

  update = async (model = BoxMovieAddEditModel.prototype) => {
    const op = new OperationResult("edit box movie");
    try {
      const result = await this.db.boxMovies.updateOne(
        { boxMovieId: model.boxMovieId },
        { $set: this.toCreateModel(model) }
      );
      if(result.matchedCount>0)
      return op.succeeded("box movie updated", model.boxMovieId,this.status.Created());
    else return op.failed('box movie did not update',model.boxMovieId,this.status.NotModified())
    } catch (error) {
      return op.failed("box movie did not update", model.boxMovieId,this.status.BadGateway());
    }
  };

  isBoxMovieExistsByThisBoxMovieId=async(boxMovieId='')=>{
    const result = await this.db.boxMovies.find({boxMovieId:boxMovieId})
    if(result.length>0) return true
    return false
  }

  delete = async (boxMovieId='') => {
    const op = new OperationResult("delete box movie");
    try {
      const result = await this.db.boxMovies.deleteOne({boxMovieId:boxMovieId});
      if(result.deletedCount>0)
      return op.succeeded("box movie deleted", boxMovieId,this.status.OK());
    else return op.failed('box movie did not delete',boxMovieId,this.status.BadRequest())
    } catch (error) {
      return op.failed("box movie did not delete", boxMovieId,this.status.BadGateway());
    }
  };

  get=async(boxMovieId='')=>{
    return await this.db.boxMovies.findOne({boxMovieId:boxMovieId})
  }

  getAll=async()=>{
    return await this.db.boxMovies.find({})
  }
}

export default BoxMovieRepository
