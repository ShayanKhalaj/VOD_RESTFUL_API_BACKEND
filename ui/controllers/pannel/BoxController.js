import BoxBusiness from "../../../business/implements/BoxBisuness.js"
import BoxAddEditModel from "../../../domain/dto/boxes/BoxAddEditModel.js"
import BoxMovieAddModel from "../../../domain/dto/boxes/BoxMovieAddModel.js"

class BoxController{
    bus = new BoxBusiness()

    getAll=async(req,res)=>{
        const boxes = await this.bus.getAll()
        return res.json(boxes)
    }

    get=async(req,res)=>{
        const box = await this.bus.get(req.params.boxId)
        return res.json(box)
    }
    
    create=async(req,res)=>{
        const op = await this.bus.create(new BoxAddEditModel(req.body))
        return res.json(op)
    }

    createBoxMovies=async(req,res)=>{
        const op = await this.bus.createBoxMovies([new BoxMovieAddModel(req.body)])
        return res.json(op)
    }

    edit=async(req,res)=>{
        const op= await this.bus.update(new BoxAddEditModel(req.body))
        return res.json(op)
    }

    delete=async(req,res)=>{
        const op = await this.bus.delete(req.params.boxId)
        return res.json(op)
    }

}

export default BoxController