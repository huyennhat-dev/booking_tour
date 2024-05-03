import paymentService from '~/services/paymentService'
import ApiError from '~/utils/ApiError'


const createURLpayment = async (req, res, next) => {
  try {
    const idBook = req.body.id_tour
    const { vnpUrl } = await paymentService.createURLPayment(req, idBook)
    return res.status(200).json({ statusCode: 200, vnpUrl: vnpUrl })
  } catch (error) {
    return next(new ApiError(404, error.message))
  }
}

const vnpayReturn = async (req, res, next) => {
  try {
    const url = await paymentService.vnpReturn(req.query)
    return res.redirect(url)
  } catch (error) {
    return res.status(500).json({ statusCode: 500, error : 'Bạn Đã thanh toán tour này rồi' })
  }
}


export default {
  createURLpayment,
  vnpayReturn
}