import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'


const editGvValidation = async (req, res, next) => {
  try {
    const editDiemCondition = Joi.object({
      MAKHOA : Joi.string().empty().required().trim().strict(),
      HO : Joi.string().empty().required().trim().strict(),
      TEN : Joi.string().empty().required().trim().strict(),
      HOCVI: Joi.string().min(5).empty().required().trim().strict(),
      HOCHAM: Joi.string().min(5).empty().required().trim().strict(),
      CHUYENMON: Joi.string().empty().required().trim().strict(),
      EMAIL: Joi.string().email().empty().required().trim().strict(),
      PASSWORD: Joi.string().empty().required().trim().strict(),
    })
    await editDiemCondition.validateAsync(req.body)
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, error.message, error.stack))
  }
}

export default editGvValidation