import HttpStatusCodes from "../../domain/common/HttpStatusCodes.js"
import OperationResult from "../../domain/common/OperationResult.js"
import TahlildadehVODDbContext from "../../domain/context/TahlildadehVODDbContext.js"
import CommentAddEditModel from "../../domain/dto/comments/CommentAddEditModel.js"


class CommentRepository{
    db = new TahlildadehVODDbContext()
    status = new HttpStatusCodes()

    toCreateModel=(model=new CommentAddEditModel())=>{
        return{
            text :model.text,
            isAccepted :model.isAccepted,
            answer:model.answer,
            movieId :model.movieId,
            userId:model.userId,
            username:model.username
        }
    }

    toEditModel=(model=new CommentAddEditModel())=>{
        return{
            commentId:model.commentId,
            text :model.text,
            isAccepted :model.isAccepted,
            answer :model.answer,
            movieId :model.movieId,
            userId:model.userId,
            username:model.username
        }
    }

    create = async (model = CommentAddEditModel.prototype) => {
        const op = new OperationResult("create comment");
        try {
            
            const result = await this.db.comments.create(this.toCreateModel(model))
          if(result.commentId===undefined) return op.failed('comment did not create',null,this.status.BadRequest())
          return op.succeeded("comment created", result.commentId,this.status.Created());
        } catch (error) {
          return op.failed("comment did not create", null,this.status.BadGateway());
        }
      };

      hasUserWritedCommentsMoreThanFiveByThisUserId=async(userId='')=>{
        const result = await this.db.comments.find({userId:userId})
        if(result.length>5) return true
        else return false
      }

      update = async (model = CommentAddEditModel.prototype) => {
        const op = new OperationResult("update comment");
        try {
          const result = await this.db.comments.updateOne(
            { commentId: model.commentId },
            { $set: this.toEditModel(model) }
          );
          if (result.modifiedCount === 0) {
            return op.failed("comment did not update", model.directorId,this.status.BadRequest());
          }
          return op.succeeded("comment updated", model.directorId,this.status.Created());
        } catch (error) {
          return op.failed("comment did not create", model.directorId,this.status.BadGateway());
        }
      };

      isCommentExistsByThisText=async(text='')=>{
        const result = await this.db.comments.find({text:text.trim()})
        if(result.length>0) return true
        else return false
      }

      delete = async (commentId = "") => {
        const op = new OperationResult("delete comment");
        try {
          const result = await this.db.comments.deleteOne({commentId: commentId });
          if (result.deletedCount === 0 || result.acknowledged===false) {
            return op.failed("comment did not delete", commentId,this.status.BadRequest());
          }
          return op.succeeded("comment deleted", commentId,this.status.OK());
        } catch (error) {
          return op.failed("comment did not delete", commentId,this.status.BadGateway());
        }
      };

      get = async (commentId = "") => {
        return await this.db.comments.findOne({ commentId: commentId });
      };
    
      getAll = async () => {
        return await this.db.comments.find({});
      };
}

export default CommentRepository