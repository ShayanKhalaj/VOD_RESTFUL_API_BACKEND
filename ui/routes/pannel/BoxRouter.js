import express from 'express'
import BoxController from '../../controllers/pannel/BoxController.js'

const BoxRouter = express.Router()

BoxRouter.get('/getAll',new BoxController().getAll)

BoxRouter.get('/get/:boxId',new BoxController().get)

BoxRouter.post('/create',new BoxController().create)

BoxRouter.put('/edit',new BoxController().edit)

BoxRouter.delete('/delete/:boxId',new BoxController().delete)

export default BoxRouter