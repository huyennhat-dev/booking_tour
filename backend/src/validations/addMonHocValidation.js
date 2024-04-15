import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'


const addMonHocValidation = async (req, res, next) => {
  try {
    const editDiemCondition = Joi.object({
      MAMH : Joi.string().empty().required().trim().strict(),
      TENMH : Joi.string().empty().required().trim().strict(),
      TINCHI : Joi.number().empty().min(0).max(10).required().strict(),
      SOTIET_LT : Joi.number().empty().min(20).max(30).required().strict(),
      SOTIET_TH: Joi.number().empty().min(20).max(30).required().strict(),
      HESO_CC: Joi.number().empty().min(0).max(0.2).required().strict(),
      HESO_BT: Joi.number().empty().min(0).max(0.2).required().strict(),
      HESO_GK: Joi.number().empty().min(0.2).max(0.2).required().strict(),
      HESO_CK: Joi.number().empty().min(0.5).max(0.6).required().strict(),
    })

    await editDiemCondition.validateAsync(req.body)

    next()
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, error.message, error.stack))
  }
}

export default addMonHocValidation