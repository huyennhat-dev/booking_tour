import express from 'express'
import GiangVienAuthController from '~/controllers/auth/GiangVienAuthController'
import LoginValidation from '~/validations/loginValidation'

const GiaoVienAuthRouter = express.Router()

GiaoVienAuthRouter.post('/', LoginValidation, GiangVienAuthController.login)


export default GiaoVienAuthRouter