import express from 'express'
import { accountRouter } from '~/routes/v1/auth/account'
import { adminLogin } from '~/routes/v1/auth/adminLogin'
import { staffRouter } from './auth/staff'
import { managerRouter } from './auth/manager'
import { tourRouter } from './auth/tour'
import { userRouter } from './auth/user'
import { uploadRouter } from './auth/upload'
import { bookRouter } from './auth/book'
import { paymentRouter } from './user/payment'
import { homeRouter } from './user/home'
import { crawlRouter } from './crawl'
import { userRouterOnly } from './user/user'

const router = express.Router()

// auth url
router.use('/auth/account', accountRouter)
router.use('/auth/manager', managerRouter)
router.use('/auth/staff', staffRouter)
router.use('/auth/user', userRouter)
router.use('/auth/upload', uploadRouter)
router.use('/auth/book', bookRouter)

router.use('/auth/tour', tourRouter)
router.use('/auth/login', adminLogin)

// user url
router.use('/user', userRouterOnly)

// router.use('/user', userRouter)
router.use('/payment', paymentRouter)
router.use('/tour', homeRouter)
router.use('/crawl', crawlRouter)


export const API_V1 = router
export default router