import express from 'express'
import DirectorController from '../../controllers/pannel/DirectorController.js'

const DirectorRouter = express.Router()

DirectorRouter.get('/getAll',new DirectorController().getAll)

DirectorRouter.get('/get/:directorId',new DirectorController().get)

DirectorRouter.post('/create',new DirectorController().create)

DirectorRouter.put('/edit',new DirectorController().edit)

DirectorRouter.delete('/delete/:directorId',new DirectorController().delete)

export default DirectorRouter