import BoxMovieRepository from "../../data/repositories/BoxMovieRepository.js";
import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js";
import OperationResult from "../../domain/common/OperationResult.js";
import BoxMovieAddEditModel from "../../domain/dto/boxMovies/BoxMovieAddEditModel.js";

class BoxMovieBusiness {
  status = new HttpStatusCodes();
  repo = new BoxMovieRepository();

  create = async (model = BoxMovieAddEditModel.prototype) => {
    const checkDuplicate = await this.repo.hasDuplicatedBoxMovieByThisBoxIdAndMovieId(
        model.boxId,
        model.movieId
      );
    if (checkDuplicate)
      return new OperationResult("create box movie").failed(
        "box movie exists",
        null,
        this.status.BadRequest()
      );
    else return await this.repo.create(model);
  };

  update = async (model = BoxMovieAddEditModel.prototype) => {
    const isExists =
      await this.repo.isBoxMovieExistsByThisBoxMovieId(model.boxMovieId);
    if (!isExists)
      return new OperationResult("update box movie").failed(
        "box movie not found",
        null,
        this.status.NotFound()
      );
    return await this.repo.update(model);
  };

  delete = async (boxMovieId='') => {
      const isExists =await this.repo.isBoxMovieExistsByThisBoxMovieId(boxMovieId);
    if (!isExists)
      return new OperationResult("delete box movie").failed(
        "box movie not found",
        null,
        this.status.NotFound()
      );
    else return await this.repo.delete(boxMovieId);
  };

  get=async(boxMovieId='')=>{
    const boxMovie = await this.repo.get(boxMovieId);
    if (!boxMovie)
      return {error: "box movie not found",status: this.status.NotFound()};
    return boxMovie
  }

  getAll=async()=>{
    const boxMovies = await this.repo.getAll();
    if (boxMovies.length === 0)
      return { error: "no box movies", status: this.status.NoContent() };
    return boxMovies
  }
}

export default BoxMovieBusiness
