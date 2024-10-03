import express from 'express'
import MusicianController from '../../controllers/pannel/MusicianController.js'

const MusicianRouter = express.Router()

MusicianRouter.get('/getAll',new MusicianController().getAll)

MusicianRouter.get('/get/:musicianId',new MusicianController().get)

MusicianRouter.post('/create',new MusicianController().create)

MusicianRouter.put('/edit',new MusicianController().edit)

MusicianRouter.delete('/delete/:musicianId',new MusicianController().delete)


export default MusicianRouter