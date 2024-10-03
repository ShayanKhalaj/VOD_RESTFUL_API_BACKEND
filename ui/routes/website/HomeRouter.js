import express from 'express'
import HomeController from '../../controllers/website/HomeController.js'

const HomeRouter = express.Router()

HomeRouter.get('/home',new HomeController().index)

export default HomeRouter