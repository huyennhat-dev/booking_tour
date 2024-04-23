import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'


const LoginValidation = async (req, res, next) => {
  try {
    const loginCondition = Joi.object({
      email : Joi.string().empty().email().required().trim().strict(),
      password : Joi.string().empty().min(3).max(32).required().trim().strict()
    })
    await loginCondition.validateAsync(req.body)
    // validation passed
    next()

  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}

export default LoginValidation