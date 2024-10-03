import BoxRepository from "../../data/repositories/BoxRepository.js";
import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js";
import OperationResult from "../../domain/common/OperationResult.js";
import BoxAddEditModel from "../../domain/dto/boxes/BoxAddEditModel.js";

class BoxBusiness {
  status = new HttpStatusCodes();
  repo = new BoxRepository();

  create = async (model = BoxAddEditModel.prototype) => {
    const checkDuplicate = await this.repo.hasBoxDuplicatedBoxByThisTitle(
      model.title
    );
    if (checkDuplicate)
      return new OperationResult("create box").failed(
        "box exists",
        null,
        this.status.BadRequest()
      );
    else return await this.repo.create(model);
  };


  createBoxMovies = async (model = [BoxMovieAddModel.prototype]) => {
    return await this.repo.create(model);
  };

  update = async (model = BoxAddEditModel.prototype) => {
    const isExists = await this.repo.isBoxExistedByThisId(model.boxId);
    if (!isExists)
      return new OperationResult("update box").failed(
        "box is not exists",
        null,
        this.status.NoContent()
      );
    else return await this.repo.update(model);
  };
  delete = async (boxId = "") => {
    const isExists = await this.repo.isBoxExistedByThisId(boxId);
    if (!isExists)
      return new OperationResult("delete box").failed(
        "box is not exists",
        null,
        this.status.NoContent()
      );
    const hasRelatedMovies = await this.repo.hasRelatedBoxMoviesByThisBoxId(
      boxId
    );
    if (hasRelatedMovies)
      return new OperationResult("delete box").failed(
        "box has related movies",
        boxId,
        this.status.BadRequest()
      );
    else return await this.repo.delete(boxId);
  };

  get=async(boxId='')=>{
    const box = await this.repo.get(boxId);
    if (!box)
      return {error: "box not found",status: this.status.NotFound()};
    return box
  }

  getAll=async()=>{
    const boxes = await this.repo.getAll();
    if (boxes.length === 0)
      return { error: "no box", status: this.status.NoContent() };
    return boxes
  }
}

export default BoxBusiness;
