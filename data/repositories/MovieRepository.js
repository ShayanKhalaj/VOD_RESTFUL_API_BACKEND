import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js";
import OperationResult from "../../domain/common/OperationResult.js";
import TahlildadehVODDbContext from "../../domain/context/TahlildadehVODDbContext.js";
import ActorMovieAddModel from "../../domain/dto/movies/ActorMovieAddModel.js";
import MovieAddEditModel from "../../domain/dto/movies/MovieAddEditModel.js";
import MovieListItems from "../../domain/dto/movies/MovieListItems.js";
import MovieSearchModel from "../../domain/dto/movies/MovieSearchModel.js";

class MovieRepository {
  db = new TahlildadehVODDbContext();
  status= new HttpStatusCodes()

  toCreateModel = (m = MovieAddEditModel.prototype) => {
    return {
      movieName: m.movieName,
      coverImageUrl: m.coverImageUrl,
      coverImageAlter: m.coverImageAlter,
      movieVideoUrl: m.movieVideoUrl,
      description: m.description,
      summary: m.summary,
      time: m.time,
      minAge: m.minAge,
      yearOfBuilt: m.yearOfBuilt,
      imdb: m.imdb,
      hasSubText: m.hasSubText,
      categoryId: m.categoryId,
      genreId: m.genreId,
      musicianId: m.musicianId,
      authorId: m.authorId,
      directorId: m.directorId,
    };
  };

  toEditModel = (m = MovieAddEditModel.prototype) => {
    return {
      movieId: m.movieId,
      movieName: m.movieName,
      coverImageUrl: m.coverImageUrl,
      coverImageAlter: m.coverImageAlter,
      movieVideoUrl: m.movieVideoUrl,
      description: m.description,
      summary: m.summary,
      time: m.time,
      minAge: m.minAge,
      yearOfBuilt: m.yearOfBuilt,
      imdb: m.imdb,
      hasSubText: m.hasSubText,
      categoryId: m.categoryId,
      genreId: m.genreId,
      musicianId: m.musicianId,
      authorId: m.authorId,
      directorId: m.directorId,
    };
  };


  create = async (model = MovieAddEditModel.prototype) => {
    const op = new OperationResult("create movie");
    try {
      const result = await this.db.movies.create(this.toCreateModel(model));
      if(result.movieId===undefined) return op.failed('movie did not create',null,this.status.BadRequest())
      return op.succeeded("movie created", result.movieId,this.status.Created());
    } catch (error) {
      return op.failed("movie did not create", null,this.status.BadGateway());
    }
  };

  hasMovieDuplicatedMovieByThisMovieName = async (movieName = "") => {
    const result =  await this.db.movies.find({ movieName: movieName });
    if(result.length>0) return true
    else return false
  };

  update = async (model = MovieAddEditModel.prototype) => {
    const op = new OperationResult("update movie");
    try {
      const result = await this.db.movies.updateOne(
        { movieId: model.movieId },
        { $set: this.toEditModel(model) }
      );
      if (result.modifiedCount === 0) {
        return op.failed("movie did not updated", model.movieId,this.status.BadRequest());
      }
      return op.succeeded("movie updated", model.movieId,this.status.Created());
    } catch (error) {
      return op.failed("movie did not create", model.movieId,this.status.BadGateway());
    }
  };

  isMovieExistedByThisId=async(movieId='')=>{
    const result= await this.db.movies.find({movieId:movieId})
    if(result.length>0) return true
    else return false
  }

  delete = async (movieId = "") => {
    const op = new OperationResult("delete movie");
    try {
      const result = await this.db.movies.deleteOne({ movieId: movieId });
      if (result.deletedCount === 0) {
        return op.failed("movie did not delete", movieId,this.status.BadRequest());
      }
      return op.succeeded("movie deleted", movieId,this.status.OK());
    } catch (error) {
      return op.failed("movie did not delete", movieId,this.status.BadGateway());
    }
  };

  hasMovieRelatedActorsByThisId=async(movieId='')=>{
    const result = await this.db.actorMovies.find({movieId:movieId})
    if(result.length>0) return true
    else return false
  }

  get = async (movieId = "") => {
      return await this.db.movies.findOne({ movieId: movieId })
  };

  getAll = async () => {
    return await this.db.movies.find({});
  };
}

export default MovieRepository;
