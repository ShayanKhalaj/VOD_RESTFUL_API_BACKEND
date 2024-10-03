import CategoryBusiness from "../../../business/implements/CategoryBusiness.js";
import CategoryAddEditModel from "../../../domain/dto/categories/CategoryAddEditModel.js";

class CategoryController {
  bus = new CategoryBusiness();
  getAll = async (req, res) => {
    const categories = await this.bus.getAll();
    return res.json(categories);
  };

  get = async (req, res) => {
    const category = await this.bus.get(req.params.categoryId);
    return res.json(category);
  };

  create = async (req, res) => {
    const op = await this.bus.create(new CategoryAddEditModel(req.body));
    return res.json(op);
  };

  edit = async (req, res) => {
    const op = await this.bus.update(new CategoryAddEditModel(req.body));
    return res.json(op);
  };

  delete = async (req, res) => {
    const op = await this.bus.delete(req.params.categoryId);
    return res.json(op);
  };
}

export default CategoryController;
