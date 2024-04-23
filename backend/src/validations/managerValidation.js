import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'


const createManager = async (req, res, next) => {
  try {
    const createCondition = Joi.object({
      company_name: Joi.string().required().messages({
        'any.required': 'Vui lòng cung cấp tên công ty'
      }),
      point_evaluation: Joi.number().required().messages({
        'any.required': 'Vui lòng cung cấp điểm đánh giá'
      }),
      full_name: Joi.string().required().messages({
        'any.required': 'Vui lòng cung cấp họ và tên đầy đủ của người quản lý'
      }),
      birth_day: Joi.string().required().messages({
        'any.required': 'Vui lòng cung cấp ngày sinh của người quản lý'
      })
    })

    await createCondition.validateAsync(req.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}

const updateManager = async (req, res, next) => {
  try {
    const updateCondition = Joi.object({
      id_manager: Joi.number().required().messages({
        'number.base': 'ID người quản lý phải là một số',
        'any.required': 'ID người quản lý là trường bắt buộc'
      }),
      company_name: Joi.string().messages({
        'string.base': 'Tên công ty phải là một chuỗi'
      }),
      point_evaluation: Joi.number().messages({
        'number.base': 'Điểm đánh giá phải là một số'
      }),
      full_name: Joi.string().messages({
        'string.base': 'Họ và tên đầy đủ của người quản lý phải là một chuỗi'
      }),
      birth_day: Joi.string().messages({
        'string.base': 'Ngày sinh của người quản lý phải là một chuỗi'
      })
    }).or('company_name', 'point_evaluation', 'full_name', 'birth_day')

    await updateCondition.validateAsync(req.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}

const deleteManager = async (req, res, next) => {
  try {
    const deleteCondition = Joi.object({
      id_manager: Joi.number().required().messages({
        'number.base': 'ID người quản lý phải là một số',
        'any.required': 'ID người quản lý là trường bắt buộc'
      })
    })

    await deleteCondition.validateAsync(res.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}


const managerValidation ={
  createManager,
  updateManager,
  deleteManager
}

export default managerValidation
