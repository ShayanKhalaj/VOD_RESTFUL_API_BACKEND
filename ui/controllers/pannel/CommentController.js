import CommentBusiness from "../../../business/implements/CommentBusiness.js";
import CommentAddEditModel from "../../../domain/dto/comments/CommentAddEditModel.js";

class CommentController {
  bus = new CommentBusiness();
  getAll = async (req, res) => {
    return res.json(await this.bus.getAll())
  };
  get = async (req, res) => {
    return res.json(await this.bus.get(req.params.commentId))
  };
  create = async (req, res) => {
    const comment =new CommentAddEditModel({
        answer:"",
        isAccepted:false,
        movieId:req.body.movieId,
        text:req.body.text,
        userId:req.body.userId,
        username:req.body.username
    })
    const op = await this.bus.create(comment);
    return res.json(op)
  };
  edit = async (req, res) => {
    const comment = await this.bus.get(req.body.commentId)
    const editedComment = new CommentAddEditModel({
      commentId:comment.commentId,
      answer:req.body.answer,
      isAccepted:true,
      movieId:comment.movieId,
      text:comment.text,
      userId:comment.userId,
      username:comment.username
    })
    const op = await this.bus.update(editedComment);
    return res.json(op)
  };
  delete = async (req, res) => {
    const op = await this.bus.delete(req.params.commentId);
    return res.json(op)
  };
}

export default CommentController;
