import express from 'express'
import DashboardController from '../../controllers/pannel/DashboardController.js'

const DashboardRouter = express.Router()

 DashboardRouter.get('/getAll',new DashboardController().getAll)

export default DashboardRouter