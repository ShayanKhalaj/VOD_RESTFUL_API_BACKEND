import MusicianRepository from "../../data/repositories/MusicianRepository.js"
import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js"
import OperationResult from "../../domain/common/OperationResult.js"
import MusicianAddEditModel from "../../domain/dto/musicians/MusicianAddEditModel.js"

class MusicianBusiness{
    repo=new MusicianRepository()
    status = new HttpStatusCodes()
    create=async(model=MusicianAddEditModel.prototype)=>{
        const checkDuplicate = await this.repo.hasMusicianDuplicatedMusicianByThisNameAndFamily(model.name,model.family)
        if(checkDuplicate) return new OperationResult('create musician').failed('musician exists',null,this.status.BadRequest())
            else return await this.repo.create(model)
    }
    update=async(model=MusicianAddEditModel.prototype)=>{
        const isExists = await this.repo.isMusicianExistedByThisId(model.musicianId)
        if(!isExists) return new OperationResult('update musician').failed('musician is not exists',null,this.status.NotFound())
            else return await this.repo.update(model)
    }
    delete=async(musicianId='')=>{
        const isExists = await this.repo.isMusicianExistedByThisId(musicianId)
        if(!isExists) return new OperationResult('delete musician').failed('musician is not exists',null,this.status.NotFound())
            const relateds = await this.repo.hasMusicianRelatedMoviesByThisId(musicianId)
        if(relateds) return new OperationResult('delete musician').failed('musician has related movies',null,this.status.BadRequest())
            else return await this.repo.delete(musicianId)
    }
    get=async(musicianId='')=>{
        const musician = await this.repo.get(musicianId);
        if (!musician)
          return {error: "musician not found",status: this.status.NoContent()};
        return musician
      }
    
      getAll=async()=>{
        const musicians = await this.repo.getAll();
        if (musicians.length === 0)
          return { error: "no musicians yet", status: this.status.NoContent() };
        return musicians
      }
}
export default MusicianBusiness