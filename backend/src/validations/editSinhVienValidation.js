import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'


const editSinhVienValidation = async (req, res, next) => {
  try {
    const editDiemCondition = Joi.object({
      MASV : Joi.string().empty().required().trim().strict(),
      HO : Joi.string().empty().required().trim().strict(),
      TEN : Joi.string().empty().required().trim().strict(),
      GIOITINH : Joi.string().empty().required().trim().strict(),
      DIACHI: Joi.string().empty().required().trim().strict(),
      NGAYSINH: Joi.string().empty().required().trim().strict(),
      MALOP: Joi.string().empty().required().trim().strict(),
      EMAIL: Joi.string().email().empty().required().trim().strict(),
      PASSWORD: Joi.string().empty().required().trim().strict(),
    })
    await editDiemCondition.validateAsync(req.body)
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, error.message, error.stack))
  }
}

export default editSinhVienValidation