import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js";
import OperationResult from "../../domain/common/OperationResult.js";
import TahlildadehVODDbContext from "../../domain/context/TahlildadehVODDbContext.js";
import GenreAddEditModel from "../../domain/dto/genres/GenreAddEditModel.js";
import GenreListItems from "../../domain/dto/genres/GenreListItems.js";
import GenreSearchModel from "../../domain/dto/genres/GenreSearchModel.js";


class GenreRepository {
  db = new TahlildadehVODDbContext();
  status = new HttpStatusCodes()

  toCreateModel = (model = GenreAddEditModel.prototype) => {
    return {
      genreName: model.genreName,
      description: model.description,
    };
  };

  toEditModel = (model = GenreAddEditModel.prototype) => {
    return {
      genreId: model.genreId,
      genreName: model.genreName,
      description: model.description,
    };
  };

  create = async (model = GenreAddEditModel.prototype) => {
    const op = new OperationResult("create genre");
    try {
      const result = await this.db.genres.create(this.toCreateModel(model));
      if(result.genreId===undefined) return op.failed('genre did not create',null,this.status.BadRequest())
      return op.succeeded("genre created", result.genreId,this.status.Created());
    } catch (error) {
      return op.failed(`genre did not create`, null,this.status.BadGateway());
    }
  };

  hasGenreDuplicatedGenreByThisGenreName = async (genreName = "") => {
    const result =  await this.db.genres.find({ genreName: genreName });
    if(result.length>0) return true
    else return false
  };

  update = async (model = GenreAddEditModel.prototype) => {
    const op = new OperationResult('update genre')
    try {
        const filter = {genreId:model.genreId}
        const editModel = {$set:this.toEditModel(model)}
        const result = await this.db.genres.updateOne(filter,editModel)
        if(result.modifiedCount===0){
            return op.failed('genre did not update',model.genreId,this.status.BadRequest())
        }
        return op.succeeded('genre updated',model.genreId,this.status.Created())
    } catch (error) {
        return op.failed(`genre did not update`,model.genreId,this.status.BadGateway())
    }
  };

  isGenreExistedByThisId=async(genreId='')=>{
    const result= await this.db.genres.find({genreId:genreId})
    if(result.length>0) return true
    else return false
  }

  delete=async(genreId='')=>{
    const op = new OperationResult('delete genre')
    try {
        const filter = {genreId:genreId}
        const result = await this.db.genres.deleteOne(filter)
        if(result.deletedCount===0){
            return op.failed(`genre did not delete`,genreId,this.status.BadRequest())
        }
        return op.succeeded('genre deleted',genreId,this.status.OK())
    } catch (error) {
        return op.failed(`genre did not delete`,genreId,this.status.BadGateway())
    }
  }

  hasGenreRelatedMoviesByThisId=async(genreId='')=>{
    const result = await this.db.movies.find({genreId:genreId})
    if(result.length>0) return true
    else return false
  }

  get=async(genreId='')=>{
    return await this.db.genres.findOne({genreId:genreId})
  }

  getAll=async()=>{
    return await this.db.genres.find({})
  }

}

export default GenreRepository;
