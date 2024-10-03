import CategoryRepository from "../../data/repositories/CategoryRepository.js"
import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js"
import OperationResult from "../../domain/common/OperationResult.js"
import CategoryAddEditModel from "../../domain/dto/categories/CategoryAddEditModel.js"

class CategoryBusiness{
    repo=new CategoryRepository()
    status=new HttpStatusCodes()

    create=async(model=CategoryAddEditModel.prototype)=>{
        const checkDuplicate = await this.repo.hasCategoryDuplicatedCategoryByThisCategoryName(model.categoryName)
        if(checkDuplicate) return new OperationResult('create category').failed('category exists',null,this.status.BadRequest())
        else return await this.repo.create(model)
    }
    update=async(model=CategoryAddEditModel.prototype)=>{
        const isExists = await this.repo.isExistedCategoryByThisCategoryId(model.categoryId)
        if(!isExists) return new OperationResult('update category').failed('category is not exists',null,this.status.BadRequest())
        else return await this.repo.update(model)
    }
    delete=async(categoryId='')=>{
        const isExists = await this.repo.isExistedCategoryByThisCategoryId(categoryId)
        if(!isExists) return new OperationResult('delete category').failed('category is not exists',null,this.status.BadRequest())
            const relateds = await this.repo.hasCategoryRelatedMoviesByThisCategoryId(categoryId)
        if(relateds) return new OperationResult('delete category').failed('category has related movies',categoryId,this.status.BadRequest())
        else return await this.repo.delete(categoryId)
    }
    get=async(categoryId='')=>{
        const category = await this.repo.get(categoryId);
        if (!category)
          return {error: "category not found",status: this.status.NotFound()};
        return category
      }
    
      getAll=async()=>{
        const categories = await this.repo.getAll();
        if (categories.length === 0)
          return { error: "no categories", status: this.status.NoContent() };
        return categories
      }
}

export default CategoryBusiness