import MusicianBusiness from "../../../business/implements/MusicianBusiness.js";
import MusicianAddEditModel from "../../../domain/dto/musicians/MusicianAddEditModel.js";

class MusicianController {

  bus = new MusicianBusiness()

  getAll = async (req, res) => {
    const musicians = await this.bus.getAll()
    return res.json(musicians)
  };

  get = async (req, res) => {
    const musician = await this.bus.get(req.params.musicianId)
    return res.json(musician)
  };

  create = async (req, res) => {
    return res.json(await this.bus.create(new MusicianAddEditModel(req.body)));
  };

  edit=async(req,res)=>{
    const op = await this.bus.update(new MusicianAddEditModel(req.body))
    return res.json(op)
  }

  delete=async(req,res)=>{
    const op = await this.bus.delete(req.params.musicianId)
    return res.json(op)
  }

}

export default MusicianController;
