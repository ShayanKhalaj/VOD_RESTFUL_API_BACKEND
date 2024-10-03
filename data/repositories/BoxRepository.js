import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js";
import OperationResult from "../../domain/common/OperationResult.js";
import TahlildadehVODDbContext from "../../domain/context/TahlildadehVODDbContext.js";
import BoxAddEditModel from "../../domain/dto/boxes/BoxAddEditModel.js";
import BoxMovieAddModel from "../../domain/dto/boxes/BoxMovieAddModel.js";

class BoxRepository {
  db = new TahlildadehVODDbContext();
  status = new HttpStatusCodes();

  toCreateModel = (model = BoxAddEditModel.prototype) => {
    return {
      title: model.title,
      description: model.description,
    };
  };

  toEditModel = (model = BoxAddEditModel.prototype) => {
    return {
      boxId: model.boxId,
      title: model.title,
      description: model.description,
    };
  };

  create = async (model = BoxAddEditModel.prototype) => {
    const op = new OperationResult("create box");
    try {
      const result = await this.db.boxes.create(this.toCreateModel(model));
      if (result.boxId === undefined)
        return op.failed("box did not create", null, this.status.BadRequest());
      return op.succeeded("box created", result.boxId, this.status.Created());
    } catch (error) {
      return op.failed("box did not create", null, this.status.BadGateway());
    }
  };

  hasBoxDuplicatedBoxByThisTitle = async (title = "") => {
    const result = await this.db.boxes.find({ title:title });
    if (result.length > 0) return true;
    else return false;
  };

  createBoxMovie = async (model = [BoxMovieAddModel.prototype]) => {
    const op = new OperationResult("create box movies");
    try {
      await this.db.boxMovies.insertMany(model);
      return op.succeeded(
        "related box movies added",
        null,
        this.status.Created()
      );
    } catch (error) {
      return op.failed("box movies did not create", null, this.status.BadGateway());
    }
  };

  update = async (model = BoxAddEditModel.prototype) => {
    const op = new OperationResult("update box");
    try {
      const result = await this.db.boxes.updateOne(
        { boxId: model.boxId },
        { $set: this.toEditModel(model) }
      );
      if (result.modifiedCount === 0) {
        return op.failed(
          "box did not update",
          model.boxId,
          this.status.BadRequest()
        );
      }
      return op.succeeded("box updated", model.boxId, this.status.Created());
    } catch (error) {
      return op.failed(
        "box did not update",
        model.boxId,
        this.status.BadGateway()
      );
    }
  };

  isBoxExistedByThisId = async (boxId = "") => {
    const result = await this.db.boxes.find({ boxId: boxId });
    if (result.length > 0) return true;
    else return false;
  };

  delete = async (boxId = "") => {
    const op = new OperationResult("delete box");
    try {
      const result = await this.db.boxes.deleteOne({ boxId: boxId });
      if (result.deletedCount === 0) {
        return op.failed("box did not create", boxId, this.status.BadRequest());
      }
      return op.succeeded("box deleted", boxId, this.status.OK());
    } catch (error) {
      return op.failed("box did not delete", boxId, this.status.BadGateway());
    }
  };

  hasRelatedBoxMoviesByThisBoxId = async (boxId = "") => {
    const result = await this.db.boxMovies.find({ boxId: boxId });
    if (result.length > 0) return true;
    else return false;
  };

  get = async (boxId = "") => {
    return await this.db.boxes.findOne({ boxId: boxId });
  };

  getAll = async () => {
    return await this.db.boxes.find({});
  };
}

export default BoxRepository;
