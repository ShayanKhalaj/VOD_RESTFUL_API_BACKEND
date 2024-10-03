
import ActorBusiness from "../../../business/implements/ActorBusiness.js"
import ActorAddEditModel from "../../../domain/dto/actors/ActorAddEditModel.js"

class ActorController{
    bus=new ActorBusiness()

    getAll=async(req,res)=>{
        const actors = await this.bus.getAll()
        return res.json(actors)
    }

    get=async(req,res)=>{
        const actor = await this.bus.get(req.params.actorId)
        return res.json(actor)
    }

    create=async(req,res)=>{
        const model = new ActorAddEditModel(req.body)
        const op = await this.bus.create(model)
        return res.json(op)
    }


    edit=async(req,res)=>{
        const model = new ActorAddEditModel(req.body)
        const op = await this.bus.update(model)
        return res.json(op)
    }

    delete=async(req,res)=>{
        const op = await this.bus.delete(req.params.actorId)
        return res.json(op)
    }
}

export default ActorController