import moment from 'moment'
import querystring from 'qs'


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
       *  tour_id: 1,
       * id_customer: 1,
       * guest_number: 2
       * date_booked: '2021/09/30'
       * }
       *
       */
  try {
    // Lấy giá trị của các trường id_customer và tour_id từ đối tượng JSON
    const idCustomer = jsonObj.id_customer
    const tourId = jsonObj.tour_id
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
      tour_id: parseInt(tourId),
      guest_number : parseInt(guest_number)
    }

    return jsonObject
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}


const createURL_payment = (req) => {
  process.env.TZ = 'Asia/Ho_Chi_Minh'
  let date = new Date()
  let createDate = moment(date).format('YYYYMMDDHHmmss')


  let ipAddr =
        req.headers['x-forwarded-for'] || req.connection.remoteAddress ||
        req.socket.remoteAddress || req.connection.socket.remoteAddress

  let tmnCode = 'Y1LHPP29'
  let secretKey = 'TSDBCLAJZAVWTSOVHBVXWDBNHDHIBNGO'
  let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'
  let returnUrl = 'http://localhost:8888/api/v1/test/vnpay-return'
  // random orderId unique
  let orderId = jsonToCustomString(req.body)
  let amount = 10000
  let locale = 'vn'
  let currCode = 'VND'
  let vnp_Params = {}

  vnp_Params['vnp_Version'] = '2.1.0'
  vnp_Params['vnp_Command'] = 'pay'
  vnp_Params['vnp_TmnCode'] = tmnCode
  vnp_Params['vnp_Locale'] = locale
  vnp_Params['vnp_CurrCode'] = currCode
  vnp_Params['vnp_TxnRef'] = orderId
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


  return { vnpUrl, body : stringToJsonObject(orderId) }
}


export default createURL_payment