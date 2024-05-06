import querystring from 'qs'
import crypto from 'crypto'
import ApiError from '~/utils/ApiError'
import env from '~/config/environment'
import db from '~/models'
import moment from 'moment'
import mailService from '~/services/mailService'

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
    const total =req.body.total_price

    const data = {
      id_tour: idBook,
      booking_info: req.body.booking_info,
      id_user: req.body.id_user,
      member: req.body.member,
      total_price: total,
      day_booking : new Date().getTime()
    }

    // create book
    const book = await db.Book.create({
      day_booking: new Date(parseInt(data.day_booking)),
      id_tour: parseInt(data.id_tour),
      id_user: parseInt(data.id_user),
      member: parseInt(data.member),
      total_price: parseInt(data.total_price),
      booking_info: JSON.stringify(data.booking_info),
      isCheckout: false
    })


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
    vnp_Params['vnp_TxnRef'] = `${book.id}-${orderId}`
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


    if (secureHash === signed) {
      const rsCode = vnp_Params['vnp_ResponseCode']
      const idBook = vnp_Params['vnp_TxnRef'].split('_')[0]
      if (rsCode == '00') {
        await db.Book.update({
          isCheckout: true
        }, {
          where: {
            id: parseInt(vnp_Params.vnp_TxnRef.split('_')[0])
          }
        })
        const bookSucess = await db.Book.findOne({
          where: {
            isCheckout: true,
            status: 'success',
            id: idBook
          },
          include: [
            {
              model: db.Tour,
              as : 'tourData',
              include: [
                {
                  model: db.Manager,
                  as : 'managerData',
                  include: [
                    {
                      model: db.Account,
                      as : 'accountData'
                    }
                  ]
                },
                {
                  model: db.Staff,
                  as : 'staffData',
                  include: [
                    {
                      model: db.Account,
                      as : 'accountData'
                    }
                  ]
                }
              ]
            },
            {
              model: db.User,
              as : 'userData'
            }
          ]
        })

        // sử lý vé đã bán
        const tour = await db.Tour.findOne({
          where: {
            id: bookSucess.tourData.id
          }
        })

        if (tour) {
          await db.Tour.update({
            total_sale: tour.total_sale + bookSucess.member
          }, {
            where: {
              id: tour.id
            }
          })
        }




        const htmlTemplate = `
        <h2>Thanh toán thành công</h2>
        <p>Xin chào ${bookSucess.userData.fullName},</p>
        <p>Cảm ơn bạn đã đặt tour "${bookSucess.tourData.tour_name}" tại công ty du lịch ${bookSucess.tourData.managerData?.company_name}.</p>
        <p>Thông tin chi tiết:</p>
        <ul>
            <li>Tên tour: ${bookSucess.tourData.tour_name}</li>
            <li>Ngày khởi hành: ${new moment(bookSucess.tourData.departure_day).format('DD/MM/YYYY')}</li>
            <li>Ngày kết thúc: ${new moment(bookSucess.tourData.end_tour_day).format('DD/MM/YYYY')}</li>
            <li>Số lượng khách: ${bookSucess.member}</li>
        </ul>
        <p>Bạn có thể xem thông tin chi tiết của tour tại <a href="{{tour_link}}">đây</a>.</p>
        <p>Chúng tôi rất mong chờ chuyến đi của bạn!</p>
        <p>Trân trọng,</p>
        `
        await mailService.sendMailWithHtml(htmlTemplate, bookSucess.userData.email)


        return 'http://localhost:5173/payment?status=success'
      }
      return 'http://localhost:5173/payment?status=failed'
    } else {
      return 'http://localhost:5173/payment?status=failed'
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