import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js";
import OperationResult from "../../domain/common/OperationResult.js";
import TahlildadehVODDbContext from "../../domain/context/TahlildadehVODDbContext.js";
import MusicianAddEditModel from "../../domain/dto/musicians/MusicianAddEditModel.js";

class MusicianRepository {

  db=new TahlildadehVODDbContext()
  status= new HttpStatusCodes()

  toCreateModel = (model = MusicianAddEditModel.prototype) => {
    return {
      name: model.name,
      family: model.family,
      nation: model.nation,
    };
  };
  toEditModel = (model = MusicianAddEditModel.prototype) => {
    return {
      musicianId: model.musicianId,
      name: model.name,
      family: model.family,
      nation: model.nation,
    };
  };

  create = async (model = MusicianAddEditModel.prototype) => {
    const op = new OperationResult("create musician");
    try {
      const result = await this.db.musicians.create(this.toCreateModel(model));
      if(result.musicianId===undefined) return op.failed('musician did not create',null,this.status.BadRequest())
      return op.succeeded("musician created", result.musicianId,this.status.Created());
    } catch (error) {
      return op.failed("musician did not create", null,this.status.BadGateway());
    }
  };

  hasMusicianDuplicatedMusicianByThisNameAndFamily = async (
    name = "",
    family = "",
  ) => {

    const result =  await this.db.musicians.find({
      name: name,
      family: family,
    });
    if(result.length>0) return true
    else return false
  };

  update = async (model = MusicianAddEditModel.prototype) => {
    const op = new OperationResult("update musician");
    try {
      const result = await this.db.musicians.updateOne(
        { musicianId: model.musicianId },
        { $set: this.toEditModel(model) }
      );
      if (result.modifiedCount === 0) {
        return op.failed("musician did not updated", model.musicianId,this.status.BadRequest());
      }
      return op.succeeded("musician updated", model.musicianId,this.status.Created());
    } catch (error) {
      return op.failed("musician did not create", model.musicianId,this.status.BadGateway());
    }
  };

  isMusicianExistedByThisId = async (musicianId = "") => {
    const result = await this.db.musicians.find({ musicianId: musicianId });
    if(result.length>0) return true
    else return false
  };

  delete = async (musicianId = "") => {
    const op = new OperationResult("delete musician");
    try {
      const result = await this.db.musicians.deleteOne({ musicianId: musicianId });
      if (result.deletedCount === 0) {
        return op.failed("musician did not delete", musicianId,this.status.BadRequest());
      }
      return op.succeeded("musician deleted", musicianId,this.status.OK());
    } catch (error) {
      return op.failed("musician did not delete", musicianId,this.status.BadGateway());
    }
  };

  hasMusicianRelatedMoviesByThisId = async (musicianId = "") => {
    const result = await this.db.movies.find({ musicianId: musicianId });
    if(result.length>0)return true
    else return false
  };

  get = async (musicianId = "") => {
    return await this.db.musicians.findOne({ musicianId: musicianId })
};

getAll = async () => {
  return await this.db.musicians.find({});
};

}

export default MusicianRepository;
