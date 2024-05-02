import querystring from 'qs'
import crypto from 'crypto'
import ApiError from '~/utils/ApiError'
import env from '~/config/environment'
import db from '~/models'
import moment from 'moment'

const sortObject = (obj) => {
  let sorted = {}
  let str = []
  let key
  for (key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key))
    }
  }
  str.sort()
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+')
  }
  return sorted
}

const jsonToCustomString = (jsonObj) => {
  /**
       *  {
       *  id_tour: 1,
       * id_customer: 1,
       * guest_number: 2
       * date_booked: '2021/09/30'
       * }
       *
       */
  try {
    // Lấy giá trị của các trường id_customer và tour_id từ đối tượng JSON
    const idCustomer = jsonObj.id_customer
    const tourId = jsonObj.id_tour
    const guest_number = jsonObj.guest_number

    // Lấy timestamp hiện tại theo đơn vị mili giây
    const timestamp = new Date().getTime()

    // Tạo chuỗi theo định dạng mong muốn
    const customString = `${timestamp}-${tourId}-${idCustomer}-${guest_number}`
    return customString
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

function stringToJsonObject(stringData) {
  // Ví dụ chuỗi cần chuyển đổi  '1632979200000-1-1-2' thành đối tượng JSON
  // {
  //     date_booked: '2021/09/30',
  //     id_customer: 1,
  //     tour_id: 1,
  //     guest_number: 2
  // }

  try {
    // Tách chuỗi thành các phần
    const [timestamp, tourId, idCustomer, guest_number] = stringData.split('-')

    // Chuyển đổi timestamp thành ngày tháng
    const dateBooked = new Date(parseInt(timestamp)).toLocaleDateString('en-GB')

    // Tạo đối tượng JSON
    const jsonObject = {
      date_booked: dateBooked,
      id_customer: parseInt(idCustomer),
      id_tour: parseInt(tourId),
      guest_number : parseInt(guest_number)
    }

    return jsonObject
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

const createURLPayment = async (req, idBook) => {
  try {


    // get tour id
    const tour = await db.Tour.findOne({
      where : {
        id : idBook
      }
    })
    if (!tour) {
      throw new ApiError(404, 'Tour not found')
    }
    const price_discount = tour.initial_price - (tour.initial_price * tour.promotional)
    const total = price_discount * req.body.member

    const data = {
      id_tour: idBook,
      booking_info: req.body.booking_info,
      id_user: req.body.id_user,
      member: req.body.member,
      total_price: total,
      day_booking : new Date().getTime()
    }

    console.log(`${data.day_booking}_${data.id_tour}_${data.id_user}_${data.member}_${data.total_price}_${JSON.stringify(data.booking_info)}`)


    process.env.TZ = 'Asia/Ho_Chi_Minh'
    let date = new Date()
    let createDate = moment(date).format('YYYYMMDDHHmmss')
    let ipAddr =
              req.headers['x-forwarded-for'] || req.connection.remoteAddress ||
              req.socket.remoteAddress || req.connection.socket.remoteAddress
    let tmnCode = env.VNP_TMNCODE
    let secretKey = env.VNP_HASHSECRET
    let vnpUrl = env.VNP_URL
    let returnUrl = env.VNP_RETURN_URL

    // random orderId unique
    let orderId = new Date().getTime()
    let amount = total
    let locale = 'vn'
    let currCode = 'VND'
    let vnp_Params = {}
    vnp_Params['vnp_Version'] = '2.1.0'
    vnp_Params['vnp_Command'] = 'pay'
    vnp_Params['vnp_TmnCode'] = tmnCode
    vnp_Params['vnp_Locale'] = locale
    vnp_Params['vnp_CurrCode'] = currCode
    vnp_Params['vnp_TxnRef'] = `${data.day_booking}_${data.id_tour}_${data.id_user}_${data.member}_${data.total_price}_${JSON.stringify(data.booking_info)}`
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId
    vnp_Params['vnp_OrderType'] = 'other'
    vnp_Params['vnp_Amount'] = amount * 100
    vnp_Params['vnp_ReturnUrl'] = returnUrl
    vnp_Params['vnp_IpAddr'] = ipAddr
    vnp_Params['vnp_CreateDate'] = createDate
    vnp_Params = sortObject(vnp_Params)
    let signData = querystring.stringify(vnp_Params, { encode: false })
    let crypto = require('crypto')
    let hmac = crypto.createHmac('sha512', secretKey)
    let signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest('hex')
    vnp_Params['vnp_SecureHash'] = signed
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false })


    return { vnpUrl }
  } catch (error) {
    console.log(error)
    throw new ApiError(error.message)
  }
}

const vnpReturn = async (query) => {
  try {
    let vnp_Params = query

    let secureHash = vnp_Params['vnp_SecureHash']

    delete vnp_Params['vnp_SecureHash']
    delete vnp_Params['vnp_SecureHashType']

    vnp_Params = sortObject(vnp_Params)

    let secretKey = env.VNP_HASHSECRET

    let signData = querystring.stringify(vnp_Params, { encode: false })
    let hmac = crypto.createHmac('sha512', secretKey)
    let signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest('hex')

    console.log('--------------------------------------------------------')
    console.log('secureHash', secureHash)
    console.log('dataPass', vnp_Params.vnp_TxnRef.split('_'))
    console.log('day_booking', new Date(parseInt(vnp_Params.vnp_TxnRef.split('_')[0])))
    console.log('id_tour', vnp_Params.vnp_TxnRef.split('_')[1])
    console.log('id_user', vnp_Params.vnp_TxnRef.split('_')[2])
    console.log('member', vnp_Params.vnp_TxnRef.split('_')[3])
    console.log('total_price', vnp_Params.vnp_TxnRef.split('_')[4])
    console.log('info', JSON.parse(decodeURIComponent(vnp_Params.vnp_TxnRef.split('_')[5]).replace(/\+/g, ' ')))
    console.log('--------------------------------------------------------')


    if (secureHash === signed) {
      const rsCode = vnp_Params['vnp_ResponseCode']
      if (rsCode == '00') {
        // tao book khi thanh toan thanh cong

        // await bookService.createBook({
        //   ...stringToJsonObject(vnp_Params.vnp_TxnRef),
        //   complete : true,
        //   evaluate : '',
        //   statpoint_evaluateus : 1
        // })

        return `http//${env.HOST}:${env.BACKEND_PORT}/${vnp_Params.vnp_TxnRef}`
      }

      return `http://${env.HOST}:${env.BACKEND_PORT}/deletebook/${vnp_Params.vnp_TxnRef}`

    } else {
      return `http://${env.HOST}:${env.BACKEND_PORT}/404`
    }
  } catch (error) {
    console.log(error)
    throw new ApiError(error.message)
  }
}


export default {
  createURLPayment,
  vnpReturn
}