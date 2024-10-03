import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js";
import OperationResult from "../../domain/common/OperationResult.js";
import TahlildadehVODDbContext from "../../domain/context/TahlildadehVODDbContext.js";
import DirectorAddEditModel from "../../domain/dto/directors/DirectorAddEditModel.js";
import DirectorListItems from "../../domain/dto/directors/DirectorListItems.js";
import DirectorSearchModel from "../../domain/dto/directors/DirectorSearchModel.js";

class DirectorRepository {
  db=new TahlildadehVODDbContext()
  status = new HttpStatusCodes()
  toCreateModel=(model = DirectorAddEditModel.prototype)=>{
    return{
      name:model.name,
      family:model.family,
      nation:model.nation
    }
  }

  toEditModel=(model = DirectorAddEditModel.prototype)=>{
    return{
      directorId:model.directorId,
      name:model.name,
      family:model.family,
      nation:model.nation
    }
  }


  create = async (model = DirectorAddEditModel.prototype) => {
    const op = new OperationResult("create director");
    try {
      const result = await this.db.directors.create(this.toCreateModel(model));
      if(result.directorId===undefined) return op.failed('director did not create',null,this.status.BadRequest())
      return op.succeeded("director created", result.directorId,this.status.Created());
    } catch (error) {
      return op.failed("director did not create", null,this.status.BadGateway());
    }
  };

  hasDirectorDuplicatedDirectorByThisNameAndFamily = async (
    name = "",
    family = "",
  ) => {
    const result = await this.db.directors.find({
      name: name,
      family: family,
    });
    if(result.length>0) return true
    else return false
  };

  update = async (model = DirectorAddEditModel.prototype) => {
    const op = new OperationResult("update director");
    try {
      const result = await this.db.directors.updateOne(
        { directorId: model.directorId },
        { $set: this.toEditModel(model) }
      );
      if (result.modifiedCount === 0 && result.acknowledged === false) {
        return op.failed("director did not update", model.directorId,this.status.BadRequest());
      }
      return op.succeeded("director updated", model.directorId,this.status.Created());
    } catch (error) {
      return op.failed("director did not update", model.directorId,this.status.BadGateway());
    }
  };

  isExistedDirectorByThisId = async (directorId = "") => {
    const result = await this.db.directors.find({ directorId: directorId });
    if(result.length>0) return true
    else return false
  };

  delete = async (directorId = "") => {
    const op = new OperationResult("delete direcor");
    try {
      const result = await this.db.directors.deleteOne({ directorId: directorId });
      if (result.deletedCount === 0) {
        return op.failed("director did not delete", directorId,this.status.BadRequest());
      }
      return op.succeeded("director deleted", directorId,this.status.OK());
    } catch (error) {
      return op.failed("director did not delete", directorId,this.status.BadGateway());
    }
  };

  get = async (directorId = "") => {
    return await this.db.directors.findOne({ directorId: directorId });
  };

  getAll = async () => {
    return await this.db.directors.find({});
  };
}

export default DirectorRepository;
