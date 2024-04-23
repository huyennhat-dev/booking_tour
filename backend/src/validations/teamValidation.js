import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'

const createTeam = async (req, res, next) => {
  try {
    const createCondition = Joi.object({
      id_manager: Joi.number().required().messages({
        'any.required': 'Vui lòng cung cấp ID của quản lý'
      }),
      id_staff: Joi.number().required().messages({
        'any.required': 'Vui lòng cung cấp ID của nhân viên'
      }),
      work_day: Joi.number().messages({
        'number.base': 'số ngày làm việc phải là một số'
      })
    })

    await createCondition.validateAsync(req.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}

const updateTeam = async (req, res, next) => {
  try {
    const updateCondition = Joi.object({
      id_team : Joi.number().required().messages({
        'number.base': 'ID đội phải là một số',
        'any.required': 'ID đội là trường bắt buộc'
      }),
      id_manager: Joi.number().messages({
        'number.base': 'ID quản lý phải là một số'
      }),
      id_staff: Joi.number().messages({
        'number.base': 'ID nhân viên phải là một số'
      }),
      work_day: Joi.number().messages({
        'number.base': 'Số ngày làm việc phải là một số'
      })
    }).or('id_manager', 'id_staff', 'work_day')

    await updateCondition.validateAsync(req.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}

const deleteTeam = async (req, res, next) => {
  try {
    const deleteCondition = Joi.object({
      id_team: Joi.number().required().messages({
        'number.base': 'ID đội phải là một số',
        'any.required': 'ID đội là trường bắt buộc'
      })
    })

    await deleteCondition.validateAsync(req.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}

const teamValidation = {
  createTeam,
  updateTeam,
  deleteTeam
}

export default teamValidation