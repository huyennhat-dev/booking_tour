import express from 'express'
import { accountRouter } from '~/routes/v1/auth/account'
import { adminLogin } from '~/routes/v1/auth/adminLogin'
import { staffRouter } from './auth/staff'
import { managerRouter } from './auth/manager'
import { tourRouter } from './auth/tour'
import { userRouter } from './auth/user'
import { userLogin } from '~/routes/v1/user/userAuth'
import { userSignIn } from '~/routes/v1/user/userSignIn'
import { uploadRouter } from './auth/upload'

const router = express.Router()

// auth url
router.use('/auth/login', adminLogin)
router.use('/auth/account', accountRouter)
router.use('/auth/manager', managerRouter)
router.use('/auth/staff', staffRouter)
router.use('/auth/user', userRouter)
router.use('/auth/tour', tourRouter)
router.use('/auth/upload', uploadRouter)

// user url
router.use('/login', userLogin)
router.use('/signIn', userSignIn)
router.use('/upload', uploadRouter)


export const API_V1 = router
export default router