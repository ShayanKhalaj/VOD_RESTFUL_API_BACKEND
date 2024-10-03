import DirectorBusiness from "../../../business/implements/DirectorBusiness.js";
import DirectorAddEditModel from "../../../domain/dto/directors/DirectorAddEditModel.js";

class DirectorController {
  bus = new DirectorBusiness();
  getAll = async (req, res) => {
    const directors = await this.bus.getAll();
    return res.json(directors);
  };

  get = async (req, res) => {
    const director = await this.bus.get(req.params.directorId);
    return res.json(director);
  };

  create = async (req, res) => {
    return res.json(await this.bus.create(new DirectorAddEditModel(req.body)));
  };

  edit = async (req, res) => {
    const op = await this.bus.update(new DirectorAddEditModel(req.body));
    return res.json(op)
  };

  delete = async (req, res) => {
    const op = await this.bus.delete(req.params.directorId);
    return res.json(op)
  };
}

export default DirectorController;
