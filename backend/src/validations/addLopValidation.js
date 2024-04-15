import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'


const addLopValidation = async (req, res, next) => {
  try {
    const editDiemCondition = Joi.object({
      MALOP : Joi.string().min(3).empty().required().trim().strict(),
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

export default addLopValidation