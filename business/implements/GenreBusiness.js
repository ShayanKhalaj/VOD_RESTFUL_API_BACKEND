import GenreRepository from "../../data/repositories/GenreRepository.js";
import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js";
import OperationResult from "../../domain/common/OperationResult.js";
import GenreAddEditModel from "../../domain/dto/genres/GenreAddEditModel.js";

class GenreBusiness{
    repo=new GenreRepository()
    status=new HttpStatusCodes()
    create=async(model=GenreAddEditModel.prototype)=>{
        const checkDuplicate = await this.repo.hasGenreDuplicatedGenreByThisGenreName(model.genreName)
        if(checkDuplicate) return new OperationResult('create genre').failed('genre exists',null,this.status.BadRequest())
            else return await this.repo.create(model)
    }
    update=async(model=GenreAddEditModel.prototype)=>{
        const isExists = await this.repo.isGenreExistedByThisId(model.genreId)
        if(!isExists) return new OperationResult('update genre').failed('genre is not exists',null,this.status.NotFound())
            else return await this.repo.update(model)
    }
    delete=async(genreId='')=>{
        const isExists = await this.repo.isGenreExistedByThisId(genreId)
        if(!isExists) return new OperationResult('delete genre').failed('genre is not exists',null,this.status.NotFound())
            const relateds = await this.repo.hasGenreRelatedMoviesByThisId(genreId)
        if(relateds) return new OperationResult('delete genre').failed('genre has related movies',null,this.status.BadRequest())
            else return await this.repo.delete(genreId)
    }
    get=async(genreId='')=>{
        const genre = await this.repo.get(genreId);
        if (!genre)
          return {error: "genre not found",status: this.status.NoContent()};
        return genre
      }
    
      getAll=async()=>{
        const genres = await this.repo.getAll();
        if (genres.length === 0)
          return { error: "no genres yet", status: this.status.NoContent() };
        return genres
      }
}

export default GenreBusiness