import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'


const editLopValidation = async (req, res, next) => {
  try {
    const editDiemCondition = Joi.object({
      TENLOP: Joi.string().empty().required().trim().strict(),
      KHOAHOC: Joi.string().empty().required().trim().strict(),
      MAKHOA: Joi.string().empty().required().trim().strict(),
    })
    await editDiemCondition.validateAsync(req.body)
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, error.message, error.stack))
  }
}

export default editLopValidation