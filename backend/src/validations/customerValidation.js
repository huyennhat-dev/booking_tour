import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'


const createCustomer = async (req, res, next) => {
  try {
    const createCondition = Joi.object({
      full_name: Joi.string().required().messages({
        'any.required': 'Vui lòng cung cấp họ và tên đầy đủ của khách hàng'
      }),
      birth_day: Joi.string().required().messages({
        'any.required': 'Vui lòng cung cấp ngày sinh của khách hàng'
      }),
      point_evaluation: Joi.number().required().messages({
        'any.required': 'Vui lòng cung cấp điểm đánh giá của khách hàng'
      })
    })

    await createCondition.validateAsync(req.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}

const updateCustomer = async (req, res, next) => {
  try {
    const updateCondition = Joi.object({
      id_customer: Joi.number().required().messages({
        'number.base': 'ID khách hàng phải là một số',
        'any.required': 'ID khách hàng là trường bắt buộc'
      }),
      full_name: Joi.string().messages({
        'string.base': 'Họ và tên đầy đủ của khách hàng phải là một chuỗi'
      }),
      birth_day: Joi.string().messages({
        'string.base': 'Ngày sinh của khách hàng phải là một chuỗi'
      }),
      point_evaluation: Joi.number().messages({
        'number.base': 'Điểm đánh giá của khách hàng phải là một số'
      })
    }).or('full_name', 'birth_day', 'point_evaluation')

    await updateCondition.validateAsync(req.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}

const deleteCustomer = async (req, res, next) => {
  try {
    const deleteCondition = Joi.object({
      id_customer: Joi.number().required().messages({
        'number.base': 'ID khách hàng phải là một số',
        'any.required': 'ID khách hàng là trường bắt buộc'
      })
    })

    await deleteCondition.validateAsync(req.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}


const customerValidation = {
  createCustomer,
  updateCustomer,
  deleteCustomer
}

export default customerValidation
