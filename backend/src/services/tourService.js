import db from '~/models'
import { Op } from 'sequelize'
import apifeature from '~/helpers/apifeature'
import ApiError from '~/utils/ApiError'
import moment from 'moment'

const getTour = async (query) => {
  try {
    // Đọc các tham số từ query string
    const { page = 1, limit = 1000, search = '27-4-26', filters = {} } = query

    // Tính skip (bỏ qua) - phần bắt đầu của kết quả phân trang
    const skip = (page - 1) * limit

    let whereClause = {}
    // lấy những tour có ngày bắt đầu lớn hơn ngày hiện tại 1 ngày
    const currentDate = moment().toDate()
    const threeDaysLater = moment().add(1, 'days').toDate()
    console.log('currentDate', currentDate)
    console.log('threeDaysLater', threeDaysLater)
    whereClause = {
      departure_day: {
        [Op.gt]: threeDaysLater
      }
    }
    if (search) {
      console.log('search', search)
      const searchDate = moment(search, 'YYYY-MM-DD').toDate()
      console.log('searchDate', searchDate)
      whereClause = {
        departure_day: {
          [Op.gt]: searchDate
        }
      }
    } else {
      whereClause = {
        departure_day: {
          [Op.gt]: threeDaysLater
        }
      }
    }

    // Xây dựng điều kiện tìm kiếm


    // Áp dụng bộ lọc (nếu có)
    for (const key in filters) {
      // eslint-disable-next-line no-prototype-builtins
      if (filters.hasOwnProperty(key)) {
        whereClause[key] = filters[key]
      }
    }
    console.log('--------------------------------')
    // Thực hiện truy vấn
    const tours = await db.Tour.findAndCountAll({
      where: whereClause,
      include: [
        {
          model : db.Staff,
          as : 'staffData',
          include : [
            {
              model : db.Account,
              as : 'accountData',
              attributes : { exclude : ['createdAt', 'updatedAt', 'password'] }
            }
          ]
        },
        {
          model : db.Manager,
          as : 'managerData',
          include : [
            {
              model : db.Account,
              as : 'accountData',
              attributes : { exclude : ['createdAt', 'updatedAt', 'password'] }
            }
          ]
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(skip)
    })

    console.log(tours)

    return tours
  } catch (error) {
    console.log(error)
    throw new ApiError(error.message)
  }
}

const createTour = async (body) => {
  try {
    console.log(body)
    const newTour = await apifeature(db.Tour, 'create',
      { ...body,
        promotional : (body.promotional / 100),
        photos : body.photos
      }
    )
    return newTour
  } catch (error) {
    console.log(error)
    throw new ApiError(error.message)
  }
}

const updateTour = async (updateData) => {
  try {
    const updatedTour = await apifeature(db.Tour, 'update', { ...updateData })
    return updatedTour
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const deleteTour = async (id_tour) => {
  try {
    const deletedTour = await apifeature(db.Tour, 'delete', { id : id_tour })
    return deletedTour
  } catch (error) {
    console.log(error)
    throw new ApiError(error.message)
  }
}

const tourService = {
  getTour,
  createTour,
  updateTour,
  deleteTour
}

export default tourService