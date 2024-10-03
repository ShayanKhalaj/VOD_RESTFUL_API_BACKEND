import express from 'express'
import ActorController from '../../controllers/pannel/ActorController.js'

const ActorRouter = express.Router()

ActorRouter.get('/getAll',new ActorController().getAll)

ActorRouter.get('/get/:actorId',new ActorController().get)

ActorRouter.post('/create',new ActorController().create)

ActorRouter.put('/edit',new ActorController().edit)

ActorRouter.delete('/delete/:actorId',new ActorController().delete)

export default ActorRouter