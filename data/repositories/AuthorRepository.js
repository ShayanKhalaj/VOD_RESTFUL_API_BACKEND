import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js";
import OperationResult from "../../domain/common/OperationResult.js";
import TahlildadehVODDbContext from "../../domain/context/TahlildadehVODDbContext.js";
import AuthorAddEditModel from "../../domain/dto/authors/AuthorAddEditModel.js";

class AuthorRepository {
  db = new TahlildadehVODDbContext();
  status = new HttpStatusCodes();
  toCreateModel = (model = AuthorAddEditModel.prototype) => {
    return {
      name: model.name,
      family: model.family,
      nation: model.nation,
    };
  };

  toEditModel = (model = AuthorAddEditModel.prototype) => {
    return {
      authorId: model.authorId,
      name: model.name,
      family: model.family,
      nation: model.nation,
    };
  };

  create = async (model = AuthorAddEditModel.prototype) => {
    const op = new OperationResult("create author");
    try {
      const result = await this.db.authors.create(this.toCreateModel(model));
      if (result.authorId === undefined)
        return op.failed(
          "author did not create",
          null,
          this.status.BadRequest()
        );
      else
        return op.succeeded(
          "author created",
          result.authorId,
          this.status.Created()
        );
    } catch (error) {
      return op.failed(`author did not create`, null, this.status.BadGateway());
    }
  };
  hasAuthorDuplidatedAuthorByThisNameAndFamily = async (
    name = "",
    family = ""
  ) => {
    const result = await this.db.authors.find({ name: name, family: family });
    if (result.length > 0) return true;
    else return false;
  };

  delete = async (authorId = "") => {
    const op = new OperationResult("delete author");
    try {
      const result = await this.db.authors.deleteOne({ authorId: authorId });
      if (result.deletedCount > 0) {
        return op.succeeded("author deleted", authorId, this.status.OK());
      } else {
        return op.failed(
          "author did not delete",
          authorId,
          this.status.BadRequest()
        );
      }
    } catch (error) {
      return op.failed(
        `author did not delete`,
        authorId,
        this.status.BadGateway()
      );
    }
  };

  update = async (model = AuthorAddEditModel.prototype) => {
    const op = new OperationResult("update author");
    try {
      const result = await this.db.authors.updateOne(
        { authorId: model.authorId },
        { $set: this.toEditModel(model) }
      );
      if (result.modifiedCount > 0)
        return op.succeeded(
          "author updated",
          model.authorId,
          this.status.Created()
        );
      else
        return op.failed(
          "author did not update",
          model.authorId,
          this.status.BadRequest()
        );
    } catch (error) {
      return op.failed(
        `author did not update`,
        model.authorId,
        this.status.BadGateway()
      );
    }
  };

  isAuthorExitedByThisId = async (authorId = "") => {
    const result = await this.db.authors.find({ authorId: authorId });
    if (result.length > 0) return true;
    else return false;
  };

  get = async (authorId = "") => {
    return await this.db.authors.findOne({ authorId: authorId });
  };

  getAll = async () => {
    return await this.db.authors.find({});
  };
}

export default AuthorRepository;
