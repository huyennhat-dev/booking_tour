import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'

const createUser = async (req, res, next) => {
  try {
    const correctCondition = Joi.object({
      id_manager: Joi.number().messages({
        'number.base': 'ID của quản lý phải là một số'
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
      role: Joi.string().valid('staff', 'manager').messages({
        'string.base': 'Vai trò phải là một chuỗi',
        'any.only': 'Vai trò chỉ có thể là "staff" hoặc "manager" '
      }),
      username: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Tên người dùng phải là một chuỗi',
        'string.empty': 'Tên người dùng không được để trống',
        'string.min': 'Tên người dùng phải có ít nhất {#limit} ký tự',
        'string.max': 'Tên người dùng không được vượt quá {#limit} ký tự',
        'any.required': 'Tên người dùng là trường bắt buộc'
      })
    });

    console.log(req.body)

    await correctCondition.validateAsync(req.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}

const updateUser = async (req, res, next) => {
  try {
    const updateCondition = Joi.object({
      id: Joi.number().required().messages({
        'number.base': 'ID phải là một số',
        'any.required': 'ID là trường bắt buộc'
      }),
      password: Joi.string().min(6).messages({
        'string.base': 'Mật khẩu phải là một chuỗi',
        'string.min': 'Mật khẩu phải có ít nhất {#limit} ký tự'
      }),
      phone_number: Joi.string().pattern(new RegExp('^[0-9]{10}$')).messages({
        'string.pattern.base': 'Số điện thoại phải có đúng 10 chữ số'
      })
    }).or('password', 'phone_number');

    await updateCondition.validateAsync(req.body);

    // validation passed
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deleteCondition = Joi.object({
      id: Joi.number().required().messages({
        'number.base': 'ID phải là một số',
        'any.required': 'ID là trường bắt buộc'
      })
    }); 

    await deleteCondition.validateAsync(req.body);

    // validation passed
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack));
  }
};

const userValidation = {
  createUser,
  updateUser,
  deleteUser
}

export default userValidation