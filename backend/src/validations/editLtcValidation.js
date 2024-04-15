import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'


const editLtcValidation = async (req, res, next) => {
  try {
    const editDiemCondition = Joi.object({
      NIENKHOA : Joi.string().empty().required().trim().strict(),
      HOCKY : Joi.number().min(1).max(2).empty().required(),
      MAMH : Joi.string().empty().required().trim().strict(),
      NHOM: Joi.number().empty().required().strict(),
      MAGV: Joi.string().empty().required().trim().strict(),
      MAKHOA: Joi.string().empty().required().trim().strict(),
      SOSVTOITHIEU: Joi.number().min(40).empty().required().strict()
    })
    await editDiemCondition.validateAsync(req.body)
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, error.message, error.stack))
  }
}

export default editLtcValidation


