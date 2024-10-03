import GenreBusiness from "../../../business/implements/GenreBusiness.js"
import GenreAddEditModel from "../../../domain/dto/genres/GenreAddEditModel.js"

class GenreController{
    bus=new GenreBusiness()
    getAll=async(req,res)=>{
        const genres = await this.bus.getAll()
        return res.json(genres)
    }

    get=async(req,res)=>{
        const genre = await this.bus.get(req.params.genreId)
        return res.json(genre)
    }

    create=async(req,res)=>{
        const op = await this.bus.create(new GenreAddEditModel(req.body))
        return res.json(op)
    }

    edit=async(req,res)=>{
        const op = await this.bus.update(new GenreAddEditModel(req.body))
        return res.json(op)
    }

    delete=async(req,res)=>{
        const op = await this.bus.delete(req.params.genreId)
        return res.json(op)
    }

}

export default GenreController