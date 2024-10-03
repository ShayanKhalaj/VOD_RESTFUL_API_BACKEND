import AuthorRepository from "../../data/repositories/AuthorRepository.js";
import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js";
import OperationResult from "../../domain/common/OperationResult.js";
import AuthorAddEditModel from "../../domain/dto/authors/AuthorAddEditModel.js";

class AuthorBusiness {
  repo = new AuthorRepository();
  status = new HttpStatusCodes();

  create = async (model = AuthorAddEditModel.prototype) => {
    const checkDuplicate =
      await this.repo.hasAuthorDuplidatedAuthorByThisNameAndFamily(
        model.name,
        model.family
      );
    if (checkDuplicate)
      return new OperationResult("create author").failed(
        "author exists",
        null,
        this.status.BadRequest()
      );
    else return await this.repo.create(model);
  };

  update = async (model = AuthorAddEditModel.prototype) => {
    const isExists =
      await this.repo.isAuthorExitedByThisId(model.authorId);
    if (!isExists)
      return new OperationResult("update author").failed(
        "author not found",
        null,
        this.status.BadRequest()
      );
    else return await this.repo.update(model);
  };

  
  delete = async (authorId='') => {
    const isExists =
      await this.repo.isAuthorExitedByThisId(authorId);
    if (!isExists)
      return new OperationResult("update author").failed(
        "author not found",
        null,
        this.status.BadRequest()
      );
    else return await this.repo.delete(authorId);
  };

  get=async(authorId='')=>{
    const author = await this.repo.get(authorId);
    if (!author)
      return {error: "author not found",status: this.status.NotFound()};
    return author
  }

  getAll=async()=>{
    const author = await this.repo.getAll();
    if (author.length === 0)
      return { error: "no author", status: this.status.NoContent() };
    return author
  }
}
export default AuthorBusiness;
