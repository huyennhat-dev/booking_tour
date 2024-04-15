import express from 'express'
import LoginValidation from '~/validations/loginValidation'
import KhoaAuthController from '~/controllers/auth/KhoaAuthController'


const KhoaAuthRouter = express.Router()

KhoaAuthRouter.post('/', LoginValidation, KhoaAuthController.login)

export default KhoaAuthRouter