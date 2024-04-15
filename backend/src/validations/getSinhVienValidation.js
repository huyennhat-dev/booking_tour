import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'


const getSinhVienValidation = async (req, res, next) => {
  try {
    const editDiemCondition = Joi.object({
      masv: Joi.string().empty().required().trim().strict(),
      khoa: Joi.string().empty().max(50).min(1).trim().strict(),
    })

    await editDiemCondition.validateAsync(req.query)

    next()
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, error.message, error.stack))
  }
}

export default getSinhVienValidation