import express from 'express'
import AuthorController from '../../controllers/pannel/AuthorController.js'

const AuthorRouter = express.Router()

AuthorRouter.get('/getAll',new AuthorController().getAll)

AuthorRouter.get('/get/:authorId',new AuthorController().get)

AuthorRouter.post('/create',new AuthorController().create)

AuthorRouter.put('/edit',new AuthorController().edit)

AuthorRouter.delete('/delete/:authorId',new AuthorController().delete)

export default AuthorRouter