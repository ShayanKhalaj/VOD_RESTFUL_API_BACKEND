import express from 'express';
import { CategoryController } from '../../controllers/website/CategoryController.js';

const CategoryRouter = express.Router()

CategoryRouter.get('/getAll',CategoryController.getAll)

CategoryRouter.get('/:categoryId',CategoryController.getCategoryMovies)


export default CategoryRouter