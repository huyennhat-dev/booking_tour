import express from 'express'
import { userRouter } from '~/routes/v1/user'
import { customerRouter } from '~/routes/v1/customer'
import { tourRouter } from '~/routes/v1/tour'
import { bookRouter } from '~/routes/v1/book'
import { teamRouter } from '~/routes/v1/team'
import { managerRouter } from '~/routes/v1/manager'
import { staffRouter } from '~/routes/v1/staff'

const router = express.Router()

router.use('/user', userRouter)
router.use('/customer', customerRouter)
router.use('/tour', tourRouter)
router.use('/book', bookRouter)
router.use('/team', teamRouter)
router.use('/staff', staffRouter)
router.use('/manager', managerRouter)


export const API_V1 = router
export default router