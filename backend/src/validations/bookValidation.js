import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'


const createBook = async (req, res, next) => {
  try {
    const createCondition = Joi.object({
      id_tour: Joi.number().required().messages({
        'any.required': 'Vui lòng cung cấp ID của tour đã đặt'
      }),
      id_customer: Joi.number().required().messages({
        'any.required': 'Vui lòng cung cấp ID của khách hàng'
      }),
      guest_number: Joi.number().required().messages({
        'any.required': 'Vui lòng cung cấp số lượng khách'
      }),
      date_booked: Joi.string().required().messages({
        'any.required': 'Vui lòng cung cấp ngày đặt tour'
      }),
      complete: Joi.boolean().required().messages({
        'any.required': 'Vui lòng chỉ định trạng thái hoàn thành'
      }),
      evaluate: Joi.string(),
      point_evaluate: Joi.number()
    })

    await createCondition.validateAsync(req.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}

const updateBook = async (req, res, next) => {
  try {
    const updateCondition = Joi.object({
      id_booked_tour: Joi.number().required().messages({
        'number.base': 'ID đặt tour phải là một số',
        'any.required': 'ID đặt tour là trường bắt buộc'
      }),
      id_tour: Joi.number().messages({
        'number.base': 'ID tour đã đặt phải là một số'
      }),
      id_customer: Joi.number().messages({
        'number.base': 'ID khách hàng phải là một số'
      }),
      guest_number: Joi.number().messages({
        'number.base': 'Số lượng khách phải là một số'
      }),
      date_booked: Joi.string().messages({
        'string.base': 'Ngày đặt tour phải là một chuỗi'
      }),
      complete: Joi.boolean().messages({
        'boolean.base': 'Trạng thái hoàn thành phải là một boolean'
      }),
      evaluate: Joi.string(),
      point_evaluate: Joi.number()
    }).or('id_tour', 'id_customer', 'guest_number', 'date_booked', 'complete', 'evaluate', 'point_evaluate')

    await updateCondition.validateAsync(req.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}

const deleteBook = async (req, res, next) => {
  try {
    const deleteCondition = Joi.object({
      id_booked_tour: Joi.number().required().messages({
        'number.base': 'ID đặt tour phải là một số',
        'any.required': 'ID đặt tour là trường bắt buộc'
      })
    })

    await deleteCondition.validateAsync(req.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}


const bookValidation = {
  createBook,
  updateBook,
  deleteBook
}

export default bookValidation