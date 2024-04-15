import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'


const editDiemValidation = async (req, res, next) => {
  try {
    const editDiemCondition = Joi.object({
      DIEM_CC : Joi.number().empty().min(0).max(10).required().strict(),
      DIEM_BT : Joi.number().empty().min(0).max(10).required().strict(),
      DIEM_GK : Joi.number().empty().min(0).max(10).required().strict(),
      DIEM_CK : Joi.number().empty().min(0).max(10).required().strict(),
      MASV: Joi.string().empty().required().trim().strict(),
      MALTC: Joi.string().empty().required().trim().strict()
    })

    await editDiemCondition.validateAsync(req.body)

    next()
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, error.message, error.stack))
  }
}

export default editDiemValidation