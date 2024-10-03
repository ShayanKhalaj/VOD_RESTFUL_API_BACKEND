import CommentRepository from "../../data/repositories/CommentRepository.js";
import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js";
import OperationResult from "../../domain/common/OperationResult.js";
import CommentAddEditModel from "../../domain/dto/comments/CommentAddEditModel.js";

class CommentBusiness {
  repo = new CommentRepository();
  status = new HttpStatusCodes();

  create = async (model = CommentAddEditModel.prototype) => {
    const checkDuplicate =
      await this.repo.hasUserWritedCommentsMoreThanFiveByThisUserId(
        model.userId
      );
    if (checkDuplicate)
      return new OperationResult("creat comment").failed(
        "user can not create more than 5 comments",
        null,
        this.status.TooManyRequests()
      );
    else return await this.repo.create(model);
  };

  update = async (model = CommentAddEditModel.prototype) => {
    const isExists = await this.repo.isCommentExistsByThisText(
      model.text.trim()
    );
    if (!isExists)
      return new OperationResult("update comment").failed(
        "comment is exists",
        null,
        this.status.BadRequest()
      );
    else return await this.repo.update(model);
  };

  delete = async (commentId = "") => {
    return await this.repo.delete(commentId);
  };
  get=async(commentId='')=>{
    const comment = await this.repo.get(commentId);
    if (!comment)
      return {error: "comment not found",status: this.status.NotFound()};
    return comment
  }

  getAll=async()=>{
    const comments = await this.repo.getAll();
    if (comments.length === 0)
      return { error: "no comments yet", status: this.status.NoContent() };
    return comments
  }
}

export default CommentBusiness
