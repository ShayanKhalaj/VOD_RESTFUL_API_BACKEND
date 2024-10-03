import ActorRepository from "../../data/repositories/ActorRepository.js";
import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js";
import OperationResult from "../../domain/common/OperationResult.js";
import ActorAddEditModel from "../../domain/dto/actors/ActorAddEditModel.js";

class ActorBusiness {
  repo = new ActorRepository();
  status = new HttpStatusCodes();

  create = async (model = ActorAddEditModel.prototype) => {
    const checkDuplicate =
      await this.repo.hasActorDuplicatedByThisNameAndFamily(
        model.name,
        model.family
      );
    if (checkDuplicate)
      return new OperationResult("create actor").failed(
        "actor exists",
        null,
        this.status.BadRequest()
      );
    else return await this.repo.create(model);
  };

  update = async (model = ActorAddEditModel.prototype) => {
    const isActorExistedByThisId =
      await this.repo.isActorExistedByThisId(model.actorId);
    if (!isActorExistedByThisId)
      return new OperationResult("update actor").failed(
        "actor not found",
        null,
        this.status.NotFound()
      );
    else return await this.repo.update(model);
  };

  delete = async (actorId='') => {
    const hasRelated =
      await this.repo.hasActorRelatedActorMoviesByThisId(actorId);
    if (hasRelated)
      return new OperationResult("delete actor").failed(
        "actor has related actor movies",
        actorId,
        this.status.BadRequest()
      );
    else return await this.repo.delete(actorId);
  };

  get=async(actorId='')=>{
    const actor = await this.repo.get(actorId);
    if (!actor)
      return {error: "actor not found",status: this.status.NotFound()};
    return actor
  }

  getAll=async()=>{
    const actor = await this.repo.getAll();
    if (actor.length === 0)
      return { error: "no actor", status: this.status.NoContent() };
    return actor
  }
}


export default ActorBusiness