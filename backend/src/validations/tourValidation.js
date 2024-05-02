import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'

const createTour = async (req, res, next) => {
  try {
    const createCondition = Joi.object({
      name_tour: Joi.string().required().messages({
        'any.required': 'Tên tour là trường bắt buộc'
      }),
      id_manager: Joi.number().required().messages({
        'any.required': 'Vui lòng cung cấp ID của quản lý'
      }),
      id_staff: Joi.number().required().messages({
        'any.required': 'Vui lòng cung cấp ID của nhân viên'
      }),
      departure_day: Joi.string().messages(),
      departure: Joi.string().messages({
        'any.required': 'Vui lòng cung cấp ngày khởi hành'
      }),
      end_tour_day: Joi.string().messages({
        'any.required': 'Vui lòng cung cấp ngày kết thúc tour'
      }),
      end_tour: Joi.string().messages(),
      destination: Joi.string().required().messages({
        'any.required': 'Vui lòng cung cấp điểm đến'
      }),
      initial_price: Joi.number().required().messages({
        'any.required': 'Vui lòng cung cấp giá ban đầu'
      }),
      promotional_price: Joi.number().less(Joi.ref('initial_price')).messages({
        'any.required': 'Vui lòng cung cấp giá khuyến mãi',
        'number.less': 'Giá khuyến mãi phải nhỏ hơn giá ban đầu'
      }),
      promotional: Joi.number().required().messages({
        'any.required': 'Vui lòng cung cấp khuyến mãi'
      }),
      introduce: Joi.string().required().messages({
        'any.required': 'Vui lòng cung cấp mô tả'
      }),
      highlight: Joi.string().required().messages({
        'any.required': 'Vui lòng cung cấp điểm nổi bật'
      }),
      insurance: Joi.boolean().messages({
        'any.required': 'Vui lòng chỉ định có bảo hiểm hay không'
      }),
      vehicle: Joi.string().required().messages({
        'any.required': 'Vui lòng cung cấp phương tiện vận chuyển'
      }),
      meal: Joi.boolean().messages({
        'any.required': 'Vui lòng chỉ định có bữa ăn hay không'
      }),
      photos: Joi.array().required().messages({
        'any.required': 'Vui lòng cung cấp ảnh cho tour'
      }),
      tour_guide: Joi.boolean().messages({
        'any.required': 'Vui lòng chỉ định có hướng dẫn viên hay không'
      })
    })

    await createCondition.validateAsync(req.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}

const updateTour = async (req, res, next) => {
  try {
    const updateCondition = Joi.object({
      id_tour: Joi.number().required().messages({
        'number.base': 'ID tour phải là một số',
        'any.required': 'ID tour là trường bắt buộc'
      }),
      name_tour: Joi.string(),
      id_manager: Joi.number(),
      id_staff: Joi.number(),
      destination: Joi.string(),
      introduce: Joi.string(),
      highlight: Joi.string(),
      insurance: Joi.boolean(),
      vehicle: Joi.string(),
      meal: Joi.boolean(),
      photos: Joi.string(),
      tour_guide: Joi.boolean()
    }).or('name_tour', 'id_manager', 'id_staff',
      'destination', 'introduce',
      'highlight', 'insurance', 'bus', 'bicycle', 'taxi',
      'plane', 'meal', 'photos', 'tour_guide')

    await updateCondition.validateAsync(req.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}

const deleteTour = async (req, res, next) => {
  try {
    const deleteCondition = Joi.object({
      id_tour: Joi.number().required().messages({
        'number.base': 'ID tour phải là một số',
        'any.required': 'ID tour là trường bắt buộc'
      })
    })

    await deleteCondition.validateAsync(res.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}

const tourValidation = {
  createTour,
  updateTour,
  deleteTour
}

export default tourValidation