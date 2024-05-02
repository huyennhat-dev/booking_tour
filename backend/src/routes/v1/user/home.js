import express from 'express'
import homeTourController from '~/controllers/homeTourController'

const router = express.Router()
router.post('/', homeTourController.getTourHomePage)
router.post('/homePage', homeTourController.getTourHomePage)
export const homeRouter = router
