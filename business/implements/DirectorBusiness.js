import DirectorRepository from "../../data/repositories/DirectorRepository.js"
import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js"
import OperationResult from "../../domain/common/OperationResult.js"
import DirectorAddEditModel from "../../domain/dto/directors/DirectorAddEditModel.js"

class DirectorBusiness{
    status=new HttpStatusCodes()
    repo=new DirectorRepository()

    create=async(model=DirectorAddEditModel.prototype)=>{
        const checkDuplicate = await this.repo.hasDirectorDuplicatedDirectorByThisNameAndFamily(model.name,model.family)
        if(checkDuplicate) return new OperationResult('create director').failed('director exists',null,this.status.BadRequest())
            else return await this.repo.create(model)
    }
    update=async(model=DirectorAddEditModel.prototype)=>{
        const isExists = await this.repo.isExistedDirectorByThisId(model.directorId)
        if(!isExists) return new OperationResult('update director').failed('director is not exists',null,this.status.BadRequest())
            else return await this.repo.update(model)
    }
    delete=async(directorId='')=>{
        const isExists = await this.repo.isExistedDirectorByThisId(directorId)
        if(!isExists) return new OperationResult('delete director').failed('director is not exists',null,this.status.BadRequest())
            else return await this.repo.delete(directorId)
    }
    get=async(direcorId='')=>{
        const director = await this.repo.get(direcorId);
        if (!director)
          return {error: "director not found",status: this.status.NotFound()};
        return director
      }
    
      getAll=async()=>{
        const directors = await this.repo.getAll();
        if (directors.length === 0)
          return { error: "no directors yet", status: this.status.NoContent() };
        return directors
      }
}

export default DirectorBusiness