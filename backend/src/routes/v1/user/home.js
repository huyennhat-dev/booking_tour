import express from 'express'
import homeTourController from '~/controllers/homeTourController'

const router = express.Router()
router.get('/', homeTourController.getTourHomePage)
router.get('/search', homeTourController.getTourSearch)
export const homeRouter = router
