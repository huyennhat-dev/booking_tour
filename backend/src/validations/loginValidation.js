import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'

const login = async (req, res, next) => {
  try {
    const correctCondition = Joi.object({
      password: Joi.string().required().min(6).messages({
        'string.base': 'Mật khẩu phải là một chuỗi',
        'string.empty': 'Mật khẩu không được để trống',
        'string.min': 'Mật khẩu phải có ít nhất {#limit} ký tự',
        'any.required': 'Mật khẩu là trường bắt buộc'
      }),
      email: Joi.string().email().required().messages({
        'string.base': 'Email phải là một chuỗi',
        'string.empty': 'Email không được để trống',
        'string.email': 'Email phải có định dạng hợp lệ',
        'any.required': 'Email là trường bắt buộc'
      })
    })
    await correctCondition.validateAsync(req.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}

const signIn = async (req, res, next) => {
  try {
    const correctCondition = Joi.object({
      password: Joi.string().required().min(6).messages({
        'string.base': 'Mật khẩu phải là một chuỗi',
        'string.empty': 'Mật khẩu không được để trống',
        'string.min': 'Mật khẩu phải có ít nhất {#limit} ký tự',
        'any.required': 'Mật khẩu là trường bắt buộc'
      }),
      email: Joi.string().email().required().messages({
        'string.base': 'Email phải là một chuỗi',
        'string.empty': 'Email không được để trống',
        'string.email': 'Email phải có định dạng hợp lệ',
        'any.required': 'Email là trường bắt buộc'
      }),
      phone_number: Joi.string().pattern(new RegExp('^[0-9]{10}$')).messages({
        'string.pattern.base': 'Số điện thoại phải có đúng 10 chữ số'
      }),
      username: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Tên người dùng phải là một chuỗi',
        'string.empty': 'Tên người dùng không được để trống',
        'string.alphanum': 'Tên người dùng chỉ có thể chứa các ký tự chữ và số',
        'string.min': 'Tên người dùng phải có ít nhất {#limit} ký tự',
        'string.max': 'Tên người dùng không được vượt quá {#limit} ký tự',
        'any.required': 'Tên người dùng là trường bắt buộc'
      }),
      birth_day : Joi.string().messages({
        'string.base': 'Ngày sinh phải là một chuỗi',
        'string.empty': 'Ngày sinh không được để trống',
      })
    })
    await correctCondition.validateAsync(req.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}

const authValidation = {
  login,
  signIn
}

export default authValidation