import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'


const create_payment_url = async (req, res, next) => {
  try {
    const createCondition = Joi.object({
      date_booked : Joi.string().required().messages({
        'any.required': 'Vui lòng cung cấp ngày đặt tour'
      }),
      id_tour : Joi.number().required().messages({
        'any.required': 'Vui lòng cung cấp ID tour'
      }),
      id_customer : Joi.number().required().messages({
        'any.required': 'Vui lòng cung cấp ID khách hàng'
      }),
      guest_number : Joi.number().required().messages({
        'any.required': 'Vui lòng cung cấp số lượng khách'
      })
    })

    await createCondition.validateAsync(req.body)

    // validation passed
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error.message, error.stack))
  }
}


const paymentValidation = {
    create_payment_url
}

export default paymentValidation