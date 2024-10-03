import MovieRepository from "../../data/repositories/MovieRepository.js"
import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js"
import OperationResult from "../../domain/common/OperationResult.js"
import MovieAddEditModel from "../../domain/dto/movies/MovieAddEditModel.js"

class MovieBusiness{
    repo=new MovieRepository()
    status = new HttpStatusCodes()
    create=async(model=MovieAddEditModel.prototype)=>{
        const checkDuplicate = await this.repo.hasMovieDuplicatedMovieByThisMovieName(model.movieName)
        if(checkDuplicate) return new OperationResult('create movie').failed('movie exists',null,this.status.BadRequest())
            else return await this.repo.create(model)
    }
    update=async(model=MovieAddEditModel.prototype)=>{
        const isExists = await this.repo.isMovieExistedByThisId(model.movieId)
        if(!isExists) return new OperationResult('update movie').failed('movie is not exists',null,this.status.NotFound())
            else return await this.repo.update(model)
    }
    delete=async(movieId='')=>{
        const isExists = await this.repo.isMovieExistedByThisId(movieId)
        if(!isExists) return new OperationResult('delete movie').failed('movie is not exists',null,this.status.NotFound())
            const relateds = await this.repo.hasMovieRelatedActorsByThisId(movieId)
        if(relateds) return new OperationResult('delete movie').failed('movie has related actors',null,this.status.BadRequest())
            else return await this.repo.delete(movieId)
    }
    get=async(movieId='')=>{
        const movie = await this.repo.get(movieId);
        if (!movie)
          return {error: "movie not found",status: this.status.NoContent()};
        return movie
      }
    
      getAll=async()=>{
        const movies = await this.repo.getAll();
        if (movies.length === 0)
          return { error: "no movies yet", status: this.status.NoContent() };
        return movies
      }
}
export default MovieBusiness