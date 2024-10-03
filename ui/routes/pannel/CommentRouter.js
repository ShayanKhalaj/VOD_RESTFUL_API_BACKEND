import express from "express"
import  CommentController  from "../../controllers/pannel/CommentController.js"

const CommentRouter = express.Router()

CommentRouter.get('/getAll',new CommentController().getAll)

CommentRouter.get('/get/:commentId',new CommentController().get)

CommentRouter.post('/create',new CommentController().create)

CommentRouter.put('/answer',new CommentController().edit)

CommentRouter.delete('/delete/:commentId',new CommentController().delete)

export default CommentRouter