import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js";
import OperationResult from "../../domain/common/OperationResult.js";
import TahlildadehVODDbContext from "../../domain/context/TahlildadehVODDbContext.js";
import CategoryAddEditModel from "../../domain/dto/categories/CategoryAddEditModel.js";

class CategoryRepository {
  db = new TahlildadehVODDbContext();
  status = new HttpStatusCodes()

  //utility method
  toCreateModel = (model = new CategoryAddEditModel()) => {
    return {
      categoryName: model.categoryName,
      description: model.description,
      categoryImageUrl: model.categoryImageUrl,
      categoryImageAlter: model.categoryImageAlter,
    };
  };

  toUpdateModel = (model = new CategoryAddEditModel()) => {
    return {
      categoryId: model.categoryId,
      categoryName: model.categoryName,
      description: model.description,
      categoryImageUrl: model.categoryImageUrl,
      categoryImageAlter: model.categoryImageAlter,
    };
  };

  create = async (model = new CategoryAddEditModel()) => {
    const op = new OperationResult("create category");
    try {
      const category = this.toCreateModel(model);
      const result = await this.db.categories.create(category);
      if(result.categoryId===undefined)return op.failed('category did not create',null,this.status.BadRequest())
      return op.succeeded(
        "category created",
        result.categoryId,
        this.status.Created()
      );
    } catch (error) {
      return op.failed(`category did not create`, null,this.status.BadGateway());
    }
  };

  hasCategoryDuplicatedCategoryByThisCategoryName = async (
    categoryName = ""
  ) => {
    const result =  await this.db.categories.find({ categoryName: categoryName });
    if(result.length>0) return true
    else return false
  };

  delete = async (categoryId = "") => {
    const op = new OperationResult("delete category");
    try {
      const result = await this.db.categories.deleteOne({
        categoryId: categoryId,
      });
      if (result.deletedCount === 0) {
        return op.failed("category by this id not found", categoryId,this.status.BadRequest());
      }
      return op.succeeded("category deleted", categoryId,this.status.OK());
    } catch (error) {
      return op.failed(`category delete failed`, categoryId,this.status.BadGateway());
    }
  };

  hasCategoryRelatedMoviesByThisCategoryId = async (categoryId = "") => {
    const result =  await this.db.movies.find({ categoryId: categoryId });
    if(result.length>0) return true
    else return false
  };

  update = async (model = new CategoryAddEditModel()) => {
    const op = new OperationResult("update category");
    try {
      const category = this.toUpdateModel(model);
      const result = await this.db.categories.updateOne(
        { categoryId: model.categoryId },
        { $set: category }
      );
      if(result.modifiedCount===0) return op.failed('category did not update',this.status.BadRequest())
      return op.succeeded("category updated", model.categoryId,this.status.Created());
    } catch (error) {
      return op.failed(`category update failed`, model.categoryId,this.status.BadGateway());
    }
  };

  isExistedCategoryByThisCategoryId = async (categoryId = "") => {
    const result =  await this.db.categories.find({ categoryId: categoryId });
    if(result.length>0) return true
    else return false
  };

  get = async (categoryId = "") => {
    return await this.db.categories.findOne({
      categoryId: categoryId,
    });
  };

  getAll = async () => {
    return await this.db.categories.find({});
  };

}
export default CategoryRepository;
