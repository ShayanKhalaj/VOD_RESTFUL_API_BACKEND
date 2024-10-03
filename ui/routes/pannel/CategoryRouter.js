import express from 'express'
import CategoryController from '../../controllers/pannel/CategoryController.js'
import UploadFile from '../../../framwork/utilities/UploadFile.js'

const CategoryRouter = express.Router()

CategoryRouter.get('/getAll',new CategoryController().getAll)

CategoryRouter.get('/get/:categoryId',new CategoryController().get)

CategoryRouter.post('/create',new CategoryController().create)

CategoryRouter.put('/edit',new CategoryController().edit)

CategoryRouter.delete('/delete/:categoryId',new CategoryController().delete)

export default CategoryRouter