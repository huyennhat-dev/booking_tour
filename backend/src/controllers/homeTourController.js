import db from '~/models'
import { Op } from 'sequelize'
import ApiError from '~/utils/ApiError'
import moment from 'moment'

const getTourSearch = async (req, res, next) => {
  try {
    // Đọc các tham số từ query string
    const { page = 1, limit = 1000, destination = '', departure_day, exp = 0 } = req.query

    let op = Op.gt
    if (exp == 1) {
      op = Op.lt
    } else {
      op = Op.gt
    }

    // Tính skip (bỏ qua) - phần bắt đầu của kết quả phân trang
    const skip = (page - 1) * limit

    const oneDaysLater = moment().add(1, 'days').toDate()

    let whereClause = {}

    if (departure_day) {
      let searchDate = moment(departure_day, 'YYYY-MM-DD').toDate()
      searchDate = moment(searchDate).subtract(1, 'days').toDate()
      const searchDateLimit = moment(searchDate).add(10, 'days').toDate()
      console.log(searchDate)
      console.log(searchDateLimit)
      whereClause = {
        [Op.and]: [
          {
            departure_day: {
              [Op.gte]: searchDate
            }
          },
          {
            departure_day: {
              [Op.lte]: searchDateLimit
            }
          }
        ]
      }
    } else {
      whereClause.departure_day = {
        [op]: oneDaysLater
      }
    }

    if (destination) {
      whereClause.destination = {
        [Op.like]: `%${destination}%`
      }
    }

    console.log(whereClause)
    // Thực hiện truy vấn
    const tours = await db.Tour.findAndCountAll({
      where: whereClause, // điều kiện tìm kiếm
      include: [
        {
          model: db.Staff,
          as: 'staffData',
          include: [
            {
              model: db.Account,
              as: 'accountData',
              attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
            }
          ]
        },
        {
          model: db.Manager,
          as: 'managerData',
          include: [
            {
              model: db.Account,
              as: 'accountData',
              attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
            }
          ]
        }
      ],
      limit: parseInt(limit) == 1000 ? null : parseInt(limit),
      offset: parseInt(skip)
    })
    return res.status(200).json({
      statusCode: 200,
      page: parseInt(page),
      data: tours,
      limit: parseInt(limit) == 1000 ? null : parseInt(limit),
      total: tours.count
    })
  } catch (error) {
    console.log(error)
    throw new ApiError(error.message)
  }
}

const getTourHomePage = async (req, res, next) => {
  try {

    return res.status(200).json({
    })
  } catch (error) {
    return next(new ApiError(404, error.message))
  }
}


const homeTourController = {
  getTourHomePage,
  getTourSearch
}

export default homeTourController

