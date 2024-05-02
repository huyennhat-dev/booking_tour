import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'


const createStaff = async (req, res, next) => {
  try {
    const createCondition = Joi.object({
      id_manager: Joi.number().required().messages({
        'any.required': 'Vui lòng cung cấp ID của quản lý'
      }),
      full_name: Joi.string().required().messages({
        'any.required': 'Vui lòng cung cấp họ và tên đầy đủ của nhân viên'
      }),
      birth_day: Joi.string().required().messages({
        'any.required': 'Vui lòng cung cấp ngày sinh của nhân viên'
      }),
      point_evaluation: Joi.number().required().messages({
        'any.required': 'Vui lòng cung cấp điểm đánh giá của nhân viên'
      })
    })

    await createCondition.validateAsync(req.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}

const updateStaff = async (req, res, next) => {
  try {
    const updateCondition = Joi.object({
      id_staff: Joi.number().required().messages({
        'number.base': 'ID nhân viên phải là một số',
        'any.required': 'ID nhân viên là trường bắt buộc'
      }),
      id_manager: Joi.number().messages({
        'number.base': 'ID quản lý phải là một số'
      }),
      full_name: Joi.string().messages({
        'string.base': 'Họ và tên đầy đủ của nhân viên phải là một chuỗi'
      }),
      birth_day: Joi.string().messages({
        'string.base': 'Ngày sinh của nhân viên phải là một chuỗi'
      }),
      point_evaluation: Joi.number().messages({
        'number.base': 'Điểm đánh giá của nhân viên phải là một số'
      })
    }).or('id_manager', 'full_name', 'birth_day', 'point_evaluation')

    await updateCondition.validateAsync(req.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}

const deleteStaff = async (req, res, next) => {
  try {
    const deleteCondition = Joi.object({
      id_staff: Joi.number().required().messages({
        'number.base': 'ID nhân viên phải là một số',
        'any.required': 'ID nhân viên là trường bắt buộc'
      })
    })

    await deleteCondition.validateAsync(res.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}

const staffValidation = {
  createStaff,
  updateStaff,
  deleteStaff
}

export default staffValidation