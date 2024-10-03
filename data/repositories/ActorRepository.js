import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js";
import OperationResult from "../../domain/common/OperationResult.js";
import TahlildadehVODDbContext from "../../domain/context/TahlildadehVODDbContext.js";
import ActorAddEditModel from "../../domain/dto/actors/ActorAddEditModel.js";
import ActorListItems from "../../domain/dto/actors/ActorListItems.js";
import ActorSearchModel from "../../domain/dto/actors/ActorSearchModel.js";
import ActorSchema from "../../domain/schema/ActorSchema.js";

class ActorRepository {
  db = new TahlildadehVODDbContext();
  status = new HttpStatusCodes()

  toCreateModel = (model = ActorAddEditModel.prototype) => {
    return {
      name: model.name,
      family: model.family,
      nation: model.nation,
    };
  };

  toUpdateModel = (model = ActorAddEditModel.prototype) => {
    return {
      actorId: model.actorId,
      name: model.name,
      family: model.family,
      nation: model.nation,
    };
  };


  create = async (model = ActorAddEditModel.prototype) => {
    const op = new OperationResult("create actor");
    try {
      const actor = this.toCreateModel(model);
      const result = await this.db.actors.create(actor);
      if(result.actorId===undefined)return op.failed('actor did not create',null,this.status.BadRequest())
      else return op.succeeded("actor created", result.actorId,this.status.Created());
    } catch (error) {
      return op.failed(`actor did not create`, null,this.status.BadGateway());
    }
  };

  hasActorDuplicatedByThisNameAndFamily=async(name='',family='')=>{
    const result = await this.db.actors.find({$and:[{name:name},{family:family}]})
    if(result.length>0) return true
    else return false
  }

  delete = async (actorId = "") => {
    const op = new OperationResult("delete actor");
    try {
      const result = await this.db.actors.deleteOne({ actorId: actorId });
      if (result.deletedCount === 0) {
        return op.failed("actor did not delete", actorId,this.status.BadRequest());
      }
      else return op.succeeded("actor deleted", actorId,this.status.OK());
    } catch (error) {
      return op.failed(`actor did not delete`, actorId,this.status.BadGateway());
    }
  };

  hasActorRelatedActorMoviesByThisId=async(actorId='')=>{
    const result = await this.db.actorMovies.find({actorId:actorId})
    if(result.length>0) return true
    else return false
  }

  update = async (model = ActorAddEditModel.prototype) => {
    const op = new OperationResult("update actor");
    try {
      const actor = this.toUpdateModel(model);
      const result = await this.db.actors.updateOne(
        { actorId: model.actorId },
        { $set: actor }
      );
      if (result.acknowledged === true && result.modifiedCount > 0) {
        return op.succeeded("actor updated", model.actorId,this.status.Created());
      } else {
        return op.failed("actor not modified", model.actorId,this.status.NotModified());
      }
    } catch (error) {
      return op.failed(`actor did not update`, model.actorId,this.status.BadGateway());
    }
  };

  isActorExistedByThisId=async(actorId='')=>{
    const result = await this.db.actors.find({actorId:actorId})
    if(result.length>0) return true
    else return false
  }

  get = async (actorId = "") => {
    return await this.db.actors.findOne({ actorId: actorId })
  };

  getAll = async () => {
    return await this.db.actors.find({});
  };

}

export default ActorRepository;
