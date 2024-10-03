import AuthorBusiness from "../../../business/implements/AuthorBusiness.js"
import AuthorRepository from "../../../data/repositories/AuthorRepository.js"
import AuthorAddEditModel from "../../../domain/dto/authors/AuthorAddEditModel.js"

class AuthorController{

    bus = new AuthorBusiness()

    getAll=async(req,res)=>{
        const authors = await this.bus.getAll()
        return res.json(authors)
    } 

    get=async(req,res)=>{
        const author = await this.bus.get(req.params.authorId)
        return res.json(author)
    }

    
    create=async(req,res)=>{
        const op = await this.bus.create(new AuthorAddEditModel(req.body))
        return res.json(op)
    }


    edit=async(req,res)=>{
        const op = await this.bus.update(new AuthorAddEditModel(req.body))
        return res.json(op)
    }

    delete=async(req,res)=>{
        const op = await this.bus.delete(req.params.authorId)
        return res.json(op)
    }
}

export default AuthorController