import db from '~/models'
import paymentService from '~/services/paymentService'
import ApiError from '~/utils/ApiError'


const createURLpayment = async (req, res, next) => {
  try {
    const idBook = req.body.id_tour
    //validat đặc tour hợn lệ không
    const tour = await db.Tour.findOne({
      where: {
        id: idBook
      }
    })

    const totalSale = tour.total_sale + req.body.member

    if ((tour.max_user - tour.total_sale) == 0) {
      return res.status(400).json({ statusCode: 400, message: 'Tour đã hết vé' })
    }
    if (tour.max_user < totalSale) {
      return res.status(400).json({ statusCode: 400, message: `Hiện tại tour chỉ còn ${tour.max_user - tour.total_sale} vé` })
    }


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