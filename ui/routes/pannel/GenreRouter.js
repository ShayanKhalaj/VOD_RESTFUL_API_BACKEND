import express from 'express'
import GenreController from '../../controllers/pannel/GenreController.js'

const GenreRouter = express.Router()

GenreRouter.get('/getAll',new GenreController().getAll)

GenreRouter.get('/get/:genreId',new GenreController().get)

GenreRouter.post('/create',new GenreController().create)

GenreRouter.put('/edit',new GenreController().edit)

GenreRouter.delete('/delete/:genreId',new GenreController().delete)

export default GenreRouter